import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Slide } from '../../store/useSlideStore';
import { useSlideStore } from '../../store/useSlideStore';

interface RomanticSlideProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

// Romantic Welcome with Parallax and Royal Styling
export const RomanticWelcomeSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.98, 1.02]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.7, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Romantic Background with Floating Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-champagne via-pearl-white to-warm-gray">
        <motion.div
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-rose-gold/20 to-transparent rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-royal-gold/15 to-transparent rounded-full blur-2xl"
          style={{ y: y2 }}
        />
        
        {/* Floating Rose Petals Effect */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-rose-gold/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content with Editorial Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.article 
          style={{ y: y1, scale }}
          className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center"
        >
          {/* Royal Crown Icon */}
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-royal-gold via-champagne to-rose-gold rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-4xl">👑</span>
            </div>
          </motion.div>

          {/* Knightly Title */}
          <div className="mb-12 overflow-hidden">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-graphite">
              {slide.title.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block mr-4"
                  initial={{ opacity: 0, y: 60, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: wordIndex * 0.15,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mx-auto h-1 bg-gradient-to-r from-royal-gold to-rose-gold mb-8"
          />

          {/* Romantic Quote with Royal Styling */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="premium-card backdrop-blur-lg bg-white/80 p-8 md:p-12 rounded-2xl border border-royal-gold/20"
          >
            <blockquote className="text-xl md:text-2xl text-charcoal leading-relaxed mb-6 font-serif italic">
              "{slide.quote}"
            </blockquote>

            {slide.subtext && (
              <div className="space-y-6">
                {slide.subtext.map((text, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.15,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="text-lg text-charcoal/80 leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            )}
          </motion.div>

        </motion.article>
      </div>
    </motion.div>
  );
};

// Romantic Reason Slide with Sophisticated Animations
export const RomanticReasonSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-gray via-warm-gray to-champagne"
    >
      {/* Floating Geometric Elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-royal-gold/30 rounded-full"
        style={{ y: y1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Title Section */}
        <motion.div
          style={{ y: y1 }}
          className="lg:col-span-5"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-graphite overflow-hidden"
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="block"
            >
              La Razón
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="block text-royal-gold"
            >
              de Todo Esto
            </motion.span>
          </motion.h2>

          {/* Decorative Element */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-royal-gold to-rose-gold mb-8"
          />
        </motion.div>

        {/* Content Card */}
        <motion.div
          style={{ y: y2 }}
          className="lg:col-span-7"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="premium-card-dark backdrop-blur-lg bg-graphite/90 p-8 md:p-12 rounded-2xl border border-royal-gold/20"
          >
            {/* Quote with Elegant Border */}
            <div className="border-l-4 border-royal-gold pl-6 mb-8">
              <blockquote className="text-xl md:text-2xl text-pearl-white leading-relaxed font-serif italic">
                "{slide.quote}"
              </blockquote>
            </div>

            {/* Points with Staggered Animation */}
            {slide.points && (
              <div className="space-y-6">
                {slide.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + index * 0.2,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      className="w-3 h-3 bg-gradient-to-br from-royal-gold to-rose-gold rounded-full mt-2 flex-shrink-0"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    />
                    <p className="text-lg text-pearl-white leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Parallax Element */}
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-radial from-royal-gold/10 to-transparent rounded-full blur-3xl"
        style={{ y: y1 }}
      />
    </motion.div>
  );
};

// Why You Slide with Royal Card Layout
export const RomanticWhyYouSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne via-warm-gray to-pearl-white"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Title with Royal Crown */}
        <motion.div
          style={{ y }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-midnight-blue to-royal-gold rounded-full flex items-center justify-center shadow-xl"
          >
            <span className="text-2xl text-pure-white">💫</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-graphite mb-4 overflow-hidden">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="block"
            >
              {slide.title}
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-charcoal/70 font-serif italic"
          >
            (en serio, esto es importante)
          </motion.p>
        </motion.div>

        {/* Points Grid with Royal Cards */}
        {slide.points && (
          <div className="grid gap-8 md:gap-10">
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="premium-card backdrop-blur-lg bg-white/70 p-6 md:p-8 rounded-2xl border border-royal-gold/20 shadow-lg group"
              >
                <div className="flex items-start space-x-6">
                  {/* Elegant Number */}
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-royal-gold to-rose-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    whileInView={{ rotate: [0, 360] }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  >
                    <span className="text-lg text-deep-navy font-bold">{index + 1}</span>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <motion.p 
                      className="text-lg md:text-xl text-charcoal leading-relaxed"
                    >
                      {point}
                    </motion.p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  className="mt-4 h-px bg-gradient-to-r from-royal-gold via-rose-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: index * 0.3 + 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const RomanticFunFactsSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pearl-white via-soft-gray to-champagne overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-royal-gold/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Title Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-graphite mb-4">
            {slide.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
        </motion.div>

        {/* Facts Grid */}
        {slide.points && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {slide.points.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="premium-card backdrop-blur-lg bg-white/80 p-6 rounded-2xl border border-royal-gold/20 shadow-lg group cursor-pointer h-full"
                style={{ perspective: "1000px" }}
              >
                <div className="flex items-start space-x-4">
                  {/* Animated Number Badge */}
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-midnight-blue to-royal-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-sm text-pure-white font-bold">{index + 1}</span>
                  </motion.div>
                  
                  {/* Fact Content */}
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-charcoal leading-relaxed group-hover:text-midnight-blue transition-colors duration-300">
                      {fact}
                    </p>
                  </div>
                </div>

                {/* Hover Decoration */}
                <motion.div
                  className="mt-4 h-px bg-gradient-to-r from-royal-gold to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Questions Slide with Horizontal Scroll
export const RomanticQuestionsSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const { horizontalSlideIndex, setHorizontalSlideIndex } = useSlideStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-midnight-blue via-charcoal to-deep-navy overflow-hidden"
    >
      {/* Romantic Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/30 to-rose-gold/30"></div>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border border-royal-gold/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + (i % 2) * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        {/* Title Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-royal-gold to-rose-gold rounded-full flex items-center justify-center shadow-xl">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-pure-white mb-4">
            {slide.title}
          </h2>
       
        </motion.div>

        {/* Horizontal Scroll Container */}
        {slide.questions && slide.questions.length > 0 && (
          <div className="relative">
            <div className="horizontal-scroll horizontal-scroll-snap flex space-x-6 overflow-x-auto pb-4">
              {slide.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="horizontal-scroll-item premium-card-dark min-w-[320px] max-w-[400px] p-6 md:p-8 flex-shrink-0 cursor-pointer"
                  onClick={() => setHorizontalSlideIndex(index)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 bg-gradient-to-br from-royal-gold to-rose-gold rounded-full flex items-center justify-center mb-6">
                        <span className="text-sm text-deep-navy font-bold">Q{index + 1}</span>
                      </div>
                      <p className="text-base md:text-lg text-pearl-white leading-relaxed font-serif min-h-[60px] flex items-center">
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
                                : 'bg-pearl-white/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-pearl-white/60 font-serif italic">
                        {index + 1} / {slide.questions!.length}
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

export const RomanticCallToActionSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-gold via-champagne to-rose-gold overflow-hidden"
    >
      {/* Romantic Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-midnight-blue/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-midnight-blue to-deep-navy rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-8">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="premium-card backdrop-blur-lg bg-white/80 p-8 md:p-12 mb-12 rounded-2xl border border-midnight-blue/20"
          >
            <p className="text-xl md:text-2xl text-charcoal leading-relaxed font-serif italic">
              "{slide.quote}"
            </p>
          </motion.blockquote>
        )}

        {slide.cta && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <button
              onClick={() => handleAction(slide.cta!.action)}
              className={slide.cta.type === 'primary' ? 'premium-button-gold' : 'premium-button-secondary'}
            >
              {slide.cta.label}
            </button>
            
            {slide.id === 'secret' && (
              <p className="text-sm text-charcoal/70 mt-4 font-serif italic">
                Una experiencia más íntima y personal
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const RomanticFinalSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-champagne via-warm-gray to-pearl-white overflow-hidden"
    >
      {/* Floating romantic elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-royal-gold/20 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-radial from-rose-gold/15 to-transparent rounded-full blur-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Hearts */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${25 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💝
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="mb-8"
        >
          <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-royal-gold via-champagne to-rose-gold rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-4xl">👑</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-8">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="premium-card backdrop-blur-lg bg-white/80 p-8 md:p-12 mb-8 rounded-2xl border border-royal-gold/20"
          >
            <blockquote className="text-xl md:text-2xl text-charcoal leading-relaxed font-serif italic">
              "{slide.quote}"
            </blockquote>
          </motion.div>
        )}

        {slide.postscript && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-charcoal/80 leading-relaxed font-serif italic mb-8"
          >
            {slide.postscript}
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-royal-gold to-rose-gold rounded-full"
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-sm text-charcoal/60 mt-4 font-serif italic"
          >
            Con todo mi respeto y admiración,<br />
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};
