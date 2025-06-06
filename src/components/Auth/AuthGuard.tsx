"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Layout/Navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-power-600 mx-auto"></div>
					<p className="mt-4 text-iron-600">Chargement...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-iron-50">
				<div className="max-w-md w-full space-y-8 p-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-iron-900">
							PowerPrep
						</h2>
						<p className="mt-2 text-iron-600">
							Connectez-vous pour accéder à votre préparation
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-iron-50">
			<Navigation />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
};

// Composant de connexion simple
const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

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
			setError(error.message || "Erreur d'authentification");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}
			<Input
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<Input
				label="Mot de passe"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button type="submit" className="w-full" disabled={loading}>
				{loading
					? "Chargement..."
					: isLogin
					? "Se connecter"
					: "S'inscrire"}
			</Button>
			<button
				type="button"
				onClick={() => setIsLogin(!isLogin)}
				className="w-full text-center text-power-600 hover:text-power-700"
			>
				{isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
			</button>
		</form>
	);
};