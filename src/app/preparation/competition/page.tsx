"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card, BeastStatsCard } from "@/components/UI/Card";
import { Button, BeastFAB } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Trophy, Plus, X, Flame, Target, Clock, Skull, Crown, Zap, Timer } from "lucide-react";

interface CompetitionTask {
  id: string;
  task: string;
  category: 'mental' | 'physical' | 'equipment' | 'nutrition' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export default function CompetitionPrepPage() {
  // COMPETITION TASKS - BEAST WAR MODE
  const [competitionTasks, setCompetitionTasks] = useState<CompetitionTask[]>([
    { id: '1', task: 'Visualisation : voir mes 3 tentatives parfaites', category: 'mental', priority: 'high', completed: false },
    { id: '2', task: 'Sac de guerre : maillot, chaussures, ceinture', category: 'equipment', priority: 'high', completed: false },
    { id: '3', task: 'Échauffement progressif habituel', category: 'physical', priority: 'high', completed: false },
    { id: '4', task: 'Repas 3h avant : glucides + protéines beast', category: 'nutrition', priority: 'medium', completed: false },
    { id: '5', task: 'Réviser mes poids d\'ouverture', category: 'strategy', priority: 'medium', completed: false },
    { id: '6', task: 'Playlist motivation prête', category: 'mental', priority: 'low', completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    category: 'mental' as CompetitionTask['category'],
    priority: 'medium' as CompetitionTask['priority']
  });

  // DEBUG CONSOLE - BEAST MODE
  React.useEffect(() => {
    console.log("🏆 BEAST WAR TASKS:", competitionTasks);
  }, [competitionTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("🏆 BEAST WAR TASK CREATION:", formData);

    try {
      const newTask: CompetitionTask = {
        id: Date.now().toString(),
        task: formData.task,
        category: formData.category,
        priority: formData.priority,
        completed: false
      };

      setCompetitionTasks([...competitionTasks, newTask]);
      console.log("✅ BEAST WAR TASK CREATED");

      setFormData({
        task: '',
        category: 'mental',
        priority: 'medium'
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ BEAST WAR TASK CREATION FAILED:", error);
      alert("❌ WAR TASK CREATION FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTask = (id: string) => {
    setCompetitionTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setCompetitionTasks(tasks => tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getCategoryIcon = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return '🧠';
      case 'physical': return '💪';
      case 'equipment': return '🎒';
      case 'nutrition': return '🥩';
      case 'strategy': return '🎯';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return 'from-purple-600/20 to-purple-700/30 border-purple-500/50';
      case 'physical': return 'from-red-600/20 to-red-700/30 border-red-500/50';
      case 'equipment': return 'from-blue-600/20 to-blue-700/30 border-blue-500/50';
      case 'nutrition': return 'from-green-600/20 to-green-700/30 border-green-500/50';
      case 'strategy': return 'from-yellow-600/20 to-yellow-700/30 border-yellow-500/50';
      default: return 'from-gray-600/20 to-gray-700/30 border-gray-500/50';
    }
  };

  const getCategoryLabel = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return 'MENTAL';
      case 'physical': return 'PHYSIQUE';
      case 'equipment': return 'ÉQUIPEMENT';
      case 'nutrition': return 'NUTRITION';
      case 'strategy': return 'STRATÉGIE';
      default: return 'AUTRE';
    }
  };

  const getPriorityIcon = (priority: CompetitionTask['priority']) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityLabel = (priority: CompetitionTask['priority']) => {
    switch(priority) {
      case 'high': return 'URGENT';
      case 'medium': return 'IMPORTANT';
      case 'low': return 'OPTIONNEL';
      default: return 'NORMAL';
    }
  };

  // SORT BY PRIORITY
  const sortedTasks = [...competitionTasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  // BEAST STATS
  const totalTasks = competitionTasks.length;
  const completedTasks = competitionTasks.filter(t => t.completed).length;
  const highPriorityTasks = competitionTasks.filter(t => t.priority === 'high').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        {/* ELECTRIC BACKGROUND */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* HERO HEADER - BEAST WAR MODE */}
          <motion.section
            className="relative py-16 overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.5, 1, 1.5],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
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
                      '0 0 30px rgba(239, 68, 68, 1)',
                      '0 0 60px rgba(255, 165, 0, 1)',
                      '0 0 30px rgba(239, 68, 68, 1)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💀
                </motion.div>
              </motion.div>

              {/* TITLE */}
              <motion.h1
                className="text-5xl md:text-7xl font-black font-arnold mb-4 leading-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  JOUR DE GUERRE
                </span>
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                AUJOURD'HUI, TU ÉCRIS L'HISTOIRE
              </motion.p>

              {/* BEAST MOTIVATIONAL BADGES */}
              <motion.div
                className="flex justify-center space-x-4 text-sm mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {[
                  { icon: Target, text: "FOCUS" },
                  { icon: Flame, text: "INTENSITÉ" },
                  { icon: Trophy, text: "VICTOIRE" }
                ].map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <motion.div
                      key={badge.text}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 font-bold uppercase tracking-wider"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(239, 68, 68, 0.4)',
                          '0 0 0 4px rgba(239, 68, 68, 0)',
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      <Icon size={16} />
                      {badge.text}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA BUTTON */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.0 }}
              >
                <Button
                  onClick={() => setShowForm(true)}
                  size="xl"
                  icon={<Skull size={24} />}
                  className="shadow-beast-ultimate"
                >
                  AJOUTER UNE MISSION
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* STATS CARDS - BEAST WAR MODE */}
          <motion.section
            className="px-4 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <BeastStatsCard
                value={totalTasks}
                label="MISSIONS TOTALES"
                icon={<Trophy size={32} />}
                color="red"
              />
              <BeastStatsCard
                value={completedTasks}
                label="MISSIONS ACCOMPLIES"
                icon={<Crown size={32} />}
                color="gold"
              />
              <BeastStatsCard
                value={highPriorityTasks}
                label="PRIORITÉ CRITIQUE"
                icon={<Skull size={32} />}
                color="red"
              />
              <BeastStatsCard
                value={`${completionRate}%`}
                label="AVANCEMENT"
                icon={<Flame size={32} />}
                color="red"
              />
            </div>
          </motion.section>

          {/* EMPTY STATE - BEAST WAR MOTIVATION */}
          {totalTasks === 0 && !showForm && (
            <motion.section
              className="px-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Card className="text-center py-16 bg-gradient-to-r from-red-600/10 to-orange-600/20 border-red-500/50">
                <motion.div
                  className="text-8xl mb-8"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚔️
                </motion.div>
                <h2 className="text-4xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
                  PLAN D'ATTAQUE
                </h2>
                <p className="text-xl text-gray-400 font-bold mb-8 uppercase tracking-wide">
                  "VICTORY BELONGS TO THE MOST PERSEVERING"
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  size="xl"
                  icon={<Zap size={24} />}
                >
                  PREMIÈRE MISSION
                </Button>
              </Card>
            </motion.section>
          )}

          {/* FORM MODAL - BEAST WAR MODE */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* BACKDROP */}
                <motion.div
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowForm(false)}
                />

                {/* FORM */}
                <motion.div
                  className="relative w-full max-w-md"
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card title="⚔️ NOUVELLE MISSION DE GUERRE">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* TASK TEXT */}
                      <Input
                        label="🎭 MISSION À ACCOMPLIR"
                        value={formData.task}
                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        placeholder="Ex: Répéter mes cues techniques 10 fois"
                        required
                      />
                      
