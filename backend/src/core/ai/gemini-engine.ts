// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - AI Engine (Gemini 2.5)
// ═══════════════════════════════════════════════════════════════════════════════
// © 2025-2026 IDRISIUM Corp. All rights reserved.
// ═══════════════════════════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { env, BOT_PERSONALITIES, LANGUAGES, type BotPersonality, type Language } from '../config/index.js';

// ─────────────────────────────────────────────────────────────────────────────────
// Initialize Gemini AI
// ─────────────────────────────────────────────────────────────────────────────────

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// Models
const proModel = genAI.getGenerativeModel({ model: env.GEMINI_MODEL_PRO });
const flashModel = genAI.getGenerativeModel({ model: env.GEMINI_MODEL_FLASH });

// ─────────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────────

export interface SalesContext {
  storeName: string;
  personality: BotPersonality;
  language: Language;
  customerName?: string;
  customerSegment?: string;
  conversationHistory?: ConversationMessage[];
  products?: ProductInfo[];
  currentCart?: CartItem[];
  maxDiscountPercent?: number;
  trainingData?: string;
  rules?: string[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ProductInfo {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  description?: string;
  salesPitch?: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface AIResponse {
  message: string;
  intent: Intent;
  sentiment: Sentiment;
  suggestedProducts?: string[];
  quickReplies?: string[];
  uiComponents?: UIComponent[];
  shouldHandoff?: boolean;
  handoffReason?: string;
  confidence: number;
}

export type Intent = 
  | 'browsing'
  | 'comparing'
  | 'ready_to_buy'
  | 'support_needed'
  | 'complaint'
  | 'inquiry'
  | 'greeting'
  | 'farewell'
  | 'price_objection'
  | 'shipping_inquiry'
  | 'return_request';

export type Sentiment = 'positive' | 'neutral' | 'negative' | 'hostile';

export interface UIComponent {
  type: 'product_carousel' | 'chips' | 'order_card' | 'payment_button';
  data: unknown;
}

// ─────────────────────────────────────────────────────────────────────────────────
// System Prompts
// ─────────────────────────────────────────────────────────────────────────────────

const buildSystemPrompt = (context: SalesContext): string => {
  const personality = BOT_PERSONALITIES[context.personality];
  const language = LANGUAGES[context.language];
  
  return `أنت "Apex Sales Neural Engine" - مساعد مبيعات ذكي للغاية يعمل لصالح متجر "${context.storeName}".

## 🎭 الشخصية:
- الوضع: ${personality.name} (${personality.nameAr})
- النبرة: ${personality.tone}
- استخدام الإيموجي: ${personality.emoji ? 'نعم' : 'لا'}

## 🌍 اللغة:
- اللغة الأساسية: ${language.name} (${language.nativeName})
- اتجاه الكتابة: ${language.rtl ? 'من اليمين لليسار' : 'من اليسار لليمين'}
- استخدم اللهجة المحلية بشكل طبيعي

## 🎯 الأهداف الرئيسية (بالترتيب):
1. **تحويل المحادثات لمبيعات** - كن ودوداً لكن موجهاً نحو البيع
2. **الـ Upselling** - اقترح منتجات إضافية ذات صلة
3. **حل مشاكل العملاء** - استمع وساعد
4. **جمع معلومات** - الاسم، الهاتف، العنوان للشحن

## 📦 المنتجات المتاحة:
${context.products?.map(p => `- ${p.name}: ${p.price} جنيه (المخزون: ${p.stock})`).join('\n') || 'لا توجد منتجات محددة'}

## 🛒 سلة العميل الحالية:
${context.currentCart?.map(c => `- ${c.name} × ${c.quantity} = ${c.price * c.quantity} جنيه`).join('\n') || 'السلة فارغة'}

## 💡 قواعد مهمة:
1. الحد الأقصى للخصم: ${context.maxDiscountPercent || 15}%
2. لا تعد بشيء لا تستطيع تنفيذه
3. إذا شعرت بعدم الراحة أو الغضب الشديد، اطلب تحويل للموظف
4. استخدم الأرقام العربية (١٢٣) أو الهندية حسب السياق
5. كن مختصراً - الرسائل للموبايل
${context.rules?.map(r => `6. ${r}`).join('\n') || ''}

## 📊 معلومات إضافية:
${context.trainingData || 'لا توجد معلومات إضافية'}

## 🔄 الرد:
قم بالرد بصيغة JSON التالية فقط:
{
  "message": "رسالتك للعميل هنا",
  "intent": "intent_type",
  "sentiment": "sentiment_type",
  "suggestedProducts": ["product_id1", "product_id2"],
  "quickReplies": ["رد سريع 1", "رد سريع 2", "رد سريع 3"],
  "uiComponents": [],
  "shouldHandoff": false,
  "handoffReason": null,
  "confidence": 0.95
}`;
};

// ─────────────────────────────────────────────────────────────────────────────────
// Main AI Functions
// ─────────────────────────────────────────────────────────────────────────────────

/**
 * Generate a sales response using Gemini AI
 */
export async function generateSalesResponse(
  userMessage: string,
  context: SalesContext
): Promise<AIResponse> {
  try {
    const systemPrompt = buildSystemPrompt(context);
    
    // Build conversation history
    const history = context.conversationHistory?.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];
    
    // Use Flash for speed, Pro for complex cases
    const modelInstance = context.customerSegment === 'vip' 
      ? await genAI.getGenerativeModel({ model: env.GEMINI_MODEL_PRO })
      : await genAI.getGenerativeModel({ model: env.GEMINI_MODEL_FLASH });
    
    // @ts-ignore - Typescript confusion with Promise vs Instance
    const chat = modelInstance.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'فهمت. أنا جاهز للمساعدة.' }] },
        ...history,
      ],
    });
    
    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();
    
    // Parse JSON response
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as AIResponse;
        return {
          message: parsed.message || 'عذراً، حدث خطأ. حاول مرة أخرى.',
          intent: parsed.intent || 'inquiry',
          sentiment: parsed.sentiment || 'neutral',
          suggestedProducts: parsed.suggestedProducts || [],
          quickReplies: parsed.quickReplies || [],
          uiComponents: parsed.uiComponents || [],
          shouldHandoff: parsed.shouldHandoff || false,
          handoffReason: parsed.handoffReason,
          confidence: parsed.confidence || 0.5,
        };
      }
    } catch {
      // If JSON parsing fails, use the text directly
    }
    
    return {
      message: responseText,
      intent: 'inquiry',
      sentiment: 'neutral',
      confidence: 0.5,
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    return {
      message: 'عذراً، حدث خطأ تقني. هل تريد التحدث مع أحد ممثلي خدمة العملاء؟',
      intent: 'support_needed',
      sentiment: 'neutral',
      shouldHandoff: true,
      handoffReason: 'AI Error',
      confidence: 0,
    };
  }
}

