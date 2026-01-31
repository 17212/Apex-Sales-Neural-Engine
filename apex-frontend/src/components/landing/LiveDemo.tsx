'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LiveDemo.module.css';

const demoMessages = [
  { role: 'customer', text: 'السلام عليكم، عايز أسأل عن الموبايل اللي عندكم' },
  { role: 'ai', text: 'وعليكم السلام! أهلاً بيك. عندنا تشكيلة رائعة من الموبايلات. بتدور على إيه بالظبط؟' },
  { role: 'customer', text: 'حاجة كويسة للتصوير وميزانيتي 10 آلاف' },
  { role: 'ai', text: 'ممتاز! عندي اقتراحين:\n\n1. Samsung A54 - كاميرا 50MP - 9,500 ج\n2. Xiaomi 13 Lite - كاميرا 108MP - 9,800 ج\n\nعايز تفاصيل أكتر؟' },
  { role: 'customer', text: 'الشاومي شكله حلو، ممكن أطلبه؟' },
  { role: 'ai', text: 'اختيار ممتاز! Xiaomi 13 Lite متوفر بـ 3 ألوان.\n\nأضيفه للسلة؟' },
];

export default function LiveDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playDemo = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
    
    const playNext = (index: number) => {
      if (index < demoMessages.length) {
        setTimeout(() => {
          setCurrentIndex(index + 1);
          playNext(index + 1);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    };
    
    playNext(0);
  };

  return (
    <section id="demo" className={styles.demo}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>شوف بنفسك</h2>
          <p className={styles.subtitle}>محادثة حقيقية بين عميل والذكاء الاصطناعي</p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          className={styles.chatWindow}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatInfo}>
              <span className={styles.chatName}>APEX AI</span>
              <span className={styles.chatStatus}>متصل</span>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            <AnimatePresence>
              {demoMessages.slice(0, currentIndex).map((msg, i) => (
                <motion.div
                  key={i}
                  className={`${styles.message} ${styles[msg.role]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.messageContent}>
                    {msg.text.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isPlaying && currentIndex < demoMessages.length && (
              <div className={`${styles.message} ${styles[demoMessages[currentIndex].role]}`}>
                <div className={styles.typing}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          {/* Play Button */}
          {!isPlaying && currentIndex === 0 && (
            <div className={styles.playOverlay}>
              <button className={styles.playButton} onClick={playDemo}>
                شغّل العرض
              </button>
            </div>
          )}
          
          {!isPlaying && currentIndex > 0 && (
            <button className={styles.replayButton} onClick={playDemo}>
              إعادة العرض
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
