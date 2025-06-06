// src/app/preparation/competition/page.tsx
"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { CompetitionPrep, CompetitionPrepItem } from "@/types";
import { Trophy, Plus, CheckSquare, Square, Trash2 } from "lucide-react";

export default function CompetitionPrepPage() {
	const {
		data: preps,
		loading,
		add,
		update,
		remove,
	} = useFirestore<CompetitionPrep>("competitionPrep");
	
	const [showForm, setShowForm] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [newCategory, setNewCategory] = useState<CompetitionPrepItem["category"]>("mental");

	// Créer une préparation par défaut si aucune n'existe
	React.useEffect(() => {
		if (!loading && preps.length === 0) {
			add({
				title: "Préparation Compétition",
				items: [
					{ id: "1", task: "Visualisation mentale", completed: false, category: "mental" },
					{ id: "2", task: "Sac de sport préparé", completed: false, category: "equipment" },
					{ id: "3", task: "Échauffement fait", completed: false, category: "physical" },
					{ id: "4", task: "Repas pré-compétition", completed: false, category: "nutrition" },
				]
			});
		}
	}, [loading, preps.length]);

	const currentPrep = preps[0]; // On prend la première préparation

	const addTask = async () => {
		if (!newTask.trim() || !currentPrep) return;
		
		const newItem: CompetitionPrepItem = {
			id: Date.now().toString(),
			task: newTask,
			completed: false,
			category: newCategory
		};
		
		await update(currentPrep.id, {
			items: [...currentPrep.items, newItem]
		});
		
		setNewTask("");
		setShowForm(false);
	};

	const toggleTask = async (taskId: string) => {
		if (!currentPrep) return;
		
		const updatedItems = currentPrep.items.map(item =>
			item.id === taskId ? { ...item, completed: !item.completed } : item
		);
		
		await update(currentPrep.id, { items: updatedItems });
	};

	const removeTask = async (taskId: string) => {
		if (!currentPrep) return;
		
		const updatedItems = currentPrep.items.filter(item => item.id !== taskId);
		await update(currentPrep.id, { items: updatedItems });
	};

	const getCategoryIcon = (category: CompetitionPrepItem["category"]) => {
		switch(category) {
			case "mental": return "🧠";
			case "physical": return "💪";
			case "equipment": return "🎒";
			case "nutrition": return "🍎";
			default: return "📝";
		}
	};

	const getCategoryColor = (category: CompetitionPrepItem["category"]) => {
		switch(category) {
			case "mental": return "bg-purple-100 text-purple-800";
			case "physical": return "bg-red-100 text-red-800";
			case "equipment": return "bg-blue-100 text-blue-800";
			case "nutrition": return "bg-green-100 text-green-800";
			default: return "bg-gray-100 text-gray-800";
		}
	};

	if (loading) {
		return (
			<AuthGuard>
				<div className="text-center py-8">Chargement...</div>
			</AuthGuard>
		);
	}

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Trophy className="mr-3 text-power-600" />
						Jour de Compétition
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Ajouter une tâche
					</Button>
				</div>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Nouvelle tâche">
						<div className="space-y-4">
							<Input
								label="Tâche"
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
								placeholder="Ex: Vérifier l'équipement"
							/>
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Catégorie
								</label>
								<select
									value={newCategory}
									onChange={(e) => setNewCategory(e.target.value as CompetitionPrepItem["category"])}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
								>
									<option value="mental">Mental</option>
									<option value="physical">Physique</option>
									<option value="equipment">Équipement</option>
									<option value="nutrition">Nutrition</option>
								</select>
							</div>
							<div className="flex space-x-2">
								<Button onClick={addTask}>Ajouter</Button>
								<Button
									variant="secondary"
									onClick={() => setShowForm(false)}
								>
									Annuler
								</Button>
							</div>
						</div>
					</Card>
				)}

				{/* Check-list */}
				{currentPrep && (
					<Card title="Check-list de Compétition">
						<div className="space-y-3">
							{currentPrep.items.length === 0 ? (
								<p className="text-center text-iron-600 py-8">
									Aucune tâche pour le moment
								</p>
							) : (
								currentPrep.items.map((item) => (
									<div
										key={item.id}
										className={`flex items-center space-x-3 p-3 rounded-lg border ${
											item.completed
												? "bg-green-50 border-green-200"
												: "bg-white border-iron-200"
										}`}
									>
										<button
											onClick={() => toggleTask(item.id)}
											className="flex-shrink-0"
										>
											{item.completed ? (
												<CheckSquare className="h-5 w-5 text-green-600" />
											) : (
												<Square className="h-5 w-5 text-iron-400" />
											)}
										</button>
										
										<div className="flex-1">
											<span
												className={`${
													item.completed
														? "line-through text-iron-500"
														: "text-iron-900"
												}`}
											>
												{item.task}
											</span>
										</div>
										
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
											{getCategoryIcon(item.category)} {item.category}
										</span>
										
										<button
											onClick={() => removeTask(item.id)}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								))
							)}
						</div>
						
						{/* Statistiques */}
						{currentPrep.items.length > 0 && (
							<div className="mt-6 pt-4 border-t border-iron-200">
								<div className="text-center">
									<p className="text-sm text-iron-600">Progression</p>
									<p className="text-2xl font-bold text-power-600">
										{Math.round((currentPrep.items.filter(item => item.completed).length / currentPrep.items.length) * 100)}%
									</p>
									<p className="text-sm text-iron-600">
										{currentPrep.items.filter(item => item.completed).length} / {currentPrep.items.length} tâches
									</p>
								</div>
							</div>
						)}
					</Card>
				)}

				{/* Conseils */}
				<Card title="Conseils pour le Jour J">
					<div className="space-y-3 text-sm text-iron-700">
						<p>• Arrive au moins 2h avant ta première tentative</p>
						<p>• Garde ta routine d'échauffement habituelle</p>
						<p>• Reste hydraté mais évite de boire trop près de tes tentatives</p>
						<p>• Visualise tes mouvements parfaits avant chaque tentative</p>
						<p>• Communique clairement avec tes handlers</p>
						<p>• Reste positif, même si une tentative échoue</p>
					</div>
				</Card>
			</div>
		</AuthGuard>
	);
}