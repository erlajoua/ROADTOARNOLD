// src/app/motivation/page.tsx
"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { MotivationEntry } from "@/types";
import { Heart, Plus, Quote, Target, Flame, Star } from "lucide-react";

export default function MotivationPage() {
	const {
		data: entries,
		loading,
		add,
		update,
		remove,
	} = useFirestore<MotivationEntry>("motivationEntries");
	
	const [showForm, setShowForm] = useState(false);
	const [selectedType, setSelectedType] = useState<MotivationEntry["type"] | "all">("all");
	const [formData, setFormData] = useState({
		type: "quote" as MotivationEntry["type"],
		title: "",
		content: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await add({
			type: formData.type,
			title: formData.title,
			content: formData.content,
		});
		
		setFormData({
			type: "quote",
			title: "",
			content: "",
		});
		setShowForm(false);
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
			case "why": return "Écris ici pourquoi tu fais du powerlifting, ce qui te motive profondément...";
			case "quote": return "Une citation qui t'inspire, de toi ou de quelqu'un d'autre...";
			case "mantra": return "Un mantra que tu peux te répéter pendant l'entraînement...";
			case "goal": return "Un objectif personnel qui te fait vibrer...";
			default: return "Écris ton contenu motivant...";
		}
	};

	// Filtrer les entrées
	const filteredEntries = entries.filter(entry => 
		selectedType === "all" || entry.type === selectedType
	);

	// Regrouper par type
	const entriesByType = filteredEntries.reduce((acc, entry) => {
		if (!acc[entry.type]) {
			acc[entry.type] = [];
		}
		acc[entry.type].push(entry);
		return acc;
	}, {} as Record<MotivationEntry["type"], MotivationEntry[]>);

	// Ordre d'affichage des types
	const typeOrder: MotivationEntry["type"][] = ["why", "goal", "mantra", "quote"];

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Heart className="mr-3 text-power-600" />
						Motivation
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvelle entrée
					</Button>
				</div>

				{/* Citation du jour */}
				<Card className="bg-gradient-to-r from-power-600 to-power-700 text-white">
					<div className="text-center">
						<Quote className="w-8 h-8 mx-auto mb-4 opacity-75" />
						<blockquote className="text-xl md:text-2xl font-medium mb-4">
							"Le champion se révèle quand tout le monde a abandonné"
						</blockquote>
						<p className="opacity-75">— Ta détermination intérieure</p>
					</div>
				</Card>

				{/* Filtres */}
				<Card>
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setSelectedType("all")}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								selectedType === "all"
									? "bg-power-600 text-white"
									: "bg-iron-100 text-iron-700 hover:bg-iron-200"
							}`}
						>
							Tout voir
						</button>
						{typeOrder.map((type) => (
							<button
								key={type}
								onClick={() => setSelectedType(type)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
									selectedType === type
										? "bg-power-600 text-white"
										: "bg-iron-100 text-iron-700 hover:bg-iron-200"
								}`}
							>
								<span>{getTypeIcon(type)}</span>
								<span>{getTypeLabel(type)}</span>
							</button>
						))}
					</div>
				</Card>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Nouvelle entrée motivante">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Type
								</label>
								<select
									value={formData.type}
									onChange={(e) => setFormData({ ...formData, type: e.target.value as MotivationEntry["type"] })}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
								>
									<option value="quote">Citation</option>
									<option value="why">Pourquoi</option>
									<option value="mantra">Mantra</option>
									<option value="goal">Objectif</option>
								</select>
							</div>
							
							<Input
								label="Titre"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								placeholder="Ex: Ma motivation principale"
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
									placeholder={getPlaceholder(formData.type)}
									required
								/>
							</div>
							
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

				{/* Entrées par type */}
				{loading ? (
					<div className="text-center py-8">Chargement...</div>
				) : filteredEntries.length === 0 ? (
					<Card className="text-center py-8">
						<Heart className="w-12 h-12 text-iron-400 mx-auto mb-4" />
						<p className="text-iron-600">
							{selectedType !== "all" 
								? `Aucune entrée de type "${getTypeLabel(selectedType)}"`
								: "Aucune entrée motivante pour le moment"
							}
						</p>
					</Card>
				) : (
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
										.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
													onClick={() => remove(entry.id)}
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
											
											<p className="text-xs text-iron-500">
												Créé le {new Date(entry.createdAt).toLocaleDateString("fr-FR")}
											</p>
										</Card>
									))}
								</div>
							</div>
						);
					})
				)}

				{/* Inspiration par défaut */}
				{entries.length === 0 && (
					<div className="grid md:grid-cols-2 gap-6">
						<Card title="🔥 Mantras Puissants" className="border-l-4 border-orange-400">
							<div className="space-y-3 text-sm">
								<p className="italic">"Un rep de plus, un pas de plus vers la grandeur"</p>
								<p className="italic">"Je ne m'arrête pas quand je suis fatigué, je m'arrête quand j'ai fini"</p>
								<p className="italic">"Chaque entraînement me rapproche de mon record"</p>
								<p className="italic">"La douleur est temporaire, la fierté est éternelle"</p>
							</div>
						</Card>
						
						<Card title="❤️ Rappelle-toi Pourquoi" className="border-l-4 border-red-400">
							<div className="space-y-3 text-sm text-iron-700">
								<p>• Pour prouver de quoi tu es capable</p>
								<p>• Pour inspirer les autres</p>
								<p>• Pour repousser tes limites</p>
								<p>• Pour la satisfaction du dépassement</p>
								<p>• Pour écrire ton nom dans l'histoire</p>
							</div>
						</Card>
						
						<Card title="🎯 Objectifs Inspirants" className="border-l-4 border-green-400">
							<div className="space-y-3 text-sm text-iron-700">
								<p>• Battre le record junior bench press</p>
								<p>• Atteindre les minimas squat et deadlift</p>
								<p>• Devenir une référence de ta catégorie</p>
								<p>• Inspirer la prochaine génération</p>
							</div>
						</Card>
						
						<Card title="💬 Citations Légendaires" className="border-l-4 border-blue-400">
							<div className="space-y-3 text-sm">
								<p className="italic">"Champions aren't made in the gyms. Champions are made from something deep inside them - a desire, a dream, a vision." - Muhammad Ali</p>
								<p className="italic">"The iron never lies to you." - Henry Rollins</p>
								<p className="italic">"Strength does not come from physical capacity. It comes from an indomitable will." - Mahatma Gandhi</p>
							</div>
						</Card>
					</div>
				)}
			</div>
		</AuthGuard>
	);
}