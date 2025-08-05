import React from 'react';
import { motion } from 'motion/react';
import type { Slide } from '../../store/useSlideStore';

interface SlideComponentProps {
  slide: Slide;
  isActive: boolean;
}

export const WelcomeSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-warm-white to-parchment px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto text-center royal-card p-8 md:p-12 rounded-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-soft-gold rounded-full flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="royal-title text-4xl md:text-5xl text-deep-burgundy mb-6">
            {slide.title}
          </h1>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="royal-text text-lg md:text-xl text-charcoal mb-8 italic leading-relaxed"
        >
          "{slide.quote}"
        </motion.blockquote>

        {slide.subtext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-y-4"
          >
            {slide.subtext.map((text, index) => (
              <p key={index} className="royal-text text-base md:text-lg text-royal-navy leading-relaxed">
                {text}
              </p>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8"
        >
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-soft-gold to-transparent opacity-50"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ReasonSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-parchment to-royal-cream px-6"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="royal-title text-3xl md:text-4xl text-deep-burgundy mb-8 text-center"
        >
          {slide.title}
        </motion.h2>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="royal-text text-lg md:text-xl text-charcoal mb-8 italic leading-relaxed border-l-4 border-soft-gold pl-6"
        >
          "{slide.quote}"
        </motion.blockquote>

        {slide.points && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4"
          >
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-antique-gold rounded-full mt-3 flex-shrink-0"></div>
                <p className="royal-text text-base md:text-lg text-royal-navy leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const WhyYouSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-royal-cream to-warm-white px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-soft-gold to-antique-gold rounded-full flex items-center justify-center">
            <span className="text-xl text-warm-white">💫</span>
          </div>
          <h2 className="royal-title text-3xl md:text-4xl text-deep-burgundy">
            {slide.title}
          </h2>
        </motion.div>

        {slide.points && (
          <div className="space-y-6">
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.3, duration: 0.6 }}
                className="royal-border p-4 rounded bg-gradient-to-r from-warm-white to-parchment"
              >
                <p className="royal-text text-base md:text-lg text-charcoal leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const FunFactsSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sage-green to-parchment px-6 overflow-y-auto"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg my-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="royal-title text-3xl md:text-4xl text-deep-burgundy">
            {slide.title}
          </h2>
        </motion.div>

        {slide.points && (
          <div className="grid gap-4 md:gap-6">
            {slide.points.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="royal-border p-4 rounded bg-warm-white hover:bg-parchment transition-colors duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-muted-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm text-warm-white font-bold">{index + 1}</span>
                  </div>
                  <p className="royal-text text-base md:text-lg text-charcoal leading-relaxed">
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

export const QuestionsSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-muted-purple to-royal-cream px-6 overflow-y-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg my-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-deep-burgundy rounded-full flex items-center justify-center">
            <span className="text-xl text-warm-white">❓</span>
          </div>
          <h2 className="royal-title text-3xl md:text-4xl text-deep-burgundy">
            {slide.title}
          </h2>
        </motion.div>

        {slide.questions && (
          <div className="space-y-4">
            {slide.questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="royal-border p-4 rounded bg-gradient-to-r from-warm-white to-royal-cream hover:from-parchment hover:to-warm-white transition-all duration-300 cursor-pointer"
              >
                <p className="royal-text text-base md:text-lg text-charcoal leading-relaxed">
                  <span className="royal-accent font-semibold">Q{index + 1}:</span> {question}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const CallToActionSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  const handleAction = (action: string) => {
    if (action === '#contacto') {
      // Scroll to contact section or handle contact action
      console.log('Contact action triggered');
    } else if (action === '#encuentro-personal') {
      // Handle personal meeting action
      console.log('Personal meeting action triggered');
    }
  };

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-deep-burgundy to-royal-navy px-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-soft-gold rounded-full flex items-center justify-center">
            <span className="text-2xl">🤝</span>
          </div>
          <h2 className="royal-title text-3xl md:text-4xl text-deep-burgundy mb-6">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="royal-text text-lg md:text-xl text-charcoal mb-8 italic leading-relaxed"
          >
            "{slide.quote}"
          </motion.blockquote>
        )}

        {slide.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              onClick={() => handleAction(slide.cta!.action)}
              className={slide.cta.type === 'primary' ? 'royal-button' : 'royal-button-secondary'}
            >
              {slide.cta.label}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const FinalSlide: React.FC<SlideComponentProps> = ({ slide, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-warm-white via-parchment to-royal-cream px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="max-w-2xl mx-auto royal-card p-8 md:p-12 rounded-lg text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-soft-gold to-antique-gold rounded-full flex items-center justify-center">
            <span className="text-3xl">💝</span>
          </div>
          <h2 className="royal-title text-3xl md:text-4xl text-deep-burgundy mb-6">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="royal-text text-lg md:text-xl text-charcoal mb-8 italic leading-relaxed"
          >
            "{slide.quote}"
          </motion.blockquote>
        )}

        {slide.postscript && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="royal-text text-base md:text-lg text-royal-navy leading-relaxed royal-accent"
          >
            {slide.postscript}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-soft-gold rounded-full"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
