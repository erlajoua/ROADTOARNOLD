// src/app/preparation/quotidien/page.tsx
"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { DailyTracking } from "@/types";
import { Moon, Droplets, Battery, Smile, Plus, Calendar } from "lucide-react";

export default function QuotidienPage() {
	const {
		data: trackings,
		loading,
		add,
		update,
		remove,
	} = useFirestore<DailyTracking>("dailyTracking");
	
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		date: new Date().toISOString().split('T')[0],
		sleepHours: "",
		sleepQuality: 3 as 1 | 2 | 3 | 4 | 5,
		hydrationLiters: "",
		energy: 3 as 1 | 2 | 3 | 4 | 5,
		mood: 3 as 1 | 2 | 3 | 4 | 5,
		notes: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await add({
			date: new Date(formData.date),
			sleep: {
				hours: Number(formData.sleepHours),
				quality: formData.sleepQuality,
			},
			hydration: {
				liters: Number(formData.hydrationLiters),
			},
			energy: formData.energy,
			mood: formData.mood,
			notes: formData.notes,
		});
		
		setFormData({
			date: new Date().toISOString().split('T')[0],
			sleepHours: "",
			sleepQuality: 3,
			hydrationLiters: "",
			energy: 3,
			mood: 3,
			notes: "",
		});
		setShowForm(false);
	};

	const getStarRating = (value: number, onChange: (value: 1 | 2 | 3 | 4 | 5) => void) => {
		return (
			<div className="flex space-x-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						type="button"
						onClick={() => onChange(star as 1 | 2 | 3 | 4 | 5)}
						className={`text-2xl ${
							star <= value ? "text-yellow-400" : "text-gray-300"
						}`}
					>
						⭐
					</button>
				))}
			</div>
		);
	};

	const getDisplayStars = (value: number) => {
		return "⭐".repeat(value) + "☆".repeat(5 - value);
	};

	const getMoodEmoji = (mood: number) => {
		const emojis = ["😢", "😞", "😐", "😊", "😄"];
		return emojis[mood - 1];
	};

	const getEnergyColor = (energy: number) => {
		const colors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-green-600"];
		return colors[energy - 1];
	};

	// Trier par date décroissante
	const sortedTrackings = [...trackings].sort((a, b) => 
		new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Calendar className="mr-3 text-power-600" />
						Suivi Quotidien
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvelle entrée
					</Button>
				</div>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Nouvelle entrée quotidienne">
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								label="Date"
								type="date"
								value={formData.date}
								onChange={(e) => setFormData({ ...formData, date: e.target.value })}
								required
							/>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Input
									label="Heures de sommeil"
									type="number"
									step="0.5"
									value={formData.sleepHours}
									onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
									required
								/>
								
								<div>
									<label className="block text-sm font-medium text-iron-700 mb-2">
										Qualité du sommeil
									</label>
									{getStarRating(formData.sleepQuality, (value) =>
										setFormData({ ...formData, sleepQuality: value })
									)}
								</div>
							</div>
							
							<Input
								label="Hydratation (litres)"
								type="number"
								step="0.1"
								value={formData.hydrationLiters}
								onChange={(e) => setFormData({ ...formData, hydrationLiters: e.target.value })}
								required
							/>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-iron-700 mb-2">
										Niveau d'énergie
									</label>
									{getStarRating(formData.energy, (value) =>
										setFormData({ ...formData, energy: value })
									)}
								</div>
								
								<div>
									<label className="block text-sm font-medium text-iron-700 mb-2">
										Humeur
									</label>
									{getStarRating(formData.mood, (value) =>
										setFormData({ ...formData, mood: value })
									)}
								</div>
							</div>
							
							<Input
								label="Notes (optionnel)"
								value={formData.notes}
								onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
								placeholder="Comment tu te sens, remarques particulières..."
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

				{/* Statistiques rapides */}
				{trackings.length > 0 && (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<Card className="text-center">
							<Moon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
							<p className="text-sm text-iron-600">Sommeil moyen</p>
							<p className="text-xl font-bold text-iron-900">
								{(trackings.reduce((acc, t) => acc + t.sleep.hours, 0) / trackings.length).toFixed(1)}h
							</p>
						</Card>
						<Card className="text-center">
							<Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
							<p className="text-sm text-iron-600">Hydratation moy.</p>
							<p className="text-xl font-bold text-iron-900">
								{(trackings.reduce((acc, t) => acc + t.hydration.liters, 0) / trackings.length).toFixed(1)}L
							</p>
						</Card>
						<Card className="text-center">
							<Battery className="h-6 w-6 text-green-600 mx-auto mb-2" />
							<p className="text-sm text-iron-600">Énergie moy.</p>
							<p className="text-xl font-bold text-iron-900">
								{(trackings.reduce((acc, t) => acc + t.energy, 0) / trackings.length).toFixed(1)}/5
							</p>
						</Card>
						<Card className="text-center">
							<Smile className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
							<p className="text-sm text-iron-600">Humeur moy.</p>
							<p className="text-xl font-bold text-iron-900">
								{(trackings.reduce((acc, t) => acc + t.mood, 0) / trackings.length).toFixed(1)}/5
							</p>
						</Card>
					</div>
				)}

				{/* Historique */}
				<div className="space-y-4">
					<h2 className="text-xl font-semibold text-iron-900">Historique</h2>
					{loading ? (
						<div className="text-center py-8">Chargement...</div>
					) : trackings.length === 0 ? (
						<Card className="text-center py-8">
							<Calendar className="w-12 h-12 text-iron-400 mx-auto mb-4" />
							<p className="text-iron-600">Aucune entrée pour le moment</p>
						</Card>
					) : (
						sortedTrackings.map((tracking) => (
							<Card key={tracking.id}>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold">
										{new Date(tracking.date).toLocaleDateString("fr-FR", {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</h3>
									<Button
										size="sm"
										variant="danger"
										onClick={() => remove(tracking.id)}
									>
										Supprimer
									</Button>
								</div>
								
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
									<div className="flex items-center space-x-2">
										<Moon className="h-4 w-4 text-blue-600" />
										<div>
											<p className="font-medium">{tracking.sleep.hours}h de sommeil</p>
											<p className="text-iron-600">{getDisplayStars(tracking.sleep.quality)}</p>
										</div>
									</div>
									
									<div className="flex items-center space-x-2">
										<Droplets className="h-4 w-4 text-blue-500" />
										<div>
											<p className="font-medium">{tracking.hydration.liters}L d'eau</p>
										</div>
									</div>
									
									<div className="flex items-center space-x-2">
										<Battery className={`h-4 w-4 ${getEnergyColor(tracking.energy)}`} />
										<div>
											<p className="font-medium">Énergie {tracking.energy}/5</p>
										</div>
									</div>
									
									<div className="flex items-center space-x-2">
										<span className="text-lg">{getMoodEmoji(tracking.mood)}</span>
										<div>
											<p className="font-medium">Humeur {tracking.mood}/5</p>
										</div>
									</div>
								</div>
								
								{tracking.notes && (
									<div className="mt-4 pt-4 border-t border-iron-200">
										<p className="text-iron-700 italic">"{tracking.notes}"</p>
									</div>
								)}
							</Card>
						))
					)}
				</div>
			</div>
		</AuthGuard>
	);
}