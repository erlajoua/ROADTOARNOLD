"use client";
import React from "react";
import { Navigation } from "@/components/Layout/Navigation";

interface AuthGuardProps {
	children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	// PLUS D'AUTH - DIRECT BEAST MODE
	return (
		<div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
			<Navigation />
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
};