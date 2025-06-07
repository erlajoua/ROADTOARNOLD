'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AuthGuard } from '@/components/Auth/AuthGuard';
import { Card } from '@/components/UI/Card';
import Link from 'next/link';
import { Target, Calendar, BookOpen, Zap, Heart, Flame, Skull, Trophy, Timer, Crown, Bolt } from 'lucide-react';

const menuItems = [
  { 
    href: '/objectifs', 
    label: 'MES OBJECTIFS', 
    icon: Target, 
    description: 'DÉFINIR ET ÉCRASER MES RECORDS',
    color: 'from-red-600 to-red-700',
    emoji: '🎯',
    particles: 15
  },
  { 
    href: '/evenements', 
    label: 'MES COMPÉTITIONS', 
    icon: Calendar, 
    description: 'DOMINER SUR LE PLATEAU',
    color: 'from-red-700 to-red-800',
    emoji: '🏆',
    particles: 20
  },
  { 
    href: '/preparation', 
    label: 'PRÉPARATION', 
    icon: BookOpen, 
    description: 'ROUTINE DE GUERRE QUOTIDIENNE',
    color: 'from-red-600 to-red-800',
    emoji: '⚔️',
    particles: 18
  },
  { 
    href: '/technique', 
    label: 'NOTES TECHNIQUES', 
    icon: Zap, 
    description: 'PERFECTIONNER CHAQUE MOUVEMENT',
    color: 'from-red-800 to-red-900',
    emoji: '⚡',
    particles: 25
  },
  { 
    href: '/motivation', 
    label: 'MOTIVATION', 
    icon: Heart, 
    description: 'FUEL POUR L\'ÂME DE GUERRIER',
    color: 'from-red-700 to-red-900',
    emoji: '🔥',
    particles: 22
  }
];

const beastQuotes = [
  { text: "I'LL BE BACK... STRONGER", author: "ARNOLD" },
  { text: "THE INTENSITY OF EFFORT IS THE DETERMINING FACTOR", author: "MENTZER" },
  { text: "FAILURE IS NOT AN OPTION", author: "BEAST" },
  { text: "NO PAIN, NO GAIN", author: "LEGEND" },
  { text: "MIND OVER MUSCLE", author: "WARRIOR" }
];

const ElectricParticle = ({ delay = 0, duration = 2 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-red-500 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: [0, (Math.random() - 0.5) * 200],
        y: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop'
      }}
    />
  );
};

const ElectricBolt = ({ startX, startY, endX, endY, delay = 0 }) => {
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: startX, top: startY }}
      width={Math.abs(endX - startX)}
      height={Math.abs(endY - startY)}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.2, delay, repeat: Infinity, repeatDelay: 2 }}
    >
      <motion.path
        d={`M 0 0 L ${endX - startX} ${endY - startY}`}
        stroke="url(#electricGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.1, delay }}
      />
      <defs>
        <linearGradient id="electricGradient">
          <stop offset="0%" stopColor="#ff0040" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ff0040" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

