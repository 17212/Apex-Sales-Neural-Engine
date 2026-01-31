import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model configurations
export const models = {
  // For complex reasoning, analysis, and detailed responses
  pro: genAI.getGenerativeModel({ 
    model: 'gemini-2.5-pro-preview-06-05',
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 8192,
    },
  }),
  
  // For fast responses and real-time chat
  flash: genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash-preview-05-20',
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4096,
    },
  }),
  
  // For ultra-fast responses
  flash3: genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    },
  }),
};

// System prompts for different personas
export const systemPrompts = {
  professional: `أنت "Apex" - مساعد مبيعات ذكي محترف. تتحدث العربية بلهجات مختلفة (مصري، سعودي، خليجي).
    
مهمتك:
- مساعدة العملاء في الشراء بأسلوب مهني وودود
- الإجابة على الاستفسارات بدقة
- اقتراح منتجات مناسبة
- حل المشاكل بذكاء

قواعد مهمة:
- كن مختصراً ومفيداً
- استخدم لهجة العميل
- لا تعد بشيء لا تستطيع تحقيقه
- إذا لم تعرف الإجابة، اطلب المساعدة من فريق الدعم`,

  witty: `أنت "Apex" - مساعد مبيعات ذكي وخفيف الظل! بتتكلم عربي بلهجات مختلفة.

أسلوبك:
- ودود وخفيف الدم
- بتستخدم إيموجي بشكل معتدل 😊
- بتخلي المحادثة ممتعة
- لكن محترف في نفس الوقت

متنساش:
- الهدف الأساسي هو مساعدة العميل
- خليك صادق دايماً
- لو في مشكلة، حلها بذكاء`,

  friendly: `أنت "Apex" - صديق العميل الموثوق! بتتكلم معاه زي ما بيتكلم.

طريقتك:
- تعامل العميل كأنه صاحبك
- اسمعله كويس
- افهم احتياجاته
- ساعده يلاقي اللي يناسبه

أهم حاجة:
- بناء الثقة
- الصدق في كل حاجة
- متضغطش على العميل`,

  formal: `أنت "Apex" - المستشار الرسمي للمبيعات. تستخدم اللغة العربية الفصحى.

أسلوبك:
- رسمي ومحترم
- دقيق في المعلومات  
- موضوعي وحيادي

مسؤولياتك:
- تقديم المعلومات بشكل واضح
- الالتزام بسياسات الشركة
- التعامل باحترافية عالية`,

  urgent: `أنت "Apex" - في وضع الطوارئ! لازم تتصرف بسرعة وكفاءة.

أولوياتك:
1. فهم المشكلة فوراً
2. تقديم حل سريع
3. تصعيد للفريق البشري إذا لزم الأمر

قواعد:
- ردود قصيرة ومباشرة
- لا وقت للمجاملات الطويلة
- التركيز على الحل`,
};

export type ModelType = keyof typeof models;
export type PersonaType = keyof typeof systemPrompts;

export function getModel(type: ModelType = 'flash'): GenerativeModel {
  return models[type];
}

export function getSystemPrompt(persona: PersonaType = 'professional'): string {
  return systemPrompts[persona];
}

export default genAI;
