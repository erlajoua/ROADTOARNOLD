// src/app/preparation/page.tsx
"use client";
import React from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import Link from "next/link";
import { Calendar, CheckSquare, Moon } from "lucide-react";

export default function PreparationPage() {
	return (
		<AuthGuard>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<CheckSquare className="mr-3 text-power-600" />
						Préparation
					</h1>
					<p className="text-iron-600 mt-2">
						Prépare-toi mentalement et physiquement pour dominer
					</p>
				</div>

				{/* Liens vers les sous-pages */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Link href="/preparation/quotidien">
						<Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full hover:scale-105">
							<div className="text-center p-8">
								<div className="bg-blue-500 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
									<Moon className="h-10 w-10 text-white" />
								</div>
								<h3 className="text-2xl font-bold text-iron-900 mb-4">
									Suivi Quotidien
								</h3>
								<p className="text-iron-600 text-lg">
									Sommeil, hydratation, sensations générales
								</p>
							</div>
						</Card>
					</Link>

					<Link href="/preparation/competition">
						<Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full hover:scale-105">
							<div className="text-center p-8">
								<div className="bg-red-500 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
									<Calendar className="h-10 w-10 text-white" />
								</div>
								<h3 className="text-2xl font-bold text-iron-900 mb-4">
									Jour de Compétition
								</h3>
								<p className="text-iron-600 text-lg">
									Rituel, routine mentale, check-list pour le jour J
								</p>
							</div>
						</Card>
					</Link>
				</div>
			</div>
		</AuthGuard>
	);
}