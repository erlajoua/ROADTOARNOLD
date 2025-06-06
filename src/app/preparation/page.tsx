// src/app/preparation/page.tsx
"use client";
import React from "react";
import { AuthGuard } from "@/components/Auth/AuthGuard";
import { Card } from "@/components/UI/Card";
import Link from "next/link";
import { Calendar, CheckSquare, Coffee, Moon } from "lucide-react";

export default function PreparationPage() {
	return (
		<AuthGuard>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-iron-900 flex items-center">
						<CheckSquare className="mr-3 text-power-600" />
						Préparation
					</h1>
					<p className="text-iron-600 mt-2">
						Prépare-toi mentalement et physiquement pour dominer
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Jour de compétition */}
					<Link href="/preparation/competition">
						<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
							<div className="text-center">
								<div className="bg-red-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
									<Calendar className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-iron-900 mb-2">
									Jour de Compétition
								</h3>
								<p className="text-iron-600">
									Rituel, routine mentale, check-list pour le jour J
								</p>
							</div>
						</Card>
					</Link>

					{/* Suivi quotidien */}
					<Link href="/preparation/quotidien">
						<Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
							<div className="text-center">
								<div className="bg-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
									<Moon className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold text-iron-900 mb-2">
									Suivi Quotidien
								</h3>
								<p className="text-iron-600">
									Sommeil, hydratation, sensations générales
								</p>
							</div>
						</Card>
					</Link>
				</div>

				{/* Stats rapides */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="text-center">
						<Moon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
						<p className="text-sm text-iron-600">Sommeil moyen</p>
						<p className="text-xl font-bold text-iron-900">7.5h</p>
					</Card>
					<Card className="text-center">
						<Coffee className="h-6 w-6 text-green-600 mx-auto mb-2" />
						<p className="text-sm text-iron-600">Hydratation</p>
						<p className="text-xl font-bold text-iron-900">2.8L</p>
					</Card>
					<Card className="text-center">
						<CheckSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
						<p className="text-sm text-iron-600">Rituels validés</p>
						<p className="text-xl font-bold text-iron-900">85%</p>
					</Card>
				</div>
			</div>
		</AuthGuard>
	);
}