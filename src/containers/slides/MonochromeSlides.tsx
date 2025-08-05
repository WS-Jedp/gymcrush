import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Slide } from '../../store/useSlideStore';
import { useSlideStore } from '../../store/useSlideStore';

interface MonochromeSlideProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

// Monochrome Welcome Slide with Letter Paper Texture
export const RomanticWelcomeSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-pure-white letter-paper"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/3 w-64 h-64 bg-black/5 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-black/3 rounded-full blur-2xl"
          style={{ y: y2 }}
        />
        
        {/* Floating Dots */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 h-full flex flex-col justify-center">
        {/* Header Section */}
        <motion.div
          style={{ y: y1 }}
          className="text-center mb-12"
        >
          {/* Crown Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto bg-charcoal rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl text-pure-white">👑</span>
            </div>
          </motion.div>

          {/* Title with Elegant Typography */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-deep-black mb-8 premium-title">
            {slide.title.split(" ").map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: wordIndex * 0.15,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto h-px bg-charcoal mb-8"
          />
        </motion.div>

        {/* Quote Section */}
        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="premium-card p-8 md:p-12 max-w-3xl mx-auto"
        >
          <blockquote className="text-xl md:text-2xl text-charcoal leading-relaxed mb-6 font-serif italic text-center">
            "{slide.quote}"
          </blockquote>

          {slide.subtext && (
            <div className="space-y-6">
              {slide.subtext.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.7 + index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="text-lg text-dark-gray leading-relaxed text-center premium-text"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Monochrome Reason Slide with Dark Background
export const RomanticReasonSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center bg-deep-black paper-texture"
    >
      {/* Subtle Background Elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-white/20 rounded-full"
        style={{ y: y1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        {/* Title Section */}
        <motion.div
          style={{ y: y1 }}
          className="lg:col-span-5"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-pure-white premium-title"
          >
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="block"
            >
              La Razón
            </motion.span>
            <motion.span
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="block text-medium-gray"
            >
              de Todo Esto
            </motion.span>
          </motion.h2>

          {/* Decorative Element */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-white mb-8"
          />
        </motion.div>

        {/* Content Card */}
        <motion.div
          style={{ y: y2 }}
          className="lg:col-span-7"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="premium-card-dark p-8 md:p-12"
          >
            {/* Quote with Elegant Border */}
            <div className="border-l-2 border-white pl-6 mb-8">
              <blockquote className="text-xl md:text-2xl text-pure-white leading-relaxed font-serif italic">
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
                      className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"
                      whileInView={{ scale: [0, 1.5, 1] }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    />
                    <p className="text-lg text-light-gray leading-relaxed premium-text">
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
        className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
        style={{ y: y1 }}
      />
    </motion.div>
  );
};

// Why You Slide with White Background and Professional Layout
export const RomanticWhyYouSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.99]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative h-screen flex items-center justify-center bg-light-gray letter-paper"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-8 h-full flex flex-col justify-center">
        {/* Title with Professional Icon */}
        <motion.div
          style={{ y }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-8 bg-charcoal rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-xl text-pure-white">💫</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-deep-black mb-4 premium-title">
            <motion.span
              initial={{ y: 60, opacity: 0 }}
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
            className="text-xl text-dark-gray font-serif italic"
          >
            (en serio, esto es importante)
          </motion.p>
        </motion.div>

        {/* Points List with Professional Cards */}
        {slide.points && (
          <div className="space-y-6">
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                whileHover={{ y: -2 }}
                className="premium-card p-6 md:p-8 group cursor-pointer"
              >
                <div className="flex items-start space-x-6">
                  {/* Number */}
                  <motion.div
                    className="w-10 h-10 bg-deep-black text-pure-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    whileInView={{ rotate: [0, 360] }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-charcoal leading-relaxed premium-text">
                      {point}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  className="mt-4 h-px bg-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.3 + 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Fun Facts with Dark Background
export const RomanticFunFactsSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center bg-charcoal paper-texture overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-white/10 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20 h-full flex flex-col justify-center">
        {/* Title Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-pure-white mb-4 premium-title">
            {slide.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slide.points.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="premium-card-dark p-6 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  {/* Number Badge */}
                  <motion.div
                    className="w-8 h-8 bg-pure-white text-deep-black rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Fact Content */}
                  <p className="text-base md:text-lg text-light-gray leading-relaxed group-hover:text-pure-white transition-colors duration-300 premium-text">
                    {fact}
                  </p>
                </div>

                {/* Hover Decoration */}
                <motion.div
                  className="mt-4 h-px bg-white opacity-0 group-hover:opacity-100"
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

// Questions Slide with Horizontal Scroll - White Background
export const RomanticQuestionsSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const { horizontalSlideIndex, setHorizontalSlideIndex } = useSlideStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center bg-pure-white letter-paper overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 border border-charcoal rounded-full"
            style={{
              left: `${25 + i * 20}%`,
              top: `${30 + (i % 2) * 25}%`,
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-20 h-full flex flex-col justify-center">
        {/* Title Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-charcoal rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl text-pure-white">❓</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-black mb-4 premium-title">
            {slide.title}
          </h2>
        </motion.div>

        {/* Horizontal Scroll Container */}
        {slide.questions && (
          <div className="relative">
            <div className="horizontal-scroll horizontal-scroll-snap flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {slide.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="horizontal-scroll-item premium-card min-w-80 max-w-80 p-6 md:p-8 flex-shrink-0 cursor-pointer"
                  onClick={() => setHorizontalSlideIndex(index)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 bg-deep-black text-pure-white rounded-full flex items-center justify-center mb-6 font-bold text-xs">
                        Q{index + 1}
                      </div>
                      <p className="text-lg text-charcoal leading-relaxed font-serif premium-text">
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
                                ? 'bg-charcoal w-4'
                                : 'bg-medium-gray'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-dark-gray font-serif italic">
                        {index + 1} / {slide?.questions?.length}
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
                      ? 'bg-charcoal scale-125'
                      : 'bg-medium-gray hover:bg-dark-gray'
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

// Call to Action with Dark Background
export const RomanticCallToActionSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
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
      className="relative h-screen flex items-center justify-center bg-deep-black paper-texture overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white/3 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.1, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center h-full flex flex-col justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-pure-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl text-deep-black">🤝</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-pure-white mb-8 premium-title">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="premium-card-dark p-8 md:p-12 mb-12"
          >
            <p className="text-xl md:text-2xl text-light-gray leading-relaxed font-serif italic">
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
              <p className="text-sm text-medium-gray mt-4 font-serif italic">
                Una experiencia más íntima y personal
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Final Slide with White Background
export const RomanticFinalSlide: React.FC<MonochromeSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center bg-light-gray letter-paper overflow-hidden"
    >
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-black/5 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 8, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-black/3 rounded-full blur-2xl"
          animate={{
            y: [0, 12, 0],
            x: [0, -6, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Dots */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg opacity-20"
            style={{
              left: `${30 + i * 25}%`,
              top: `${35 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💝
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center h-full flex flex-col justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-charcoal rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl text-pure-white">👑</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-deep-black mb-8 premium-title">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="premium-card p-8 md:p-12 mb-8"
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
            className="text-lg text-dark-gray leading-relaxed font-serif italic mb-8 premium-text"
          >
            {slide.postscript}
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-charcoal rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
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
            className="text-sm text-dark-gray mt-4 font-serif italic"
          >
            Con todo mi respeto y admiración,<br />
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};
