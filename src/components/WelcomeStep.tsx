import React from 'react';
import { UserCheck, Award, BookOpenCheck, Compass } from 'lucide-react';

interface WelcomeStepProps {
  studentName: string;
  isCustomStudent: boolean;
  onSelectStudent: (name: string, isCustom: boolean) => void;
  onNext: () => void;
}

export default function WelcomeStep({
  studentName,
  onSelectStudent,
  onNext
}: WelcomeStepProps) {

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectStudent(e.target.value, true);
  };

  return (
    <div id="welcome-step" className="max-w-2xl mx-auto space-y-8 py-4">
      {/* MINED El Salvador Banner */}
      <div className="bg-white/30 backdrop-blur-md border border-white/45 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4">
          <Award className="h-64 w-64 text-white" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
            MINISTERIO DE EDUCACIÓN, CIENCIA Y TECNOLOGÍA (MINED)
          </div>
          
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Aprendamos a Estudiar</h1>
            <p className="text-white/90 text-lg font-medium mt-1">Evaluación Formativa — Jornada 5 (Julio de 2026)</p>
          </div>
          
          <div className="pt-4 border-t border-white/35 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/90">
            <div>
              <span className="font-bold text-white drop-shadow-xs">Centro Escolar:</span> Napoleón Ríos
            </div>
            <div>
              <span className="font-bold text-white drop-shadow-xs">Grado y Sección:</span> 9º Grado "B"
            </div>
            <div>
              <span className="font-bold text-white drop-shadow-xs">Docente Orientador:</span> Prof. Gustavo Pérez
            </div>
          </div>
        </div>
      </div>

      {/* Student Identification & Guide Info */}
      <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-indigo-700" />
            <span>Identificación del Estudiante</span>
          </h2>
          <p className="text-slate-800 text-sm mt-1">
            Para iniciar tu recorrido guiado por la agenda y el cuadernillo, por favor escribe tu nombre completo.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="custom-student-input" className="text-sm font-bold text-slate-900">Escribe tu Nombre Completo:</label>
            <input
              type="text"
              id="custom-student-input"
              placeholder="Ej. Carlos Eduardo Hernández..."
              value={studentName}
              onChange={handleTextChange}
              className="w-full bg-white/60 border border-white/50 rounded-xl px-4 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all font-semibold placeholder-slate-500"
            />
          </div>
        </div>

        {/* Methodology explanation box */}
        <div className="bg-indigo-950/10 border border-indigo-500/20 rounded-2xl p-4 text-xs text-slate-900 space-y-2">
          <div className="font-bold flex items-center gap-2 text-indigo-900">
            <Compass className="h-4 w-4 text-indigo-700 shrink-0" />
            <span>Metodología «Aprender a Hacer»:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-800 leading-relaxed font-medium pl-1">
            <li><strong>Ejemplo guiado paso a paso:</strong> Primero verás un ejemplo de cómo abordar los problemas (Guía docente).</li>
            <li><strong>Cuadernillo obligatorio de 3 materias:</strong> Debes resolver Ciencia, Lectura y Matemática sin saltarte ninguna.</li>
            <li><strong>Reflexión obligatoria de respuestas:</strong> En cada pregunta debes explicar por qué elegiste esa respuesta.</li>
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="text-xs text-slate-800 font-medium">
            * Tus respuestas y reflexiones se guardarán en tu bitácora escolar.
          </div>
          
          <button
            id="btn-welcome-next"
            disabled={!(studentName || '').trim()}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
              (studentName || '').trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer hover:shadow-indigo-500/30'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            Comenzar la Agenda
          </button>
        </div>
      </div>
    </div>
  );
}
