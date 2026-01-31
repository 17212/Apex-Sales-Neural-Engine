import { getModel } from '../../config/gemini.js';
import { SentimentResult, EmotionScore } from '../../types/ai.types.js';
import { AI_CONFIG } from '../../config/constants.js';

export class SentimentAnalysisService {
  /**
   * Analyze sentiment of a message
   */
  async analyzeSentiment(message: string): Promise<SentimentResult> {
    try {
      // First, try quick analysis with keywords
      const quickResult = this.quickSentimentAnalysis(message);
      
      // If clearly negative or angry, use AI for detailed analysis
      if (quickResult.sentiment === 'angry' || quickResult.score < -0.3) {
        return await this.deepSentimentAnalysis(message);
      }
      
      return quickResult;
    } catch (error) {
      console.error('Sentiment Analysis Error:', error);
      return this.getNeutralSentiment();
    }
  }

  /**
   * Quick sentiment analysis using keywords (no API call)
   */
  quickSentimentAnalysis(message: string): SentimentResult {
    const positiveWords = [
      'شكرا', 'ممتاز', 'رائع', 'جميل', 'حلو', 'عظيم', 'أحسن',
      'thank', 'great', 'excellent', 'amazing', 'love', 'perfect',
      'سعيد', 'مبسوط', 'تمام', 'كويس', 'جيد', 'حبيت'
    ];
    
    const negativeWords = [
      'سيء', 'مشكلة', 'غلط', 'خطأ', 'زفت', 'وحش',
      'bad', 'wrong', 'problem', 'issue', 'terrible', 'awful',
      'زعلان', 'مستاء', 'مش راضي', 'إحباط'
    ];
    
    const angryWords = [
      'نصب', 'احتيال', 'سرقة', 'كذب', 'نصاب', 'حرامي',
      'scam', 'fraud', 'liar', 'steal', 'cheat', 'sue',
      'غضب', 'زعلان جدا', 'هشتكي', 'قانوني', 'محامي',
      '!!!!', 'فضيحة', 'أسوأ'
    ];
    
    const messageLower = message.toLowerCase();
    
    // Count matches
    const positiveCount = positiveWords.filter(w => messageLower.includes(w.toLowerCase())).length;
    const negativeCount = negativeWords.filter(w => messageLower.includes(w.toLowerCase())).length;
    const angryCount = angryWords.filter(w => messageLower.includes(w.toLowerCase())).length;
    
    // Calculate score
    let score = 0;
    let sentiment: 'positive' | 'neutral' | 'negative' | 'angry' = 'neutral';
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let shouldEscalate = false;
    
    if (angryCount > 0) {
      sentiment = 'angry';
      score = -0.8 - (angryCount * 0.05);
      urgency = 'critical';
      shouldEscalate = true;
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      score = -0.3 - (negativeCount * 0.1);
      urgency = negativeCount > 2 ? 'high' : 'medium';
    } else if (positiveCount > negativeCount) {
      sentiment = 'positive';
      score = 0.3 + (positiveCount * 0.1);
      urgency = 'low';
    }
    
    // Check for escalation signals
    if (messageLower.includes('مدير') || messageLower.includes('مسؤول') || 
        messageLower.includes('manager') || messageLower.includes('supervisor')) {
      shouldEscalate = true;
      urgency = 'high';
    }
    
    // Clamp score between -1 and 1
    score = Math.max(-1, Math.min(1, score));
    
    return {
      sentiment,
      score,
      emotions: this.getDefaultEmotions(sentiment),
      urgency,
      shouldEscalate,
      escalationReason: shouldEscalate ? 'Negative sentiment or manager request detected' : undefined,
    };
  }

  /**
   * Deep sentiment analysis using AI
   */
  async deepSentimentAnalysis(message: string): Promise<SentimentResult> {
    const model = getModel('flash');
    
    const prompt = `حلل المشاعر في الرسالة التالية بدقة:

الرسالة: "${message}"

رد بصيغة JSON فقط:
{
  "sentiment": "positive|neutral|negative|angry",
  "score": -1.0 to 1.0,
  "emotions": [{"emotion": "joy|trust|fear|surprise|sadness|disgust|anger|anticipation", "score": 0.0-1.0}],
  "urgency": "low|medium|high|critical",
  "shouldEscalate": true|false,
  "escalationReason": "reason if should escalate"
}`;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          sentiment: parsed.sentiment,
          score: parsed.score,
          emotions: parsed.emotions || [],
          urgency: parsed.urgency || 'medium',
          shouldEscalate: parsed.shouldEscalate || parsed.score < AI_CONFIG.sentimentEscalationThreshold,
          escalationReason: parsed.escalationReason,
        };
      }
    } catch (error) {
      console.error('Deep Sentiment Analysis Error:', error);
    }
    
    return this.getNeutralSentiment();
  }

  /**
   * Check if message requires immediate escalation
   */
  requiresImmediateEscalation(result: SentimentResult): boolean {
    return (
      result.sentiment === 'angry' ||
      result.score < AI_CONFIG.sentimentEscalationThreshold ||
      result.urgency === 'critical' ||
      result.shouldEscalate
    );
  }

  /**
   * Get default emotions based on sentiment
   */
  private getDefaultEmotions(sentiment: SentimentResult['sentiment']): EmotionScore[] {
    switch (sentiment) {
      case 'positive':
        return [
          { emotion: 'joy', score: 0.7 },
          { emotion: 'trust', score: 0.6 },
        ];
      case 'negative':
        return [
          { emotion: 'sadness', score: 0.5 },
          { emotion: 'fear', score: 0.3 },
        ];
      case 'angry':
        return [
          { emotion: 'anger', score: 0.9 },
          { emotion: 'disgust', score: 0.5 },
        ];
      default:
        return [
          { emotion: 'trust', score: 0.5 },
        ];
    }
  }

  /**
   * Get neutral sentiment as fallback
   */
  private getNeutralSentiment(): SentimentResult {
    return {
      sentiment: 'neutral',
      score: 0,
      emotions: [{ emotion: 'trust', score: 0.5 }],
      urgency: 'low',
      shouldEscalate: false,
    };
  }
}

export const sentimentAnalysisService = new SentimentAnalysisService();
