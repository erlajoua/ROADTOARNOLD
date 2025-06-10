"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card, BeastStatsCard } from "@/components/UI/Card";
import { Button, BeastFAB } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { CheckSquare, Plus, X, Moon, Timer, Zap, Flame, Skull, Crown } from "lucide-react";

interface DailyTask {
  id: string;
  text: string;
  category: 'morning' | 'training' | 'evening' | 'general';
  completed: boolean;
}

export default function QuotidienPage() {
  // DAILY TASKS - BEAST MODE
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    { id: '1', text: 'Boire 3L d\'eau pure', category: 'general', completed: false },
    { id: '2', text: 'Visualisation mentale 10min', category: 'morning', completed: false },
    { id: '3', text: 'Échauffement complet beast', category: 'training', completed: false },
    { id: '4', text: 'Étirements post-training', category: 'training', completed: false },
    { id: '5', text: 'Lecture technique 15min', category: 'evening', completed: false },
    { id: '6', text: 'Sommeil 8h minimum', category: 'evening', completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    category: 'general' as DailyTask['category']
  });

  // DEBUG CONSOLE - BEAST MODE
  React.useEffect(() => {
    console.log("📋 BEAST DAILY TASKS:", dailyTasks);
  }, [dailyTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("📋 BEAST TASK CREATION:", formData);

    try {
      const newTask: DailyTask = {
        id: Date.now().toString(),
        text: formData.text,
        category: formData.category,
        completed: false
      };

      setDailyTasks([...dailyTasks, newTask]);
      console.log("✅ BEAST TASK CREATED");

      setFormData({
        text: '',
        category: 'general'
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ BEAST TASK CREATION FAILED:", error);
      alert("❌ TASK CREATION FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTask = (id: string) => {
    setDailyTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setDailyTasks(tasks => tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getCategoryIcon = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return '🌅';
      case 'training': return '💪';
      case 'evening': return '🌙';
      case 'general': return '⚡';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return 'from-yellow-600/20 to-yellow-700/30 border-yellow-500/50';
      case 'training': return 'from-red-600/20 to-red-700/30 border-red-500/50';
      case 'evening': return 'from-blue-600/20 to-blue-700/30 border-blue-500/50';
      case 'general': return 'from-purple-600/20 to-purple-700/30 border-purple-500/50';
      default: return 'from-gray-600/20 to-gray-700/30 border-gray-500/50';
    }
  };

  const getCategoryLabel = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return 'MATIN';
      case 'training': return 'TRAINING';
      case 'evening': return 'SOIR';
      case 'general': return 'GÉNÉRAL';
      default: return 'AUTRE';
    }
  };

  // BEAST STATS
  const totalTasks = dailyTasks.length;
  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        {/* ELECTRIC BACKGROUND - ✅ CORRIGÉ */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* HERO HEADER - BEAST DAILY MODE */}
          <motion.section
            className="relative py-16 overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BACKGROUND EFFECTS - ✅ CORRIGÉ */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10 text-center px-4">
              {/* MAIN ICON */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="text-8xl inline-block"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.8)',
                      '0 0 40px rgba(59, 130, 246, 1)',
                      '0 0 20px rgba(59, 130, 246, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌙
                </motion.div>
              </motion.div>

              {/* TITLE */}
              <motion.h1
                className="text-5xl md:text-7xl font-black font-arnold mb-4 leading-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                  MODE QUOTIDIEN
                </span>
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                ROUTINE DE GUERRIER QUOTIDIENNE
              </motion.p>

              {/* CTA BUTTON */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <Button
                  onClick={() => setShowForm(true)}
                  size="xl"
                  icon={<Plus size={24} />}
                  className="shadow-beast-ultimate"
                >
                  AJOUTER UNE TÂCHE
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* STATS CARDS - BEAST MODE */}
          <motion.section
            className="px-4 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <BeastStatsCard
                value={totalTasks}
                label="TÂCHES TOTALES"
                icon={<CheckSquare size={32} />}
                color="red"
              />
              <BeastStatsCard
                value={completedTasks}
                label="TÂCHES TERMINÉES"
                icon={<Crown size={32} />}
                color="gold"
              />
              <BeastStatsCard
                value={`${completionRate}%`}
                label="COMPLETION RATE"
                icon={<Flame size={32} />}
                color="red"
              />
            </div>
          </motion.section>

          {/* EMPTY STATE - BEAST MOTIVATION */}
          {totalTasks === 0 && !showForm && (
            <motion.section
              className="px-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Card className="text-center py-16">
                <motion.div
                  className="text-8xl mb-8"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📋
                </motion.div>
                <h2 className="text-4xl font-black font-arnold text-blue-500 mb-6 uppercase tracking-wider">
                  PREMIÈRE TÂCHE QUOTIDIENNE
                </h2>
                <p className="text-xl text-gray-400 font-bold mb-8 uppercase tracking-wide">
                  "SUCCESS IS THE SUM OF SMALL EFFORTS REPEATED"
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  size="xl"
                  icon={<Zap size={24} />}
                >
                  CRÉER MA ROUTINE
                </Button>
              </Card>
            </motion.section>
          )}

          {/* FORM MODAL - BEAST MODE - ✅ CORRIGÉ */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ pointerEvents: showForm ? 'auto' : 'none' }}
              >
                {/* BACKDROP - ✅ CORRIGÉ */}
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowForm(false)}
                  style={{ pointerEvents: 'auto' }}
                />

                {/* FORM - ✅ CORRIGÉ */}
                <motion.div
                  className="relative w-full max-w-md"
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ duration: 0.3 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Card title="📋 NOUVELLE TÂCHE QUOTIDIENNE">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* TASK TEXT */}
                      <Input
                        label="📝 TÂCHE À ACCOMPLIR"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Ex: Faire 20 min de visualisation"
                        required
                      />
                      
                      {/* CATEGORY */}
                      <div>
                        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
                          🏷️ CATÉGORIE
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as DailyTask['category'] })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
                          required
                        >
                          <option value="general">⚡ GÉNÉRAL</option>
                          <option value="morning">🌅 MATIN</option>
                          <option value="training">💪 TRAINING</option>
                          <option value="evening">🌙 SOIR</option>
                        </select>
                      </div>
                      
                      {/* BUTTONS */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={!formData.text || isSubmitting}
                          icon={isSubmitting ? <Timer size={20} /> : <Zap size={20} />}
                        >
                          {isSubmitting 
                            ? 'CRÉATION...' 
                            : !formData.text 
                              ? 'COMPLÉTER' 
                              : 'AJOUTER LA TÂCHE'
                          }
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setShowForm(false)}
                          icon={<X size={20} />}
                        >
                          ANNULER
                        </Button>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TASKS LIST - BEAST MODE */}
          {totalTasks > 0 && (
            <motion.section
              className="px-4 max-w-7xl mx-auto pb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <h2 className="text-3xl font-black font-arnold text-blue-500 mb-6 uppercase tracking-wider flex items-center gap-3">
                <CheckSquare size={32} />
                MES TÂCHES DU JOUR ({totalTasks})
              </h2>
              
              <div className="grid gap-4">
                {dailyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-r ${getCategoryColor(task.category)} hover:scale-105 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {/* CHECKBOX */}
                          <motion.button
                            onClick={() => toggleTask(task.id)}
                            className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                              task.completed 
                                ? 'bg-green-600 border-green-500 text-white' 
                                : 'border-red-500/50 hover:border-red-400'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {task.completed && <CheckSquare size={20} />}
                          </motion.button>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <motion.div
                                className="text-2xl"
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                              >
                                {getCategoryIcon(task.category)}
                              </motion.div>
                              <span className={`text-lg font-black uppercase tracking-wider ${task.completed ? 'line-through text-gray-500' : 'text-red-500'}`}>
                                {task.text}
                              </span>
                            </div>
                            <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wide rounded-full border border-red-500/30">
                              {getCategoryLabel(task.category)}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-red-500 hover:text-red-400 p-2 ml-4 rounded-full hover:bg-red-600/20 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* COMPLETION GLOW */}
                      {task.completed && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-green-500/50 pointer-events-none"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(34, 197, 94, 0.4)',
                              '0 0 0 4px rgba(34, 197, 94, 0)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* COMPLETION CELEBRATION */}
              {completionRate === 100 && totalTasks > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center py-8 bg-gradient-to-r from-green-600/20 to-green-700/30 border-green-500/50">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👑
                    </motion.div>
                    <h3 className="text-3xl font-black font-arnold text-green-400 mb-4 uppercase tracking-wider">
                      JOURNÉE DOMINÉE !
                    </h3>
                    <p className="text-xl text-gray-300 font-bold uppercase tracking-wide">
                      100% COMPLETION - PURE BEAST MODE
                    </p>
                  </Card>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* BEAST DAILY WISDOM */}
          <motion.section
            className="px-4 max-w-7xl mx-auto pb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
          >
            <Card className="bg-gradient-to-r from-blue-600/10 to-blue-700/20 border-blue-500/50">
              <div className="text-center p-8">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🧠
                </motion.div>
                
                <h3 className="text-3xl font-black font-arnold text-blue-400 mb-6 uppercase tracking-wider">
                  DAILY BEAST ESSENTIALS
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Moon className="w-5 h-5" />
                      MATIN (5h-12h)
                    </h4>
                    <div className="space-y-2 text-gray-300 font-bold">
                      <p>• 🌅 Réveil à heure fixe</p>
                      <p>• 💧 1L d'eau immédiatement</p>
                      <p>• 🧠 10min visualisation</p>
                      <p>• 🍳 Petit-déj de champion</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Skull className="w-5 h-5" />
                      SOIR (18h-22h)
                    </h4>
                    <div className="space-y-2 text-gray-300 font-bold">
                      <p>• 📖 15min lecture technique</p>
                      <p>• 🧘 Relaxation & étirements</p>
                      <p>• 📱 Zéro écran 1h avant dodo</p>
                      <p>• 😴 Coucher à heure fixe</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mt-8 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.4)',
                      '0 0 0 4px rgba(59, 130, 246, 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-xl font-black text-blue-400 italic uppercase tracking-wider">
                    "WE ARE WHAT WE REPEATEDLY DO. EXCELLENCE IS NOT AN ACT, BUT A HABIT."
                  </p>
                  <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
                    - ARISTOTLE (BEAST EDITION)
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.section>
        </div>

        {/* FLOATING ACTION BUTTON - ✅ Z-INDEX CORRIGÉ */}
        {!showForm && totalTasks > 0 && (
          <BeastFAB
            onClick={() => setShowForm(true)}
            icon={<Plus size={24} />}
            className="z-[60]"
          />
        )}
      </div>
    </AuthGuard>
  );
}