import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { AudioContext } from './AudioContext';
import type { AudioContextType } from './AudioContext';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const enableAudio = () => {
    setHasUserInteracted(true);
    setIsAudioEnabled(true);
  };

  const disableAudio = () => {
    setIsAudioEnabled(false);
  };

  const value: AudioContextType = {
    isAudioEnabled,
    hasUserInteracted,
    enableAudio,
    disableAudio
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
