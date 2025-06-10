"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card, BeastStatsCard } from "@/components/UI/Card";
import { Button, BeastFAB } from "@/components/UI/Button";
import { Input, TextArea } from "@/components/UI/Input";
import { useFirestore } from "@/hooks/useFirestore";
import { MotivationEntry } from "@/types";
import { Heart, Plus, Quote, Target, Flame, Skull, Crown, Zap, X, Timer } from "lucide-react";

export default function MotivationPage() {
	const {
		data: entries,
		loading,
		add,
		update,
		remove,
	} = useFirestore<MotivationEntry>("motivationEntries");

	// DEBUG CONSOLE - BEAST MODE
	React.useEffect(() => {
		console.log("💪 BEAST MOTIVATION LOADED:", entries);
		console.log("⏳ LOADING STATUS:", loading);
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

		console.log("💪 BEAST MOTIVATION CREATION:", formData);

		try {
			await add({
				type: formData.type,
				title: formData.title,
				content: formData.content,
			});

			console.log("✅ BEAST MOTIVATION CREATED");
			
			setFormData({
				type: "quote",
				title: "",
				content: "",
			});
			setShowForm(false);
		} catch (error) {
			console.error("❌ BEAST MOTIVATION CREATION FAILED:", error);
			alert("❌ MOTIVATION CREATION FAILED - CHECK CONSOLE");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRemove = async (entryId: string) => {
		console.log("🗑️ BEAST MOTIVATION DELETION:", entryId);
		try {
			await remove(entryId);
			console.log("✅ BEAST MOTIVATION DELETED");
		} catch (error) {
			console.error("❌ BEAST MOTIVATION DELETION FAILED:", error);
		}
	};

	const getTypeIcon = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "❤️";
			case "quote": return "💬";
			case "mantra": return "🔥";
			case "goal": return "🎯";
			case "reminder": return "⚡";
			case "affirmation": return "💪";
			default: return "✨";
		}
	};

	const getTypeColor = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "from-red-600/20 to-red-700/30 border-red-500/50";
			case "quote": return "from-yellow-600/20 to-yellow-700/30 border-yellow-500/50";
			case "mantra": return "from-orange-600/20 to-orange-700/30 border-orange-500/50";
			case "goal": return "from-green-600/20 to-green-700/30 border-green-500/50";
			case "reminder": return "from-blue-600/20 to-blue-700/30 border-blue-500/50";
			case "affirmation": return "from-purple-600/20 to-purple-700/30 border-purple-500/50";
			default: return "from-gray-600/20 to-gray-700/30 border-gray-500/50";
		}
	};

	const getTypeLabel = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "POURQUOI";
			case "quote": return "CITATION";
			case "mantra": return "MANTRA";
			case "goal": return "OBJECTIF";
			case "reminder": return "RAPPEL";
			case "affirmation": return "AFFIRMATION";
			default: return "AUTRE";
		}
	};

	const getPlaceholder = (type: MotivationEntry["type"]) => {
		switch(type) {
			case "why": return "PENSE A RONALD";
			case "quote": return "NIGOUL EST EN TOI";
			case "mantra": return "LA DOULEUR C'EST UNE INFORMATION";
			case "goal": return "CHAMPION DE FRANCE OU RIEN";
			case "reminder": return "TES BRAS DE SKINNY EN 2016";
			case "affirmation": return "LA Psyché C TRES SERIEUX VIENS PAS ME DIRE QUAVOIR 2 PERES C STABLE";
			default: return "Écris ce qui nourrit ta bête intérieure sous anavare";
		}
	};

	// BEAST MODE PREDEFINED MOTIVATIONS
	const beastQuotes = [
		{
			title: "ARNOLD'S WISDOM",
			content: "PUMP IS BETTER THAN SEX",
			type: "quote" as const
		},
		{
			title: "FRANCK ROPERS",
			content: "LA VISUALISATION C'EST 95% DE LA PERF",
			type: "quote" as const
		},
		{
			title: "BRUNO NIGOUL",
			content: "LA DOULEUR C'EST UNE INFORMATION",
			type: "mantra" as const
		}
	];

	// GROUP BY TYPE
	const entriesByType = entries.reduce((acc, entry) => {
		if (!acc[entry.type]) {
			acc[entry.type] = [];
		}
		acc[entry.type].push(entry);
		return acc;
	}, {} as Record<MotivationEntry["type"], MotivationEntry[]>);

	// TYPE ORDER
	const typeOrder: MotivationEntry["type"][] = ["why", "goal", "mantra", "quote", "affirmation", "reminder"];

	const totalEntries = entries.length;

	return (
		<AuthGuard>
			<div className="min-h-screen relative overflow-hidden">
				{/* ELECTRIC BACKGROUND - ✅ CORRIGÉ */}
				<div className="fixed inset-0 opacity-5 pointer-events-none">
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
				</div>

				<div className="relative z-10 space-y-8">
					{/* HERO HEADER - BEAST MOTIVATION */}
					<motion.section
						className="relative py-16 overflow-hidden"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{/* BACKGROUND EFFECTS - ✅ CORRIGÉ */}
						<div className="absolute inset-0 pointer-events-none">
							<motion.div
								className="absolute top-0 left-1/3 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"
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
									🔥
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
									MA MOTIVATION
								</span>
							</motion.h1>

							{/* SUBTITLE */}
							<motion.p
								className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-8"
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.6 }}
							>
								CARBURANT POUR L'ÂME DE GUERRIER
							</motion.p>

							{/* CTA BUTTON */}
							<motion.div
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.9 }}
								className="flex justify-center items-center"
							>
								<Button
									onClick={() => setShowForm(true)}
									size="xl"
									icon={<Flame size={24} />}
									className="shadow-beast-ultimate"
								>
									AJOUTER DU CARBURANT
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
								value={totalEntries}
								label="SOURCES DE MOTIVATION"
								icon={<Heart size={32} />}
							/>
							<BeastStatsCard
								value={entries.filter(e => e.type === 'mantra').length}
								label="MANTRAS DE GUERRE"
								icon={<Zap size={32} />}
								color="gold"
							/>
							<BeastStatsCard
								value={entries.filter(e => e.type === 'quote').length}
								label="CITATIONS POWER"
								icon={<Quote size={32} />}
							/>
						</div>
					</motion.section>

					{/* EMPTY STATE - BEAST MOTIVATION */}
					{totalEntries === 0 && !showForm && (
						<motion.section
							className="px-4 max-w-4xl mx-auto"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 1.5 }}
						>
							<Card className="text-center py-16 flex items-center justify-center">
								<motion.div
									className="text-8xl mb-8"
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									🔥
								</motion.div>
								<h2 className="text-4xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
									PREMIÈRE MOTIVATION
								</h2>
								<p className="text-xl text-gray-400 font-bold mb-8 uppercase tracking-wide">
									"STRENGTH DOES NOT COME FROM PHYSICAL CAPACITY"
								</p>

								{/* QUICK ADD BEAST QUOTES */}
								<div className="space-y-4 mb-8 w-full">
									<p className="text-gray-400 font-bold uppercase tracking-wide text-sm">
										OU COMMENCE AVEC UNE CITATION BEAST :
									</p>
									<div className="grid gap-3">
										{beastQuotes.map((quote, index) => (
											<motion.button
												key={index}
												onClick={async () => {
													try {
														await add(quote);
														console.log("✅ BEAST QUOTE ADDED");
													} catch (error) {
														console.error("❌ FAILED TO ADD BEAST QUOTE:", error);
													}
												}}
												className={`p-4 bg-gradient-to-r ${getTypeColor(quote.type)} rounded-lg text-left hover:scale-105 transition-all duration-300`}
												whileHover={{ y: -2 }}
												whileTap={{ scale: 0.95 }}
											>
												<div className="text-sm font-bold text-red-400 mb-1">
													{quote.title}
												</div>
												<div className="text-gray-300 font-medium italic">
													"{quote.content}"
												</div>
											</motion.button>
										))}
									</div>
								</div>

								<Button
									onClick={() => setShowForm(true)}
									className="w-full"
									size="xl"
									icon={<Flame size={24} />}
								>
									CRÉER MA MOTIVATION
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
									<Card title="🔥 NOUVEAU CARBURANT">
										<form onSubmit={handleSubmit} className="space-y-6">
											{/* TYPE SELECT */}
											<div>
												<label className="block text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">
													🏷️ TYPE DE MOTIVATION
												</label>
												<select
													value={formData.type}
													onChange={(e) => setFormData({ ...formData, type: e.target.value as MotivationEntry["type"] })}
													className="w-full px-4 py-3 bg-gradient-to-r from-dark-900/90 to-dark-800/90 border-2 border-red-600/30 rounded-lg text-gray-100 font-medium focus:outline-none focus:border-red-500/60 transition-all duration-300"
													required
												>
													<option value="quote">💬 CITATION</option>
													<option value="why">❤️ POURQUOI</option>
													<option value="mantra">🔥 MANTRA</option>
													<option value="goal">🎯 OBJECTIF</option>
													<option value="affirmation">💪 AFFIRMATION</option>
													<option value="reminder">⚡ RAPPEL</option>
												</select>
											</div>
											
											{/* TITLE */}
											<Input
												label="📝 TITRE"
												value={formData.title}
												onChange={(e) => setFormData({ ...formData, title: e.target.value })}
												placeholder="Ex: Ma motivation principale"
												required
											/>
											
											{/* CONTENT */}
											<TextArea
												label="💭 CONTENU"
												value={formData.content}
												onChange={(e) => setFormData({ ...formData, content: e.target.value })}
												placeholder={getPlaceholder(formData.type)}
												rows={4}
												required
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
															: 'AJOUTER LE CARBURANT'
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

					{/* ENTRIES BY TYPE - BEAST MODE */}
					{loading ? (
						<motion.div
							className="text-center py-16"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<div className="text-6xl mb-4 animate-spin">🔥</div>
							<p className="text-xl font-black font-arnold text-red-500 uppercase tracking-wider">
								CHARGEMENT DU CARBURANT...
							</p>
						</motion.div>
					) : totalEntries === 0 ? null : (
						<motion.section
							className="px-4 max-w-7xl mx-auto pb-20"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1.8 }}
						>
							{typeOrder.map((type) => {
								const typeEntries = entriesByType[type];
								if (!typeEntries || typeEntries.length === 0) return null;
								
								return (
									<div key={type} className="mb-12">
										<h2 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider flex items-center gap-3">
											<span className="text-4xl">{getTypeIcon(type)}</span>
											{getTypeLabel(type)} ({typeEntries.length})
										</h2>
										
										<div className="grid gap-6">
											{typeEntries
												.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
												.map((entry, index) => (
												<motion.div
													key={entry.id}
													initial={{ opacity: 0, x: -50 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.5, delay: index * 0.1 }}
												>
													<Card className={`bg-gradient-to-r ${getTypeColor(entry.type)} hover:scale-105 transition-all duration-300`}>
														<div className="flex items-start justify-between mb-4">
															<div className="flex items-center gap-3">
																<motion.div
																	className="text-2xl"
																	whileHover={{ rotate: 360, scale: 1.2 }}
																	transition={{ duration: 0.5 }}
																>
																	{getTypeIcon(entry.type)}
																</motion.div>
																<span className="px-3 py-1 bg-red-600/20 text-red-400 text-sm font-bold uppercase tracking-wide rounded-full border border-red-500/30">
																	{getTypeLabel(entry.type)}
																</span>
															</div>
															<Button
																size="sm"
																variant="danger"
																onClick={() => handleRemove(entry.id)}
																icon={<X size={16} />}
															>
																SUPPRIMER
															</Button>
														</div>
														
														<h3 className="text-xl font-black text-red-500 uppercase tracking-wider mb-4">
															{entry.title}
														</h3>
														
														<div className="p-4 bg-dark-900/50 rounded-lg border border-red-500/20 mb-4">
															<p className="text-gray-100 whitespace-pre-wrap italic font-medium leading-relaxed">
																"{entry.content}"
															</p>
														</div>

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
				{!showForm && totalEntries > 0 && (
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