const NeonCard = ({ item, index }: { item: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number }>>([]);

  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: item.particles }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered, item.particles]);

  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={item.href}>
        <Card className="group cursor-pointer h-full relative overflow-hidden">
          <div className="relative text-center p-8 z-10">
            {/* ELECTRIC PARTICLES */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-red-500 rounded-full"
                style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 0.5
                }}
              />
            ))}

            {/* ICON WITH INSANE GLOW */}
            <motion.div
              className="relative mb-8"
              whileHover={{ 
                rotate: 360, 
                scale: 1.3,
                transition: { duration: 0.8 }
              }}
            >
              <motion.div 
                className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center relative`}
                animate={{
                  boxShadow: isHovered ? [
                    '0 0 20px rgba(255,0,64,0.5)',
                    '0 0 40px rgba(255,0,64,0.8)',
                    '0 0 60px rgba(255,0,64,1)',
                    '0 0 40px rgba(255,0,64,0.8)',
                    '0 0 20px rgba(255,0,64,0.5)'
                  ] : ['0 0 20px rgba(255,0,64,0.3)']
                }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
              >
                <Icon className="h-12 w-12 text-white relative z-10" />
                
                {/* ELECTRIC RING */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                  animate={isHovered ? {
                    scale: [1, 1.5, 2],
                    opacity: [1, 0.5, 0],
                    rotate: [0, 180, 360]
                  } : {}}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                />
              </motion.div>
              
              {/* EMOJI EXPLOSION */}
              <motion.span 
                className="absolute -top-4 -right-4 text-4xl"
                animate={isHovered ? {
                  scale: [1, 1.5, 1],
                  rotate: [0, 360, 0],
                  textShadow: [
                    '0 0 10px rgba(255,0,64,0.8)',
                    '0 0 20px rgba(255,0,64,1)',
                    '0 0 10px rgba(255,0,64,0.8)'
                  ]
                } : {}}
                transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
              >
                {item.emoji}
              </motion.span>
            </motion.div>

            {/* TITLE WITH ELECTRIC EFFECT */}
            <motion.h3 
              className="text-xl md:text-2xl font-black font-arnold text-red-500 mb-4 uppercase tracking-wider"
              animate={isHovered ? {
                textShadow: [
                  '0 0 10px rgba(255,0,64,0.8)',
                  '0 0 20px rgba(255,0,64,1)',
                  '0 0 30px rgba(255,0,64,1)',
                  '0 0 20px rgba(255,0,64,1)',
                  '0 0 10px rgba(255,0,64,0.8)'
                ]
              } : {}}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            >
              {item.label}
            </motion.h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 font-bold uppercase tracking-wide text-sm mb-6">
              {item.description}
            </p>

            {/* HOVER EFFECT ARROW WITH ELECTRIC */}
            <motion.div
              className="flex items-center justify-center text-red-500 font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -20 }}
              whileHover={{ x: 0 }}
            >
              <span>ENGAGE</span>
              <motion.span
                className="ml-3"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </motion.div>
          </div>

          {/* BACKGROUND ELECTRIC EFFECT */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* ELECTRIC BORDER */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-xl"
            animate={isHovered ? {
              borderColor: [
                'rgba(239, 68, 68, 0.5)',
                'rgba(255, 0, 64, 0.8)',
                'rgba(239, 68, 68, 0.5)'
              ]
            } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          />
        </Card>
      </Link>
    </motion.div>
  );
};

export default function HomePage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [electricBolts, setElectricBolts] = useState<Array<any>>([]);

  // ELECTRIC BOLTS GENERATION
  useEffect(() => {
    const generateBolts = () => {
      const newBolts = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        startX: Math.random() * window.innerWidth,
        startY: Math.random() * window.innerHeight,
        endX: Math.random() * window.innerWidth,
        endY: Math.random() * window.innerHeight,
        delay: i * 0.2
      }));
      setElectricBolts(newBolts);
    };

    generateBolts();
    const interval = setInterval(generateBolts, 3000);
    return () => clearInterval(interval);
  }, []);

  // QUOTE ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % beastQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        {/* INSANE ELECTRIC BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none">
          {/* ANIMATED GRID */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,0,64,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,0,64,0.8) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(255,0,64,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 20px 20px'
            }}
          />

          {/* ELECTRIC PARTICLES */}
          {[...Array(30)].map((_, i) => (
            <ElectricParticle key={i} delay={i * 0.1} duration={2 + Math.random() * 2} />
          ))}

          {/* ELECTRIC BOLTS */}
          {electricBolts.map(bolt => (
            <ElectricBolt key={bolt.id} {...bolt} />
          ))}

          {/* FLOATING ENERGY ORBS */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,64,0.6) 0%, rgba(255,0,64,0.2) 50%, transparent 100%)',
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
                x: [0, Math.sin(i) * 100, 0],
                y: [0, Math.cos(i) * 100, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        <div className="relative z-10 space-y-12">
          {/* HERO SECTION - ELECTRIC INSANITY */}
          <motion.section 
            className="relative py-20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10 text-center px-4">
              {/* SKULL ICON - ELECTRIC BEAST */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="text-9xl mb-4 inline-block cursor-pointer"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,0,64,0.8), 0 0 40px rgba(255,0,64,0.6)',
                      '0 0 40px rgba(255,0,64,1), 0 0 80px rgba(255,0,64,0.8), 0 0 120px rgba(255,0,64,0.6)',
                      '0 0 20px rgba(255,0,64,0.8), 0 0 40px rgba(255,0,64,0.6)'
                    ],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  💀
                </motion.div>
              </motion.div>

              {/* MAIN TITLE - PURE ELECTRIC */}
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black font-arnold mb-6 leading-none cursor-pointer"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: '0 0 50px rgba(255,0,64,1)'
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    textShadow: [
                      '0 0 30px rgba(255,0,64,0.8)',
                      '0 0 60px rgba(255,0,64,1), 0 0 90px rgba(255,0,64,0.8)',
                      '0 0 30px rgba(255,0,64,0.8)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(45deg, #ff0040, #ff4000, #ffff00, #ff4000, #ff0040)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  POWER
                </motion.span>
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                    textShadow: [
                      '0 0 40px rgba(255,0,64,1)',
                      '0 0 80px rgba(255,0,64,1), 0 0 120px rgba(255,0,64,0.8)',
                      '0 0 40px rgba(255,0,64,1)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  style={{
                    background: 'linear-gradient(45deg, #dc2626, #ff0040, #ff4000, #ff0040, #dc2626)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  PREP
                </motion.span>
              </motion.h1>

              {/* SUBTITLE - ELECTRIC PULSE */}
              <motion.div
                className="mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.p
                  className="text-xl md:text-3xl font-bold text-gray-300 mb-4 font-arnold uppercase tracking-widest"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(255,0,64,0.6)',
                      '0 0 20px rgba(255,0,64,0.8)',
                      '0 0 10px rgba(255,0,64,0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BEAST MODE ACTIVATED
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-red-400 font-bold uppercase tracking-wider"
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  NO LIMITS • NO EXCUSES • PURE INTENSITY
                </motion.p>
              </motion.div>

              {/* ROTATING QUOTES - ELECTRIC */}
              <motion.div
                className="mb-12 h-20 flex items-center justify-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                {beastQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-center"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{
                      opacity: currentQuoteIndex === index ? 1 : 0,
                      y: currentQuoteIndex === index ? 0 : 20,
                      scale: currentQuoteIndex === index ? 1 : 0.8,
                      textShadow: currentQuoteIndex === index ? [
                        '0 0 10px rgba(255,0,64,0.8)',
                        '0 0 20px rgba(255,0,64,1)',
                        '0 0 10px rgba(255,0,64,0.8)'
                      ] : '0 0 0px rgba(255,0,64,0)'
                    }}
                    transition={{ duration: 0.8, repeat: currentQuoteIndex === index ? Infinity : 0, repeatType: 'reverse' }}
                  >
                    <p className="text-lg md:text-xl font-bold text-red-500 font-arnold uppercase tracking-wider mb-2">
                      "{quote.text}"
                    </p>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                      - {quote.author}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA BUTTONS - ELECTRIC POWER */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <Link href="/objectifs">
                  <motion.button
                    className="px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-xl font-arnold uppercase tracking-wider rounded-2xl border-2 border-red-500/50 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      boxShadow: '0 20px 40px rgba(220,38,38,0.8), 0 0 30px rgba(255,0,64,0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 15px 35px rgba(220,38,38,0.6)',
                        '0 15px 35px rgba(220,38,38,0.8)',
                        '0 15px 35px rgba(220,38,38,0.6)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Flame className="inline mr-3" size={24} />
                    START DOMINATING
                    
                    {/* ELECTRIC SWEEP */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </Link>
                
                <Link href="/motivation">
                  <motion.button
                    className="px-12 py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-red-400 font-black text-xl font-arnold uppercase tracking-wider rounded-2xl border-2 border-red-600/50 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      backgroundColor: 'rgba(220, 38, 38, 0.2)',
                      color: '#ff0040',
                      boxShadow: '0 20px 40px rgba(220,38,38,0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Skull className="inline mr-3" size={24} />
                    FUEL THE BEAST
                    
                    {/* PULSE EFFECT */}
                    <motion.div
                      className="absolute inset-0 border-2 border-red-500/50 rounded-2xl"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* BOTTOM ELECTRIC LINE */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1"
              animate={{
                background: [
                  'linear-gradient(90deg, transparent, #ff0040, transparent)',
                  'linear-gradient(90deg, transparent, #ff4000, transparent)',
                  'linear-gradient(90deg, transparent, #ff0040, transparent)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.section>

          {/* MENU GRID - ELECTRIC CARDS */}
          <section className="px-4 max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-black font-arnold text-red-500 mb-4 uppercase tracking-wider"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,0,64,0.8)',
                    '0 0 40px rgba(255,0,64,1)',
                    '0 0 20px rgba(255,0,64,0.8)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CHOOSE YOUR WEAPON
              </motion.h2>
              <p className="text-xl text-gray-400 font-bold uppercase tracking-wide">
                EVERY CHAMPION NEEDS A PLAN
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              {menuItems.map((item, index) => (
                <NeonCard key={item.href} item={item} index={index} />
              ))}
            </motion.div>
          </section>

          {/* BOTTOM SECTION - ELECTRIC STATS */}
          <motion.section
            className="px-4 max-w-7xl mx-auto pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Trophy, value: "∞", label: "RECORDS TO BREAK", color: "text-yellow-500" },
                { icon: Timer, value: "24/7", label: "BEAST MODE ACTIVE", color: "text-red-500" },
                { icon: Flame, value: "100%", label: "PURE INTENSITY", color: "text-orange-500" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.5 + index * 0.2 }}
                  >
                    <Card className="text-center relative overflow-hidden group">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 360, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Icon className={`w-16 h-16 ${stat.color} mx-auto mb-4`} />
                      </motion.div>
                      
                      <motion.h3 
                        className={`text-3xl font-black font-arnold ${stat.color} mb-2`}
                        animate={{
                          textShadow: [
                            `0 0 10px ${stat.color === 'text-red-500' ? '#ff0040' : stat.color === 'text-yellow-500' ? '#ffd700' : '#ff4000'}`,
                            `0 0 20px ${stat.color === 'text-red-500' ? '#ff0040' : stat.color === 'text-yellow-500' ? '#ffd700' : '#ff4000'}`,
                            `0 0 10px ${stat.color === 'text-red-500' ? '#ff0040' : stat.color === 'text-yellow-500' ? '#ffd700' : '#ff4000'}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.value}
                      </motion.h3>
                      
                      <p className="text-gray-400 font-bold uppercase tracking-wide">
                        {stat.label}
                      </p>

                      {/* ELECTRIC CORNER ACCENTS */}
                      <motion.div
                        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + 1 }}
                      />
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </AuthGuard>
  );
}