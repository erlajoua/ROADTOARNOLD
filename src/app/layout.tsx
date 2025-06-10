'use client';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// BEAST MODE IMAGES - LEGENDS
const beastImages = [
  {
    url: "https://www.greatestphysiques.com/wp-content/uploads/2016/09/Mike-Mentzer-biceps1.jpg",
    name: "MIKE MENTZER",
    quote: "THE INTENSITY OF EFFORT IS THE DETERMINING FACTOR"
  },
  {
    url: "https://www.ironmanmagazine.com/wp-content/uploads/Mike-Mentzers-Heavy-Duty-Workout-and-Diet-Plan.png",
    name: "HEAVY DUTY",
    quote: "TRAIN HARDER, NOT LONGER"
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/659d79bfcbafbe5e3269d464/3e8744cf-cda6-4fc1-8007-4cf97457d96f/mike-Mentzer-heavy-duty-entrenamientos.jpg",
    name: "MENTZER METHOD",
    quote: "FAILURE IS NOT AN OPTION"
  },
  {
    url: "https://m.media-amazon.com/images/M/MV5BMDAxYjUwNzMtMGRkNy00ZTVkLTlkNjctMWUxMjAwOWIzNWRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    name: "ARNOLD",
    quote: "I'LL BE BACK... STRONGER"
  },
  {
    url: "https://i.ytimg.com/vi/vH0nP4NzS9M/maxresdefault.jpg",
    name: "THE TERMINATOR",
    quote: "CONQUER YOUR FEARS OR THEY WILL CONQUER YOU"
  },
  {
    url: "https://greenmedical.bwcdn.net/media/2018/12/0/7/Arnold-Schwarzenegger-1974-size-blog-detail-v-1.webp",
    name: "MR OLYMPIA",
    quote: "THE WORST THING I CAN BE IS THE SAME AS EVERYBODY ELSE"
  },
  {
    url: "https://julienquaglierini.com/wp-content/uploads/2025/01/leg-day-tom-platz-scaled.jpg",
    name: "LEG DAY",
    quote: "STRENGTH DOES NOT COME FROM PHYSICAL CAPACITY"
  }
];

const BeastLoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  const startBeastInitialization = () => {
    setShowInitialMessage(false);
    
    const startImagesTimer = setTimeout(() => {
      setShowImages(true);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoadingComplete(true);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + (12 + (prev * 0.02));
      });
    }, 300);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % beastImages.length);
    }, 1200);

    return () => {
      clearTimeout(startImagesTimer);
      clearInterval(progressInterval);
      clearInterval(imageInterval);
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startBeastInitialization();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentImage = beastImages[currentImageIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* ELECTRIC BACKGROUND */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,64,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,64,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {[15, 30, 45, 60, 75, 90].map((left, i) => (
          <motion.div
            key={`bolt-${i}`}
            className="absolute w-1 bg-gradient-to-b from-red-500 to-transparent"
            style={{
              left: `${left}%`,
              height: '100%'
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              repeatType: 'reverse'
            }}
          />
        ))}

        {[
          { left: '20%', top: '20%' },
          { left: '50%', top: '30%' },
          { left: '80%', top: '60%' },
          { left: '30%', top: '70%' }
        ].map((position, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 bg-red-600/30 rounded-full blur-3xl"
            style={position}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              x: [0, 50 + i * 20, 0],
              y: [0, -25 - i * 10, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <AnimatePresence>
          {showInitialMessage && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-9xl mb-8"
                animate={{
                  textShadow: [
                    '0 0 30px rgba(255,0,64,1)',
                    '0 0 60px rgba(255,0,64,1), 0 0 90px rgba(255,0,64,0.8)',
                    '0 0 30px rgba(255,0,64,1)'
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💀
              </motion.div>
              
              <motion.h1
                className="text-6xl md:text-8xl font-black font-arnold mb-8"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(45deg, #ff0040, #ff4000, #ff0040, #dc2626)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                BEAST MODE LOADING
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!showInitialMessage && (
            <motion.div
              className="text-center w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="mb-12"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="text-8xl md:text-9xl mb-4"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,0,64,0.8), 0 0 40px rgba(255,0,64,0.6)',
                      '0 0 40px rgba(255,0,64,1), 0 0 80px rgba(255,0,64,0.8)',
                      '0 0 20px rgba(255,0,64,0.8), 0 0 40px rgba(255,0,64,0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💀
                </motion.div>
                
                <motion.h1
                  className="text-4xl md:text-6xl font-black font-arnold mb-4"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(45deg, #ff0040, #ff4000, #ff0040, #dc2626)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  POWERPREP
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl font-bold text-red-400 uppercase tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  BEAST MODE ACTIVATION
                </motion.p>
              </motion.div>

              <AnimatePresence mode="wait">
                {showImages && (
                  <motion.div
                    key={currentImageIndex}
                    className="relative w-64 h-80 md:w-80 md:h-96 mb-8 mx-auto"
                    initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="absolute inset-0 border-4 border-red-500 rounded-lg"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(255,0,64,0.8), inset 0 0 0 0 rgba(255,0,64,0.4)',
                          '0 0 30px 10px rgba(255,0,64,0.6), inset 0 0 20px 5px rgba(255,0,64,0.2)',
                          '0 0 0 0 rgba(255,0,64,0.8), inset 0 0 0 0 rgba(255,0,64,0.4)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <img
                      src={currentImage.url}
                      alt={currentImage.name}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ filter: 'contrast(1.2) saturate(1.3)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 rounded-lg" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <motion.h3
                        className="text-xl md:text-2xl font-black font-arnold text-white mb-2 uppercase tracking-wider"
                        animate={{
                          textShadow: [
                            '0 0 10px rgba(255,255,255,0.8)',
                            '0 0 20px rgba(255,0,64,0.8)',
                            '0 0 10px rgba(255,255,255,0.8)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentImage.name}
                      </motion.h3>
                      <p className="text-sm md:text-base font-bold text-red-400 italic uppercase tracking-wide">
                        "{currentImage.quote}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full max-w-md mb-8 mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-400 font-bold uppercase tracking-wider">
                    LOADING BEAST MODE
                  </span>
                  <span className="text-red-400 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                
                <div className="relative h-4 bg-dark-800 rounded-full overflow-hidden border border-red-500/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full"
                    style={{ width: `${progress}%` }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%']
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  
                  <motion.div
                    className="absolute top-0 right-0 w-2 h-full bg-white rounded-full"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{ left: `${progress}%` }}
                  />
                </div>
              </div>

              <motion.div
                className="text-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="text-lg md:text-xl font-black font-arnold text-red-500 uppercase tracking-wider mb-2">
                  {progress < 25 && "AWAKENING THE BEAST..."}
                  {progress >= 25 && progress < 50 && "LOADING ARNOLD'S WISDOM..."}
                  {progress >= 50 && progress < 75 && "INJECTING MENTZER'S INTENSITY..."}
                  {progress >= 75 && progress < 95 && "PREPARING FOR DOMINATION..."}
                  {progress >= 95 && !loadingComplete && "READY TO CONQUER..."}
                  {loadingComplete && "BEAST MODE ACTIVATED!"}
                </div>
                
                <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                  PREPARING FOR TOTAL DOMINATION
                </div>
              </motion.div>

              {loadingComplete && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                      key={`explosion-${i}`}
                      className="absolute w-2 h-2 bg-red-500 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%'
                      }}
                      animate={{
                        x: [0, (i % 2 === 0 ? 1 : -1) * (200 + i * 20)],
                        y: [0, (i % 3 === 0 ? 1 : -1) * (150 + i * 15)],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoading, setShowLoading] = useState(true);

  // MUSIQUE ULTRA SIMPLE - DÈS LE PREMIER RENDU
  useEffect(() => {
    const audio = new Audio('/phonk-beast.mp3');
    console.log("audio = ", audio);
    audio.volume = 0.4;
    audio.loop = true;
    
    const playMusic = () => {
      audio.play().catch(console.log);
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };
    
    // Lance la musique au premier clic/toucher/clavier
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
    document.addEventListener('touchstart', playMusic);
    
    return () => {
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };
  }, []);

  return (
    <html lang="fr" className="dark">
      <head>
        <meta name="theme-color" content="#dc2626" />
        <title>PowerPrep - Beast Mode Activated 💀</title>
        <meta name="description" content="Application de préparation powerlifting - Mode BEAST activé. Arnold + Mentzer + Pure Rage." />
      </head>
      
      <body className={`${inter.className} antialiased`}>
        <AnimatePresence>
          {showLoading && (
            <BeastLoadingScreen onComplete={() => setShowLoading(false)} />
          )}
        </AnimatePresence>

        {!showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </body>
    </html>
  );
}