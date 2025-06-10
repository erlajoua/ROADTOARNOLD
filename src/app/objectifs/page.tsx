"use client";
import React, { useState, useEffect } from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { TrainingGoal } from "@/types";
import { Target, Plus, Trophy, X, Edit, Check } from "lucide-react";

interface PersonalRecord {
	id: string;
	movement: "bench" | "squat" | "deadlift";
	weight: number;
	date: Date;
}

export default function ObjectifsPage() {
	const {
		data: goals,
		loading,
		add,
		update,
		remove,
	} = useFirestore<TrainingGoal>("goals");

	// Debug: Log des données
	React.useEffect(() => {
		console.log("📊 Goals data:", goals);
		console.log("⏳ Loading:", loading);
	}, [goals, loading]);

	const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>([
		{
			id: "1",
			movement: "bench",
			weight: 85,
			date: new Date("2024-01-15"),
		},
		{
			id: "2",
			movement: "squat",
			weight: 120,
			date: new Date("2024-01-20"),
		},
		{
			id: "3",
			movement: "deadlift",
			weight: 140,
			date: new Date("2024-01-10"),
		},
	]);

	const [showForm, setShowForm] = useState(false);
	const [editingPR, setEditingPR] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		movement: "bench" as const,
		targetWeight: "",
		targetDate: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		console.log("🎯 Ajout d'objectif:", {
			movement: formData.movement,
			targetWeight: Number(formData.targetWeight),
			targetDate: formData.targetDate,
		});

		try {
			await add({
				movement: formData.movement,
				targetWeight: Number(formData.targetWeight),
				targetDate: new Date(formData.targetDate),
				achieved: false,
				notes: "",
			});

			console.log("✅ Objectif ajouté avec succès");

			setFormData({
				movement: "bench",
				targetWeight: "",
				targetDate: "",
			});
			setShowForm(false);
		} catch (error) {
			console.error("❌ Erreur lors de l'ajout:", error);
			alert("Erreur lors de l'ajout de l'objectif. Vérifiez la console.");
		}
	};

	const toggleGoalAchieved = async (goal: TrainingGoal) => {
		console.log("🔄 Toggle objectif:", goal.id, "vers", !goal.achieved);
		try {
			await update(goal.id, { achieved: !goal.achieved });
			console.log("✅ Objectif mis à jour");
		} catch (error) {
			console.error("❌ Erreur lors de la mise à jour:", error);
		}
	};

	const handleRemove = async (goalId: string) => {
		console.log("🗑️ Suppression objectif:", goalId);
		try {
			await remove(goalId);
			console.log("✅ Objectif supprimé");
		} catch (error) {
			console.error("❌ Erreur lors de la suppression:", error);
		}
	};

	const updatePR = (id: string, newWeight: number) => {
		setPersonalRecords((prev) =>
			prev.map((pr) =>
				pr.id === id
					? { ...pr, weight: newWeight, date: new Date() }
					: pr
			)
		);
		setEditingPR(null);
	};

	const getMovementIcon = (movement: "bench" | "squat" | "deadlift") => {
		switch (movement) {
			case "bench":
				return "💪";
			case "squat":
				return "🦵";
			case "deadlift":
				return "🏋️";
		}
	};

	const getMovementColor = (movement: "bench" | "squat" | "deadlift") => {
		switch (movement) {
			case "bench":
				return "from-red-600/20 to-red-700/30 border-red-500/50";
			case "squat":
				return "from-blue-600/20 to-blue-700/30 border-blue-500/50";
			case "deadlift":
				return "from-green-600/20 to-green-700/30 border-green-500/50";
		}
	};

	const getMovementName = (movement: "bench" | "squat" | "deadlift") => {
		switch (movement) {
			case "bench":
				return "Bench Press";
			case "squat":
				return "Squat";
			case "deadlift":
				return "Deadlift";
		}
	};

	const getDaysUntil = (targetDate: Date) => {
		const now = new Date();
		const target = new Date(targetDate);
		const diffTime = target.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0)
			return {
				text: `${Math.abs(diffDays)} jours de retard`,
				color: "text-red-600",
			};
		if (diffDays === 0)
			return { text: "Aujourd'hui !", color: "text-orange-600" };
		if (diffDays === 1) return { text: "Demain", color: "text-orange-600" };
		return { text: `${diffDays} jours`, color: "text-blue-600" };
	};

	// Stats simples
	const totalGoals = goals.length;
	const achievedGoals = goals.filter((g) => g.achieved).length;
	const activeGoals = goals.filter((g) => !g.achieved);

	return (
		<AuthGuard>
			<div className="space-y-6">
				{/* Header avec bouton bien visible */}
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<Target className="mr-3 text-power-600" />
						Mes Objectifs
					</h1>
					<Button
						onClick={() => setShowForm(true)}
						className="bg-power-600 hover:bg-power-700 text-black px-6 py-3 text-lg  font-semibold flex gap-2 items-center justify-center"
					>
						<Plus className="w-5 h-5 mr-2 text-black" />
						<span className="text-black">AJOUTER UN OBJECTIF</span>
					</Button>
				</div>

				{/* GROS bouton d'ajout si pas d'objectifs */}
				{totalGoals === 0 && !showForm && (
					<Card className="text-center py-12 flex items-center justify-center">
						<Target className="w-16 h-16 text-power-600 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-iron-900 mb-4">
							Créez votre premier objectif !
						</h2>
						<Button
							onClick={() => setShowForm(true)}
							className="bg-power-600 hover:bg-power-700 text-white px-8 py-4 text-xl font-bold w-full"
						>
							<Plus className="w-6 h-6" />
							COMMENCER MAINTENANT
						</Button>
					</Card>
				)}

				{/* Bouton flottant d'ajout rapide */}
				{!showForm && totalGoals > 0 && (
					<div className="fixed bottom-6 right-6 z-50">
						<Button
							onClick={() => setShowForm(true)}
							className="bg-power-600 hover:bg-power-700 text-white w-16 h-16 rounded-full shadow-lg"
						>
							<Plus className="w-8 h-8" />
						</Button>
					</div>
				)}

				{/* Stats simples */}
				<Card>
					<div className="text-center">
						<h3 className="text-lg font-semibold text-iron-900 mb-2">
							Progression
						</h3>
						<p className="text-4xl font-bold text-power-600">
							{achievedGoals} / {totalGoals}
						</p>
						<p className="text-iron-600">objectifs réalisés</p>
					</div>
				</Card>

				{/* Records personnels - BEAST MODE */}
				<Card title="🏆 Mes Records Personnels">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{personalRecords.map((pr) => (
							<div
								key={pr.id}
								className={`text-center p-6 rounded-xl bg-gradient-to-br ${getMovementColor(
									pr.movement
								)} border backdrop-blur-sm transition-all duration-300 hover:scale-105`}
							>
								<div className="text-4xl mb-4">
									{getMovementIcon(pr.movement)}
								</div>
								<h3 className="font-black text-red-500 text-lg uppercase tracking-wider mb-3">
									{getMovementName(pr.movement)}
								</h3>

								{editingPR === pr.id ? (
									<div className="mt-2">
										<input
											type="number"
											step="0.5"
											defaultValue={pr.weight}
											className="w-20 px-2 py-1 bg-dark-800 border border-red-500/50 rounded text-center text-gray-100 font-bold"
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													const newWeight = Number(
														(
															e.target as HTMLInputElement
														).value
													);
													updatePR(pr.id, newWeight);
												}
											}}
											autoFocus
										/>
										<div className="flex justify-center space-x-1 mt-2">
											<button
												onClick={() => {
													const input =
														document.querySelector(
															'input[type="number"]'
														) as HTMLInputElement;
													updatePR(
														pr.id,
														Number(input.value)
													);
												}}
												className="text-green-400 hover:text-green-300"
											>
												<Check className="w-4 h-4" />
											</button>
											<button
												onClick={() =>
													setEditingPR(null)
												}
												className="text-red-400 hover:text-red-300"
											>
												<X className="w-4 h-4" />
											</button>
										</div>
									</div>
								) : (
									<div className="mt-2">
										<p className="text-3xl font-black text-red-500 mb-2">
											{pr.weight} kg
										</p>
										<button
											onClick={() => setEditingPR(pr.id)}
											className="text-gray-400 hover:text-red-400 transition-colors"
										>
											<Edit className="w-4 h-4 mx-auto" />
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</Card>

				{/* Formulaire d'ajout */}
				{showForm && (
					<Card title="Ajouter un Objectif">
						<form
							onSubmit={handleSubmit}
							className="grid grid-cols-1 md:grid-cols-3 gap-4"
						>
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
									className="w-full px-3 py-2 border border-iron-300 rounded-md focus:ring-power-500 focus:border-power-500"
									required
								>
									<option value="bench">
										💪 Bench Press
									</option>
									<option value="squat">🦵 Squat</option>
									<option value="deadlift">
										🏋️ Deadlift
									</option>
								</select>
							</div>
							<Input
								label="Objectif (kg)"
								type="number"
								step="0.5"
								min="1"
								value={formData.targetWeight}
								onChange={(e) =>
									setFormData({
										...formData,
										targetWeight: e.target.value,
									})
								}
								placeholder="Ex: 100"
								required
							/>
							<Input
								label="Date cible"
								type="date"
								value={formData.targetDate}
								onChange={(e) =>
									setFormData({
										...formData,
										targetDate: e.target.value,
									})
								}
								min={new Date().toISOString().split("T")[0]}
								required
							/>
							<div className="md:col-span-3 flex space-x-2">
								<Button
									type="submit"
									disabled={
										!formData.targetWeight ||
										!formData.targetDate
									}
								>
									{!formData.targetWeight ||
									!formData.targetDate
										? "⏳ Remplir tous les champs"
										: "✅ Ajouter"}
								</Button>
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

				{/* Objectifs en cours */}
				{activeGoals.length > 0 && (
					<div>
						<h2 className="text-xl font-semibold text-iron-900 mb-4">
							Objectifs en cours ({activeGoals.length})
						</h2>
					</div>
				)}

				{/* Objectifs réalisés */}
				{achievedGoals > 0 && (
					<div>
						<h2 className="text-xl font-semibold text-iron-900 mb-4">
							Objectifs réalisés ({achievedGoals})
						</h2>
						<div className="grid gap-4">
							{goals
								.filter((g) => g.achieved)
								.sort(
									(a, b) =>
										new Date(
											b.updatedAt || b.createdAt
										).getTime() -
										new Date(
											a.updatedAt || a.createdAt
										).getTime()
								)
								.map((goal) => (
									<Card
										key={goal.id}
										className="bg-green-50 border-l-4 border-green-500"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<span className="text-3xl">
													{getMovementIcon(
														goal.movement
													)}
												</span>
												<div>
													<h3 className="text-lg font-semibold text-green-800">
														{getMovementName(
															goal.movement
														)}{" "}
														- {goal.targetWeight} kg
														✅
													</h3>
													<p className="text-sm text-green-600">
														Objectif atteint !
													</p>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button
													size="sm"
													variant="secondary"
													onClick={() =>
														toggleGoalAchieved(goal)
													}
												>
													Annuler
												</Button>
												<Button
													size="sm"
													variant="danger"
													onClick={() =>
														handleRemove(goal.id)
													}
												>
													<X className="w-4 h-4" />
												</Button>
											</div>
										</div>
									</Card>
								))}
						</div>
					</div>
				)}

				{/* État vide */}
				{loading ? (
					<div className="text-center py-8">Chargement...</div>
				) : totalGoals === 0 ? (
					<Card className="text-center py-8 flex items-center justify-center">
						<Target className="w-12 h-12 text-iron-400 mx-auto mb-4" />
						<p className="text-iron-600 mb-4">
							Aucun objectif défini pour le moment
						</p>
						<Button onClick={() => setShowForm(true)}>
							Créer mon premier objectif
						</Button>
					</Card>
				) : null}
			</div>
		</AuthGuard>
	);
}
