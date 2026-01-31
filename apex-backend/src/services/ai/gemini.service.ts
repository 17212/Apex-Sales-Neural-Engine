import { getModel, getSystemPrompt, type ModelType, type PersonaType } from '../../config/gemini.js';
import { 
  AIConfig, 
  AIResponse, 
  ConversationContext,
  UIComponent,
  ProductCarouselComponent,
  QuickReplyChipsComponent 
} from '../../types/ai.types.js';
import { AI_CONFIG } from '../../config/constants.js';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export class GeminiService {
  private model: ModelType;
  private persona: PersonaType;

  constructor(model: ModelType = 'flash', persona: PersonaType = 'professional') {
    this.model = model;
    this.persona = persona;
  }

  /**
   * Generate AI response for a customer message
   */
  async generateResponse(
    userMessage: string,
    context: ConversationContext,
    conversationHistory: ChatMessage[] = []
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      const model = getModel(this.model);
      const systemPrompt = this.buildSystemPrompt(context);
      
      // Build conversation history for context
      const historyText = conversationHistory
        .slice(-AI_CONFIG.maxConversationHistory)
        .map(m => `${m.role === 'user' ? 'العميل' : 'Apex'}: ${m.content}`)
        .join('\n');
      
      const fullPrompt = `${systemPrompt}

--- سياق العميل ---
الاسم: ${context.customerName || 'عميل جديد'}
الفئة: ${context.customerSegment}
مستوى الولاء: ${context.loyaltyTier}
عدد الطلبات السابقة: ${context.previousOrders}
إجمالي المشتريات: ${context.totalSpent} جنيه

${context.cartItems.length > 0 ? `--- السلة الحالية ---
${context.cartItems.map(item => `- ${item.productName} (${item.quantity}x) - ${item.price} جنيه`).join('\n')}` : ''}

${historyText ? `--- المحادثة السابقة ---\n${historyText}` : ''}

--- رسالة العميل الحالية ---
${userMessage}

--- تعليمات ---
1. رد على رسالة العميل بشكل طبيعي ومفيد
2. إذا كان يسأل عن منتج، اقترح منتجات مناسبة
3. إذا كان مستعد للشراء، ساعده في إتمام الطلب
4. كن مختصراً ومباشراً
5. استخدم لهجة العميل إذا أمكن

الرد:`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();
      
      // Estimate tokens (rough estimation)
      const tokensUsed = Math.ceil((fullPrompt.length + text.length) / 4);
      
      // Generate UI components based on response
      const uiComponents = this.generateUIComponents(text, context);
      
      // Generate quick replies
      const quickReplies = this.generateQuickReplies(text, context);
      
      return {
        message: text,
        uiComponents,
        quickReplies,
        actions: [],
        model: this.model === 'pro' ? 'gemini-2.5-pro' : 
               this.model === 'flash' ? 'gemini-2.5-flash' : 'gemini-3-flash',
        tokensUsed,
        processingTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback response
      return {
        message: 'عذراً، حدث خطأ. هل يمكنك إعادة صياغة سؤالك؟',
        quickReplies: ['تحدث مع موظف', 'حاول مرة أخرى'],
        model: 'gemini-2.5-flash',
        tokensUsed: 0,
        processingTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Stream response for real-time chat
   */
  async *streamResponse(
    userMessage: string,
    context: ConversationContext,
    conversationHistory: ChatMessage[] = []
  ): AsyncGenerator<string> {
    try {
      const model = getModel(this.model);
      const systemPrompt = this.buildSystemPrompt(context);
      
      const historyText = conversationHistory
        .slice(-20)
        .map(m => `${m.role === 'user' ? 'العميل' : 'Apex'}: ${m.content}`)
        .join('\n');
      
      const fullPrompt = `${systemPrompt}

${historyText ? `المحادثة السابقة:\n${historyText}\n` : ''}
العميل: ${userMessage}

الرد (مختصر ومفيد):`;

      const result = await model.generateContentStream(fullPrompt);
      
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error('Streaming Error:', error);
      yield 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
    }
  }

  /**
   * Build system prompt based on persona and context
   */
  private buildSystemPrompt(context: ConversationContext): string {
    const basePrompt = getSystemPrompt(this.persona);
    
    // Add VIP handling
    if (context.customerSegment === 'VIP') {
      return `${basePrompt}

ملاحظة مهمة: هذا عميل VIP! تعامل معه باهتمام خاص وقدم له أفضل خدمة ممكنة.`;
    }
    
    return basePrompt;
  }

  /**
   * Generate UI components based on AI response
   */
  private generateUIComponents(response: string, context: ConversationContext): UIComponent[] {
    const components: UIComponent[] = [];
    
    // If response mentions products, could add product carousel
    // This is a simplified version - in production, you'd parse the response more intelligently
    
    return components;
  }

  /**
   * Generate contextual quick replies
   */
  private generateQuickReplies(response: string, context: ConversationContext): string[] {
    const replies: string[] = [];
    
    // Default quick replies based on context
    if (context.cartItems.length > 0) {
      replies.push('إتمام الطلب', 'عرض السلة');
    }
    
    if (context.previousOrders > 0) {
      replies.push('تتبع طلبي');
    }
    
    replies.push('تصفح المنتجات', 'تحدث مع موظف');
    
    // Limit to 4 quick replies for mobile
    return replies.slice(0, 4);
  }

  /**
   * Set AI model
   */
  setModel(model: ModelType): void {
    this.model = model;
  }

  /**
   * Set AI persona
   */
  setPersona(persona: PersonaType): void {
    this.persona = persona;
  }
}

// Export singleton for simple use cases
export const geminiService = new GeminiService();
