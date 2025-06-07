// src/app/motivation/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { MotivationEntry } from "@/types";
import { Heart, Plus, Quote, Target, Flame } from "lucide-react";

export default function MotivationPage() {
	const {
		data: entries,
		loading,
		add,
		update,
		remove,
	} = useFirestore<MotivationEntry>("motivationEntries");

	// Debug: Log des données
	React.useEffect(() => {
		console.log("💪 Motivation entries:", entries);
		console.log("⏳ Loading:", loading);
	}, [entries, loading]);
	
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		type: "quote" as MotivationEntry["type"],
		title: "",
		content: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		console.log("💪 Ajout d'entrée motivation:", formData);

		try {
			await add({
				type: formData.type,
				title: formData.title,
				content: formData.content,
			});

			console.log("✅ Entrée motivation ajoutée avec succès");
			
			setFormData({
				type: "quote",
				title: "",
				content: "",
			});
			setShowForm(false);
		} catch (error) {
			console.error("❌ Erreur lors de l'ajout:", error);
			alert("❌ Erreur lors de l'ajout. Vérifiez la console.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRemove = async (entryId: string) => {
		console.log("🗑️ Suppression entrée:", entryId);
		try {
			await remove(entryId);
			console.log("✅ Entrée supprimée");
		} catch (error) {
			console.error("❌ Erreur lors de la suppression:", error);
		}
	};

	const getTypeIcon = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "❤️";
			case "quote": return "💬";
			case "mantra": return "🔥";
			case "goal": return "🎯";
			default: return "✨";
		}
	};

	const getTypeColor = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "bg-red-100 text-red-800 border-red-200";
			case "quote": return "bg-blue-100 text-blue-800 border-blue-200";
			case "mantra": return "bg-orange-100 text-orange-800 border-orange-200";
			case "goal": return "bg-green-100 text-green-800 border-green-200";
			default: return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getTypeLabel = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "Pourquoi";
			case "quote": return "Citation";
			case "mantra": return "Mantra";
			case "goal": return "Objectif";
			default: return "Autre";
		}
	};

	const getPlaceholder = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "Écris ici pourquoi tu fais du powerlifting...";
			case "quote": return "Une citation qui t'inspire...";
			case "mantra": return "Un mantra pour l'entraînement...";
			case "goal": return "Un objectif personnel...";
			default: return "Écris ton contenu motivant...";
		}
	};

	// Regrouper par type
	const entriesByType = entries.reduce((acc, entry) => {
		if (!acc[entry.type]) {
			acc[entry.type] = [];
		}
		acc[entry.type].push(entry);
		return acc;
	}, {} as Record<MotivationEntry["type"], MotivationEntry[]>);

	// Ordre d'affichage des types
	const typeOrder: MotivationEntry["type"][] = ["why", "goal", "mantra", "quote"];

	const totalEntries = entries.length;

	return (
		<AuthGuard>
			<div className="space-y-6">
				{/* Header avec bouton bien visible */}
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Heart className="mr-3 text-power-600" />
						Ma Motivation
					</h1>
					<Button 
						onClick={() => setShowForm(true)}
						className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
					>
						<Plus className="w-5 h-5 mr-2 text-black" />
						<span className="text-black">AJOUTER UNE MOTIVATION</span>
					</Button>
				</div>

				{/* Stats simples */}
				<Card>
					<div className="text-center">
						<h3 className="text-lg font-semibold text-iron-900 mb-2">Mes Motivations</h3>
						<p className="text-4xl font-bold text-power-600">
							{totalEntries}
						</p>
						<p className="text-iron-600">sources de motivation</p>
					</div>
				</Card>

				{/* GROS bouton d'ajout si pas d'entrées */}
				{totalEntries === 0 && !showForm && (
					<Card className="text-center py-12">
						<Heart className="w-16 h-16 text-power-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-iron-900 mb-4">
							Créez vos premières motivations !
						</h2>
						<Button 
							onClick={() => setShowForm(true)}
							className="bg-power-600 hover:bg-power-700 text-white px-8 py-4 text-xl font-bold"
						>
							<Plus className="w-6 h-6 mr-3 text-white" />
							<span className="text-white">COMMENCER MAINTENANT</span>
						</Button>
					</Card>
				)}

				{/* Bouton flottant d'ajout */}
				{!showForm && totalEntries > 0 && (
					<div className="fixed bottom-6 right-6 z-50">
						<Button 
							onClick={() => setShowForm(true)}
							className="bg-power-600 hover:bg-power-700 text-white w-16 h-16 rounded-full shadow-lg"
						>
							<Plus className="w-8 h-8 text-white" />
						</Button>
					</div>
				)}

				{/* Formulaire d'ajout simplifié */}
				{showForm && (
					<Card title="🎯 Ajouter une Motivation">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-iron-700 mb-2">
										🏷️ Type
									</label>
									<select
										value={formData.type}
										onChange={(e) => setFormData({ ...formData, type: e.target.value as MotivationEntry["type"] })}
										className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
										required
									>
										<option value="quote">💬 Citation</option>
										<option value="why">❤️ Pourquoi</option>
										<option value="mantra">🔥 Mantra</option>
										<option value="goal">🎯 Objectif</option>
									</select>
								</div>
								
								<Input
									label="📝 Titre"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									placeholder="Ex: Ma motivation principale"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									💭 Contenu
								</label>
								<textarea
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
									rows={4}
									className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
									placeholder={getPlaceholder(formData.type)}
									required
								/>
							</div>
							
							<div className="flex space-x-2 pt-4">
								<Button 
									type="submit" 
									className="flex-1"
									disabled={!formData.title || !formData.content || isSubmitting}
								>
									{isSubmitting 
										? '⏳ Ajout en cours...' 
										: !formData.title || !formData.content 
											? '⏳ Remplir les champs' 
											: '✅ Ajouter la Motivation'
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

				{/* Entrées par type */}
				{loading ? (
					<div className="text-center py-8">Chargement...</div>
				) : totalEntries === 0 ? null : (
					typeOrder.map((type) => {
						const typeEntries = entriesByType[type];
						if (!typeEntries || typeEntries.length === 0) return null;
						
						return (
							<div key={type}>
								<h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
									<span className="text-2xl mr-2">{getTypeIcon(type)}</span>
									{getTypeLabel(type)} ({typeEntries.length})
								</h2>
								
								<div className="grid gap-4 mb-8">
									{typeEntries
										.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
										.map((entry) => (
										<Card 
											key={entry.id} 
											className={`border-l-4 ${getTypeColor(entry.type).replace('bg-', 'border-').replace('100', '400')}`}
										>
											<div className="flex items-start justify-between mb-3">
												<div className="flex items-center space-x-2">
													<span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(entry.type)}`}>
														{getTypeIcon(entry.type)} {getTypeLabel(entry.type)}
													</span>
												</div>
												<Button
													size="sm"
													variant="danger"
													onClick={() => handleRemove(entry.id)}
												>
													Supprimer
												</Button>
											</div>
											
											<h3 className="text-lg font-semibold text-iron-900 mb-3">
												{entry.title}
											</h3>
											
											<div className={`p-4 rounded-lg mb-3 ${getTypeColor(entry.type)}`}>
												<p className="text-gray-800 whitespace-pre-wrap italic">
													"{entry.content}"
												</p>
											</div>
										</Card>
									))}
								</div>
							</div>
						);
					})
				)}
			</div>
		</AuthGuard>
	);
}