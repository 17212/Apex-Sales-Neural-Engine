// ============================================
// AI Service Types
// ============================================

export type AIModel = 'gemini-2.5-pro' | 'gemini-2.5-flash' | 'gemini-3-flash';

export type Dialect = 'ar-EG' | 'ar-SA' | 'ar-AE' | 'ar-LB' | 'ar-MSA' | 'en';

export type PersonaMode = 'professional' | 'witty' | 'friendly' | 'formal' | 'urgent';

export interface AIConfig {
  model: AIModel;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  persona: PersonaMode;
}

// ============================================
// Intent Recognition
// ============================================

export type IntentCategory = 
  | 'browsing'           // Just looking around
  | 'product_inquiry'    // Asking about specific product
  | 'price_inquiry'      // Price related questions
  | 'availability'       // Stock check
  | 'comparison'         // Comparing products
  | 'ready_to_buy'       // Ready to purchase
  | 'cart_action'        // Add to cart, modify cart
  | 'checkout'           // Proceed to checkout
  | 'order_status'       // Check order status
  | 'shipping_inquiry'   // Shipping questions
  | 'return_refund'      // Returns and refunds
  | 'complaint'          // Customer complaint
  | 'feedback'           // General feedback
  | 'support_needed'     // Technical support
  | 'human_request'      // Wants to talk to human
  | 'greeting'           // Hello, welcome
  | 'farewell'           // Goodbye
  | 'unknown';           // Cannot determine

export interface IntentResult {
  intent: IntentCategory;
  confidence: number; // 0 to 1
  entities: ExtractedEntity[];
  suggestedAction: SuggestedAction;
}

export interface ExtractedEntity {
  type: 'product' | 'category' | 'price' | 'quantity' | 'date' | 'location' | 'order_id';
  value: string;
  confidence: number;
}

export type SuggestedAction = 
  | 'show_products'
  | 'show_product_details'
  | 'add_to_cart'
  | 'show_cart'
  | 'proceed_checkout'
  | 'track_order'
  | 'escalate_human'
  | 'offer_discount'
  | 'cross_sell'
  | 'up_sell'
  | 'resolve_objection'
  | 'send_greeting'
  | 'continue_conversation';

// ============================================
// Sentiment Analysis
// ============================================

export interface SentimentResult {
  sentiment: 'positive' | 'neutral' | 'negative' | 'angry';
  score: number; // -1 to 1
  emotions: EmotionScore[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  shouldEscalate: boolean;
  escalationReason?: string;
}

export interface EmotionScore {
  emotion: 'joy' | 'trust' | 'fear' | 'surprise' | 'sadness' | 'disgust' | 'anger' | 'anticipation';
  score: number; // 0 to 1
}

// ============================================
// Sales Intelligence
// ============================================

export interface ProductRecommendation {
  productId: string;
  productName: string;
  reason: 'similar' | 'complementary' | 'trending' | 'frequently_bought' | 'personalized';
  score: number;
  pitch: string; // AI-generated selling point
}

export interface ObjectionHandler {
  objectionType: ObjectionType;
  detected: boolean;
  response: string;
  followUpQuestions: string[];
  offerDiscount: boolean;
  discountPercentage?: number;
}

export type ObjectionType = 
  | 'price_too_high'
  | 'shipping_cost'
  | 'delivery_time'
  | 'trust_issues'
  | 'needs_time'
  | 'comparing_options'
  | 'wrong_product'
  | 'budget_constraint'
  | 'quality_concern'
  | 'return_policy';

// ============================================
// Conversation Context
// ============================================

export interface ConversationContext {
  customerId: string;
  customerName?: string;
  customerSegment: string;
  loyaltyTier: string;
  
  // Current session
  currentIntent?: IntentCategory;
  viewedProducts: string[];
  cartItems: CartItem[];
  
  // History summary
  previousOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  
  // AI state
  conversationSummary: string;
  pendingQuestions: string[];
  offeredDiscounts: string[];
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// ============================================
// AI Response
// ============================================

export interface AIResponse {
  message: string;
  
  // UI Components (for Flutter app)
  uiComponents?: UIComponent[];
  
  // Suggested quick replies
  quickReplies?: string[];
  
  // Actions to take
  actions?: AIAction[];
  
  // Metadata
  model: AIModel;
  tokensUsed: number;
  processingTime: number;
}

export type UIComponent = 
  | ProductCarouselComponent
  | QuickReplyChipsComponent
  | OrderSummaryComponent
  | PaymentLinkComponent;

export interface ProductCarouselComponent {
  type: 'product_carousel';
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    action: 'add_to_cart' | 'view_details';
  }[];
}

export interface QuickReplyChipsComponent {
  type: 'quick_reply_chips';
  options: string[];
}

export interface OrderSummaryComponent {
  type: 'order_summary';
  order: {
    items: { name: string; quantity: number; price: number }[];
    subtotal: number;
    shipping: number;
    total: number;
  };
}

export interface PaymentLinkComponent {
  type: 'payment_link';
  url: string;
  amount: number;
  expiresAt: string;
}

export interface AIAction {
  type: 'create_order' | 'update_cart' | 'apply_discount' | 'escalate' | 'send_notification';
  payload: Record<string, unknown>;
}
