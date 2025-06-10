'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Target, Calendar, BookOpen, Zap, Heart, Flame } from 'lucide-react';

const navItems = [
  { href: '/', label: 'ACCUEIL', icon: Flame },
  { href: '/objectifs', label: 'OBJECTIFS', icon: Target },
  { href: '/evenements', label: 'COMPETS', icon: Calendar },
  { href: '/preparation', label: 'PREP', icon: BookOpen },
  { href: '/technique', label: 'TECHNIQUE', icon: Zap },
  { href: '/motivation', label: 'MOTIVATION', icon: Heart },
];

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* NAVIGATION BEAST MODE - ARNOLD + MENTZER STYLE */}
      <motion.nav 
        className="relative bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-b-2 border-red-600/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* RED NEON TOP LINE */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none" />
        
        {/* ELECTRIC PATTERN BACKGROUND */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(255,0,64,0.3)_0%,transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,rgba(220,38,38,0.3)_0%,transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            
            {/* LOGO BEAST MODE - ARNOLD STYLE */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl font-black font-arnold bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  💀
                </span>
                {/* GLOW EFFECT */}
                <motion.div
                  className="absolute inset-0 text-3xl opacity-50 blur-sm pointer-events-none"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(239, 68, 68, 0.8)',
                      '0 0 20px rgba(239, 68, 68, 1)',
                      '0 0 10px rgba(239, 68, 68, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💀
                </motion.div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-arnold text-red-500 tracking-wider leading-none">
                  POWERPREP
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  BEAST MODE
                </span>
              </div>
            </Link>

            {/* NAVIGATION DESKTOP - TESTOSTERONE RAGE */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <div
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg
                        font-bold text-sm font-arnold uppercase tracking-wider
                        transition-all duration-300 ease-out
                        hover:scale-105 hover:-translate-y-1
                        active:scale-95 active:translate-y-0
                        ${isActive 
                          ? 'bg-gradient-to-r from-red-600/80 to-red-700/80 text-white border border-red-500/50' 
                          : 'text-gray-300 hover:text-white hover:bg-red-600/20 border border-transparent hover:border-red-500/30'
                        }
                      `}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                      
                      {/* ACTIVE INDICATOR */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-red-400" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* MOBILE MENU BUTTON - BEAST MODE */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 text-gray-300 hover:text-red-500 focus:outline-none transition-colors duration-300 hover:scale-110 active:scale-95"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 180 }}
                      exit={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM RED ACCENT */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent pointer-events-none" />
      </motion.nav>

      {/* MOBILE MENU - PHONK DARKNESS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
            />
            
            {/* MOBILE MENU */}
            <motion.div
              className="fixed top-16 left-0 right-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 border-b-2 border-red-600/30 z-50 md:hidden backdrop-blur-xl"
              initial={{ y: -400, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -400, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ pointerEvents: 'auto' }}
            >
              {/* RED GLOW TOP */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none" />
              
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex items-center space-x-3 px-4 py-3 rounded-lg
                          font-bold text-base font-arnold uppercase tracking-wider
                          transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-r from-red-600/80 to-red-700/80 text-white border border-red-500/50' 
                            : 'text-gray-300 hover:text-white hover:bg-red-600/20 border border-transparent hover:border-red-500/30'
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                        
                        {/* ACTIVE INDICATOR */}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* BOTTOM RED ACCENT */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent pointer-events-none" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};