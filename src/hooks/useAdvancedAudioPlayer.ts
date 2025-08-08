import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioConfig {
  src: string;
  loop: {
    start: number;
    end: number;
  };
}

export const useAdvancedAudioPlayer = (audioConfig?: AudioConfig, isEnabled: boolean = true, shouldAutoPlay: boolean = false) => {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const nextAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [hasAutoPlayTriggered, setHasAutoPlayTriggered] = useState(false);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null);
  
  const intervalRef = useRef<number | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Fade audio in or out
  const fadeAudio = useCallback((audio: HTMLAudioElement, direction: 'in' | 'out', duration: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
      const startVolume = direction === 'in' ? 0 : audio.volume;
      const endVolume = direction === 'in' ? 0.6 : 0;
      const steps = 20;
      const stepDuration = duration / steps;
      const volumeStep = (endVolume - startVolume) / steps;
      let currentStep = 0;

      if (direction === 'in') {
        audio.volume = 0;
      }

      const fadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = startVolume + (volumeStep * currentStep);
        audio.volume = Math.max(0, Math.min(0.6, newVolume));

        if (currentStep >= steps) {
          audio.volume = endVolume;
          clearInterval(fadeInterval);
          resolve();
        }
      }, stepDuration);
    });
  }, []);

  // Create and prepare audio element
  const createAudioElement = useCallback((src: string): HTMLAudioElement => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0;
    audio.crossOrigin = 'anonymous';
    audio.src = src;
    return audio;
  }, []);

  // Start audio playback with fade-in
  const startAudio = useCallback(async (audio: HTMLAudioElement, config: AudioConfig) => {
    try {
      audio.currentTime = config.loop.start;
      await audio.play();
      await fadeAudio(audio, 'in', 800);
      setIsPlaying(true);
    } catch (error) {
      console.warn('Failed to start audio:', error);
      setIsPlaying(false);
    }
  }, [fadeAudio]);

  // Stop audio playback with fade-out
  const stopAudio = useCallback(async (audio: HTMLAudioElement) => {
    try {
      await fadeAudio(audio, 'out', 600);
      audio.pause();
      audio.currentTime = 0;
    } catch (error) {
      console.warn('Failed to stop audio:', error);
      audio.pause();
    }
  }, [fadeAudio]);

  // Handle smooth transition between audio tracks
  const transitionToNewAudio = useCallback(async (newConfig: AudioConfig) => {
    if (currentAudioRef.current && currentAudioSrc === newConfig.src) {
      return; // Same audio, no need to transition
    }

    setIsTransitioning(true);
    setIsLoading(true);

    // Prepare new audio
    const newAudio = createAudioElement(newConfig.src);
    
    // Wait for new audio to be ready
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Audio load timeout')), 10000);
      
      newAudio.addEventListener('canplaythrough', () => {
        clearTimeout(timeout);
        resolve();
      });
      
      newAudio.addEventListener('error', () => {
        clearTimeout(timeout);
        reject(new Error('Audio load failed'));
      });
    });

    nextAudioRef.current = newAudio;

    // If there's current audio playing, fade it out
    if (currentAudioRef.current && isPlaying) {
      await stopAudio(currentAudioRef.current);
    }

    // Switch to new audio
    currentAudioRef.current = newAudio;
    setCurrentAudioSrc(newConfig.src);
    setIsLoading(false);

    // Start new audio if should be playing
    if (hasUserInteracted && shouldAutoPlay) {
      await startAudio(newAudio, newConfig);
    }

    setIsTransitioning(false);
  }, [currentAudioSrc, createAudioElement, stopAudio, startAudio, isPlaying, hasUserInteracted, shouldAutoPlay]);

  // Initialize or change audio when config changes
  useEffect(() => {
    if (audioConfig?.src && isEnabled) {
      transitionToNewAudio(audioConfig);
    }
  }, [audioConfig?.src, isEnabled, transitionToNewAudio, audioConfig]);

  // Handle loop timing for current audio
  useEffect(() => {
    if (currentAudioRef.current && audioConfig && isPlaying && !isTransitioning) {
      const audio = currentAudioRef.current;
      
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
  }, [audioConfig, isPlaying, isTransitioning]);

  // Force immediate autoplay when shouldAutoPlay becomes true
  useEffect(() => {
    if (shouldAutoPlay && audioConfig && !isLoading && isEnabled && !hasAutoPlayTriggered && !isTransitioning) {
      setHasAutoPlayTriggered(true);
      setHasUserInteracted(true);
      
      const timer = setTimeout(async () => {
        if (currentAudioRef.current) {
          await startAudio(currentAudioRef.current, audioConfig);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [shouldAutoPlay, audioConfig, isLoading, isEnabled, hasAutoPlayTriggered, isTransitioning, startAudio]);

  // Play function
  const play = useCallback(async () => {
    if (currentAudioRef.current && audioConfig && !isLoading && hasUserInteracted && !isTransitioning) {
      await startAudio(currentAudioRef.current, audioConfig);
    }
  }, [audioConfig, isLoading, hasUserInteracted, isTransitioning, startAudio]);

  // Pause function
  const pause = useCallback(async () => {
    if (currentAudioRef.current && !isTransitioning) {
      await stopAudio(currentAudioRef.current);
      setIsPlaying(false);
    }
  }, [isTransitioning, stopAudio]);

  // Toggle function
  const toggle = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      return;
    }
    
    if (isPlaying && !isTransitioning) {
      pause();
    } else if (!isTransitioning) {
      play();
    }
  }, [isPlaying, hasUserInteracted, isTransitioning, play, pause]);

  // Cleanup on unmount
  useEffect(() => {
    const currentAudio = currentAudioRef.current;
    const nextAudio = nextAudioRef.current;
    const interval = intervalRef.current;
    const fadeInterval = fadeIntervalRef.current;
    const transitionTimeout = transitionTimeoutRef.current;

    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
      if (nextAudio) {
        nextAudio.pause();
      }
      if (interval) {
        clearInterval(interval);
      }
      if (fadeInterval) {
        clearInterval(fadeInterval);
      }
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
    };
  }, []);

  return {
    isPlaying,
    isLoading,
    isTransitioning,
    currentTime,
    hasUserInteracted,
    play,
    pause,
    toggle,
    canPlay: !!audioConfig && !isLoading && isEnabled
  };
};
