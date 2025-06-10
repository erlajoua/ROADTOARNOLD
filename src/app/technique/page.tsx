"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card, BeastStatsCard } from "@/components/UI/Card";
import { Button, BeastFAB } from "@/components/UI/Button";
import { Input, TextArea } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { TechniqueNote } from "@/types";
import { Zap, Plus, Tag, BookOpen, Skull, Flame, X, Timer, Crown, Target } from "lucide-react";

export default function TechniquePage() {
	const {
		data: notes,
		loading,
		add,
		update,
		remove,
	} = useFirestore<TechniqueNote>("techniqueNotes");

	// DEBUG CONSOLE - BEAST MODE
	React.useEffect(() => {
		console.log("⚡ BEAST TECHNIQUE LOADED:", notes);
		console.log("⏳ LOADING STATUS:", loading);
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

		console.log("⚡ BEAST TECHNIQUE CREATION:", formData);

		try {
			await add({
				movement: formData.movement,
				title: formData.title,
				content: formData.content,
				tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
			});

			console.log("✅ BEAST TECHNIQUE CREATED");
			
			setFormData({
				movement: "general",
				title: "",
				content: "",
				tags: "",
			});
			setShowForm(false);
		} catch (error) {
			console.error("❌ BEAST TECHNIQUE CREATION FAILED:", error);
			alert("❌ TECHNIQUE CREATION FAILED - CHECK CONSOLE");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRemove = async (noteId: string) => {
		console.log("🗑️ BEAST TECHNIQUE DELETION:", noteId);
		try {
			await remove(noteId);
			console.log("✅ BEAST TECHNIQUE DELETED");
		} catch (error) {
			console.error("❌ BEAST TECHNIQUE DELETION FAILED:", error);
		}
	};

	const getMovementIcon = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "💪";
			case "squat": return "🦵";
			case "deadlift": return "🏋️";
			case "general": return "⚡";
			default: return "📝";
		}
	};

	const getMovementColor = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "from-red-600/20 to-red-700/30 border-red-500/50";
			case "squat": return "from-blue-600/20 to-blue-700/30 border-blue-500/50";
			case "deadlift": return "from-green-600/20 to-green-700/30 border-green-500/50";
			case "general": return "from-purple-600/20 to-purple-700/30 border-purple-500/50";
			default: return "from-gray-600/20 to-gray-700/30 border-gray-500/50";
		}
	};

	const getMovementLabel = (movement: TechniqueNote["movement"]) => {
		switch(movement) {
			case "bench": return "BENCH PRESS";
			case "squat": return "SQUAT";
			case "deadlift": return "DEADLIFT";
			case "general": return "GÉNÉRAL";
			default: return "AUTRE";
		}
	};

	// BEAST MODE PREDEFINED TECHNIQUES
	const beastTechniques = [
		{
			movement: "bench" as const,
			title: "ARNOLD'S BENCH DOMINANCE",
			content: "PUMP PUMP PUMP",
			tags: ["arnold", "setup", "puissance"]
		},
		{
			movement: "squat" as const,
			title: "MENTZER'S SQUAT INTENSITY",
			content: "until failure.",
			tags: ["mentzer", "intensité", "contrôle"]
		},
		{
			movement: "deadlift" as const,
			title: "DEADLIFT",
			content: "que les bras de jon jones soient avec toi",
			tags: ["beast", "force", "technique"]
		}
	];

	// GROUP BY MOVEMENT
	const notesByMovement = notes.reduce((acc, note) => {
		if (!acc[note.movement]) {
			acc[note.movement] = [];
		}
		acc[note.movement].push(note);
		return acc;
	}, {} as Record<TechniqueNote["movement"], TechniqueNote[]>);

	// MOVEMENT ORDER
	const movementOrder: TechniqueNote["movement"][] = ["bench", "squat", "deadlift", "general"];

	const totalNotes = notes.length;

	return (
		<AuthGuard>
			<div className="min-h-screen relative overflow-hidden">
				{/* ELECTRIC BACKGROUND - ✅ CORRIGÉ */}
				<div className="fixed inset-0 opacity-5 pointer-events-none">
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
				</div>

				<div className="relative z-10 space-y-8">
					{/* HERO HEADER - BEAST TECHNIQUE */}
					<motion.section
						className="relative py-16 overflow-hidden"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{/* BACKGROUND EFFECTS - ✅ CORRIGÉ */}
						<div className="absolute inset-0 pointer-events-none">
							<motion.div
								className="absolute top-0 right-1/3 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"
								animate={{
									scale: [1, 1.3, 1],
									opacity: [0.3, 0.7, 0.3]
								}}
								transition={{ duration: 4, repeat: Infinity }}
							/>
						</div>

						<div className="relative z-10 text-center px-4">
							{/* MAIN ICON */}
							<motion.div
								className="mb-8"
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<motion.div
									className="text-8xl inline-block"
									animate={{
										textShadow: [
											'0 0 20px rgba(239, 68, 68, 0.8)',
											'0 0 40px rgba(239, 68, 68, 1)',
											'0 0 20px rgba(239, 68, 68, 0.8)'
										]
									}}
									transition={{ duration: 2, repeat: Infinity }}
								>
									⚡
								</motion.div>
							</motion.div>

							{/* TITLE */}
							<motion.h1
								className="text-5xl md:text-7xl font-black font-arnold mb-4 leading-none"
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.3 }}
							>
								<span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
									NOTES TECHNIQUES
								</span>
							</motion.h1>

							{/* SUBTITLE */}
							<motion.p
								className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-8"
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.6 }}
							>
								PERFECTIONNER CHAQUE MOUVEMENT
							</motion.p>

							{/* CTA BUTTON */}
							<motion.div
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.9 }}
								className="flex items-center justify-center"
							>
								<Button
									onClick={() => setShowForm(true)}
									size="xl"
									icon={<Zap size={24} />}
									className="shadow-beast-ultimate"
								>
									AJOUTER UNE TECHNIQUE
								</Button>
							</motion.div>
						</div>
					</motion.section>

					{/* STATS CARDS - BEAST MODE */}
					<motion.section
						className="px-4 max-w-7xl mx-auto"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.2 }}
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
							<BeastStatsCard
								value={totalNotes}
								label="NOTES TECHNIQUES"
								icon={<BookOpen size={32} />}
							/>
							<BeastStatsCard
								value={notes.filter(n => n.movement === 'bench').length}
								label="BENCH TECHNIQUES"
								icon={<Target size={32} />}
								color="gold"
							/>
							<BeastStatsCard
								value={notes.reduce((acc, n) => acc + (n.tags?.length || 0), 0)}
								label="TAGS TOTAUX"
								icon={<Tag size={32} />}
							/>
						</div>
					</motion.section>

					{/* EMPTY STATE - BEAST TECHNIQUE */}
					{totalNotes === 0 && !showForm && (
						<motion.section
							className="px-4 max-w-4xl mx-auto"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 1.5 }}
						>
							<Card className="text-center py-16">
								<motion.div
									className="text-8xl mb-8"
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									⚡
								</motion.div>
								<h2 className="text-4xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
									PREMIÈRE TECHNIQUE
								</h2>
								<p className="text-xl text-gray-400 font-bold mb-8 uppercase tracking-wide">
									"PERFECTION IS NOT AN ACCIDENT"
								</p>

								{/* QUICK ADD BEAST TECHNIQUES */}
								<div className="space-y-4 mb-8">
									<p className="text-gray-400 font-bold uppercase tracking-wide text-sm">
										OU COMMENCE AVEC UNE TECHNIQUE BEAST :
									</p>
									<div className="grid gap-3">
										{beastTechniques.map((technique, index) => (
											<motion.button
												key={index}
												onClick={async () => {
													try {
														await add(technique);
														console.log("✅ BEAST TECHNIQUE ADDED");
													} catch (error) {
														console.error("❌ FAILED TO ADD BEAST TECHNIQUE:", error);
													}
												}}
												className={`p-4 bg-gradient-to-r ${getMovementColor(technique.movement)} rounded-lg text-left hover:scale-105 transition-all duration-300`}
												whileHover={{ y: -2 }}
												whileTap={{ scale: 0.95 }}
											>
												<div className="flex items-center gap-3 mb-2">
													<span className="text-2xl">{getMovementIcon(technique.movement)}</span>
													<div className="text-sm font-bold text-red-400">
														{technique.title}
													</div>
												</div>
												<div className="text-gray-300 font-medium text-sm">
													{technique.content.substring(0, 100)}...
												</div>
											</motion.button>
										))}
									</div>
								</div>

								<Button
									onClick={() => setShowForm(true)}
									size="xl"
									icon={<Zap size={24} />}
								>
									CRÉER MA TECHNIQUE
								</Button>
							</Card>
						</motion.section>
					)}

					{/* FORM MODAL - BEAST MODE - ✅ CORRIGÉ */}
					<AnimatePresence>
						{showForm && (
							<motion.div
								className="fixed inset-0 z-50 flex items-center justify-center p-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								style={{ pointerEvents: showForm ? 'auto' : 'none' }}
							>
								{/* BACKDROP - ✅ CORRIGÉ */}
								<motion.div
									className="absolute inset-0 bg-black/80 backdrop-blur-sm"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setShowForm(false)}
									style={{ pointerEvents: 'auto' }}
								/>

								{/* FORM - ✅ CORRIGÉ */}
								<motion.div
									className="relative w-full max-w-md"
									initial={{ scale: 0.9, y: 50 }}
									animate={{ scale: 1, y: 0 }}
									exit={{ scale: 0.9, y: 50 }}
									transition={{ duration: 0.3 }}
									style={{ pointerEvents: 'auto' }}
								>
									<Card title="⚡ NOUVELLE TECHNIQUE">
										<form onSubmit={handleSubmit} className="space-y-6">
											{/* MOVEMENT SELECT */}
											<div>
												<label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
													🏋️ MOUVEMENT
												</label>
												<select
													value={formData.movement}
													onChange={(e) => setFormData({ ...formData, movement: e.target.value as TechniqueNote["movement"] })}
													className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
													required
												>
													<option value="general">⚡ GÉNÉRAL</option>
													<option value="bench">💪 BENCH PRESS</option>
													<option value="squat">🦵 SQUAT</option>
													<option value="deadlift">🏋️ DEADLIFT</option>
												</select>
											</div>
											
											{/* TITLE */}
											<Input
												label="📝 TITRE"
												value={formData.title}
												onChange={(e) => setFormData({ ...formData, title: e.target.value })}
												placeholder="Ex: Position des pieds au bench"
												required
											/>
											
											{/* CONTENT */}
											<TextArea
												label="💭 CONTENU TECHNIQUE"
												value={formData.content}
												onChange={(e) => setFormData({ ...formData, content: e.target.value })}
												placeholder="Décris ici la technique, les points clés à retenir, les cues importants..."
												rows={5}
												required
											/>
											
											{/* TAGS */}
											<Input
												label="🏷️ TAGS (SÉPARÉS PAR DES VIRGULES)"
												value={formData.tags}
												onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
												placeholder="Ex: échauffement, respiration, position, force"
											/>
											
											{/* BUTTONS */}
											<div className="flex gap-3 pt-4">
												<Button
													type="submit"
													className="flex-1"
													disabled={!formData.title || !formData.content || isSubmitting}
													icon={isSubmitting ? <Timer size={20} /> : <Zap size={20} />}
												>
													{isSubmitting 
														? 'CRÉATION...' 
														: !formData.title || !formData.content 
															? 'COMPLÉTER' 
															: 'AJOUTER LA TECHNIQUE'
													}
												</Button>
												<Button
													type="button"
													variant="secondary"
													onClick={() => setShowForm(false)}
													icon={<X size={20} />}
												>
													ANNULER
												</Button>
											</div>
										</form>
									</Card>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* NOTES BY MOVEMENT - BEAST MODE */}
					{loading ? (
						<motion.div
							className="text-center py-16"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<div className="text-6xl mb-4 animate-spin">⚡</div>
							<p className="text-xl font-black font-arnold text-red-500 uppercase tracking-wider">
								CHARGEMENT DES TECHNIQUES...
							</p>
						</motion.div>
					) : totalNotes === 0 ? null : (
						<motion.section
							className="px-4 max-w-7xl mx-auto pb-20"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1.8 }}
						>
							{movementOrder.map((movement) => {
								const movementNotes = notesByMovement[movement];
								if (!movementNotes || movementNotes.length === 0) return null;
								
								return (
									<div key={movement} className="mb-12">
										<h2 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider flex items-center gap-3">
											<span className="text-4xl">{getMovementIcon(movement)}</span>
											{getMovementLabel(movement)} ({movementNotes.length})
										</h2>
										
										<div className="grid gap-6">
											{movementNotes
												.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
												.map((note, index) => (
												<motion.div
													key={note.id}
													initial={{ opacity: 0, x: -50 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: index * 0.1 }}
												>
													<Card className={`bg-gradient-to-r ${getMovementColor(note.movement)} hover:scale-105 transition-all duration-300`}>
														<div className="flex items-start justify-between mb-4">
															<div className="flex items-center gap-3">
																<motion.div
																	className="text-3xl"
																	whileHover={{ rotate: 360, scale: 1.2 }}
																	transition={{ duration: 0.5 }}
																>
																	{getMovementIcon(note.movement)}
																</motion.div>
																<span className="px-3 py-1 bg-red-600/20 text-red-400 text-sm font-bold uppercase tracking-wide rounded-full border border-red-500/30">
																	{getMovementLabel(note.movement)}
																</span>
															</div>
															<Button
																size="sm"
																variant="danger"
																onClick={() => handleRemove(note.id)}
																icon={<X size={16} />}
															>
																SUPPRIMER
															</Button>
														</div>
														
														<h3 className="text-xl font-black text-red-500 uppercase tracking-wider mb-4">
															{note.title}
														</h3>
														
														<div className="p-4 bg-dark-900/50 rounded-lg border border-red-500/20 mb-4">
															<p className="text-gray-100 whitespace-pre-wrap font-medium leading-relaxed">
																{note.content}
															</p>
														</div>
														
														{note.tags && note.tags.length > 0 && (
															<div className="flex flex-wrap gap-2">
																{note.tags.map((tag, tagIndex) => (
																	<span
																		key={tagIndex}
																		className="flex items-center px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wide rounded-full border border-red-500/30"
																	>
																		<Tag className="w-3 h-3 mr-1" />
																		{tag}
																	</span>
																))}
															</div>
														)}

														{/* GLOW EFFECT */}
														<motion.div
															className="absolute inset-0 rounded-xl border border-red-500/30 pointer-events-none"
															animate={{
																boxShadow: [
																	'0 0 0 0 rgba(239, 68, 68, 0.4)',
																	'0 0 0 4px rgba(239, 68, 68, 0)',
																]
															}}
															transition={{ duration: 2, repeat: Infinity }}
														/>
													</Card>
												</motion.div>
											))}
										</div>
									</div>
								);
							})}
						</motion.section>
					)}
				</div>

				{/* FLOATING ACTION BUTTON - ✅ Z-INDEX CORRIGÉ */}
				{!showForm && totalNotes > 0 && (
					<BeastFAB
						onClick={() => setShowForm(true)}
						icon={<Plus size={24} />}
						className="z-[60]"
					/>
				)}
			</div>
		</AuthGuard>
	);
}