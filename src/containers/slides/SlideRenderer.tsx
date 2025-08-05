import React, { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useSlideStore } from '../../store/useSlideStore';
import { useSwipe } from '../../hooks/useSwipe';
import {
  WelcomeSlide,
  ReasonSlide,
  WhyYouSlide,
  FunFactsSlide,
  QuestionsSlide,
  CallToActionSlide,
  FinalSlide
} from './SlideComponents';

const SlideRenderer: React.FC = () => {
  const { slides, currentSlideIndex, loadData, nextSlide, prevSlide, isLoading, error } = useSlideStore();

  // Swipe functionality for mobile
  const swipeRef = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[currentSlideIndex];

  const getSlideComponent = (slide: typeof currentSlide, isActive: boolean) => {
    if (!slide) return null;

    const props = { slide, isActive };

    switch (slide.id) {
      case 1:
        return <WelcomeSlide key={slide.id} {...props} />;
      case 2:
        return <ReasonSlide key={slide.id} {...props} />;
      case 3:
        return <WhyYouSlide key={slide.id} {...props} />;
      case 4:
        return <FunFactsSlide key={slide.id} {...props} />;
      case 5:
        return <QuestionsSlide key={slide.id} {...props} />;
      case 6:
        return <CallToActionSlide key={slide.id} {...props} />;
      case 'secret':
        return <CallToActionSlide key={slide.id} {...props} />;
      case 'final':
        return <FinalSlide key={slide.id} {...props} />;
      default:
        return <WelcomeSlide key={slide.id} {...props} />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-warm-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-soft-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="royal-text text-xl text-charcoal">Preparando tu invitación...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-warm-white">
        <div className="text-center royal-card p-8 max-w-md mx-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-deep-burgundy rounded-full flex items-center justify-center">
            <span className="text-xl text-warm-white">⚠️</span>
          </div>
          <h2 className="royal-title text-2xl text-deep-burgundy mb-4">Oops...</h2>
          <p className="royal-text text-charcoal">{error}</p>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-warm-white">
        <p className="royal-text text-xl text-charcoal">No hay slides disponibles</p>
      </div>
    );
  }

  return (
    <div 
      ref={swipeRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentSlide && getSlideComponent(currentSlide, true)}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-warm-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="w-10 h-10 rounded-full bg-antique-gold disabled:bg-gray-300 text-warm-white disabled:text-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
            aria-label="Slide anterior"
          >
            ←
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'bg-antique-gold w-6'
                    : 'bg-gray-300 hover:bg-soft-gold'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="w-10 h-10 rounded-full bg-antique-gold disabled:bg-gray-300 text-warm-white disabled:text-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
            aria-label="Siguiente slide"
          >
            →
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-soft-gold to-antique-gold transition-all duration-500 ease-out"
          style={{
            width: `${((currentSlideIndex + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Touch/Swipe Hints for Mobile */}
      <div className="fixed bottom-20 left-4 text-xs text-gray-400 royal-text md:hidden">
        Desliza o usa las flechas →
      </div>

      {/* Keyboard Shortcuts Hint for Desktop */}
      <div className="fixed bottom-20 right-4 text-xs text-gray-400 royal-text hidden md:block">
        Usa ← → o espacio para navegar
      </div>
    </div>
  );
};

export default SlideRenderer;
