'use client';
import React from 'react';
import { AuthGuard } from '@/components/Auth/AuthGuard';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';
import { Target, Calendar, BookOpen, Zap, Heart, TrendingUp } from 'lucide-react';

const quickActions = [
  { 
    href: '/objectifs', 
    label: 'Mes Objectifs', 
    icon: Target, 
    description: 'Définir et suivre mes objectifs de performance',
    color: 'bg-blue-500'
  },
  { 
    href: '/evenements', 
    label: 'Compétitions', 
    icon: Calendar, 
    description: 'Gérer mes événements et compétitions',
    color: 'bg-green-500'
  },
  { 
    href: '/preparation', 
    label: 'Préparation', 
    icon: BookOpen, 
    description: 'Routine et suivi quotidien',
    color: 'bg-purple-500'
  },
  { 
    href: '/technique', 
    label: 'Technique', 
    icon: Zap, 
    description: 'Notes et rappels techniques',
    color: 'bg-yellow-500'
  },
  { 
    href: '/motivation', 
    label: 'Motivation', 
    icon: Heart, 
    description: 'Citations et mantras motivants',
    color: 'bg-red-500'
  }
];

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-power-600 to-power-700 rounded-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            FORGE TON DESTIN
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Chaque rep compte, chaque jour compte, chaque choix compte.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-lg font-medium">Objectif Principal</p>
              <p className="text-3xl font-bold">🏆 Record Junior Bench Press</p>
            </div>
          </div>
        </section>

        {/* Stats rapides */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <TrendingUp className="h-8 w-8 text-power-600 mx-auto mb-2" />
            <h3 className="font-semibold text-iron-900">Progression</h3>
            <p className="text-2xl font-bold text-power-600">+15kg</p>
            <p className="text-sm text-iron-600">depuis le début</p>
          </Card>
          <Card className="text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-iron-900">Prochaine Compét</h3>
            <p className="text-2xl font-bold text-green-600">45 jours</p>
            <p className="text-sm text-iron-600">pour se préparer</p>
          </Card>
          <Card className="text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-iron-900">Objectifs</h3>
            <p className="text-2xl font-bold text-blue-600">3/5</p>
            <p className="text-sm text-iron-600">objectifs atteints</p>
          </Card>
        </section>

        {/* Actions rapides */}
        <section>
          <h2 className="text-2xl font-bold text-iron-900 mb-6">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`${action.color} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-iron-900 mb-2">{action.label}</h3>
                        <p className="text-sm text-iron-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Section photos/inspiration */}
        <section>
          <Card title="Photos d'Inspiration">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-iron-200 rounded-lg flex items-center justify-center">
                  <span className="text-iron-500">Photo {i}</span>
                </div>
              ))}
            </div>
            <Button className="mt-4">Ajouter des photos</Button>
          </Card>
        </section>
      </div>
    </AuthGuard>
  );
}