// src/app/evenements/page.tsx
"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { Event } from "@/types";
import { Calendar, Plus, MapPin, Trophy, Clock } from "lucide-react";

export default function EvenementsPage() {
	const {
		data: events,
		loading,
		add,
		update,
		remove,
	} = useFirestore<Event>("events");
	
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		date: "",
		type: "local" as Event["type"],
		location: "",
		notes: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await add({
			name: formData.name,
			date: new Date(formData.date),
			type: formData.type,
			location: formData.location,
			notes: formData.notes,
		});
		
		setFormData({
			name: "",
			date: "",
			type: "local",
			location: "",
			notes: "",
		});
		setShowForm(false);
	};

	const getTypeIcon = (type: Event["type"]) => {
		switch(type) {
			case "local": return "🏠";
			case "regional": return "🏆";
			case "national": return "🇫🇷";
			case "international": return "🌍";
			default: return "📅";
		}
	};

	const getTypeColor = (type: Event["type"]) => {
		switch(type) {
			case "local": return "bg-blue-100 text-blue-800";
			case "regional": return "bg-green-100 text-green-800";
			case "national": return "bg-red-100 text-red-800";
			case "international": return "bg-purple-100 text-purple-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeLabel = (type: Event["type"]) => {
		switch(type) {
			case "local": return "Compétition Locale";
			case "regional": return "Compétition Régionale";
			case "national": return "Championnat National";
			case "international": return "Compétition Internationale";
			default: return "Événement";
		}
	};

	const getDaysUntil = (date: Date) => {
		const now = new Date();
		const eventDate = new Date(date);
		const diffTime = eventDate.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays < 0) return { text: "Passé", color: "text-gray-500" };
		if (diffDays === 0) return { text: "Aujourd'hui", color: "text-red-600" };
		if (diffDays === 1) return { text: "Demain", color: "text-orange-600" };
		if (diffDays <= 7) return { text: `Dans ${diffDays} jours`, color: "text-yellow-600" };
		if (diffDays <= 30) return { text: `Dans ${diffDays} jours`, color: "text-blue-600" };
		return { text: `Dans ${diffDays} jours`, color: "text-green-600" };
	};

	// Trier par date
	const sortedEvents = [...events].sort((a, b) => 
		new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const upcomingEvents = sortedEvents.filter(event => 
		new Date(event.date) >= new Date()
	);

	const pastEvents = sortedEvents.filter(event => 
		new Date(event.date) < new Date()
	);

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Calendar className="mr-3 text-power-600" />
						Événements & Compétitions
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvel événement
					</Button>
				</div>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Ajouter un événement">
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								label="Nom de l'événement"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								placeholder="Ex: Championnat Régional PowerFrance"
								required
							/>
							
							<Input
								label="Date"
								type="date"
								value={formData.date}
								onChange={(e) => setFormData({ ...formData, date: e.target.value })}
								required
							/>
							
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Type de compétition
								</label>
								<select
									value={formData.type}
									onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
								>
									<option value="local">Compétition Locale</option>
									<option value="regional">Compétition Régionale</option>
									<option value="national">Championnat National</option>
									<option value="international">Compétition Internationale</option>
								</select>
							</div>
							
							<Input
								label="Lieu (optionnel)"
								value={formData.location}
								onChange={(e) => setFormData({ ...formData, location: e.target.value })}
								placeholder="Ex: Salle de sport Municipal, Paris"
							/>
							
							<Input
								label="Notes (optionnel)"
								value={formData.notes}
								onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
								placeholder="Objectifs, préparation spéciale, etc."
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

				{/* Événements à venir */}
				<div>
					<h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
						<Clock className="mr-2 text-green-600" />
						Prochains événements ({upcomingEvents.length})
					</h2>
					
					{upcomingEvents.length === 0 ? (
						<Card className="text-center py-8">
							<Calendar className="w-12 h-12 text-iron-400 mx-auto mb-4" />
							<p className="text-iron-600">Aucun événement prévu</p>
						</Card>
					) : (
						<div className="grid gap-4">
							{upcomingEvents.map((event) => {
								const countdown = getDaysUntil(event.date);
								return (
									<Card key={event.id}>
										<div className="flex items-center justify-between">
											<div className="flex-1">
												<div className="flex items-center space-x-3 mb-2">
													<span className="text-2xl">{getTypeIcon(event.type)}</span>
													<h3 className="text-lg font-semibold text-iron-900">
														{event.name}
													</h3>
													<span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
														{getTypeLabel(event.type)}
													</span>
												</div>
												
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
													<div className="flex items-center text-iron-600">
														<Calendar className="w-4 h-4 mr-2" />
														{new Date(event.date).toLocaleDateString("fr-FR", {
															weekday: "long",
															year: "numeric",
															month: "long",
															day: "numeric",
														})}
													</div>
													
													{event.location && (
														<div className="flex items-center text-iron-600">
															<MapPin className="w-4 h-4 mr-2" />
															{event.location}
														</div>
													)}
												</div>
												
												{event.notes && (
													<p className="text-sm text-iron-600 mt-2 italic">
														{event.notes}
													</p>
												)}
											</div>
											
											<div className="flex flex-col items-end space-y-2">
												<span className={`text-lg font-bold ${countdown.color}`}>
													{countdown.text}
												</span>
												<Button
													size="sm"
													variant="danger"
													onClick={() => remove(event.id)}
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

				{/* Événements passés */}
				{pastEvents.length > 0 && (
					<div>
						<h2 className="text-xl font-semibold text-iron-900 mb-4 flex items-center">
							<Trophy className="mr-2 text-gray-600" />
							Événements passés ({pastEvents.length})
						</h2>
						
						<div className="grid gap-4">
							{pastEvents.reverse().map((event) => (
								<Card key={event.id} className="opacity-75">
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-3 mb-2">
												<span className="text-2xl filter grayscale">{getTypeIcon(event.type)}</span>
												<h3 className="text-lg font-semibold text-iron-700">
													{event.name}
												</h3>
												<span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
													Terminé
												</span>
											</div>
											
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-iron-500">
												<div className="flex items-center">
													<Calendar className="w-4 h-4 mr-2" />
													{new Date(event.date).toLocaleDateString("fr-FR")}
												</div>
												
												{event.location && (
													<div className="flex items-center">
														<MapPin className="w-4 h-4 mr-2" />
														{event.location}
													</div>
												)}
											</div>
											
											{event.notes && (
												<p className="text-sm text-iron-500 mt-2 italic">
													{event.notes}
												</p>
											)}
										</div>
										
										<Button
											size="sm"
											variant="danger"
											onClick={() => remove(event.id)}
										>
											Supprimer
										</Button>
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