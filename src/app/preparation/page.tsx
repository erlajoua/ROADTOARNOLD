"use client";
import React from "react";
import { motion } from "framer-motion";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import Link from "next/link";
import { Calendar, CheckSquare, Moon, Skull, Flame, Timer, Crown, Zap } from "lucide-react";

export default function PreparationPage() {
	return (
		<AuthGuard>
			<div className="min-h-screen relative overflow-hidden">
				{/* ELECTRIC BACKGROUND */}
				<div className="fixed inset-0 opacity-5">
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
				</div>

				<div className="relative z-10 space-y-8">
					{/* HERO HEADER - BEAST PREPARATION */}
					<motion.section
						className="relative py-16 overflow-hidden"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{/* BACKGROUND EFFECTS */}
						<div className="absolute inset-0">
							<motion.div
								className="absolute top-0 left-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
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
									⚔️
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
									PRÉPARATION
								</span>
							</motion.h1>

							{/* SUBTITLE */}
							<motion.p
								className="text-xl md:text-2xl text-gray-300 font-bold uppercase tracking-wider mb-8"
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 1, delay: 0.6 }}
							>
								FORGER LE GUERRIER ULTIME
							</motion.p>

							{/* BEAST QUOTES ROTATION */}
							<motion.div
								className="mb-8 h-16 flex items-center justify-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 1, delay: 0.9 }}
							>
								{[
									"PROPER PREPARATION PREVENTS POOR PERFORMANCE",
									"BY FAILING TO PREPARE, YOU ARE PREPARING TO FAIL",
									"THE WILL TO WIN IS NOTHING WITHOUT THE WILL TO PREPARE"
								].map((quote, index) => (
									<motion.p
										key={quote}
										className="absolute text-lg md:text-xl font-bold text-red-500 font-arnold uppercase tracking-wider"
										initial={{ opacity: 0, y: 20 }}
										animate={{
											opacity: [0, 1, 1, 0],
											y: [20, 0, 0, -20]
										}}
										transition={{
											duration: 4,
											delay: index * 4,
											repeat: Infinity,
											repeatDelay: 8
										}}
									>
										"{quote}"
									</motion.p>
								))}
							</motion.div>
						</div>
					</motion.section>

					{/* PREPARATION MODES - BEAST SELECTION */}
					<motion.section
						className="px-4 max-w-7xl mx-auto"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.2 }}
					>
						<div className="text-center mb-12">
							<h2 className="text-4xl md:text-5xl font-black font-arnold text-red-500 mb-4 uppercase tracking-wider">
								CHOISIS TON MODE
							</h2>
							<p className="text-xl text-gray-400 font-bold uppercase tracking-wide">
								CHAQUE JOUR EST UNE BATAILLE
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							{/* DAILY PREPARATION */}
							<motion.div
								initial={{ opacity: 0, x: -100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 1.5 }}
							>
								<Link href="/preparation/quotidien">
									<Card className="group cursor-pointer h-full hover:scale-105 transition-all duration-500 bg-gradient-to-br from-blue-600/10 to-blue-700/20 border-blue-500/50">
										<div className="text-center p-8">
											{/* ICON WITH GLOW */}
											<motion.div
												className="relative mb-8"
												whileHover={{ rotate: 360, scale: 1.2 }}
												transition={{ duration: 0.8 }}
											>
												<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
													<Moon className="h-12 w-12 text-white" />
												</div>
												{/* EMOJI OVERLAY */}
												<span className="absolute -top-2 -right-2 text-4xl">
													🌙
												</span>
												{/* ELECTRIC RING */}
												<motion.div
													className="absolute inset-0 rounded-full border-2 border-blue-400/50"
													animate={{
														scale: [1, 1.3, 1],
														opacity: [0.5, 0, 0.5]
													}}
													transition={{
														duration: 2,
														repeat: Infinity,
														ease: "easeInOut"
													}}
												/>
											</motion.div>

											{/* TITLE */}
											<h3 className="text-2xl md:text-3xl font-black font-arnold text-blue-400 mb-4 uppercase tracking-wider">
												MODE QUOTIDIEN
											</h3>

											{/* DESCRIPTION */}
											<p className="text-gray-400 font-bold uppercase tracking-wide text-lg mb-6">
												ROUTINE DE GUERRIER QUOTIDIENNE
											</p>

											{/* FEATURES */}
											<div className="space-y-3 mb-8">
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<CheckSquare size={20} className="text-blue-400" />
													<span className="font-bold uppercase tracking-wide">SUIVI QUOTIDIEN</span>
												</div>
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<Timer size={20} className="text-blue-400" />
													<span className="font-bold uppercase tracking-wide">HYDRATATION & SOMMEIL</span>
												</div>
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<Zap size={20} className="text-blue-400" />
													<span className="font-bold uppercase tracking-wide">SENSATIONS & ÉNERGIE</span>
												</div>
											</div>

											{/* HOVER EFFECT ARROW */}
											<motion.div
												className="flex items-center justify-center text-blue-400 font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												initial={{ x: -20 }}
												whileHover={{ x: 0 }}
											>
												<span>GO</span>
												<motion.span
													className="ml-3"
													animate={{ x: [0, 8, 0] }}
													transition={{ duration: 1, repeat: Infinity }}
												>
													→
												</motion.span>
											</motion.div>
										</div>
									</Card>
								</Link>
							</motion.div>

							{/* COMPETITION PREPARATION */}
							<motion.div
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 1.8 }}
							>
								<Link href="/preparation/competition">
									<Card className="group cursor-pointer h-full hover:scale-105 transition-all duration-500 bg-gradient-to-br from-red-600/10 to-red-700/20 border-red-500/50">
										<div className="text-center p-8">
											{/* ICON WITH GLOW */}
											<motion.div
												className="relative mb-8"
												whileHover={{ rotate: 360, scale: 1.2 }}
												transition={{ duration: 0.8 }}
											>
												<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)]">
													<Calendar className="h-12 w-12 text-white" />
												</div>
												{/* EMOJI OVERLAY */}
												<span className="absolute -top-2 -right-2 text-4xl">
													💀
												</span>
												{/* ELECTRIC RING */}
												<motion.div
													className="absolute inset-0 rounded-full border-2 border-red-400/50"
													animate={{
														scale: [1, 1.3, 1],
														opacity: [0.5, 0, 0.5]
													}}
													transition={{
														duration: 2,
														repeat: Infinity,
														ease: "easeInOut"
													}}
												/>
											</motion.div>

											{/* TITLE */}
											<h3 className="text-2xl md:text-3xl font-black font-arnold text-red-500 mb-4 uppercase tracking-wider">
												MODE GUERRE
											</h3>

											{/* DESCRIPTION */}
											<p className="text-gray-400 font-bold uppercase tracking-wide text-lg mb-6">
												PRÉPARATION AU COMBAT
											</p>

											{/* FEATURES */}
											<div className="space-y-3 mb-8">
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<Skull size={20} className="text-red-500" />
													<span className="font-bold uppercase tracking-wide">JOUR DE COMPÉTITION</span>
												</div>
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<Flame size={20} className="text-red-500" />
													<span className="font-bold uppercase tracking-wide">ROUTINE MENTALE</span>
												</div>
												<div className="flex items-center justify-center gap-3 text-gray-300">
													<Crown size={20} className="text-red-500" />
													<span className="font-bold uppercase tracking-wide">CHECK-LIST WARRIOR</span>
												</div>
											</div>

											{/* HOVER EFFECT ARROW */}
											<motion.div
												className="flex items-center justify-center text-red-500 font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												initial={{ x: -20 }}
												whileHover={{ x: 0 }}
											>
												<span>GO</span>
												<motion.span
													className="ml-3"
													animate={{ x: [0, 8, 0] }}
													transition={{ duration: 1, repeat: Infinity }}
												>
													→
												</motion.span>
											</motion.div>
										</div>
									</Card>
								</Link>
							</motion.div>
						</div>
					</motion.section>

					{/* BEAST WISDOM SECTION */}
					<motion.section
						className="px-4 max-w-7xl mx-auto pb-20"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 2.1 }}
					>
						<Card className="bg-gradient-to-r from-red-600/10 to-red-700/20 border-red-500/50">
							<div className="text-center p-8">
								<motion.div
									className="text-6xl mb-6"
									animate={{
										rotate: [0, 5, -5, 0],
										scale: [1, 1.1, 1]
									}}
									transition={{ duration: 4, repeat: Infinity }}
								>
									💀
								</motion.div>
								
								<h3 className="text-3xl font-black font-arnold text-red-500 mb-6 uppercase tracking-wider">
									SAGESSE DU BEAST
								</h3>
								
								<div className="grid md:grid-cols-2 gap-8 text-left">
									<div>
										<h4 className="font-black text-red-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
											<Flame className="w-5 h-5" />
											PRÉPARATION QUOTIDIENNE
										</h4>
										<div className="space-y-3 text-gray-300 font-bold">
											<p>• HYDRATATION : 3L+ par jour minimum</p>
											<p>• SOMMEIL : 7-9h de récupération pure</p>
											<p>• VISUALISATION : 10min de domination mentale</p>
											<p>• NUTRITION : Carburant de champion</p>
										</div>
									</div>
									<div>
										<h4 className="font-black text-red-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
											<Crown className="w-5 h-5" />
											JOUR DE COMPÉTITION
										</h4>
										<div className="space-y-3 text-gray-300 font-bold">
											<p>• ARRIVÉE : 2h avant pour dominer l'espace</p>
											<p>• ÉCHAUFFEMENT : Routine habituelle, zéro changement</p>
											<p>• MENTALISATION : Voir les 3 tentatives parfaites</p>
											<p>• CONFIANCE : Tu n'as jamais rien échoué dans ta vie</p>
										</div>
									</div>
								</div>

								<motion.div
									className="mt-8 p-4 bg-red-600/20 rounded-lg border border-red-500/30"
									animate={{
										boxShadow: [
											'0 0 0 0 rgba(239, 68, 68, 0.4)',
											'0 0 0 4px rgba(239, 68, 68, 0)',
										]
									}}
									transition={{ duration: 2, repeat: Infinity }}
								>
									<p className="text-xl font-black text-red-400 italic uppercase tracking-wider">
										"THE MIND IS EVERYTHING. WHAT YOU THINK YOU BECOME."
									</p>
									<p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
										- BUDDHA (ADAPTÉ BEAST MODE)
									</p>
								</motion.div>
							</div>
						</Card>
					</motion.section>
				</div>
			</div>
		</AuthGuard>
	);
}