'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title,
  subtitle,
  size = 'md',
  interactive = true,
  icon
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // BEAST MODE UNIQUE - ARNOLD + MENTZER + ROUGE + NEON + DARK + PHONK
  const baseClasses = `
    relative overflow-hidden
    bg-gradient-to-br from-dark-900/95 via-dark-800/90 to-dark-900/95
    border border-red-600/30 
    backdrop-blur-xl
    shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.3)]
    transition-all duration-500 ease-out
    group
  `;

  // HOVER EFFECTS - TESTOSTERONE + RAGE + NEON
  const hoverClasses = interactive ? `
    hover:border-red-500/60
    hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(255,0,64,0.6)]
    hover:-translate-y-2
    hover:scale-[1.02]
    cursor-pointer
  ` : '';

  // SIZES
  const sizeClasses = {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl', 
    lg: 'p-8 rounded-2xl',
    xl: 'p-12 rounded-3xl'
  };

  return (
    <motion.div
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${sizeClasses[size]}
        ${className}
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={interactive ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
    >
      {/* RED NEON TOP BORDER - ARNOLD STYLE */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />
      
      {/* DARK PHONK BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,64,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.1)_0%,transparent_50%)]" />
      </div>

      {/* ELECTRIC GLOW ON HOVER */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/20 to-red-500/10 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* HEADER - MIKE MENTZER INTENSITY */}
      {(title || icon) && (
        <div className="relative z-10 mb-6 flex items-center gap-4">
          {icon && (
            <motion.div
              className="text-red-500 text-2xl"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          )}
          <div>
            {title && (
              <h3 className="text-xl md:text-2xl font-black font-arnold uppercase tracking-wider text-red-500 mb-1">
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CONTENT - PURE TESTOSTERONE */}
      <div className="relative z-10 text-gray-100">
        {children}
      </div>

      {/* BOTTOM RED ACCENT - RAGE MODE */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '20%' }}
      />

      {/* SIDE ELECTRIC LINES */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
      <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
    </motion.div>
  );
};

// BEAST STATS CARD - ARNOLD CHAMPION STYLE
export const BeastStatsCard: React.FC<{
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  color?: 'red' | 'gold';
}> = ({ value, label, icon, color = 'red' }) => {
  return (
    <motion.div
      className="relative p-6 rounded-xl bg-gradient-to-br from-dark-900/95 to-dark-800/90 border border-red-600/30 backdrop-blur-xl"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* NEON GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/10 rounded-xl" />
      
      <div className="relative z-10 text-center">
        {icon && (
          <div className={`text-3xl mb-3 ${color === 'red' ? 'text-red-500' : 'text-yellow-500'}`}>
            {icon}
          </div>
        )}
        <div className={`text-4xl font-black font-arnold mb-2 ${color === 'red' ? 'text-red-500' : 'text-yellow-500'}`}>
          {value}
        </div>
        <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* PULSE EFFECT */}
      <motion.div
        className={`absolute inset-0 rounded-xl border ${color === 'red' ? 'border-red-500/30' : 'border-yellow-500/30'}`}
        animate={{
          boxShadow: [
            `0 0 0 0 ${color === 'red' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
            `0 0 0 8px ${color === 'red' ? 'rgba(239, 68, 68, 0)' : 'rgba(245, 158, 11, 0)'}`,
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};