'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Skull, Flame } from 'lucide-react';

interface BeastAudioProps {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export const BeastAudio: React.FC<BeastAudioProps> = ({ 
  autoPlay = true, // ACTIVÉ par défaut maintenant
  loop = true, 
  volume = 0.3 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial properties
    audio.volume = currentVolume;
    audio.loop = loop;

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setAudioError(true);
      console.log('🎵 BEAST AUDIO: Add phonk-beast.mp3 to public folder for the full experience!');
    };
    const handleCanPlay = () => setAudioError(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    // Auto play attempt
    if (autoPlay) {
      const playAudio = async () => {
        try {
          await audio.play();
          console.log('🎵 BEAST MODE PHONK ACTIVATED DIRECTLY 🔥');
        } catch (error) {
          console.log('🎵 Auto-play blocked - user interaction required');
          setShowControls(true);
        }
      };
      
      // Try immediately
      playAudio();
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [autoPlay, loop, currentVolume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
        setShowControls(false);
      }
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = currentVolume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentVolume(newVolume);
    if (!isMuted) {
      audio.volume = newVolume;
    }
  };

  // BEAST MODE GLOBAL MUSIC CONTROL
  useEffect(() => {
    // Expose global controls for the loading screen
    if (typeof window !== 'undefined') {
      (window as any).beastAudio = {
        play: () => audioRef.current?.play(),
        pause: () => audioRef.current?.pause(),
        setVolume: (vol: number) => {
          if (audioRef.current) {
            audioRef.current.volume = vol;
            setCurrentVolume(vol);
          }
        }
      };
    }
  }, []);

  // Don't render if audio failed to load
  if (audioError) {
    return null;
  }

  return (
    <>
      {/* HIDDEN AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        <source src="/phonk-beast.mp3" type="audio/mpeg" />
        <source src="/phonk-beast.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* FLOATING AUDIO CONTROLS - ONLY WHEN NEEDED */}
      <AnimatePresence>
        {(showControls || (isPlaying && !showControls)) && (
          <motion.div
            className="fixed top-6 right-6 z-40"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setShowControls(true)}
            onHoverEnd={() => {
              // Only hide if not actively needed
              if (!isPlaying) setShowControls(false);
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-dark-900/90 to-dark-800/90 backdrop-blur-xl border-2 border-red-500/50 rounded-xl p-4 shadow-beast"
              animate={{
                boxShadow: isPlaying ? [
                  '0 0 20px rgba(255,0,64,0.3)',
                  '0 0 30px rgba(255,0,64,0.6)',
                  '0 0 20px rgba(255,0,64,0.3)'
                ] : ['0 0 10px rgba(255,0,64,0.2)']
              }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
            >
              <div className="flex items-center gap-3">
                {/* PLAY/PAUSE BUTTON */}
                <motion.button
                  onClick={togglePlay}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-[0_0_20px_rgba(255,0,64,0.6)]' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-red-600 hover:to-red-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isPlaying ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                >
                  {isPlaying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Skull size={20} />
                    </motion.div>
                  ) : (
                    <Flame size={20} />
                  )}
                </motion.button>

                {/* VOLUME CONTROL */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </motion.button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : currentVolume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(isMuted ? 0 : currentVolume) * 100}%, #374151 ${(isMuted ? 0 : currentVolume) * 100}%, #374151 100%)`
                    }}
                  />
                </div>

                {/* STATUS INDICATOR */}
                <div className="text-xs font-bold uppercase tracking-wider">
                  {isPlaying ? (
                    <motion.span
                      className="text-red-500"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      BEAST ON
                    </motion.span>
                  ) : (
                    <span className="text-gray-400">BEAST OFF</span>
                  )}
                </div>
              </div>

              {/* VISUALIZER BARS */}
              {isPlaying && (
                <div className="flex items-end justify-center gap-1 mt-3">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                      animate={{
                        height: [4, Math.random() * 20 + 8, 4],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EMERGENCY PLAY BUTTON - ONLY IF AUDIO REALLY FAILED */}
      <AnimatePresence>
        {showControls && !isPlaying && audioError && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.button
              onClick={togglePlay}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-black px-6 py-3 rounded-xl border-2 border-red-500/50 shadow-beast"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255,0,64,0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Flame className="inline mr-2" size={20} />
              <span className="font-arnold uppercase tracking-wider">
                ACTIVATE BEAST
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// BEAST MODE KEYBOARD SHORTCUTS
export const useBeastAudioShortcuts = (audioRef: React.RefObject<HTMLAudioElement>) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Space bar to play/pause
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (audio.paused) {
          audio.play().catch(console.log);
        } else {
          audio.pause();
        }
      }

      // M to mute/unmute
      if (e.key.toLowerCase() === 'm') {
        audio.muted = !audio.muted;
      }

      // Arrow keys for volume
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        audio.volume = Math.min(1, audio.volume + 0.1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        audio.volume = Math.max(0, audio.volume - 0.1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [audioRef]);
};