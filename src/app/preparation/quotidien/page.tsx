// src/app/preparation/quotidien/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { CheckSquare, Plus, X } from "lucide-react";

interface DailyTask {
  id: string;
  text: string;
  category: 'morning' | 'training' | 'evening' | 'general';
}

export default function QuotidienPage() {
  // Tâches quotidiennes locales
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    { id: '1', text: 'Boire 3L d\'eau', category: 'general' },
    { id: '2', text: 'Faire ma visualisation mentale', category: 'morning' },
    { id: '3', text: 'Échauffement complet', category: 'training' },
    { id: '4', text: 'Étirements post-training', category: 'training' },
    { id: '5', text: 'Lecture technique 15min', category: 'evening' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    category: 'general' as DailyTask['category']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("📋 Ajout de tâche quotidienne:", formData);

    try {
      const newTask: DailyTask = {
        id: Date.now().toString(),
        text: formData.text,
        category: formData.category
      };

      setDailyTasks([...dailyTasks, newTask]);
      console.log("✅ Tâche quotidienne ajoutée avec succès");

      setFormData({
        text: '',
        category: 'general'
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
    setDailyTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const getCategoryIcon = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return '🌅';
      case 'training': return '💪';
      case 'evening': return '🌙';
      case 'general': return '📝';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return 'bg-yellow-100 text-yellow-800';
      case 'training': return 'bg-red-100 text-red-800';
      case 'evening': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: DailyTask['category']) => {
    switch(category) {
      case 'morning': return 'Matin';
      case 'training': return 'Entraînement';
      case 'evening': return 'Soir';
      case 'general': return 'Général';
      default: return 'Autre';
    }
  };

  // Stats simples
  const totalTasks = dailyTasks.length;

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header avec bouton bien visible */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-iron-900 flex items-center">
            <CheckSquare className="mr-3 text-power-600" />
            Ma TodoList Quotidienne
          </h1>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2 text-black" />
            <span className="text-black">AJOUTER UNE TÂCHE</span>
          </Button>
        </div>

        {/* Stats simples */}
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-iron-900 mb-2">Mes Tâches</h3>
            <p className="text-4xl font-bold text-power-600">
              {totalTasks}
            </p>
            <p className="text-iron-600">tâches planifiées</p>
          </div>
        </Card>

        {/* GROS bouton d'ajout si pas de tâches */}
        {totalTasks === 0 && !showForm && (
          <Card className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-power-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-iron-900 mb-4">
              Créez vos premières tâches quotidiennes !
            </h2>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-power-600 hover:bg-power-700 text-black px-8 py-4 text-xl font-bold flex items-center justify-center gap-3 mx-auto"
            >
              <Plus className="w-6 h-6 text-black" />
              <span className="text-black">COMMENCER MAINTENANT</span>
            </Button>
          </Card>
        )}

        {/* Bouton flottant d'ajout */}
        {!showForm && totalTasks > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-power-600 hover:bg-power-700 text-black w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
            >
              <Plus className="w-8 h-8 text-black" />
            </Button>
          </div>
        )}

        {/* Formulaire d'ajout simplifié */}
        {showForm && (
          <Card title="📋 Ajouter une Tâche Quotidienne">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="📝 Tâche à faire"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Ex: Faire 20 min de visualisation"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-iron-700 mb-2">
                    🏷️ Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as DailyTask['category'] })}
                    className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
                    required
                  >
                    <option value="general">📝 Général</option>
                    <option value="morning">🌅 Matin</option>
                    <option value="training">💪 Entraînement</option>
                    <option value="evening">🌙 Soir</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={!formData.text || isSubmitting}
                >
                  {isSubmitting 
                    ? '⏳ Ajout en cours...' 
                    : !formData.text 
                      ? '⏳ Remplir le champ' 
                      : '✅ Ajouter la Tâche'
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

        {/* Liste des tâches */}
        {totalTasks > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-iron-900 mb-4">
              Mes Tâches du Jour ({totalTasks})
            </h2>
            
            <div className="grid gap-3">
              {dailyTasks.map((task) => (
                <Card key={task.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-iron-900 font-medium">
                            {task.text}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(task.category)}`}>
                            {getCategoryIcon(task.category)} {getCategoryLabel(task.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-1 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}