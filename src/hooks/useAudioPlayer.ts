import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioConfig {
  src: string;
  loop: {
    start: number;
    end: number;
  };
}

export const useAudioPlayer = (audioConfig?: AudioConfig, isEnabled: boolean = true, shouldAutoPlay: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [hasAutoPlayTriggered, setHasAutoPlayTriggered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (audioConfig?.src && isEnabled) {
      setIsLoading(true);
      
      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio();
      audio.preload = 'auto';
      audio.volume = 0.6; // Set volume to 60%
      audio.crossOrigin = 'anonymous'; // For CORS if needed
      
      audio.addEventListener('loadeddata', () => {
        setIsLoading(false);
      });

      audio.addEventListener('error', (error) => {
        setIsLoading(false);
        console.warn(`Failed to load audio: ${audioConfig.src}`, error);
      });

      audio.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });

      // Set source after all listeners are attached
      audio.src = audioConfig.src;
      audioRef.current = audio;

      return () => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      };
    }
  }, [audioConfig?.src, isEnabled]);

  // Handle loop timing
  useEffect(() => {
    if (audioRef.current && audioConfig && isPlaying && hasUserInteracted) {
      const audio = audioRef.current;
      
      // Monitor playback and loop
      const checkTime = () => {
        if (audio.currentTime >= audioConfig.loop.end) {
          audio.currentTime = audioConfig.loop.start;
        }
        setCurrentTime(audio.currentTime);
      };

      intervalRef.current = setInterval(checkTime, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [audioConfig, isPlaying, hasUserInteracted]);

  const enableAudio = useCallback(() => {
    setHasUserInteracted(true);
  }, []);

  const play = useCallback(async () => {
    if (audioRef.current && audioConfig && !isLoading && hasUserInteracted) {
      try {
        audioRef.current.currentTime = audioConfig.loop.start;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Failed to play audio:', error);
        setIsPlaying(false);
      }
    }
  }, [audioConfig, isLoading, hasUserInteracted]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const toggle = useCallback(() => {
    if (!hasUserInteracted) {
      enableAudio();
      return;
    }
    
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause, hasUserInteracted, enableAudio]);

  // Auto-pause when component unmounts or audio config changes
  useEffect(() => {
    return () => {
      pause();
    };
  }, [pause]);

  // Force immediate autoplay when shouldAutoPlay becomes true
  useEffect(() => {
    if (shouldAutoPlay && audioConfig && !isLoading && isEnabled && !hasAutoPlayTriggered) {
      setHasAutoPlayTriggered(true);
      setHasUserInteracted(true);
      
      // Force play immediately after user interaction
      const startAudio = async () => {
        if (audioRef.current) {
          try {
            audioRef.current.currentTime = audioConfig.loop.start;
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.warn('Failed to auto-play audio:', error);
            setIsPlaying(false);
          }
        }
      };

      // Small delay to ensure audio element is ready
      const timer = setTimeout(startAudio, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoPlay, audioConfig, isLoading, isEnabled, hasAutoPlayTriggered]);

  // Auto-play when audio config changes for subsequent slides
  useEffect(() => {
    if (hasUserInteracted && audioConfig && !isLoading && isEnabled && shouldAutoPlay && hasAutoPlayTriggered && !isPlaying) {
      const timer = setTimeout(() => {
        play();
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [audioConfig, hasUserInteracted, isLoading, isEnabled, shouldAutoPlay, hasAutoPlayTriggered, isPlaying, play]);

  return {
    isPlaying,
    isLoading,
    currentTime,
    hasUserInteracted,
    play,
    pause,
    toggle,
    enableAudio,
    canPlay: !!audioConfig && !isLoading && isEnabled
  };
};
