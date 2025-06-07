'use client';
import React from 'react';
import { AuthGuard } from '@/components/Auth/AuthGuard';
import { Card } from '@/components/UI/Card';
import Link from 'next/link';
import { Target, Calendar, BookOpen, Zap, Heart } from 'lucide-react';

const menuItems = [
  { 
    href: '/objectifs', 
    label: 'Mes Objectifs', 
    icon: Target, 
    description: 'Définir et suivre mes objectifs de performance',
    color: 'bg-blue-500'
  },
  { 
    href: '/evenements', 
    label: 'Mes Compétitions', 
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
    label: 'Notes Techniques', 
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
        {/* Hero Section simple */}
        <section className="text-center py-16 bg-gradient-to-r from-power-600 to-power-700 rounded-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            POWERPREP
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Votre application de préparation powerlifting
          </p>
        </section>

        {/* Menu principal */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full hover:scale-105">
                    <div className="text-center p-6">
                      <div className={`${item.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-iron-900 mb-3">{item.label}</h3>
                      <p className="text-iron-600">{item.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}