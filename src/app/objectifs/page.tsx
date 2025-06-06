"use client";
import React, { useState } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { TrainingGoal } from "@/types";
import { Target, Plus, Calendar, Weight } from "lucide-react";

export default function ObjectifsPage() {
	const {
		data: goals,
		loading,
		add,
		update,
		remove,
	} = useFirestore<TrainingGoal>("goals");
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		movement: "bench" as const,
		targetWeight: "",
		targetDate: "",
		notes: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await add({
			movement: formData.movement,
			targetWeight: Number(formData.targetWeight),
			targetDate: new Date(formData.targetDate),
			notes: formData.notes,
			achieved: false,
		});
		setFormData({
			movement: "bench",
			targetWeight: "",
			targetDate: "",
			notes: "",
		});
		setShowForm(false);
	};

	const toggleGoalAchieved = (goal: TrainingGoal) => {
		update(goal.id, { achieved: !goal.achieved });
	};

	return (
		<AuthGuard>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Target className="mr-3 text-power-600" />
						Objectifs d'Entraînement
					</h1>
					<Button onClick={() => setShowForm(true)}>
						<Plus className="w-4 h-4 mr-2" />
						Nouvel Objectif
					</Button>
				</div>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Ajouter un Objectif">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-iron-700 mb-2">
									Mouvement
								</label>
								<select
									value={formData.movement}
									onChange={(e) =>
										setFormData({
											...formData,
											movement: e.target.value as any,
										})
									}
									className="w-full px-3 py-2 border border-iron-300 rounded-md"
								>
									<option value="bench">Bench Press</option>
									<option value="squat">Squat</option>
									<option value="deadlift">Deadlift</option>
								</select>
							</div>
							<Input
								label="Poids Cible (kg)"
								type="number"
								value={formData.targetWeight}
								onChange={(e) =>
									setFormData({
										...formData,
										targetWeight: e.target.value,
									})
								}
								required
							/>
							<Input
								label="Date Cible"
								type="date"
								value={formData.targetDate}
								onChange={(e) =>
									setFormData({
										...formData,
										targetDate: e.target.value,
									})
								}
								required
							/>
							<Input
								label="Notes (optionnel)"
								value={formData.notes}
								onChange={(e) =>
									setFormData({
										...formData,
										notes: e.target.value,
									})
								}
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

				{/* Liste des objectifs */}
				<div className="grid gap-4">
					{loading ? (
						<div className="text-center py-8">Chargement...</div>
					) : goals.length === 0 ? (
						<Card className="text-center py-8">
							<Target className="w-12 h-12 text-iron-400 mx-auto mb-4" />
							<p className="text-iron-600">
								Aucun objectif défini pour le moment
							</p>
						</Card>
					) : (
						goals.map((goal) => (
							<Card key={goal.id}>
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-3 mb-2">
											<span className="text-2xl">
												{goal.movement === "bench"
													? "💪"
													: goal.movement === "squat"
													? "🦵"
													: "🏋️"}
											</span>
											<h3 className="text-lg font-semibold capitalize">
												{goal.movement}
											</h3>
											{goal.achieved && (
												<span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
													✅ Atteint
												</span>
											)}
										</div>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="flex items-center text-iron-600">
												<Weight className="w-4 h-4 mr-2" />
												Objectif: {goal.targetWeight} kg
											</div>
											<div className="flex items-center text-iron-600">
												<Calendar className="w-4 h-4 mr-2" />
												Date:{" "}
												{new Date(
													goal.targetDate
												).toLocaleDateString("fr-FR")}
											</div>
										</div>
										{goal.notes && (
											<p className="text-sm text-iron-600 mt-2">
												{goal.notes}
											</p>
										)}
									</div>
									<div className="flex flex-col space-y-2">
										<Button
											size="sm"
											variant={
												goal.achieved
													? "secondary"
													: "primary"
											}
											onClick={() =>
												toggleGoalAchieved(goal)
											}
										>
											{goal.achieved
												? "Non atteint"
												: "Atteint !"}
										</Button>
										<Button
											size="sm"
											variant="danger"
											onClick={() => remove(goal.id)}
										>
											Supprimer
										</Button>
									</div>
								</div>
							</Card>
						))
					)}
				</div>
			</div>
		</AuthGuard>
	);
}
