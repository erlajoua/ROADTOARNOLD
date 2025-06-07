// src/app/technique/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { TechniqueNote } from "@/types";
import { Zap, Plus, Tag, BookOpen } from "lucide-react";

export default function TechniquePage() {
	const {
		data: notes,
		loading,
		add,
		update,
		remove,
	} = useFirestore<TechniqueNote>("techniqueNotes");

	// Debug: Log des données
	React.useEffect(() => {
		console.log("⚡ Technique notes:", notes);
		console.log("⏳ Loading:", loading);
	}, [notes, loading]);
	
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		movement: "general" as TechniqueNote["movement"],
		title: "",
		content: "",
		tags: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		console.log("⚡ Ajout de note technique:", formData);

		try {
			await add({
				movement: formData.movement,
				title: formData.title,
				content: formData.content,
				tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
			});

			console.log("✅ Note technique ajoutée avec succès");
			
			setFormData({
				movement: "general",
				title: "",
				content: "",
				tags: "",
			});
			setShowForm(false);
		} catch (error) {
			console.error("❌ Erreur lors de l'ajout:", error);
			alert("❌ Erreur lors de l'ajout. Vérifiez la console.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRemove = async (noteId: string) => {
		console.log("🗑️ Suppression note:", noteId);
		try {
			await remove(noteId);
			console.log("✅ Note supprimée");
		} catch (error) {
			console.error("❌ Erreur lors de la suppression:", error);
		}
	};

	const getMovementIcon = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "💪";
			case "squat": return "🦵";
			case "deadlift": return "🏋️";
			case "general": return "📝";
			default: return "📝";
		}
	};

	const getMovementColor = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "bg-red-100 text-red-800 border-red-200";
			case "squat": return "bg-blue-100 text-blue-800 border-blue-200";
			case "deadlift": return "bg-green-100 text-green-800 border-green-200";
			case "general": return "bg-purple-100 text-purple-800 border-purple-200";
			default: return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getMovementLabel = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "Bench Press";
			case "squat": return "Squat";
			case "deadlift": return "Deadlift";
			case "general": return "Général";
			default: return "Autre";
		}
	};

	// Regrouper par mouvement
	const notesByMovement = notes.reduce((acc, note) => {
		if (!acc[note.movement]) {
			acc[note.movement] = [];
		}
		acc[note.movement].push(note);
		return acc;
	}, {} as Record<TechniqueNote["movement"], TechniqueNote[]>);

	// Ordre d'affichage des mouvements
	const movementOrder: TechniqueNote["movement"][] = ["bench", "squat", "deadlift", "general"];

	const totalNotes = notes.length;

	return (
		<AuthGuard>
			<div className="space-y-6">
				{/* Header avec bouton bien visible */}
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Zap className="mr-3 text-power-600" />
						Mes Notes Techniques
					</h1>
					<Button 
						onClick={() => setShowForm(true)}
						className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
					>
						<Plus className="w-5 h-5 mr-2 text-black" />
						<span className="text-black">AJOUTER UNE NOTE</span>
					</Button>
				</div>

				{/* Stats simples */}
				<Card>
					<div className="text-center">
						<h3 className="text-lg font-semibold text-iron-900 mb-2">Mes Notes</h3>
						<p className="text-4xl font-bold text-power-600">
							{totalNotes}
						</p>
						<p className="text-iron-600">notes techniques</p>
					</div>
				</Card>

				{/* GROS bouton d'ajout si pas de notes */}
				{totalNotes === 0 && !showForm && (
					<Card className="text-center py-12">
						<BookOpen className="w-16 h-16 text-power-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-iron-900 mb-4">
							Créez vos premières notes techniques !
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
				{!showForm && totalNotes > 0 && (
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
					<Card title="⚡ Ajouter une Note Technique">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-iron-700 mb-2">
										🏋️ Mouvement
									</label>
									<select
										value={formData.movement}
										onChange={(e) => setFormData({ ...formData, movement: e.target.value as TechniqueNote["movement"] })}
										className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
										required
									>
										<option value="general">📝 Général</option>
										<option value="bench">💪 Bench Press</option>
										<option value="squat">🦵 Squat</option>
										<option value="deadlift">🏋️ Deadlift</option>
									</select>
								</div>
								
								<Input
									label="📝 Titre"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									placeholder="Ex: Position des pieds au bench"
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
									placeholder="Décris ici la technique, les points clés à retenir..."
									required
								/>
							</div>
							
							<Input
								label="🏷️ Tags (optionnel, séparés par des virgules)"
								value={formData.tags}
								onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
								placeholder="Ex: échauffement, respiration, position"
							/>
							
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
											: '✅ Ajouter la Note'
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

				{/* Notes par mouvement */}
				{loading ? (
					<div className="text-center py-8">Chargement...</div>
				) : totalNotes === 0 ? null : (
					movementOrder.map((movement) => {
						const movementNotes = notesByMovement[movement];
						if (!movementNotes || movementNotes.length === 0) return null;
						
						return (
							<div key={movement}>
								<h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
									<span className="text-2xl mr-2">{getMovementIcon(movement)}</span>
									{getMovementLabel(movement)} ({movementNotes.length})
								</h2>
								
								<div className="grid gap-4 mb-8">
									{movementNotes
										.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
										.map((note) => (
										<Card 
											key={note.id}
											className={`border-l-4 ${getMovementColor(note.movement).replace('bg-', 'border-').replace('100', '400')}`}
										>
											<div className="flex items-start justify-between mb-3">
												<div className="flex items-center space-x-2">
													<span className={`px-2 py-1 rounded-full text-xs font-medium ${getMovementColor(note.movement)}`}>
														{getMovementIcon(note.movement)} {getMovementLabel(note.movement)}
													</span>
												</div>
												<Button
													size="sm"
													variant="danger"
													onClick={() => handleRemove(note.id)}
												>
													Supprimer
												</Button>
											</div>
											
											<h3 className="text-lg font-semibold text-iron-900 mb-2">
												{note.title}
											</h3>
											
											<p className="text-iron-700 mb-3 whitespace-pre-wrap">
												{note.content}
											</p>
											
											{note.tags && note.tags.length > 0 && (
												<div className="flex flex-wrap gap-2 mb-3">
													{note.tags.map((tag, index) => (
														<span
															key={index}
															className="flex items-center px-2 py-1 bg-iron-100 text-iron-600 text-xs rounded-full"
														>
															<Tag className="w-3 h-3 mr-1" />
															{tag}
														</span>
													))}
												</div>
											)}
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