import { createContext } from 'react';

export interface AudioContextType {
  isAudioEnabled: boolean;
  hasUserInteracted: boolean;
  enableAudio: () => void;
  disableAudio: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);