                      {/* CATEGORY & PRIORITY */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
                            🏷️ DOMAINE
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as CompetitionTask['category'] })}
                            className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
                            required
                          >
                            <option value="mental">🧠 MENTAL</option>
                            <option value="physical">💪 PHYSIQUE</option>
                            <option value="equipment">🎒 ÉQUIPEMENT</option>
                            <option value="nutrition">🥩 NUTRITION</option>
                            <option value="strategy">🎯 STRATÉGIE</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
                            ⚡ PRIORITÉ
                          </label>
                          <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value as CompetitionTask['priority'] })}
                            className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
                            required
                          >
                            <option value="high">🔴 URGENT</option>
                            <option value="medium">🟡 IMPORTANT</option>
                            <option value="low">🟢 OPTIONNEL</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* BUTTONS */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={!formData.task || isSubmitting}
                          icon={isSubmitting ? <Timer size={20} /> : <Zap size={20} />}
                        >
                          {isSubmitting 
                            ? 'CRÉATION...' 
                            : !formData.task 
                              ? 'DÉFINIR MISSION' 
                              : 'AJOUTER À LA LISTE'
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

          {/* MISSIONS LIST - BEAST WAR MODE */}
          {totalTasks > 0 && (
            <motion.section
              className="px-4 max-w-7xl mx-auto pb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <h2 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider flex items-center gap-3">
                <Trophy size={32} />
                MES MISSIONS DE GUERRE ({totalTasks})
              </h2>
              
              <div className="grid gap-4">
                {sortedTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-r ${getCategoryColor(task.category)} hover:scale-105 transition-all duration-300 ${task.completed ? 'opacity-70' : ''}`}>
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
                            {task.completed && <Trophy size={20} />}
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
                                {task.task}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wide rounded-full border border-red-500/30">
                                {getCategoryLabel(task.category)}
                              </span>
                              <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs font-bold uppercase tracking-wide rounded-full">
                                {getPriorityIcon(task.priority)} {getPriorityLabel(task.priority)}
                              </span>
                            </div>
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
                          className="absolute inset-0 rounded-xl border-2 border-green-500/50"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(34, 197, 94, 0.4)',
                              '0 0 0 4px rgba(34, 197, 94, 0)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* HIGH PRIORITY GLOW */}
                      {task.priority === 'high' && !task.completed && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-red-500/50"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(239, 68, 68, 0.6)',
                              '0 0 0 2px rgba(239, 68, 68, 0)',
                            ]
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* VICTORY CELEBRATION */}
              {completionRate === 100 && totalTasks > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="text-center py-8 bg-gradient-to-r from-yellow-600/20 to-yellow-700/30 border-yellow-500/50">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      👑
                    </motion.div>
                    <h3 className="text-3xl font-black font-arnold text-yellow-400 mb-4 uppercase tracking-wider">
                      TOUTES LES MISSIONS ACCOMPLIES !
                    </h3>
                    <p className="text-xl text-gray-300 font-bold uppercase tracking-wide">
                      TU ES PRÊT POUR LA GUERRE - GO DOMINATE !
                    </p>
                  </Card>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* BEAST WAR WISDOM */}
          <motion.section
            className="px-4 max-w-7xl mx-auto pb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
          >
            <Card className="bg-gradient-to-r from-red-600/10 to-orange-600/20 border-red-500/50">
              <div className="text-center p-8">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ⚔️
                </motion.div>
                
                <h3 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
                  CONSEILS DE GUERRE
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="font-black text-red-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Flame className="w-5 h-5" />
                      AVANT LA BATAILLE
                    </h4>
                    <div className="space-y-2 text-gray-300 font-bold">
                      <p>• Arrive 2h avant pour dominer l'espace</p>
                      <p>• Visualise tes 3 tentatives parfaites</p>
                      <p>• Garde ta routine habituelle, ZÉRO changement</p>
                      <p>• Hydratation constante, pas de nouveauté</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-orange-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Trophy className="w-5 h-5" />
                      PENDANT LE COMBAT
                    </h4>
                    <div className="space-y-2 text-gray-300 font-bold">
                      <p>• Respire profondément entre chaque tentative</p>
                      <p>• Communique clairement avec ton coach</p>
                      <p>• Focus uniquement sur TA performance</p>
                      <p>• Que le pouvoir de la BÊTE soit avec toi!</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="mt-8 p-4 bg-red-600/20 rounded-lg border border-red-500/30"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(239, 68, 68, 0.4)',
                      '0 0 0 4px rgba(239, 68, 68, 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-xl font-black text-red-400 italic uppercase tracking-wider">
                    "THE WILL TO WIN IS IMPORTANT, BUT THE WILL TO PREPARE IS VITAL."
                  </p>
                  <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
                    - JOE PATERNO (BEAST MODE ADAPTATION)
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.section>
        </div>

        {/* FLOATING ACTION BUTTON */}
        {!showForm && totalTasks > 0 && (
          <BeastFAB
            onClick={() => setShowForm(true)}
            icon={<Plus size={24} />}
          />
        )}
      </div>
    </AuthGuard>
  );
}