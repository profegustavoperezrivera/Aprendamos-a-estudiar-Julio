import React, { useState } from 'react';
import { AnswersData } from '../types';
import { Anchor, Wind, HeartHandshake, CheckCircle, Play, RefreshCw } from 'lucide-react';

interface SocioemocionalStepProps {
  answers: AnswersData;
  onChange: (updates: Partial<AnswersData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function SocioemocionalStep({
  answers,
  onChange,
  onNext,
  onPrev
}: SocioemocionalStepProps) {
  const [breathingStep, setBreathingStep] = useState(0);

  const isFormValid =
    (answers.socio_pensamientoInicial || '').trim().length > 0 &&
    (answers.socio_fraseAncla || '').trim().length > 0 &&
    (answers.socio_palabraClave || '').trim().length > 0 &&
    (answers.socio_reflexionAutorregulacion || '').trim().length > 0;

  return (
    <div id="socioemocional-step" className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/30 rounded-2xl border border-sky-300/40">
            <Anchor className="h-7 w-7 text-sky-200 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] bg-sky-400/20 text-sky-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Franja Socioemocional — 15 minutos
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">⚓ El Ancla del Navegante</h2>
            <p className="text-xs text-white/80 font-medium">Autogestión, regulación de impulsos, manejo del estrés y perseverancia ante la frustración.</p>
          </div>
        </div>
      </div>

      {/* Interactive Corporal Technique Guide */}
      <div className="bg-slate-900/95 border border-sky-400/30 text-white rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2 uppercase tracking-wide">
          <Wind className="h-4 w-4 text-sky-400" />
          <span>Técnica Corporal: Lanzar el Ancla (4-4-4)</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          Imagina que la frustración o el aburrimiento al estudiar son como una tormenta en el mar y tu cuerpo es un barco. Si reaccionas impulsivamente sin reflexionar, el barco puede encallar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl space-y-1">
            <div className="text-sky-400 font-bold">1. Inhala (4 seg)</div>
            <p className="text-slate-300 text-[11px]">Siente el aire entrando lentamente mientras mantienes los pies apoyados en el suelo.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl space-y-1">
            <div className="text-amber-400 font-bold">2. Sostén (4 seg)</div>
            <p className="text-slate-300 text-[11px]">Tensa los músculos de tus piernas sintiendo la firmeza del ancla.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl space-y-1">
            <div className="text-emerald-400 font-bold">3. Exhala (4 seg)</div>
            <p className="text-slate-300 text-[11px]">Exhala con fuerza soltando los hombros y relajando el cuerpo.</p>
          </div>
        </div>

        <button
          type="button"
          id="btn-socio-confirm-pausa"
          onClick={() => onChange({ socio_pausaCompletada: !answers.socio_pausaCompletada })}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
            answers.socio_pausaCompletada
              ? 'bg-emerald-600 text-white border border-emerald-400'
              : 'bg-sky-600 hover:bg-sky-700 text-white'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          <span>{answers.socio_pausaCompletada ? '✓ Técnica Corporal Realizada (Pies firmes en el suelo)' : 'Completar la secuencia de respiración del ancla'}</span>
        </button>
      </div>

      {/* Partner Dialogue & Reflection Questions */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
          <HeartHandshake className="h-5 w-5 text-indigo-700" />
          <span>Diálogo en Pareja y Registro de Estrategias</span>
        </div>

        {/* Question 1 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="socio-pensamiento-inicial" className="text-xs font-bold text-slate-900 block">
            1. Cuando un ejercicio o una lectura no te sale a la primera, ¿cuál es el primer pensamiento que llega a tu mente?
          </label>
          <textarea
            id="socio-pensamiento-inicial"
            rows={2}
            placeholder="Ejemplo: Pensaba 'esto es muy difícil' o sentía ganas de rendirme..."
            value={answers.socio_pensamientoInicial}
            onChange={(e) => onChange({ socio_pensamientoInicial: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Question 2 */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="socio-frase-ancla" className="text-xs font-bold text-slate-900 block">
            2. ¿Qué frase realista o qué acción te ayuda a mantener el barco a flote en medio de la tormenta?
          </label>
          <textarea
            id="socio-frase-ancla"
            rows={2}
            placeholder="Ejemplo: 'Puedo dividir el problema en pasos', 'Respirar antes de responder'..."
            value={answers.socio_fraseAncla}
            onChange={(e) => onChange({ socio_fraseAncla: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Question 3: Palabras Clave */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="socio-palabra-clave" className="text-xs font-bold text-slate-900 block">
            3. Escribe tu palabra o frase ancla principal para autorregularte durante las clases:
          </label>
          <input
            type="text"
            id="socio-palabra-clave"
            placeholder="Ej. Respirar / Dividir el problema / Pedir ayuda a mi equipo"
            value={answers.socio_palabraClave}
            onChange={(e) => onChange({ socio_palabraClave: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900"
          />
        </div>

        {/* Question 4: Reflection on why this helps */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-2">
          <label htmlFor="socio-reflexion" className="text-xs font-bold text-amber-950 block">
            4. Explicación / Reflexión: ¿Por qué tener un ancla emocional evita tomar decisiones impulsivas al estudiar?
          </label>
          <textarea
            id="socio-reflexion"
            rows={2}
            placeholder="Explica con tus palabras la importancia de regular emociones antes de responder..."
            value={answers.socio_reflexionAutorregulacion}
            onChange={(e) => onChange({ socio_reflexionAutorregulacion: e.target.value })}
            className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-2 border-t border-white/20">
          <button
            type="button"
            id="btn-socio-prev"
            onClick={onPrev}
            className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
          >
            Atrás: Cuadernillo
          </button>

          <button
            type="button"
            id="btn-socio-next"
            disabled={!isFormValid}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            Siguiente: Trabajo Colaborativo
          </button>
        </div>
      </div>
    </div>
  );
}
