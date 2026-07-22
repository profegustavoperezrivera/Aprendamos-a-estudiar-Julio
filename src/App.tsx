import React, { useState } from 'react';
import { AnswersData, INITIAL_ANSWERS } from './types';
import WelcomeStep from './components/WelcomeStep';
import InicioStep from './components/InicioStep';
import PraticaStep from './components/PraticaStep';
import SocioemocionalStep from './components/SocioemocionalStep';
import ColaborativoStep from './components/ColaborativoStep';
import DiarioStep from './components/DiarioStep';
import FinalStep from './components/FinalStep';
import { 
  User, 
  HelpCircle, 
  BookOpen, 
  Smile, 
  Users, 
  Award, 
  Activity, 
  CheckCircle,
  Menu,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>('');
  const [isCustomStudent, setIsCustomStudent] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswersData>(INITIAL_ANSWERS);

  const handleUpdateAnswers = (updates: Partial<AnswersData>) => {
    setAnswers((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setStep(0);
    setStudentName('');
    setIsCustomStudent(false);
    setAnswers(INITIAL_ANSWERS);
  };

  // Steps definition for UI progress bar
  const agendaSteps = [
    { id: 0, title: 'Identificación', icon: User },
    { id: 1, title: 'Inicio (Foto)', icon: HelpCircle },
    { id: 2, title: 'Práctica', icon: BookOpen },
    { id: 3, title: 'Socioemocional', icon: Smile },
    { id: 4, title: 'Colaborativo', icon: Users },
    { id: 5, title: 'Diario', icon: BookOpen },
    { id: 6, title: 'Finalizar', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-400 via-indigo-400 to-purple-500 flex flex-col font-sans antialiased text-slate-900">
      
      {/* Top Banner (Salvadoran MINED inspired Header) */}
      <header className="bg-white/30 backdrop-blur-md border-b border-white/40 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/60 p-2 rounded-xl text-indigo-700 shadow-md">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white drop-shadow-sm uppercase sm:text-base">Centro Escolar Napoleón Ríos</h1>
              <p className="text-xxs text-white/80 font-semibold tracking-wider uppercase sm:text-xs">GUÍA FORMATIVA 9º GRADO B — PROF. GUSTAVO PÉREZ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/25 border border-white/35 text-white rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
              <span className="text-xs font-semibold">Evaluación Local Activa</span>
            </div>
            
            {studentName && (
              <div className="px-3 py-1.5 bg-white/40 border border-white/40 text-slate-800 rounded-xl text-xs font-bold max-w-[150px] truncate sm:max-w-none">
                Estudiante: {studentName}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Agenda Progress Indicator Stepper */}
      <nav className="bg-white/20 backdrop-blur-md border-b border-white/25 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/25 -translate-y-1/2 z-0 hidden sm:block"></div>
            {agendaSteps.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex flex-col items-center relative z-10">
                  <button
                    id={`btn-nav-step-${s.id}`}
                    disabled={s.id > 0 && !(studentName || '').trim() && s.id !== step}
                    onClick={() => {
                      if ((studentName || '').trim() || s.id === 0) setStep(s.id);
                    }}
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border transition-all ${
                      isActive 
                        ? 'bg-indigo-600 border-indigo-500 text-white scale-110 shadow-md'
                        : isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-white/20 border-white/30 text-white/60 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5 fill-white text-green-500" /> : <StepIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
                  </button>
                  <span className={`text-[10px] sm:text-xxs font-semibold mt-1.5 hidden md:block ${isActive ? 'text-white font-bold drop-shadow-sm' : 'text-white/70'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Interactive Guide Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-center">
        {step === 0 && (
          <WelcomeStep
            studentName={studentName}
            isCustomStudent={isCustomStudent}
            onSelectStudent={(name, isCustom) => {
              setStudentName(name);
              setIsCustomStudent(isCustom);
            }}
            onNext={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <InicioStep
            answers={answers}
            onChange={handleUpdateAnswers}
            onNext={() => setStep(2)}
            onPrev={() => setStep(0)}
          />
        )}

        {step === 2 && (
          <PraticaStep
            answers={answers}
            onChange={handleUpdateAnswers}
            onNext={() => setStep(3)}
            onPrev={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <SocioemocionalStep
            answers={answers}
            onChange={handleUpdateAnswers}
            onNext={() => setStep(4)}
            onPrev={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <ColaborativoStep
            answers={answers}
            onChange={handleUpdateAnswers}
            onNext={() => setStep(5)}
            onPrev={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <DiarioStep
            answers={answers}
            onChange={handleUpdateAnswers}
            onNext={() => setStep(6)}
            onPrev={() => setStep(4)}
          />
        )}

        {step === 6 && (
          <FinalStep
            studentName={studentName}
            answers={answers}
            onPrev={() => setStep(5)}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Elegant institutional Footer */}
      <footer className="bg-slate-900/25 backdrop-blur-sm border-t border-white/15 py-6 text-center text-xs text-white/80 space-y-1">
        <div className="font-semibold text-white drop-shadow-sm">Centro Escolar Napoleón Ríos</div>
        <div className="text-white/70">Estrategia Educativa «Aprendamos a Estudiar» — Mes de Junio 2026</div>
        <div className="text-white/60">Gobierno de El Salvador | Ministerio de Educación, Ciencia y Tecnología (MINED)</div>
      </footer>
    </div>
  );
}
