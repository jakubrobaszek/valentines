/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Camera, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from './lib/utils';

type Screen = 'password' | 'proposal' | 'gallery';

export default function App() {
  const [screen, setScreen] = useState<Screen>('password');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '22.02') {
      setScreen('proposal');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2 + 50;
    const y = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2 + 50;
    setNoButtonPos({ x, y });
    setYesScale(prev => prev + 0.2);
  };

  const handleYes = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ff1493']
    });
    setScreen('gallery');
  };

  return (
    <div className="min-h-screen heart-bg flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {screen === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-pink-200 max-w-md w-full text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="bg-pink-100 p-4 rounded-full">
                <Lock className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <h1 className="text-3xl font-romantic font-bold mb-2 text-pink-600">Nasza Tajemnica</h1>
            <p className="text-pink-400 mb-6 italic">Wpisz datę, która wszystko zmieniła...</p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <motion.input
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                type="text"
                placeholder="DD.MM"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border-2 outline-none transition-all text-center text-xl tracking-widest",
                  error ? "border-red-400 bg-red-50" : "border-pink-200 focus:border-pink-500 bg-pink-50/50"
                )}
              />
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-pink-200"
              >
                Otwórz Serce
              </button>
            </form>
          </motion.div>
        )}

        {screen === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 max-w-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <Heart className="w-24 h-24 text-red-500 fill-red-500" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-romantic font-bold text-red-600 leading-tight">
              Czy zgadzasz się być dalej ze mną?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
              <motion.button
                style={{ scale: yesScale }}
                onClick={handleYes}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-xl transition-colors z-10"
              >
                TAK! ❤️
              </motion.button>

              <motion.button
                ref={noButtonRef}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="bg-gray-200 text-gray-500 px-8 py-3 rounded-full text-lg font-medium border-2 border-gray-300"
              >
                Nie...
              </motion.button>
            </div>
          </motion.div>
        )}

        {screen === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl space-y-8"
          >
            <div className="text-center">
              <h2 className="text-5xl font-romantic font-bold text-pink-600 mb-4 flex items-center justify-center gap-3">
                <Sparkles className="text-yellow-400" />
                Nasze Wspomnienia
                <Sparkles className="text-yellow-400" />
              </h2>
              <p className="text-pink-500 italic">Każda chwila z Tobą jest wyjątkowa...</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-pink-100"
                >
                  <img
                    src={`/images/photo${i}.jpg`}
                    alt={`Wspomnienie ${i}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to placeholder if local image doesn't exist yet
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i + 100}/800/800`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Heart className="text-white fill-white w-6 h-6" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8">
              <button
                onClick={() => setScreen('proposal')}
                className="text-pink-400 hover:text-pink-600 underline underline-offset-4 transition-colors"
              >
                Wróć do pytania
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
