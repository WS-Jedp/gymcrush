import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Slide } from '../../store/useSlideStore';
import { useSlideStore } from '../../store/useSlideStore';

interface ModernSlideProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

export const ModernWelcomeSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pure-white via-pearl-white to-soft-gray overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-champagne/20 to-rose-gold/20 rounded-full blur-3xl"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-accent-blue/10 to-royal-gold/10 rounded-full blur-2xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-royal-gold to-champagne rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="premium-title text-5xl md:text-7xl text-graphite mb-8 tracking-tight"
        >
          {slide.title}
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="premium-card max-w-3xl mx-auto p-8 md:p-12"
        >
          <blockquote className="premium-text text-xl md:text-2xl text-charcoal leading-relaxed mb-8">
            "{slide.quote}"
          </blockquote>

          {slide.subtext && (
            <div className="space-y-6">
              {slide.subtext.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className="premium-text text-lg text-charcoal leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-platinum to-transparent"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ModernReasonSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-gray via-warm-gray to-platinum"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="premium-title text-4xl md:text-5xl text-graphite mb-8 tracking-tight">
              {slide.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="premium-card-dark p-8 md:p-10"
          >
            <blockquote className="premium-text text-xl text-pearl-white leading-relaxed mb-8 border-l-4 border-royal-gold pl-6">
              "{slide.quote}"
            </blockquote>

            {slide.points && (
              <div className="space-y-6">
                {slide.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-2 h-2 bg-royal-gold rounded-full mt-3 flex-shrink-0"></div>
                    <p className="premium-text text-lg text-pearl-white leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Floating decoration */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent-blue/5 to-royal-gold/5 rounded-full blur-3xl -z-10"
          style={{ x }}
        />
      </div>
    </motion.div>
  );
};

export const ModernWhyYouSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne via-warm-gray to-soft-gray"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-midnight-blue to-accent-blue rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl text-pure-white">💫</span>
          </div>
          <h2 className="premium-title text-4xl md:text-5xl text-graphite tracking-tight">
            {slide.title}
          </h2>
        </motion.div>

        {slide.points && (
          <div className="grid gap-6 md:gap-8">
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="premium-card p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-royal-gold to-champagne rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm text-deep-navy font-bold">{index + 1}</span>
                  </div>
                  <p className="premium-text text-lg text-charcoal leading-relaxed">
                    {point}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ModernFunFactsSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pearl-white via-soft-gray to-warm-gray overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="premium-title text-4xl md:text-5xl text-graphite tracking-tight">
            {slide.title}
          </h2>
        </motion.div>

        {slide.points && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {slide.points.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="premium-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-midnight-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-pure-white font-bold">{index + 1}</span>
                  </div>
                  <p className="premium-text text-base text-charcoal leading-relaxed">
                    {fact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ModernQuestionsSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const { horizontalSlideIndex, setHorizontalSlideIndex } = useSlideStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-midnight-blue via-charcoal to-deep-navy overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/20 to-accent-blue/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-royal-gold to-champagne rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="premium-title text-4xl md:text-5xl text-pure-white tracking-tight">
            {slide.title}
          </h2>
          <p className="premium-text text-lg text-pearl-white mt-4 opacity-80">
            Desliza horizontalmente para explorar
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        {slide.questions && (
          <div className="relative">
            <div className="horizontal-scroll horizontal-scroll-snap flex space-x-6 overflow-x-auto pb-4">
              {slide.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="horizontal-scroll-item premium-card-dark min-w-80 max-w-80 p-6 md:p-8 flex-shrink-0"
                  onClick={() => setHorizontalSlideIndex(index)}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 bg-gradient-to-br from-royal-gold to-champagne rounded-full flex items-center justify-center mb-4">
                        <span className="text-sm text-deep-navy font-bold">Q{index + 1}</span>
                      </div>
                      <p className="premium-text text-lg text-pearl-white leading-relaxed">
                        {question}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex space-x-1">
                        {slide.questions!.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              dotIndex === horizontalSlideIndex
                                ? 'bg-royal-gold w-4'
                                : 'bg-platinum/50'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="premium-text text-sm text-pearl-white/60">
                        {index + 1} / {slide.questions?.length || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Horizontal Scroll Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {slide.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHorizontalSlideIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === horizontalSlideIndex
                      ? 'bg-royal-gold scale-125'
                      : 'bg-pearl-white/30 hover:bg-pearl-white/50'
                  }`}
                  aria-label={`Pregunta ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ModernCallToActionSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleAction = (action: string) => {
    if (action === '#contacto') {
      console.log('Contact action triggered');
    } else if (action === '#encuentro-personal') {
      console.log('Personal meeting action triggered');
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-blue via-midnight-blue to-deep-navy"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-royal-gold to-champagne rounded-full flex items-center justify-center shadow-xl">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="premium-title text-4xl md:text-5xl text-pure-white mb-8 tracking-tight">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="premium-card p-8 md:p-12 mb-12"
          >
            <p className="premium-text text-xl md:text-2xl text-charcoal leading-relaxed">
              "{slide.quote}"
            </p>
          </motion.blockquote>
        )}

        {slide.cta && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <button
              onClick={() => handleAction(slide.cta!.action)}
              className={slide.cta.type === 'primary' ? 'premium-button-gold' : 'premium-button-secondary'}
            >
              {slide.cta.label}
            </button>
            
            {slide.id === 'secret' && (
              <p className="premium-text text-sm text-pearl-white/70 mt-4">
                Una experiencia más íntima y personal
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const ModernFinalSlide: React.FC<ModernSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne via-warm-gray to-pearl-white"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-royal-gold/20 to-rose-gold/20 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-accent-blue/15 to-midnight-blue/15 rounded-full blur-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-royal-gold via-champagne to-rose-gold rounded-full flex items-center justify-center shadow-xl">
            <span className="text-4xl">💝</span>
          </div>
          <h2 className="premium-title text-4xl md:text-5xl text-graphite mb-8 tracking-tight">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="premium-card p-8 md:p-12 mb-8"
          >
            <blockquote className="premium-text text-xl md:text-2xl text-charcoal leading-relaxed">
              "{slide.quote}"
            </blockquote>
          </motion.div>
        )}

        {slide.postscript && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="premium-text text-lg text-charcoal/80 leading-relaxed premium-accent font-medium"
          >
            {slide.postscript}
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-royal-gold to-champagne rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
