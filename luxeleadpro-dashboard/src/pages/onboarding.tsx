'use client';

import React, { useState, useEffect } from 'react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function OnboardingChecklist() {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: 'Complete Your Profile',
      description: 'Set up your agent profile with brokerage info and target market',
      completed: false,
    },
    {
      id: 2,
      title: 'Connect Your Lead Sources',
      description: 'Link your CRM, websites, and lead databases',
      completed: false,
    },
    {
      id: 3,
      title: 'Review Compliance Settings',
      description: 'Configure TCPA/DNC settings and verify consent tracking',
      completed: false,
    },
    {
      id: 4,
      title: 'Create Your First Campaign',
      description: 'Build and launch your first luxury intel nurture sequence',
      completed: false,
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const completedSteps = steps.filter(s => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepComplete = (id: number) => {
    setSteps(steps.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    ));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="mx-auto max-w-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to Luxe Lead AI Pro</h1>
          <p className="text-gray-400">Get started in 4 easy steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Onboarding Progress</span>
            <span className="text-sm font-semibold text-gold-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                step.completed
                  ? 'border-gold-500 bg-gray-800'
                  : index === currentStep
                  ? 'border-gold-500 bg-gray-750'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
              onClick={() => {
                setCurrentStep(index);
                handleStepComplete(step.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step.completed ? 'bg-gold-500 text-gray-900' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step.completed ? '✓' : step.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  step.completed ? 'text-gold-500' : 'text-gray-400'
                }`}>
                  {step.completed ? 'Complete' : 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {completedSteps === steps.length && (
          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set! 🎉</h2>
            <p className="text-gray-800 mb-4">Your Luxe Lead AI Pro is ready to start generating luxury leads.</p>
            <button className="bg-gray-900 text-gold-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
              Launch Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
