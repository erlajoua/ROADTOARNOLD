"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { Event } from "@/types";
import { Calendar, Plus, MapPin, Trophy, Clock, X } from "lucide-react";

export default function EvenementsPage() {
  const {
    data: events,
    loading,
    add,
    update,
    remove,
  } = useFirestore<Event>("events");

  // Debug: Log des données
  React.useEffect(() => {
    console.log("📊 Events data:", events);
    console.log("⏳ Loading:", loading);
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
    
    console.log("📅 Ajout d'événement:", formData);
    
    try {
      const result = await add({
        name: formData.name,
        date: new Date(formData.date),
        type: formData.type,
        location: formData.location,
        status: "planned",
        notes: "",
      });
      
      console.log("✅ Événement ajouté avec succès:", result);
      
      // Message de confirmation
      
      setFormData({
        name: "",
        date: "",
        type: "local",
        location: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout:", error);
      alert("❌ Erreur lors de l'ajout de l'événement. Vérifiez la console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (eventId: string) => {
    console.log("🗑️ Suppression événement:", eventId);
    try {
      await remove(eventId);
      console.log("✅ Événement supprimé");
    } catch (error) {
      console.error("❌ Erreur lors de la suppression:", error);
    }
  };

  const getTypeIcon = (type: Event["type"]) => {
    switch(type) {
      case "local": return "🏠";
      case "regional": return "🏆";
      case "national": return "🇫🇷";
      default: return "📅";
    }
  };

  const getTypeLabel = (type: Event["type"]) => {
    switch(type) {
      case "local": return "Compétition Locale";
      case "regional": return "Compétition Régionale";
      case "national": return "Championnat National";
      default: return "Événement";
    }
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "Passé", color: "text-gray-500" };
    if (diffDays === 0) return { text: "Aujourd'hui !", color: "text-red-600" };
    if (diffDays === 1) return { text: "Demain", color: "text-orange-600" };
    if (diffDays <= 7) return { text: `Dans ${diffDays} jours`, color: "text-yellow-600" };
    if (diffDays <= 30) return { text: `Dans ${diffDays} jours`, color: "text-blue-600" };
    return { text: `Dans ${diffDays} jours`, color: "text-green-600" };
  };

  // SIMPLE : Juste afficher tous les événements triés par date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const totalEvents = events.length;

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Header avec bouton bien visible */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-iron-900 flex items-center">
            <Calendar className="mr-3 text-power-600" />
            Mes Compétitions
          </h1>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg font-semibold flex gap-2 items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2 text-black" />
            <span className="text-black">AJOUTER UNE COMPÉTITION</span>
          </Button>
        </div>

        {/* Stats simples */}
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-iron-900 mb-2">Mes Événements</h3>
            <p className="text-4xl font-bold text-power-600">
              {totalEvents}
            </p>
            <p className="text-iron-600">compétitions planifiées</p>
          </div>
        </Card>

        {/* GROS bouton d'ajout si pas d'événements */}
        {totalEvents === 0 && !showForm && (
          <Card className="text-center py-12">
            <Calendar className="w-16 h-16 text-power-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-iron-900 mb-4">
              Planifiez votre première compétition !
            </h2>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-power-600 hover:bg-power-700 text-white px-8 py-4 text-xl font-bold"
            >
              <Plus className="w-6 h-6 mr-3" />
              COMMENCER MAINTENANT
            </Button>
          </Card>
        )}

        {/* Bouton flottant d'ajout */}
        {!showForm && totalEvents > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-power-600 hover:bg-power-700 text-white w-16 h-16 rounded-full shadow-lg"
            >
              <Plus className="w-8 h-8" />
            </Button>
          </div>
        )}

        {/* Formulaire d'ajout simplifié */}
        {showForm && (
          <Card title="🎯 Ajouter une Compétition">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="📝 Nom de la compétition"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Championnat Régional 2025"
                  required
                />
                
                <Input
                  label="📅 Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-iron-700 mb-2">
                    🏆 Type de compétition
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
                    className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
                    required
                  >
                    <option value="local">🏠 Compétition Locale</option>
                    <option value="regional">🏆 Compétition Régionale</option>
                    <option value="national">🇫🇷 Championnat National</option>
                  </select>
                </div>

                <Input
                  label="📍 Lieu (optionnel)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Paris, France"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={!formData.name || !formData.date || isSubmitting}
                >
                  {isSubmitting 
                    ? '⏳ Ajout en cours...' 
                    : !formData.name || !formData.date 
                      ? '⏳ Remplir les champs' 
                      : '✅ Ajouter la Compétition'
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

        {/* TOUTES les compétitions */}
        <div>
          <h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
            <Trophy className="mr-2 text-power-600" />
            Mes Compétitions ({totalEvents})
          </h2>
          
          {totalEvents === 0 ? (
            <Card className="text-center py-8">
              <Calendar className="w-12 h-12 text-iron-400 mx-auto mb-4" />
              <p className="text-iron-600">Aucune compétition</p>
              <p className="text-sm text-iron-500">Ajoutez votre première compétition !</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sortedEvents.map((event) => {
                const countdown = getDaysUntil(event.date);
                
                return (
                  <Card key={event.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{getTypeIcon(event.type)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-iron-900">
                            {event.name}
                          </h3>
                          <p className="text-sm text-iron-600">
                            📅 {new Date(event.date).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          {event.location && (
                            <p className="text-sm text-iron-600">
                              📍 {event.location}
                            </p>
                          )}
                          <p className="text-xs text-iron-500">
                            {getTypeLabel(event.type)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleRemove(event.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* État vide */}
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : totalEvents === 0 && !showForm ? null : null}
      </div>
    </AuthGuard>
  );
}