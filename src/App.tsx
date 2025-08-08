
import { useState } from 'react';
import HybridScrollRenderer from './containers/slides/HybridScrollRenderer';
import { AudioPermissionModal } from './components/AudioPermissionModal';

function App() {
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const handleStartExperience = () => {
    setHasAudioPermission(true);
    setShouldAutoPlay(true);
    
    // Trigger audio context activation for browsers
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const audioContext = new AudioContext();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    } catch (error) {
      console.warn('Could not initialize audio context:', error);
    }
  };

  return (
    <div className="app">
      <AudioPermissionModal 
        isOpen={!hasAudioPermission}
        onStart={handleStartExperience}
      />
      <HybridScrollRenderer 
        hasAudioPermission={hasAudioPermission} 
        shouldAutoPlay={shouldAutoPlay}
      />
    </div>
  );
}

export default App;
