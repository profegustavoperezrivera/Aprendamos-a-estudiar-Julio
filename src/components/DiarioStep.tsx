import React from 'react';
import { AnswersData } from '../types';
import { BookOpen, CloudSun, Cloud, Sun, Heart, Sparkles } from 'lucide-react';

interface DiarioStepProps {
  answers: AnswersData;
  onChange: (updates: Partial<AnswersData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DiarioStep({
  answers,
  onChange,
  onNext,
  onPrev
}: DiarioStepProps) {

  const isFormValid =
    (answers.diario_dificultadInicio || '').trim().length > 0 &&
    (answers.diario_dificultadRazon || '').trim().length > 0 &&
    (answers.diario_cambioProceso || '').trim().length > 0 &&
    (answers.diario_fraseResumen || '').trim().length > 0 &&
    answers.diario_climaMental !== '';

  return (
    <div id="diario-step" className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/30 rounded-2xl border border-sky-300/40">
            <BookOpen className="h-7 w-7 text-sky-200" />
          </div>
          <div>
            <span className="text-[10px] bg-sky-400/20 text-sky-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Actividad 7 — Diario Reflexivo Meta-cognitivo
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">Mi Bitácora de Aprendizaje</h2>
            <p className="text-xs text-white/80 font-medium">El diario no es evaluado por examen; es tu evidencia personal de crecimiento, esfuerzo y superación.</p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-5">
        
        {/* Pregunta 1 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="diario-dif-inicio" className="text-xs font-bold text-slate-900 block">
            1. ¿Qué parte o ejercicio se te hizo más difícil al principio de la jornada?
          </label>
          <textarea
            id="diario-dif-inicio"
            rows={2}
            placeholder="Menciona el ejercicio o la materia que más te costó al inicio..."
            value={answers.diario_dificultadInicio}
            onChange={(e) => onChange({ diario_dificultadInicio: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Pregunta 2 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="diario-dif-razon" className="text-xs font-bold text-slate-900 block">
            2. Explicación / Reflexión: ¿Por qué se te hizo difícil? ¿Fue un dato ignorado, una regla olvidada o una mala interpretación?
          </label>
          <textarea
            id="diario-dif-razon"
            rows={2}
            placeholder="Explica la causa raíz de la dificultad..."
            value={answers.diario_dificultadRazon}
            onChange={(e) => onChange({ diario_dificultadRazon: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Pregunta 3 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="diario-cambio" className="text-xs font-bold text-slate-900 block">
            3. Si volvieras a hacer la jornada desde cero, ¿qué herramienta o estrategia aplicarías primero? ¿Qué cambiarías de tu proceso?
          </label>
          <textarea
            id="diario-cambio"
            rows={2}
            placeholder="Ejemplo: Aplicaría el protocolo de lectura en 3 fases antes de responder o revisaría la fórmula del ingreso..."
            value={answers.diario_cambioProceso}
            onChange={(e) => onChange({ diario_cambioProceso: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Pregunta 4 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="diario-frase" className="text-xs font-bold text-slate-900 block">
            4. Escribe una frase corta que resuma cómo te sentiste durante esta jornada (orgulloso, aliviado, desafiado, sorprendido):
          </label>
          <textarea
            id="diario-frase"
            rows={2}
            placeholder="Escribe tu frase de cierre..."
            value={answers.diario_fraseResumen}
            onChange={(e) => onChange({ diario_fraseResumen: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Clima Mental */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wide">
            <CloudSun className="h-4 w-4 text-amber-600" />
            <span>5. Estado o Clima Mental Final tras completar el trabajo y la socialización:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              id="btn-clima-nublado"
              onClick={() => onChange({ diario_climaMental: 'nublado' })}
              className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                answers.diario_climaMental === 'nublado'
                  ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-md scale-105'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Cloud className="h-7 w-7 text-sky-200" />
              <div className="text-xs font-bold">🌥️ Nublado</div>
              <div className="text-[10px] text-center opacity-90">Tengo algunas dudas pero comprendo mejor cómo superarlas.</div>
            </button>

            <button
              type="button"
              id="btn-clima-despejado"
              onClick={() => onChange({ diario_climaMental: 'despejado' })}
              className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                answers.diario_climaMental === 'despejado'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-md scale-105'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Sun className="h-7 w-7 text-amber-950" />
              <div className="text-xs font-bold">☀️ Despejado</div>
              <div className="text-[10px] text-center opacity-90">Logré total claridad y me siento seguro de mis razonamientos.</div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-2 border-t border-white/20">
          <button
            type="button"
            id="btn-diario-prev"
            onClick={onPrev}
            className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
          >
            Atrás: Trabajo Colaborativo
          </button>

          <button
            type="button"
            id="btn-diario-next"
            disabled={!isFormValid}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            Finalizar y Revisar Resumen
          </button>
        </div>
      </div>
    </div>
  );
}