/**
 * Analyze sentiment of a message
 */
export async function analyzeSentiment(message: string): Promise<{
  sentiment: Sentiment;
  score: number;
  emotions: string[];
}> {
  try {
    const result = await flashModel.generateContent(`
حلل المشاعر في هذه الرسالة وأرجع JSON فقط:
"${message}"

الصيغة:
{
  "sentiment": "positive|neutral|negative|hostile",
  "score": 0.0-1.0,
  "emotions": ["سعادة", "غضب", "إحباط", ...]
}
`);
    
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { sentiment: 'neutral', score: 0.5, emotions: [] };
  } catch {
    return { sentiment: 'neutral', score: 0.5, emotions: [] };
  }
}

/**
 * Detect intent from message
 */
export async function detectIntent(message: string): Promise<{
  intent: Intent;
  confidence: number;
  entities: Record<string, string>;
}> {
  try {
    const result = await flashModel.generateContent(`
حدد نية العميل من هذه الرسالة وأرجع JSON فقط:
"${message}"

الصيغة:
{
  "intent": "browsing|comparing|ready_to_buy|support_needed|complaint|inquiry|greeting|farewell|price_objection|shipping_inquiry|return_request",
  "confidence": 0.0-1.0,
  "entities": {"product": "...", "quantity": "...", "price": "..."}
}
`);
    
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { intent: 'inquiry', confidence: 0.5, entities: {} };
  } catch {
    return { intent: 'inquiry', confidence: 0.5, entities: {} };
  }
}

/**
 * Generate objection handling response
 */
export async function handleObjection(
  objection: string,
  productInfo: ProductInfo,
  context: SalesContext
): Promise<string> {
  try {
    const result = await proModel.generateContent(`
أنت خبير مبيعات. العميل أثار اعتراض:
"${objection}"

المنتج: ${productInfo.name} - ${productInfo.price} جنيه

قم بالرد بطريقة ${BOT_PERSONALITIES[context.personality].nameAr} وأقنعه بالشراء.

قواعد:
- لا تقدم خصم أكثر من ${context.maxDiscountPercent}%
- كن صادقاً
- استخدم الدليل الاجتماعي والإلحاح

أرجع الرد فقط بدون تنسيق.
`);
    
    return result.response.text();
  } catch {
    return 'أفهم قلقك تماماً. دعني أشرحلك أكثر...';
  }
}

/**
 * Generate product recommendations
 */
export async function getProductRecommendations(
  customerId: string,
  browsingHistory: string[],
  purchaseHistory: string[],
  products: ProductInfo[]
): Promise<string[]> {
  try {
    const result = await flashModel.generateContent(`
بناءً على:
- المنتجات اللي شافها العميل: ${browsingHistory.join(', ')}
- المنتجات اللي اشتراها قبل كدا: ${purchaseHistory.join(', ')}

من المنتجات دي:
${products.map(p => `${p.id}: ${p.name}`).join('\n')}

اقترح 3 منتجات مناسبة للعميل.

أرجع JSON فقط:
["product_id_1", "product_id_2", "product_id_3"]
`);
    
    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [];
  } catch {
    return [];
  }
}

/**
 * Transcribe and analyze voice note
 */
export async function analyzeVoiceNote(audioUrl: string): Promise<{
  transcription: string;
  sentiment: Sentiment;
  intent: Intent;
}> {
  // Note: This would integrate with a speech-to-text service
  // For now, returning a placeholder
  return {
    transcription: '[Voice note transcription]',
    sentiment: 'neutral',
    intent: 'inquiry',
  };
}

export { genAI, proModel, flashModel };
