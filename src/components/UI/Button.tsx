'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'beast';
  isLoading?: boolean;
  icon?: React.ReactNode;
  soundEffect?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  icon,
  soundEffect = true,
  className = '',
  disabled,
  onClick,
  type = 'button'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // BEAST MODE SOUND EFFECTS - PHONK STYLE
  const playBeastSound = () => {
    if (soundEffect && typeof window !== 'undefined') {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // AGGRESSIVE PHONK SOUND
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(80, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
      } catch (e) {
        // Silently fail if audio context is not available
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading) {
      setIsPressed(true);
      playBeastSound();
      setTimeout(() => setIsPressed(false), 200);
      if (onClick) onClick(e);
    }
  };

  // BEAST MODE UNIQUE STYLE - ARNOLD + MENTZER + ROUGE + NEON + DARK + RAGE
  const baseClasses = `
    relative overflow-hidden group
    bg-gradient-to-r from-red-600 via-red-700 to-red-600
    text-white font-black font-arnold
    border-2 border-red-500/50
    shadow-[0_8px_25px_rgba(220,38,38,0.4),0_0_15px_rgba(255,0,64,0.3)]
    backdrop-blur-sm
    transform-gpu transition-all duration-300 ease-out
    uppercase tracking-wider
    
    hover:from-red-500 hover:via-red-600 hover:to-red-500
    hover:border-red-400/70
    hover:shadow-[0_15px_35px_rgba(220,38,38,0.6),0_0_25px_rgba(255,0,64,0.5)]
    hover:scale-105 hover:-translate-y-2
    
    active:scale-95 active:translate-y-0
    
    disabled:from-gray-700 disabled:to-gray-800
    disabled:border-gray-600/30
    disabled:shadow-none
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:scale-100
    disabled:hover:translate-y-0
    
    before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full
    before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent
    before:transition-all before:duration-500 before:z-10
    hover:before:left-[100%]
  `;

  // BEAST MODE SIZES - TESTOSTERONE LEVELS
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm font-bold rounded-md min-h-[36px]',
    md: 'px-6 py-3 text-base font-black rounded-lg min-h-[44px]',
    lg: 'px-8 py-4 text-lg font-black rounded-xl min-h-[52px]',
    xl: 'px-12 py-6 text-xl font-black rounded-2xl min-h-[64px]',
    beast: 'px-16 py-8 text-3xl font-black rounded-3xl min-h-[80px]'
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${isDisabled ? '' : 'cursor-pointer'}
        ${isPressed ? 'scale-95 translate-y-1' : ''}
        flex items-center justify-center gap-3
        ${className}
      `}
      onClick={handleClick}
      disabled={isDisabled}
      type={type}
      whileHover={!isDisabled ? {
        scale: 1.05,
        y: -8,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!isDisabled ? {
        scale: 0.95,
        y: 2,
        transition: { duration: 0.1 }
      } : {}}
      initial={{ scale: 1 }}
    >
      {/* RED NEON TOP LINE */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-400 to-transparent" />
      
      {/* ELECTRIC SIDE SPARKS */}
      <div className="absolute left-0 top-1/2 w-[2px] h-6 bg-gradient-to-b from-red-400 to-transparent transform -translate-y-1/2" />
      <div className="absolute right-0 top-1/2 w-[2px] h-6 bg-gradient-to-b from-red-400 to-transparent transform -translate-y-1/2" />
      
      {/* LOADING SPINNER - RAGE MODE */}
      {isLoading && (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* ICON - MIKE MENTZER INTENSITY */}
      {icon && !isLoading && (
        <motion.span
          className="relative z-20 flex items-center justify-center"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.3, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      
      {/* BUTTON CONTENT - ARNOLD POWER */}
      <motion.span
        className="relative z-20 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 0.7 : 1 }}
      >
        {children}
      </motion.span>

      {/* BACKGROUND PULSE EFFECT */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/30 rounded-lg opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* BOTTOM RED ACCENT */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
    </motion.button>
  );
};

// FLOATING ACTION BUTTON - PURE BEAST MODE
// FLOATING ACTION BUTTON - PURE BEAST MODE - ✅ CORRIGÉ
export const BeastFAB: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}> = ({ onClick, icon, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-[60]
        w-16 h-16 rounded-full
        bg-gradient-to-r from-red-600 to-red-700
        border-2 border-red-500/50
        shadow-[0_8px_25px_rgba(220,38,38,0.6),0_0_20px_rgba(255,0,64,0.4)]
        text-white text-xl font-black
        backdrop-blur-sm
        hover:from-red-500 hover:to-red-600
        hover:shadow-[0_15px_35px_rgba(220,38,38,0.8),0_0_30px_rgba(255,0,64,0.6)]
        transition-all duration-300 ease-out
        flex items-center justify-center
        ${className}
      `}
      whileHover={{
        scale: 1.15,
        y: -12,
        rotate: 180
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          '0 8px 25px rgba(220,38,38,0.6), 0 0 20px rgba(255,0,64,0.4)',
          '0 8px 25px rgba(220,38,38,0.8), 0 0 30px rgba(255,0,64,0.6)',
          '0 8px 25px rgba(220,38,38,0.6), 0 0 20px rgba(255,0,64,0.4)'
        ]
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity },
        scale: { duration: 0.3 },
        y: { duration: 0.3 },
        rotate: { duration: 0.3 }
      }}
      style={{ pointerEvents: 'auto' }} // ✅ FIX CRITIQUE - Force les interactions
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      
      {/* RED NEON RING */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-400/50 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};