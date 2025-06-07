"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Layout/Navigation";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Eye, EyeOff, Mail, Lock, Flame, Skull, Zap } from 'lucide-react';

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const { user, loading } = useAuth();

	// LOADING SCREEN - BEAST MODE
	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center relative overflow-hidden">
				{/* ELECTRIC BACKGROUND */}
				<div className="absolute inset-0">
					<motion.div
						className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.3, 0.8, 0.3]
						}}
						transition={{ duration: 3, repeat: Infinity }}
					/>
					<motion.div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/20 rounded-full blur-3xl"
						animate={{
							scale: [1.5, 1, 1.5],
							opacity: [0.8, 0.3, 0.8]
						}}
						transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
					/>
				</div>

				<div className="text-center relative z-10">
					{/* ROTATING SKULL */}
					<motion.div
						className="text-8xl mb-8"
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					>
						💀
					</motion.div>

					{/* LOADING TEXT */}
					<motion.h2
						className="text-4xl font-black font-arnold text-red-500 mb-4 uppercase tracking-wider"
						animate={{
							textShadow: [
								'0 0 20px rgba(239, 68, 68, 0.8)',
								'0 0 40px rgba(239, 68, 68, 1)',
								'0 0 20px rgba(239, 68, 68, 0.8)'
							]
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						AWAKENING THE BEAST
					</motion.h2>

					{/* LOADING BAR */}
					<div className="w-64 h-2 bg-dark-700 rounded-full mx-auto mb-4 overflow-hidden">
						<motion.div
							className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
							animate={{ x: ['-100%', '100%'] }}
							transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
						/>
					</div>

					<p className="text-gray-400 font-bold uppercase tracking-wide">
						PREPARING FOR DOMINATION...
					</p>
				</div>
			</div>
		);
	}

	// LOGIN SCREEN - BEAST MODE
	if (!user) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center relative overflow-hidden">
				{/* ELECTRIC GRID BACKGROUND */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,64,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
				</div>

				{/* FLOATING ELEMENTS */}
				<div className="absolute inset-0">
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-32 h-32 bg-red-600/10 rounded-full blur-2xl"
							animate={{
								x: [0, 100, 0],
								y: [0, -50, 0],
								scale: [1, 1.2, 1],
								opacity: [0.3, 0.7, 0.3]
							}}
							transition={{
								duration: 8 + i * 2,
								repeat: Infinity,
								delay: i * 2
							}}
							style={{
								left: `${20 + i * 30}%`,
								top: `${20 + i * 20}%`
							}}
						/>
					))}
				</div>

				<div className="w-full max-w-md mx-auto px-8 relative z-10">
					<LoginForm />
				</div>
			</div>
		);
	}

	// AUTHENTICATED - SHOW APP
	return (
		<div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
			<Navigation />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
};

// LOGIN FORM - PURE BEAST MODE
const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
			}
		} catch (error: any) {
			console.error("Erreur d'authentification:", error);
			setError(error.message || "AUTHENTICATION FAILED");
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="relative"
		>
			{/* CARD CONTAINER */}
			<div className="relative bg-gradient-to-br from-dark-800/90 to-dark-900/90 border-2 border-red-600/30 rounded-2xl p-8 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
				{/* TOP RED LINE */}
				<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-t-2xl" />

				{/* HEADER */}
				<div className="text-center mb-8">
					{/* SKULL ICON */}
					<motion.div
						className="text-6xl mb-4"
						animate={{
							rotate: [0, 5, -5, 0],
							scale: [1, 1.1, 1]
						}}
						transition={{ duration: 4, repeat: Infinity }}
					>
						💀
					</motion.div>

					<motion.h1
						className="text-4xl font-black font-arnold text-red-500 mb-2 uppercase tracking-wider"
						animate={{
							textShadow: [
								'0 0 20px rgba(239, 68, 68, 0.8)',
								'0 0 30px rgba(239, 68, 68, 1)',
								'0 0 20px rgba(239, 68, 68, 0.8)'
							]
						}}
						transition={{ duration: 3, repeat: Infinity }}
					>
						POWERPREP
					</motion.h1>
					<p className="text-gray-400 font-bold uppercase tracking-wide text-sm">
						{isLogin ? "ENTER THE BEAST MODE" : "JOIN THE LEGION"}
					</p>
				</div>

				{/* FORM */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* ERROR MESSAGE */}
					<AnimatePresence>
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="bg-red-600/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm"
							>
								<div className="flex items-center gap-2">
									<Skull size={16} />
									<span className="font-bold uppercase tracking-wide text-sm">
										{error}
									</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* EMAIL INPUT */}
					<Input
						label="EMAIL"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="warrior@beast.mode"
						icon={<Mail size={18} />}
						required
					/>

					{/* PASSWORD INPUT */}
					<Input
						label="PASSWORD"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••••••"
						icon={<Lock size={18} />}
						rightIcon={
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="text-red-500 hover:text-red-400 transition-colors"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						}
						required
					/>

					{/* SUBMIT BUTTON */}
					<Button
						type="submit"
						size="lg"
						disabled={loading || !email || !password}
						className="w-full"
						icon={loading ? <Zap size={20} /> : <Flame size={20} />}
					>
						{loading
							? "AWAKENING..."
							: isLogin
							? "UNLEASH THE BEAST"
							: "JOIN THE WARRIORS"
						}
					</Button>

					{/* TOGGLE MODE */}
					<div className="text-center">
						<button
							type="button"
							onClick={() => setIsLogin(!isLogin)}
							className="text-gray-400 hover:text-red-400 transition-colors font-bold uppercase tracking-wide text-sm"
						>
							{isLogin 
								? "NEW WARRIOR? CREATE ACCOUNT" 
								: "ALREADY A BEAST? SIGN IN"
							}
						</button>
					</div>
				</form>

				{/* BOTTOM RED LINE */}
				<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-b-2xl" />

				{/* SIDE ELECTRIC LINES */}
				<div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
				<div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
			</div>

			{/* MOTIVATIONAL QUOTES */}
			<motion.div
				className="mt-8 text-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
			>
				<motion.p
					className="text-red-500 font-bold uppercase tracking-wider text-sm"
					animate={{ opacity: [0.7, 1, 0.7] }}
					transition={{ duration: 3, repeat: Infinity }}
				>
					"THE WORST THING I CAN BE IS THE SAME AS EVERYBODY ELSE. I HATE THAT."
				</motion.p>
				<p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-widest">
					- ARNOLD SCHWARZENEGGER
				</p>
			</motion.div>
		</motion.div>
	);
};