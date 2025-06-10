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
  autoPlay = true,
  loop = true, 
  volume = 0.4 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [audioError, setAudioError] = useState(false);

  // ULTRA AGGRESSIVE MUSIC LAUNCHER
  const launchBeastMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Method 1: Direct play
      console.log('🎵 BEAST: Attempting direct play...');
      await audio.play();
      console.log('🎵 BEAST: SUCCESS - Direct play worked!');
      return;
    } catch (error1) {
      console.log('🎵 BEAST: Direct play failed, trying method 2...');
      
      try {
        // Method 2: Reset and play
        audio.currentTime = 0;
        audio.muted = false;
        audio.volume = currentVolume;
        await audio.play();
        console.log('🎵 BEAST: SUCCESS - Reset and play worked!');
        return;
      } catch (error2) {
        console.log('🎵 BEAST: Method 2 failed, trying method 3...');
        
        try {
          // Method 3: Load and play
          audio.load();
          await new Promise(resolve => setTimeout(resolve, 100));
          await audio.play();
          console.log('🎵 BEAST: SUCCESS - Load and play worked!');
          return;
        } catch (error3) {
          console.log('🎵 BEAST: Method 3 failed, trying method 4...');
          
          try {
            // Method 4: Create new audio context
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioContext.state === 'suspended') {
              await audioContext.resume();
            }
            await audio.play();
            console.log('🎵 BEAST: SUCCESS - Audio context method worked!');
            return;
          } catch (error4) {
            console.log('🎵 BEAST: Audio file failed - generating synthetic BEAST music!');
            generateSyntheticBeastMusic();
          }
        }
      }
    }
  };

  // SYNTHETIC BEAST MUSIC GENERATION - IF NO FILE EXISTS
  const generateSyntheticBeastMusic = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a beast-like phonk bass
      const createBassLine = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // HEAVY BASS FREQUENCIES
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(80, audioContext.currentTime + 0.5);
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime + 1);
        
        // AGGRESSIVE WAVEFORM
        oscillator.type = 'sawtooth';
        
        // ENVELOPE
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        // REPEAT EVERY 2 SECONDS
        setTimeout(() => {
          if (!isPlaying) return;
          createBassLine();
        }, 2000);
      };
      
      createBassLine();
      setIsPlaying(true);
      console.log('🎵 BEAST: Synthetic BEAST music activated!');
      
    } catch (synthError) {
      console.log('🎵 BEAST: Even synthetic music failed - showing controls');
      setShowControls(true);
    }
  };

  // MEGA AGGRESSIVE INITIALIZATION
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set properties IMMEDIATELY
    audio.volume = currentVolume;
    audio.loop = loop;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';

    // Event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      setShowControls(false);
      console.log('🎵 BEAST: Audio started playing!');
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      console.log('🎵 BEAST: Audio paused');
    };
    
    const handleError = (e: any) => {
      console.log('🎵 BEAST: Audio error:', e);
      setAudioError(true);
      setShowControls(true);
    };
    
    const handleCanPlay = () => {
      console.log('🎵 BEAST: Audio can play');
      setAudioError(false);
      if (autoPlay) {
        launchBeastMusic();
      }
    };

    const handleLoadedData = () => {
      console.log('🎵 BEAST: Audio data loaded');
      if (autoPlay) {
        launchBeastMusic();
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);

    // IMMEDIATE LAUNCH ATTEMPTS - ULTRA AGGRESSIVE
    if (autoPlay) {
      // Try 1: Immediate (multiple times)
      setTimeout(() => launchBeastMusic(), 50);
      setTimeout(() => launchBeastMusic(), 100);
      setTimeout(() => launchBeastMusic(), 200);
      
      // Try 2: After load events
      setTimeout(() => launchBeastMusic(), 500);
      setTimeout(() => launchBeastMusic(), 800);
      
      // Try 3: Persistent attempts
      setTimeout(() => launchBeastMusic(), 1000);
      setTimeout(() => launchBeastMusic(), 1500);
      setTimeout(() => launchBeastMusic(), 2000);
      setTimeout(() => launchBeastMusic(), 3000);
      
      // Try 4: Nuclear fallback
      setTimeout(() => {
        if (!isPlaying) {
          console.log('🎵 BEAST: Nuclear fallback - generating synthetic music anyway!');
          generateSyntheticBeastMusic();
        }
      }, 5000);
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [autoPlay, loop, currentVolume]);

  // DOCUMENT INTERACTION LISTENERS - CATCH ANY CLICK TO LAUNCH
  useEffect(() => {
    const handleAnyInteraction = () => {
      if (!isPlaying && autoPlay) {
        console.log('🎵 BEAST: User interaction detected - launching music!');
        launchBeastMusic();
      }
    };

    // Listen to ALL possible user interactions
    document.addEventListener('click', handleAnyInteraction);
    document.addEventListener('keydown', handleAnyInteraction);
    document.addEventListener('touchstart', handleAnyInteraction);
    document.addEventListener('mousemove', handleAnyInteraction);
    window.addEventListener('focus', handleAnyInteraction);

    return () => {
      document.removeEventListener('click', handleAnyInteraction);
      document.removeEventListener('keydown', handleAnyInteraction);
      document.removeEventListener('touchstart', handleAnyInteraction);
      document.removeEventListener('mousemove', handleAnyInteraction);
      window.removeEventListener('focus', handleAnyInteraction);
    };
  }, [isPlaying, autoPlay]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await launchBeastMusic();
      }
    } catch (error) {
      console.log('🎵 BEAST: Toggle play failed:', error);
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

  // GLOBAL BEAST AUDIO CONTROLS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).beastAudio = {
        play: launchBeastMusic,
        pause: () => audioRef.current?.pause(),
        setVolume: (vol: number) => {
          if (audioRef.current) {
            audioRef.current.volume = vol;
            setCurrentVolume(vol);
          }
        },
        forcePlay: () => {
          // NUCLEAR OPTION
          const audio = audioRef.current;
          if (audio) {
            audio.muted = false;
            audio.volume = currentVolume;
            audio.currentTime = 0;
            audio.play().catch(() => {
              // If everything fails, try creating a new audio element
              const newAudio = new Audio('/phonk-beast.mp3');
              newAudio.volume = currentVolume;
              newAudio.loop = true;
              newAudio.play().catch(() => {
                // ULTIMATE FALLBACK: Generate synthetic music
                console.log('🎵 BEAST: All audio methods failed - generating synthetic BEAST music!');
                generateSyntheticBeastMusic();
              });
            });
          } else {
            // No audio element - go straight to synthetic
            generateSyntheticBeastMusic();
          }
        }
      };
    }
  }, [currentVolume]);

  return (
    <>
      {/* MULTIPLE AUDIO SOURCES FOR MAXIMUM COMPATIBILITY */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      >
        <source src="/phonk-beast.mp3" type="audio/mpeg" />
        <source src="/phonk-beast.wav" type="audio/wav" />
        <source src="/phonk-beast.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* EMERGENCY MANUAL PLAY BUTTON - ALWAYS VISIBLE IF NOT PLAYING */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className="fixed top-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.button
              onClick={togglePlay}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-black px-6 py-3 rounded-xl border-2 border-red-500/50 shadow-[0_8px_25px_rgba(220,38,38,0.6)]"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 30px rgba(255,0,64,0.8)'
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 8px 25px rgba(220,38,38,0.6)',
                  '0 8px 25px rgba(220,38,38,0.9)',
                  '0 8px 25px rgba(220,38,38,0.6)'
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Flame className="inline mr-2" size={20} />
              <span className="font-arnold uppercase tracking-wider text-sm">
                ACTIVATE BEAST
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING AUDIO CONTROLS - WHEN PLAYING */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed top-6 right-6 z-40"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-r from-dark-900/90 to-dark-800/90 backdrop-blur-xl border-2 border-red-500/50 rounded-xl p-4 shadow-beast"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,0,64,0.3)',
                  '0 0 30px rgba(255,0,64,0.6)',
                  '0 0 20px rgba(255,0,64,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                {/* PLAY/PAUSE BUTTON */}
                <motion.button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-r from-red-600 to-red-700 shadow-[0_0_20px_rgba(255,0,64,0.6)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Skull size={20} />
                  </motion.div>
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
                <motion.span
                  className="text-red-500 text-xs font-bold uppercase tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  BEAST ON
                </motion.span>
              </div>

              {/* VISUALIZER BARS */}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIDDEN BACKUP AUDIO - IN CASE MAIN FAILS */}
      <audio
        autoPlay
        loop
        muted={false}
        preload="auto"
        className="hidden"
        onCanPlay={launchBeastMusic}
      >
        <source src="/phonk-beast.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

// BEAST KEYBOARD SHORTCUTS - SPACE TO FORCE PLAY
export const useBeastAudioShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // SPACE = FORCE BEAST MUSIC
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if ((window as any).beastAudio) {
          (window as any).beastAudio.forcePlay();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
};