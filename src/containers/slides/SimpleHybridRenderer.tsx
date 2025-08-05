import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { useSlideStore } from '../../store/useSlideStore';
import { 
  ModernWelcomeSlide, 
  ModernReasonSlide, 
  ModernWhyYouSlide, 
  ModernFunFactsSlide,
  ModernQuestionsSlide, 
  ModernCallToActionSlide, 
  ModernFinalSlide 
} from './ModernSlideComponents';

const SimpleHybridRenderer: React.FC = () => {
  const { slides, currentSlideIndex, loadData, isLoading, error, goToSlide } = useSlideStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Enhanced navigation with smooth scrolling
  const navigateToSlide = useCallback((targetIndex: number) => {
    if (containerRef.current && targetIndex >= 0 && targetIndex < slides.length) {
      const slideHeight = window.innerHeight;
      const targetY = targetIndex * slideHeight;
      containerRef.current.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [slides.length]);

  // Handle scroll events manually
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const slideHeight = window.innerHeight;
    const totalHeight = slideHeight * slides.length;
    const progress = totalHeight > 0 ? scrollTop / (totalHeight - slideHeight) : 0;
    
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
    
    // Update current slide based on scroll position
    const newIndex = Math.round(scrollTop / slideHeight);
    if (newIndex !== currentSlideIndex && newIndex >= 0 && newIndex < slides.length) {
      goToSlide(newIndex);
    }
  }, [slides.length, currentSlideIndex, goToSlide]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        if (currentSlideIndex < slides.length - 1) {
          navigateToSlide(currentSlideIndex + 1);
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentSlideIndex > 0) {
          navigateToSlide(currentSlideIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length, navigateToSlide]);

  const getSlideComponent = (slide: typeof slides[0], index: number) => {
    if (!slide) return null;

    const isActive = index === currentSlideIndex;
    const props = { slide, isActive, index };

    switch (slide.id) {
      case 1:
        return <ModernWelcomeSlide key={slide.id} {...props} />;
      case 2:
        return <ModernReasonSlide key={slide.id} {...props} />;
      case 3:
        return <ModernWhyYouSlide key={slide.id} {...props} />;
      case 4:
        return <ModernFunFactsSlide key={slide.id} {...props} />;
      case 5:
        return <ModernQuestionsSlide key={slide.id} {...props} />;
      case 6:
        return <ModernCallToActionSlide key={slide.id} {...props} />;
      case 'secret':
        return <ModernCallToActionSlide key={slide.id} {...props} />;
      case 'final':
        return <ModernFinalSlide key={slide.id} {...props} />;
      default:
        return <ModernWelcomeSlide key={slide.id} {...props} />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-pure-white">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6">
            <div className="w-full h-full border-4 border-soft-gray border-t-accent-blue rounded-full animate-spin"></div>
          </div>
          <h2 className="premium-subtitle text-2xl text-graphite mb-2">Preparando tu invitación</h2>
          <p className="premium-text text-charcoal">Creando una experiencia única...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-pure-white">
        <div className="text-center premium-card p-8 max-w-md mx-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-gold to-champagne rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="premium-title text-2xl text-graphite mb-4">Algo salió mal</h2>
          <p className="premium-text text-charcoal">{error}</p>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-pure-white">
        <p className="premium-text text-xl text-charcoal">No hay contenido disponible</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-soft-gray z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue to-royal-gold origin-left"
          style={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Side Navigation Dots */}
      <div className="scroll-indicator hidden md:flex">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className={`scroll-dot ${index === currentSlideIndex ? 'active' : ''}`}
            aria-label={`Ir a sección ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-h-screen w-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            {getSlideComponent(slide, index)}
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="glass-effect rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <span className="premium-text text-sm text-graphite font-medium">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <div className="flex space-x-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigateToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlideIndex
                      ? 'bg-accent-blue w-4'
                      : 'bg-platinum hover:bg-royal-gold'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center md:hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: currentSlideIndex === 0 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-effect rounded-full px-4 py-2">
          <p className="premium-text text-xs text-charcoal">Desliza hacia arriba</p>
          <motion.div
            className="w-1 h-4 mx-auto mt-1 bg-accent-blue rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SimpleHybridRenderer;
