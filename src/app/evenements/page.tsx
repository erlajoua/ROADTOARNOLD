"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card, BeastStatsCard } from "@/components/UI/Card";
import { Button, BeastFAB } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { Event } from "@/types";
import { Calendar, Plus, MapPin, Trophy, Clock, X, Flame, Skull, Crown, Timer, Zap } from "lucide-react";

export default function EvenementsPage() {
  const {
    data: events,
    loading,
    add,
    update,
    remove,
  } = useFirestore<Event>("events");

  // DEBUG CONSOLE - BEAST MODE
  React.useEffect(() => {
    console.log("📊 BEAST EVENTS LOADED:", events);
    console.log("⏳ LOADING STATUS:", loading);
  }, [events, loading]);
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "local" as Event["type"],
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("📅 BEAST EVENT CREATION:", formData);
    
    try {
      const result = await add({
        name: formData.name,
        date: new Date(formData.date),
        type: formData.type,
        location: formData.location,
        status: "planned",
        notes: "",
      });
      
      console.log("✅ BEAST EVENT CREATED:", result);
      
      setFormData({
        name: "",
        date: "",
        type: "local",
        location: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ BEAST EVENT CREATION FAILED:", error);
      alert("❌ EVENT CREATION FAILED - CHECK CONSOLE");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (eventId: string) => {
    console.log("🗑️ BEAST EVENT DELETION:", eventId);
    try {
      await remove(eventId);
      console.log("✅ BEAST EVENT DELETED");
    } catch (error) {
      console.error("❌ BEAST EVENT DELETION FAILED:", error);
    }
  };

  const getTypeIcon = (type: Event["type"]) => {
    switch(type) {
      case "local": return "🏠";
      case "regional": return "🏆";
      case "national": return "👑";
      default: return "📅";
    }
  };

  const getTypeLabel = (type: Event["type"]) => {
    switch(type) {
      case "local": return "BATAILLE LOCALE";
      case "regional": return "GUERRE RÉGIONALE";
      case "national": return "CHAMPIONNAT NATIONAL";
      default: return "ÉVÉNEMENT";
    }
  };

  const getTypeColor = (type: Event["type"]) => {
    switch(type) {
      case "local": return "from-blue-600/20 to-blue-700/30 border-blue-500/50";
      case "regional": return "from-red-600/20 to-red-700/30 border-red-500/50";
      case "national": return "from-yellow-600/20 to-yellow-700/30 border-yellow-500/50";
      default: return "from-gray-600/20 to-gray-700/30 border-gray-500/50";
    }
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "PASSÉ", color: "text-gray-500", icon: "💀" };
    if (diffDays === 0) return { text: "AUJOURD'HUI !", color: "text-red-500", icon: "🔥" };
    if (diffDays === 1) return { text: "DEMAIN", color: "text-red-400", icon: "⚡" };
    if (diffDays <= 7) return { text: `${diffDays} JOURS`, color: "text-red-300", icon: "⚠️" };
    if (diffDays <= 30) return { text: `${diffDays} JOURS`, color: "text-yellow-400", icon: "⏰" };
    return { text: `${diffDays} JOURS`, color: "text-gray-400", icon: "📅" };
  };

  // SORTED EVENTS
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const thisMonthEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden">
        {/* ELECTRIC BACKGROUND */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 space-y-8">
          {/* HERO HEADER - BEAST COMPETITION MODE */}
          <motion.section
            className="relative py-16 overflow-hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-0 right-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"
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
                      '0 0 20px rgba(239, 68, 68, 0.8)',
                      '0 0 40px rgba(239, 68, 68, 1)',
                      '0 0 20px rgba(239, 68, 68, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </motion.div>
              </motion.div>

              {/* TITLE */}
              <motion.h1
                className="text-5xl md:text-7xl font-black font-arnold mb-4 leading-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  MES COMPÉTITIONS
                </span>
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                DOMINER CHAQUE PLATEAU
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
                  icon={<Trophy size={24} />}
                  className="shadow-beast-ultimate"
                >
                  AJOUTER UNE BATAILLE
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
                value={totalEvents}
                label="BATAILLES PLANIFIÉES"
                icon={<Calendar size={32} />}
              />
              <BeastStatsCard
                value={upcomingEvents}
                label="PROCHAINES GUERRES"
                icon={<Timer size={32} />}
                color="gold"
              />
              <BeastStatsCard
                value={thisMonthEvents}
                label="CE MOIS-CI"
                icon={<Flame size={32} />}
              />
            </div>
          </motion.section>

          {/* EMPTY STATE - BEAST MOTIVATION */}
          {totalEvents === 0 && !showForm && (
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
                  🏆
                </motion.div>
                <h2 className="text-4xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
                  PREMIÈRE BATAILLE
                </h2>
                <p className="text-xl text-gray-400 font-bold mb-8 uppercase tracking-wide">
                  "CONQUER YOUR FEARS OR THEY WILL CONQUER YOU"
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  size="xl"
                  icon={<Flame size={24} />}
                >
                  ENTRER EN GUERRE
                </Button>
              </Card>
            </motion.section>
          )}

          {/* FORM MODAL - BEAST MODE */}
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
                  <Card title="🏆 NOUVELLE BATAILLE">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* EVENT NAME */}
                      <Input
                        label="📝 NOM DE LA COMPÉTITION"
                        value={formData.name}
                        onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Championnat Régional Beast Mode"
                        required
                      />
                      
                      {/* EVENT DATE */}
                      <Input
                        label="📅 DATE DE GUERRE"
                        type="date"
                        value={formData.date}
                        onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />

                      {/* EVENT TYPE */}
                      <div>
                        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
                          🏆 TYPE DE BATAILLE
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
                          required
                        >
                          <option value="local">🏠 BATAILLE LOCALE</option>
                          <option value="regional">🏆 GUERRE RÉGIONALE</option>
                          <option value="national">👑 CHAMPIONNAT NATIONAL</option>
                        </select>
                      </div>

                      {/* LOCATION */}
                      <Input
                        label="📍 CHAMP DE BATAILLE (OPTIONNEL)"
                        value={formData.location}
                        onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Paris, France"
                      />
                      
                      {/* BUTTONS */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={!formData.name || !formData.date || isSubmitting}
                          icon={isSubmitting ? <Timer size={20} /> : <Zap size={20} />}
                        >
                          {isSubmitting 
                            ? 'CRÉATION...' 
                            : !formData.name || !formData.date 
                              ? 'COMPLÉTER' 
                              : 'CRÉER LA BATAILLE'
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

          {/* EVENTS LIST - BEAST MODE */}
          {totalEvents > 0 && (
            <motion.section
              className="px-4 max-w-7xl mx-auto pb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <h2 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider flex items-center gap-3">
                <Flame size={32} />
                MES BATAILLES ({totalEvents})
              </h2>
              
              <div className="grid gap-6">
                {sortedEvents.map((event, index) => {
                  const countdown = getDaysUntil(event.date);
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className={`hover:scale-105 transition-all duration-300 bg-gradient-to-r ${getTypeColor(event.type)}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <motion.div 
                              className="text-4xl"
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                            >
                              {getTypeIcon(event.type)}
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-black text-red-500 uppercase tracking-wider mb-2">
                                {event.name}
                              </h3>
                              <div className="space-y-1">
                                <p className="text-gray-300 font-bold flex items-center gap-2">
                                  <Calendar size={16} />
                                  {new Date(event.date).toLocaleDateString("fr-FR", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                {event.location && (
                                  <p className="text-gray-400 font-medium flex items-center gap-2">
                                    <MapPin size={16} />
                                    {event.location}
                                  </p>
                                )}
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wide rounded-full border border-red-500/30">
                                    {getTypeLabel(event.type)}
                                  </span>
                                  <div className={`flex items-center gap-2 ${countdown.color} font-bold`}>
                                    <span>{countdown.icon}</span>
                                    <span>{countdown.text}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleRemove(event.id)}
                              icon={<X size={16} />}
                            >
                              SUPPRIMER
                            </Button>
                          </div>
                        </div>

                        {/* GLOW EFFECT */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-red-500/30"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(239, 68, 68, 0.4)',
                              '0 0 0 4px rgba(239, 68, 68, 0)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4 animate-spin">🏆</div>
              <p className="text-xl font-black font-arnold text-red-500 uppercase tracking-wider">
                CHARGEMENT DES BATAILLES...
              </p>
            </motion.div>
          )}
        </div>

        {/* FLOATING ACTION BUTTON */}
        {!showForm && totalEvents > 0 && (
          <BeastFAB
            onClick={() => setShowForm(true)}
            icon={<Plus size={24} />}
          />
        )}
      </div>
    </AuthGuard>
  );
}