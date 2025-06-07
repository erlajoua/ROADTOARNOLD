// src/app/preparation/competition/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Trophy, Plus, X, Flame, Target, Clock } from "lucide-react";

interface CompetitionTask {
  id: string;
  task: string;
  category: 'mental' | 'physical' | 'equipment' | 'nutrition' | 'strategy';
  priority: 'high' | 'medium' | 'low';
}

export default function CompetitionPrepPage() {
  // Tâches spéciales jour de compétition
  const [competitionTasks, setCompetitionTasks] = useState<CompetitionTask[]>([
    { id: '1', task: 'Visualisation : voir mes 3 tentatives parfaites', category: 'mental', priority: 'high' },
    { id: '2', task: 'Sac de sport : maillot, chaussures, ceinture', category: 'equipment', priority: 'high' },
    { id: '3', task: 'Échauffement progressif habituel', category: 'physical', priority: 'high' },
    { id: '4', task: 'Repas 3h avant : glucides + protéines', category: 'nutrition', priority: 'medium' },
    { id: '5', task: 'Réviser mes poids d\'ouverture', category: 'strategy', priority: 'medium' },
    { id: '6', task: 'Playlist motivation prête', category: 'mental', priority: 'low' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    category: 'mental' as CompetitionTask['category'],
    priority: 'medium' as CompetitionTask['priority']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("🏆 Ajout de tâche compétition:", formData);

    try {
      const newTask: CompetitionTask = {
        id: Date.now().toString(),
        task: formData.task,
        category: formData.category,
        priority: formData.priority
      };

      setCompetitionTasks([...competitionTasks, newTask]);
      console.log("✅ Tâche compétition ajoutée avec succès");
      alert(`🏆 "${formData.task}" ajouté avec succès !`);

      setFormData({
        task: '',
        category: 'mental',
        priority: 'medium'
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout:", error);
      alert("❌ Erreur lors de l'ajout. Vérifiez la console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTask = (id: string) => {
    setCompetitionTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const getCategoryIcon = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return '🧠';
      case 'physical': return '💪';
      case 'equipment': return '🎒';
      case 'nutrition': return '🍎';
      case 'strategy': return '🎯';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'physical': return 'bg-red-100 text-red-800 border-red-200';
      case 'equipment': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'nutrition': return 'bg-green-100 text-green-800 border-green-200';
      case 'strategy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: CompetitionTask['category']) => {
    switch(category) {
      case 'mental': return 'Mental';
      case 'physical': return 'Physique';
      case 'equipment': return 'Équipement';
      case 'nutrition': return 'Nutrition';
      case 'strategy': return 'Stratégie';
      default: return 'Autre';
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
      case 'high': return 'Urgent';
      case 'medium': return 'Important';
      case 'low': return 'Optionnel';
      default: return 'Normal';
    }
  };

  // Trier par priorité
  const sortedTasks = [...competitionTasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const totalTasks = competitionTasks.length;

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Hero Section spéciale compétition */}
        <section className="text-center py-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              JOUR DE GUERRE
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">
              Aujourd'hui, tu écris l'histoire 🔥
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                FOCUS
              </div>
              <div className="flex items-center">
                <Flame className="w-4 h-4 mr-1" />
                INTENSITÉ
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                VICTOIRE
              </div>
            </div>
          </div>
        </section>

        {/* Header avec bouton */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-iron-900 flex items-center">
            <Clock className="mr-3 text-power-600" />
            Ma Check-list de Guerre
          </h2>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2 text-black" />
            <span className="text-black">AJOUTER UNE MISSION</span>
          </Button>
        </div>

        {/* Stats spéciales */}
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-iron-900 mb-2">Préparation au Combat</h3>
            <p className="text-4xl font-bold text-red-600">
              {totalTasks}
            </p>
            <p className="text-iron-600">missions préparées</p>
            <p className="text-sm text-iron-500 mt-2">💀 Aucune place pour l'imprévu</p>
          </div>
        </Card>

        {/* GROS bouton d'ajout si pas de tâches */}
        {totalTasks === 0 && !showForm && (
          <Card className="text-center py-12 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <Trophy className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-iron-900 mb-4">
              Prépare ton plan d'attaque !
            </h2>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-bold flex items-center justify-center gap-3 mx-auto"
            >
              <Plus className="w-6 h-6 text-white" />
              <span className="text-white">PREMIÈRE MISSION</span>
            </Button>
          </Card>
        )}

        {/* Bouton flottant spécial */}
        {!showForm && totalTasks > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center border-2 border-red-400"
            >
              <Plus className="w-8 h-8 text-white" />
            </Button>
          </div>
        )}

        {/* Formulaire d'ajout spécial */}
        {showForm && (
          <Card title="🎯 Nouvelle Mission de Guerre">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="🎭 Mission à accomplir"
                value={formData.task}
                onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                placeholder="Ex: Répéter mes cues techniques 10 fois"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-iron-700 mb-2">
                    🏷️ Domaine
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CompetitionTask['category'] })}
                    className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
                    required
                  >
                    <option value="mental">🧠 Mental</option>
                    <option value="physical">💪 Physique</option>
                    <option value="equipment">🎒 Équipement</option>
                    <option value="nutrition">🍎 Nutrition</option>
                    <option value="strategy">🎯 Stratégie</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-iron-700 mb-2">
                    ⚡ Priorité
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as CompetitionTask['priority'] })}
                    className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
                    required
                  >
                    <option value="high">🔴 Urgent</option>
                    <option value="medium">🟡 Important</option>
                    <option value="low">🟢 Optionnel</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={!formData.task || isSubmitting}
                >
                  {isSubmitting 
                    ? '⏳ Ajout en cours...' 
                    : !formData.task 
                      ? '⏳ Définir la mission' 
                      : '⚔️ Ajouter à la Liste'
                  }
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowForm(false)}
                >
                  ❌ Annuler
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Liste des missions */}
        {totalTasks > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-iron-900 mb-4">
              Mes Missions de Guerre ({totalTasks})
            </h2>
            
            <div className="grid gap-3">
              {sortedTasks.map((task) => (
                <Card 
                  key={task.id} 
                  className={`border-l-4 ${getCategoryColor(task.category).replace('bg-', 'border-').replace('100', '400')} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-iron-900 font-medium">
                            {task.task}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(task.category)}`}>
                            {getCategoryIcon(task.category)} {getCategoryLabel(task.category)}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {getPriorityIcon(task.priority)} {getPriorityLabel(task.priority)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-2 ml-2 rounded-full hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Conseils de guerre */}
        <Card title="⚔️ Conseils de Guerre" className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-red-800 mb-3 flex items-center">
                <Flame className="w-4 h-4 mr-2" />
                Avant la Bataille
              </h4>
              <div className="space-y-2 text-sm text-red-700">
                <p>• Arrive 2h avant pour dominer l'espace C'EST TOI L'ALPHA MALE</p>
                <p>• Visualise tes 3 tentatives parfaites MENTALISATION FRANCK ROPERS</p>
                <p>• Garde ta routine habituelle, ZERO changement, C'EST LE TALENT QUI SMURF</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Pendant le Combat
              </h4>
              <div className="space-y-2 text-sm text-orange-700">
                <p>• Respire profondément entre chaque tentative LE STRESS C'EST UNE INFORMATION</p>
                <p>• Communique clairement avec LE COACH</p>
                <p>• TAS JAMAIS RIEN ECHOUE A PART DES ENTRETIENS RH DE PD</p>
                <p>• QUE LE SANCHIN DE BRUNO NIGOUL SOIT AVEC TOI! 🔥</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AuthGuard>
  );
}