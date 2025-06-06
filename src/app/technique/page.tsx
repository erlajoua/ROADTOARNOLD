// src/app/technique/page.tsx
"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { TechniqueNote } from "@/types";
import { Zap, Plus, Search, Tag, BookOpen } from "lucide-react";

export default function TechniquePage() {
	const {
		data: notes,
		loading,
		add,
		update,
		remove,
	} = useFirestore<TechniqueNote>("techniqueNotes");
	
	const [showForm, setShowForm] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMovement, setSelectedMovement] = useState<TechniqueNote["movement"] | "all">("all");
	const [formData, setFormData] = useState({
		movement: "general" as TechniqueNote["movement"],
		title: "",
		content: "",
		tags: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await add({
			movement: formData.movement,
			title: formData.title,
			content: formData.content,
			tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
		});
		
		setFormData({
			movement: "general",
			title: "",
			content: "",
			tags: "",
		});
		setShowForm(false);
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
			case "bench": return "bg-red-100 text-red-800";
			case "squat": return "bg-blue-100 text-blue-800";
			case "deadlift": return "bg-green-100 text-green-800";
			case "general": return "bg-purple-100 text-purple-800";
			default: return "bg-gray-100 text-gray-800";
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

	// Filtrer les notes
	const filteredNotes = notes.filter(note => {
		const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		
		const matchesMovement = selectedMovement === "all" || note.movement === selectedMovement;
		
		return matchesSearch && matchesMovement;
	});

	// Regrouper par mouvement
	const notesByMovement = filteredNotes.reduce((acc, note) => {
		if (!acc[note.movement]) {
			acc[note.movement] = [];
		}
		acc[note.movement].push(note);
		return acc;
	}, {} as Record<TechniqueNote["movement"], TechniqueNote[]>);

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Zap className="mr-3 text-power-600" />
						Notes Techniques
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvelle note
					</Button>
				</div>

				{/* Filtres et recherche */}
				<Card>
					<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-3 h-4 w-4 text-iron-400" />
								<input
									type="text"
									placeholder="Rechercher dans les notes..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-3 py-2 border border-iron-300 rounded-md"
								/>
							</div>
						</div>
						<div>
							<select
								value={selectedMovement}
								onChange={(e) => setSelectedMovement(e.target.value as any)}
								className="px-3 py-2 border border-iron-300 rounded-md"
							>
								<option value="all">Tous les mouvements</option>
								<option value="bench">Bench Press</option>
								<option value="squat">Squat</option>
								<option value="deadlift">Deadlift</option>
								<option value="general">Général</option>
							</select>
						</div>
					</div>
				</Card>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Nouvelle note technique">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Mouvement
								</label>
								<select
									value={formData.movement}
									onChange={(e) => setFormData({ ...formData, movement: e.target.value as TechniqueNote["movement"] })}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
								>
									<option value="general">Général</option>
									<option value="bench">Bench Press</option>
									<option value="squat">Squat</option>
									<option value="deadlift">Deadlift</option>
								</select>
							</div>
							
							<Input
								label="Titre"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								placeholder="Ex: Position des pieds au bench"
								required
							/>
							
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Contenu
								</label>
								<textarea
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
									rows={4}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
									placeholder="Décris ici la technique, les points clés à retenir..."
									required
								/>
							</div>
							
							<Input
								label="Tags (séparés par des virgules)"
								value={formData.tags}
								onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
								placeholder="Ex: échauffement, respiration, position"
							/>
							
							<div className="flex space-x-2">
								<Button type="submit">Ajouter</Button>
								<Button
									type="button"
									variant="secondary"
									onClick={() => setShowForm(false)}
								>
									Annuler
								</Button>
							</div>
						</form>
					</Card>
				)}

				{/* Notes par mouvement */}
				{loading ? (
					<div className="text-center py-8">Chargement...</div>
				) : filteredNotes.length === 0 ? (
					<Card className="text-center py-8">
						<BookOpen className="w-12 h-12 text-iron-400 mx-auto mb-4" />
						<p className="text-iron-600">
							{searchTerm || selectedMovement !== "all" 
								? "Aucune note correspondant aux filtres"
								: "Aucune note technique pour le moment"
							}
						</p>
					</Card>
				) : (
					Object.entries(notesByMovement).map(([movement, movementNotes]) => (
						<div key={movement}>
							<h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
								<span className="text-2xl mr-2">{getMovementIcon(movement as TechniqueNote["movement"])}</span>
								{getMovementLabel(movement as TechniqueNote["movement"])} ({movementNotes.length})
							</h2>
							
							<div className="grid gap-4 mb-8">
								{movementNotes
									.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
									.map((note) => (
									<Card key={note.id}>
										<div className="flex items-start justify-between mb-3">
											<div className="flex items-center space-x-2">
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getMovementColor(note.movement)}`}>
													{getMovementIcon(note.movement)} {getMovementLabel(note.movement)}
												</span>
											</div>
											<Button
												size="sm"
												variant="danger"
												onClick={() => remove(note.id)}
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
										
										{note.tags.length > 0 && (
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
										
										<p className="text-xs text-iron-500">
											Créé le {new Date(note.createdAt).toLocaleDateString("fr-FR")}
										</p>
									</Card>
								))}
							</div>
						</div>
					))
				)}

				{/* Conseils techniques par défaut */}
				{notes.length === 0 && (
					<Card title="💡 Conseils pour débuter">
						<div className="space-y-4 text-sm text-iron-700">
							<div>
								<h4 className="font-semibold text-red-700 mb-2">💪 Bench Press</h4>
								<ul className="space-y-1 list-disc list-inside">
									<li>Pieds bien ancrés au sol</li>
									<li>Omoplates serrées</li>
									<li>Respiration : inspirer en descente, expirer en montée</li>
									<li>Barre au niveau des tétons</li>
								</ul>
							</div>
							
							<div>
								<h4 className="font-semibold text-blue-700 mb-2">🦵 Squat</h4>
								<ul className="space-y-1 list-disc list-inside">
									<li>Genoux dans l'axe des pieds</li>
									<li>Dos droit, regard vers l'avant</li>
									<li>Descendre jusqu'aux hanches sous les genoux</li>
									<li>Pousser fort sur les talons</li>
								</ul>
							</div>
							
							<div>
								<h4 className="font-semibold text-green-700 mb-2">🏋️ Deadlift</h4>
								<ul className="space-y-1 list-disc list-inside">
									<li>Barre proche des tibias</li>
									<li>Dos droit, épaules au-dessus de la barre</li>
									<li>Pousser le sol avec les pieds</li>
									<li>Hanches et épaules montent ensemble</li>
								</ul>
							</div>
						</div>
					</Card>
				)}
			</div>
		</AuthGuard>
	);
}