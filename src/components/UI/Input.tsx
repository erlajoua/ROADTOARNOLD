'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon,
  rightIcon,
  className = '',
  type = 'text',
  value,
  placeholder,
  required = false,
  disabled = false,
  min,
  max,
  step,
  onChange,
  onFocus,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="space-y-2">
      {/* LABEL - ARNOLD STYLE */}
      {label && (
        <motion.label 
          className="block text-sm font-bold text-gray-300 uppercase tracking-wider font-arnold"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isFocused ? 1 : 0.8 }}
        >
          {label}
        </motion.label>
      )}
      
      {/* INPUT CONTAINER - BEAST MODE */}
      <div className="relative group">
        {/* LEFT ICON */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 z-10">
            <motion.div
              animate={{ 
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? '#ef4444' : '#dc2626'
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          </div>
        )}

        {/* INPUT FIELD - DARK + RED + NEON */}
        <motion.input
          className={`
            w-full
            ${icon ? 'pl-12' : 'pl-4'}
            ${rightIcon ? 'pr-12' : 'pr-4'}
            py-3
            bg-gradient-to-r from-dark-900/90 to-dark-800/90
            border-2 border-red-600/30
            rounded-lg
            text-gray-100 font-medium
            placeholder-gray-500
            backdrop-blur-sm
            transition-all duration-300 ease-out
            
            focus:outline-none
            focus:border-red-500/60
            focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2),0_0_15px_rgba(255,0,64,0.3)]
            focus:bg-gradient-to-r focus:from-dark-800/95 focus:to-dark-700/95
            
            hover:border-red-500/40
            hover:shadow-[0_0_10px_rgba(255,0,64,0.2)]
            
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:border-gray-600/30
            
            ${error ? 'border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : ''}
            ${className}
          `}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        />

        {/* RIGHT ICON */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 z-10">
            <motion.div
              animate={{ 
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? '#ef4444' : '#dc2626'
              }}
              transition={{ duration: 0.2 }}
            >
              {rightIcon}
            </motion.div>
          </div>
        )}

        {/* TOP RED NEON LINE */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-t-lg"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '20%' }}
          transition={{ duration: 0.3 }}
        />

        {/* BOTTOM RED ACCENT */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600 to-red-500 rounded-b-lg"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />

        {/* ELECTRIC SIDE SPARKS */}
        {isFocused && (
          <>
            <motion.div
              className="absolute left-0 top-1/2 w-[2px] h-4 bg-gradient-to-b from-red-400 to-transparent transform -translate-y-1/2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute right-0 top-1/2 w-[2px] h-4 bg-gradient-to-b from-red-400 to-transparent transform -translate-y-1/2"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* FOCUS GLOW EFFECT */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/10 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      {/* ERROR MESSAGE - RAGE MODE */}
      {error && (
        <motion.p 
          className="text-red-400 text-sm font-medium flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-red-500">⚠️</span>
          {error}
        </motion.p>
      )}
    </div>
  );
};

// TEXTAREA BEAST MODE
interface TextAreaProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  error, 
  className = '',
  value,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  onChange,
  onFocus,
  onBlur
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="space-y-2">
      {/* LABEL */}
      {label && (
        <motion.label 
          className="block text-sm font-bold text-gray-300 uppercase tracking-wider font-arnold"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isFocused ? 1 : 0.8 }}
        >
          {label}
        </motion.label>
      )}
      
      {/* TEXTAREA CONTAINER */}
      <div className="relative group">
        <motion.textarea
          className={`
            w-full
            px-4 py-3
            bg-gradient-to-r from-dark-900/90 to-dark-800/90
            border-2 border-red-600/30
            rounded-lg
            text-gray-100 font-medium
            placeholder-gray-500
            backdrop-blur-sm
            resize-vertical
            min-h-[120px]
            transition-all duration-300 ease-out
            
            focus:outline-none
            focus:border-red-500/60
            focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2),0_0_15px_rgba(255,0,64,0.3)]
            focus:bg-gradient-to-r focus:from-dark-800/95 focus:to-dark-700/95
            
            hover:border-red-500/40
            hover:shadow-[0_0_10px_rgba(255,0,64,0.2)]
            
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:border-gray-600/30
            
            ${error ? 'border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : ''}
            ${className}
          `}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        />

        {/* TOP RED NEON LINE */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-t-lg"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '20%' }}
          transition={{ duration: 0.3 }}
        />

        {/* BOTTOM RED ACCENT */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red-600 to-red-500 rounded-b-lg"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <motion.p 
          className="text-red-400 text-sm font-medium flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-red-500">⚠️</span>
          {error}
        </motion.p>
      )}
    </div>
  );
};