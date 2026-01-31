import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { GeminiService } from '../services/ai/gemini.service.js';
import { intentRecognitionService } from '../services/ai/intent-recognition.service.js';
import { sentimentAnalysisService } from '../services/ai/sentiment-analysis.service.js';
import { asyncHandler, AppError } from '../middleware/error-handler.middleware.js';
import { ApiResponse } from '../types/api.types.js';
import { ConversationContext } from '../types/ai.types.js';

/**
 * Handle incoming chat message
 */
export const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { conversationId, message, customerId } = req.body;
  const tenantId = req.tenantId!;

  if (!message) {
    throw new AppError('Message is required', 400, 'VALIDATION_ERROR');
  }

  // Get or create conversation
  let conversation = conversationId 
    ? await prisma.conversation.findFirst({
        where: { id: conversationId, tenantId },
        include: { 
          customer: true,
          messages: { orderBy: { createdAt: 'desc' }, take: 20 }
        },
      })
    : null;

  // If no conversation, create one
  if (!conversation) {
    if (!customerId) {
      throw new AppError('Customer ID required for new conversation', 400, 'VALIDATION_ERROR');
    }

    conversation = await prisma.conversation.create({
      data: {
        tenantId,
        customerId,
        channel: 'WEB',
        status: 'ACTIVE',
      },
      include: { 
        customer: true,
        messages: { orderBy: { createdAt: 'desc' }, take: 20 }
      },
    });
  }

  // Quick intent detection
  const quickIntent = intentRecognitionService.quickIntentDetection(message);
  
  // Quick sentiment analysis
  const sentiment = await sentimentAnalysisService.analyzeSentiment(message);

  // Save user message
  const userMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      direction: 'INBOUND',
      content: message,
      contentType: 'TEXT',
    },
  });

  // Build conversation context
  const context: ConversationContext = {
    customerId: conversation.customer.id,
    customerName: conversation.customer.name || undefined,
    customerSegment: conversation.customer.segment,
    loyaltyTier: conversation.customer.loyaltyTier,
    viewedProducts: [],
    cartItems: [],
    previousOrders: conversation.customer.orderCount,
    totalSpent: conversation.customer.totalSpent,
    conversationSummary: '',
    pendingQuestions: [],
    offeredDiscounts: [],
  };

  // Build conversation history
  const history = conversation.messages.reverse().map(m => ({
    role: m.direction === 'INBOUND' ? 'user' as const : 'model' as const,
    content: m.content,
  }));

  // Get tenant settings for AI persona
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  
  // Generate AI response
  const geminiService = new GeminiService(
    'flash',
    (tenant?.aiPersona as 'professional' | 'witty' | 'friendly' | 'formal' | 'urgent') || 'professional'
  );
  
  const aiResponse = await geminiService.generateResponse(message, context, history);

  // Save AI response
  const botMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      direction: 'OUTBOUND',
      content: aiResponse.message,
      contentType: 'TEXT',
      isAiGenerated: true,
      aiModel: aiResponse.model,
      tokensUsed: aiResponse.tokensUsed,
    },
  });

  // Update conversation with sentiment and intent
  await prisma.conversation.update({
    where: { id: conversation.id },
    data: {
      sentiment: sentiment.sentiment.toUpperCase() as 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'ANGRY',
      sentimentScore: sentiment.score,
      intent: quickIntent,
      updatedAt: new Date(),
    },
  });

  // Check if escalation needed
  const shouldEscalate = sentiment.shouldEscalate || quickIntent === 'human_request';

  if (shouldEscalate) {
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { 
        status: 'ESCALATED',
        isAiHandled: false,
      },
    });
  }

  res.json({
    success: true,
    data: {
      conversationId: conversation.id,
      userMessage: {
        id: userMessage.id,
        content: userMessage.content,
        createdAt: userMessage.createdAt,
      },
      botMessage: {
        id: botMessage.id, 
        content: aiResponse.message,
        quickReplies: aiResponse.quickReplies,
        uiComponents: aiResponse.uiComponents,
        createdAt: botMessage.createdAt,
      },
      analysis: {
        sentiment: sentiment.sentiment,
        sentimentScore: sentiment.score,
        intent: quickIntent,
        shouldEscalate,
        processingTime: aiResponse.processingTime,
      },
    },
  } satisfies ApiResponse);
});

/**
 * Get conversation history
 */
export const getConversations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tenantId = req.tenantId!;
  const { status, page = 1, limit = 20 } = req.query;

  const where: any = { tenantId };
  if (status) {
    where.status = status;
  }

  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true, phone: true, segment: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        assignedTo: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.conversation.count({ where }),
  ]);

  res.json({
    success: true,
    data: conversations.map(c => ({
      id: c.id,
      channel: c.channel,
      status: c.status,
      priority: c.priority,
      sentiment: c.sentiment,
      isAiHandled: c.isAiHandled,
      customer: c.customer,
      lastMessage: c.messages[0] || null,
      assignedTo: c.assignedTo,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })),
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  } satisfies ApiResponse);
});

/**
 * Get single conversation with messages
 */
export const getConversation = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const tenantId = req.tenantId!;

  const conversation = await prisma.conversation.findFirst({
    where: { id, tenantId },
    include: {
      customer: true,
      messages: { orderBy: { createdAt: 'asc' } },
      assignedTo: { select: { id: true, name: true, avatar: true } },
    },
  });

  if (!conversation) {
    throw new AppError('Conversation not found', 404, 'NOT_FOUND');
  }

  res.json({
    success: true,
    data: conversation,
  } satisfies ApiResponse);
});

/**
 * Handoff conversation to human agent
 */
export const handoffToHuman = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { agentId, note } = req.body;
  const tenantId = req.tenantId!;

  const conversation = await prisma.conversation.findFirst({
    where: { id, tenantId },
  });

  if (!conversation) {
    throw new AppError('Conversation not found', 404, 'NOT_FOUND');
  }

  await prisma.conversation.update({
    where: { id },
    data: {
      status: 'WAITING',
      isAiHandled: false,
      assignedToId: agentId || null,
    },
  });

  // Add system message about handoff
  await prisma.message.create({
    data: {
      conversationId: id,
      direction: 'OUTBOUND',
      content: note || 'تم تحويلك لأحد ممثلي خدمة العملاء. سيتم الرد عليك قريباً.',
      contentType: 'TEXT',
      isAiGenerated: true,
    },
  });

  res.json({
    success: true,
    data: { message: 'Conversation handed off successfully' },
  } satisfies ApiResponse);
});
