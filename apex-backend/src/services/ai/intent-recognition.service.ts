import { getModel } from '../../config/gemini.js';
import { 
  IntentCategory, 
  IntentResult, 
  ExtractedEntity, 
  SuggestedAction 
} from '../../types/ai.types.js';

export class IntentRecognitionService {
  /**
   * Analyze user message to determine intent
   */
  async recognizeIntent(message: string, context?: { cartItems?: number; previousOrders?: number }): Promise<IntentResult> {
    try {
      const model = getModel('flash'); // Use fast model for intent recognition
      
      const prompt = `أنت محلل نوايا العملاء. حلل الرسالة التالية وحدد نية العميل.

الرسالة: "${message}"

الخيارات المتاحة للنية:
- browsing (يتصفح فقط)
- product_inquiry (يسأل عن منتج)
- price_inquiry (يسأل عن السعر)
- availability (يسأل عن التوفر)
- comparison (يقارن بين منتجات)
- ready_to_buy (مستعد للشراء)
- cart_action (يريد إضافة للسلة)
- checkout (يريد إتمام الشراء)
- order_status (يسأل عن حالة الطلب)
- shipping_inquiry (يسأل عن الشحن)
- return_refund (يريد إرجاع أو استرداد)
- complaint (شكوى)
- feedback (رأي أو تقييم)
- support_needed (يحتاج دعم فني)
- human_request (يريد التحدث لموظف)
- greeting (تحية)
- farewell (وداع)
- unknown (غير واضح)

رد بصيغة JSON فقط:
{
  "intent": "intent_name",
  "confidence": 0.0-1.0,
  "entities": [{"type": "product|category|price|quantity|order_id", "value": "...", "confidence": 0.0-1.0}],
  "suggestedAction": "action_name"
}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Parse JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          intent: parsed.intent as IntentCategory,
          confidence: parsed.confidence,
          entities: parsed.entities || [],
          suggestedAction: this.mapIntentToAction(parsed.intent, context),
        };
      }
      
      // Fallback
      return this.getFallbackIntent();
    } catch (error) {
      console.error('Intent Recognition Error:', error);
      return this.getFallbackIntent();
    }
  }

  /**
   * Quick intent detection using keywords (faster, no API call)
   */
  quickIntentDetection(message: string): IntentCategory {
    const lowercaseMsg = message.toLowerCase();
    
    // Greeting patterns
    if (/^(مرحبا|أهلا|السلام|هاي|hello|hi|صباح|مساء)/i.test(message)) {
      return 'greeting';
    }
    
    // Farewell patterns
    if (/(شكرا|مع السلامة|باي|bye|thanks|شكراً)/i.test(message)) {
      return 'farewell';
    }
    
    // Order status
    if (/(طلبي|الطلب|وين|فين|متى يوصل|تتبع|tracking)/i.test(message)) {
      return 'order_status';
    }
    
    // Price inquiry
    if (/(سعر|كم|بكام|price|cost|ثمن)/i.test(message)) {
      return 'price_inquiry';
    }
    
    // Availability
    if (/(متوفر|موجود|available|في|عندكم)/i.test(message)) {
      return 'availability';
    }
    
    // Ready to buy signals
    if (/(اطلب|عايز|أبي|أريد|اشتري|buy|order)/i.test(message)) {
      return 'ready_to_buy';
    }
    
    // Cart actions
    if (/(سلة|cart|أضف|add|إضافة)/i.test(message)) {
      return 'cart_action';
    }
    
    // Checkout
    if (/(checkout|دفع|إتمام|كاش|فيزا)/i.test(message)) {
      return 'checkout';
    }
    
    // Human request
    if (/(موظف|إنسان|بشر|human|agent|مدير)/i.test(message)) {
      return 'human_request';
    }
    
    // Complaint signals
    if (/(مشكلة|غلط|سيء|زفت|bad|problem|issue)/i.test(message)) {
      return 'complaint';
    }
    
    // Return/Refund
    if (/(إرجاع|استرداد|return|refund|فلوسي)/i.test(message)) {
      return 'return_refund';
    }
    
    // Shipping
    if (/(شحن|توصيل|delivery|shipping)/i.test(message)) {
      return 'shipping_inquiry';
    }
    
    // Default to product inquiry if asking
    if (/(\?|؟)/.test(message)) {
      return 'product_inquiry';
    }
    
    return 'browsing';
  }

  /**
   * Map intent to suggested action
   */
  private mapIntentToAction(
    intent: IntentCategory, 
    context?: { cartItems?: number; previousOrders?: number }
  ): SuggestedAction {
    const mapping: Record<IntentCategory, SuggestedAction> = {
      browsing: 'show_products',
      product_inquiry: 'show_product_details',
      price_inquiry: 'show_product_details',
      availability: 'show_product_details',
      comparison: 'show_products',
      ready_to_buy: context?.cartItems ? 'proceed_checkout' : 'add_to_cart',
      cart_action: 'add_to_cart',
      checkout: 'proceed_checkout',
      order_status: 'track_order',
      shipping_inquiry: 'continue_conversation',
      return_refund: 'continue_conversation',
      complaint: 'escalate_human',
      feedback: 'continue_conversation',
      support_needed: 'escalate_human',
      human_request: 'escalate_human',
      greeting: 'send_greeting',
      farewell: 'continue_conversation',
      unknown: 'continue_conversation',
    };
    
    return mapping[intent] || 'continue_conversation';
  }

  /**
   * Fallback intent when recognition fails
   */
  private getFallbackIntent(): IntentResult {
    return {
      intent: 'unknown',
      confidence: 0.5,
      entities: [],
      suggestedAction: 'continue_conversation',
    };
  }
}

export const intentRecognitionService = new IntentRecognitionService();
