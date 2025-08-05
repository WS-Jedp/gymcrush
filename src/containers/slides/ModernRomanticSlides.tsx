import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Slide } from '../../store/useSlideStore';
import { useSlideStore } from '../../store/useSlideStore';

interface RomanticSlideProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

// Modern Welcome Slide with Vibrant Colors
export const RomanticWelcomeSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-yellow-400/30 to-transparent rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-cyan-400/40 to-transparent rounded-full blur-2xl"
          style={{ y: y2 }}
        />
        
        {/* Floating Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content with Editorial Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
        {/* Header Section */}
        <motion.div
          style={{ y: y1 }}
          className="text-center mb-8"
        >
          {/* Crown Icon */}
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            whileInView={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">👑</span>
            </div>
          </motion.div>

          {/* Title with Modern Typography */}
          <h1 className="text-6xl md:text-8xl font-black leading-none text-white mb-6">
            {slide.title.split(" ").map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: wordIndex * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Quote Section with Modern Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-white leading-tight mb-8">
            "{slide.quote}"
          </blockquote>

          {slide.subtext && (
            <div className="space-y-4">
              {slide.subtext.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + index * 0.1,
                  }}
                  className="text-lg text-white/90 max-w-2xl mx-auto"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            className="w-1 h-12 bg-white/60 rounded-full"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Modern Reason Slide with Split Layout
export const RomanticReasonSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500"
    >
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 border border-white/30 rounded-full"
        style={{ y: y1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="w-full max-w-6xl mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Left Side - Title */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col justify-center"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black text-white leading-tight"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              La Razón
              <span className="block text-yellow-300">de Todo Esto</span>
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 mt-6"
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed border-l-4 border-yellow-400 pl-6">
              "{slide.quote}"
            </blockquote>

            {slide.points && (
              <div className="space-y-4">
                {slide.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.4 + index * 0.1,
                    }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg text-white/90 leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Modern Why You Slide with Vertical Layout
export const RomanticWhyYouSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">💫</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            {slide.title}
          </h2>
          
          <p className="text-lg text-white/80 italic">
            (en serio, esto es importante)
          </p>
        </motion.div>

        {/* Points with Modern Layout */}
        {slide.points && (
          <div className="space-y-6">
            {slide.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                }}
                className="flex items-start space-x-6 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {index + 1}
                </div>
                
                <p className="text-lg md:text-xl text-white leading-relaxed">
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

// Modern Fun Facts with Grid Layout
export const RomanticFunFactsSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex flex-col justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-white/20 rounded-full"
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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
            {slide.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            {slide.points.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                }}
                className="p-4 bg-white/15 backdrop-blur-lg rounded-xl border border-white/20 flex items-center space-x-4"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  {index + 1}
                </div>
                
                <p className="text-base text-white leading-relaxed">
                  {fact}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Modern Questions with Horizontal Scroll
export const RomanticQuestionsSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const { horizontalSlideIndex, setHorizontalSlideIndex } = useSlideStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex flex-col justify-center bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-800"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
            {slide.title}
          </h2>
          <p className="text-lg text-gray-300">
            Desliza horizontalmente para explorar
          </p>
        </motion.div>

        {/* Horizontal Questions */}
        {slide.questions && slide.questions.length > 0 && (
          <div className="relative">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {slide.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="min-w-[280px] max-w-[320px] p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-white/20 flex-shrink-0 cursor-pointer"
                  onClick={() => setHorizontalSlideIndex(index)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-base text-white leading-relaxed">
                        {question}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slide.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHorizontalSlideIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === horizontalSlideIndex
                      ? 'bg-purple-500 w-6'
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Modern Call to Action
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
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600"
    >
      <div className="w-full max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            "{slide.quote}"
          </motion.blockquote>
        )}

        {slide.cta && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => handleAction(slide.cta!.action)}
              className={`px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 ${
                slide.cta.type === 'primary' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105 shadow-2xl' 
                  : 'bg-white/20 backdrop-blur-lg text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              {slide.cta.label}
            </button>
            
            {slide.id === 'secret' && (
              <p className="text-sm text-white/70 mt-4">
                Una experiencia más íntima y personal
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Modern Final Slide
export const RomanticFinalSlide: React.FC<RomanticSlideProps> = ({ slide }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
    >
      {/* Floating Hearts */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + i * 12}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
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

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">👑</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            {slide.title}
          </h2>
        </motion.div>

        {slide.quote && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
              "{slide.quote}"
            </blockquote>
          </motion.div>
        )}

        {slide.postscript && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/80 leading-relaxed mb-8"
          >
            {slide.postscript}
          </motion.p>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8"
        >
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <p className="text-sm text-white/60">
            Con todo mi respeto y admiración,<br />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
