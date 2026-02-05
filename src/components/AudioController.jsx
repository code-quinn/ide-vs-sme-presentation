import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Music2, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Unlock audio context on first user interaction (handles autoplay restrictions)
let audioContextUnlocked = false;
const unlockAudioContext = () => {
  if (audioContextUnlocked) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      ctx.resume().then(() => {
        audioContextUnlocked = true;
      });
    }
  } catch (e) {
    // Ignore errors
  }
};

// Add unlock listener on first interaction
if (typeof window !== 'undefined') {
  ['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, unlockAudioContext, { once: true });
  });
}

// Helper to preload audio
const preloadAudio = (audio) => {
  return new Promise((resolve) => {
    if (audio.readyState >= 3) {
      resolve();
      return;
    }
    audio.addEventListener('canplaythrough', () => resolve(), { once: true });
    audio.addEventListener('error', () => resolve(), { once: true });
    audio.load();
  });
};

// Hook for slide transition sounds
export const useSlideTransitionSound = (enabled = true) => {
  const audioRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const audio = new Audio('/audio/transition.mp3');
    audio.preload = 'auto';
    audio.volume = 0.15; // Subtle
    audioRef.current = audio;
    
    preloadAudio(audio).then(() => setLoaded(true));
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  const playTransition = useCallback(() => {
    if (enabled && audioRef.current && loaded) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [enabled, loaded]);
  
  return { playTransition, loaded };
};

// Hook for background music (entrance/exit)
export const useBackgroundMusic = () => {
  const entranceRef = useRef(null);
  const exitRef = useRef(null);
  const [entrancePlaying, setEntrancePlaying] = useState(false);
  const [exitPlaying, setExitPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  useEffect(() => {
    const entrance = new Audio('/audio/entrance.mp3');
    entrance.preload = 'auto';
    entrance.volume = 0.3;
    entrance.loop = true;
    entranceRef.current = entrance;
    
    const exit = new Audio('/audio/exit.mp3');
    exit.preload = 'auto';
    exit.volume = 0.4;
    exit.loop = false;
    exitRef.current = exit;
    
    // Preload both audio files
    Promise.all([
      preloadAudio(entrance),
      preloadAudio(exit)
    ]).then(() => setAudioLoaded(true));
    
    return () => {
      [entranceRef, exitRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = '';
        }
      });
    };
  }, []);
  
  const toggleEntrance = useCallback(() => {
    if (entrancePlaying) {
      entranceRef.current?.pause();
      setEntrancePlaying(false);
    } else {
      exitRef.current?.pause();
      setExitPlaying(false);
      entranceRef.current?.play().catch(() => {});
      setEntrancePlaying(true);
    }
  }, [entrancePlaying]);
  
  const stopEntrance = useCallback(() => {
    entranceRef.current?.pause();
    if (entranceRef.current) entranceRef.current.currentTime = 0;
    setEntrancePlaying(false);
  }, []);
  
  const playExit = useCallback(() => {
    entranceRef.current?.pause();
    setEntrancePlaying(false);
    if (exitRef.current) {
      exitRef.current.currentTime = 0;
      exitRef.current.play().catch(() => {});
      setExitPlaying(true);
    }
  }, []);
  
  const stopExit = useCallback(() => {
    exitRef.current?.pause();
    if (exitRef.current) exitRef.current.currentTime = 0;
    setExitPlaying(false);
  }, []);
  
  const stopAll = useCallback(() => {
    stopEntrance();
    stopExit();
  }, [stopEntrance, stopExit]);
  
  return {
    entrancePlaying,
    exitPlaying,
    toggleEntrance,
    stopEntrance,
    playExit,
    stopExit,
    stopAll,
  };
};

// Floating audio control panel
export const AudioControls = ({ 
  soundEnabled, 
  setSoundEnabled, 
  entrancePlaying, 
  toggleEntrance,
  currentSlide,
  totalSlides,
  playExit,
  exitPlaying,
  stopExit,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLastSlide = currentSlide === totalSlides - 1;
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Main toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setExpanded(!expanded)}
        className="p-3 rounded-full glass bg-black/30 hover:bg-wc-purple/30 transition-colors"
        title="Audio Controls"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-wc-purple" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50" />
        )}
      </motion.button>
      
      {/* Expanded controls */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="glass bg-black/40 rounded-xl p-3 flex flex-col gap-2 min-w-[180px]"
          >
            {/* Sound effects toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                soundEnabled ? 'bg-wc-purple/30 text-white' : 'bg-white/5 text-white/50'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-sm">Sound FX</span>
            </button>
            
            {/* Entrance music toggle */}
            <button
              onClick={toggleEntrance}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                entrancePlaying ? 'bg-green-500/30 text-green-300' : 'bg-white/5 text-white/70'
              }`}
            >
              {entrancePlaying ? <Square className="w-4 h-4" /> : <Music className="w-4 h-4" />}
              <span className="text-sm">{entrancePlaying ? 'Stop' : 'Play'} Intro</span>
            </button>
            
            {/* Exit music (only on last slide or when expanded) */}
            {isLastSlide && (
              <button
                onClick={exitPlaying ? stopExit : playExit}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  exitPlaying ? 'bg-yellow-500/30 text-yellow-300' : 'bg-white/5 text-white/70'
                }`}
              >
                {exitPlaying ? <Square className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
                <span className="text-sm">{exitPlaying ? 'Stop' : '🎉 Celebrate!'}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulsing indicator when music is playing */}
      {(entrancePlaying || exitPlaying) && (
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 
          }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
        />
      )}
    </div>
  );
};

// Start presentation button for title slide
export const StartPresentationButton = ({ onClick, entrancePlaying }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-wc-purple to-wc-pink 
               text-white font-semibold flex items-center gap-3 mx-auto
               shadow-lg shadow-wc-purple/30 hover:shadow-wc-pink/40 transition-all"
  >
    <Play className="w-5 h-5" />
    {entrancePlaying ? 'Start Presentation' : 'Begin'}
  </motion.button>
);

// Celebration button for final slide
export const CelebrationButton = ({ onClick, isPlaying }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`mt-4 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto
               transition-all ${
                 isPlaying 
                   ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50' 
                   : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
               }`}
  >
    {isPlaying ? (
      <>
        <Square className="w-4 h-4" />
        Stop Music
      </>
    ) : (
      <>
        <span className="text-xl">🎉</span>
        Play Celebration Music
      </>
    )}
  </motion.button>
);

export default AudioControls;
