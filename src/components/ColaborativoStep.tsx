import React from 'react';
import { AnswersData } from '../types';
import { Users, MessagesSquare, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ColaborativoStepProps {
  answers: AnswersData;
  onChange: (updates: Partial<AnswersData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ColaborativoStep({
  answers,
  onChange,
  onNext,
  onPrev
}: ColaborativoStepProps) {

  const isFormValid =
    (answers.colaborativo_integrantes || '').trim().length > 0 &&
    (answers.colaborativo_ejercicioDesafiante || '').trim().length > 0 &&
    (answers.colaborativo_rutaLogica || '').trim().length > 0 &&
    (answers.colaborativo_consultaLibro || '').trim().length > 0 &&
    (answers.colaborativo_solucionConsensuada || '').trim().length > 0;

  return (
    <div id="colaborativo-step" className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Header Banner */}
      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/30 rounded-2xl border border-purple-300/40">
            <Users className="h-7 w-7 text-purple-200" />
          </div>
          <div>
            <span className="text-[10px] bg-purple-400/20 text-purple-100 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Actividades 5 y 6 — 75 minutos
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">Trabajo Colaborativo Dirigido y Socialización</h2>
            <p className="text-xs text-white/80 font-medium">Comité de investigación: Discusión de ítems desafiantes, consulta de libros y corrección de errores.</p>
          </div>
        </div>
      </div>

      {/* Group Form Card */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-5">
        
        {/* Integrantes */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="colab-integrantes" className="text-xs font-bold text-purple-950 block">
            1. Integrantes del Equipo de Investigación (Hasta 4 estudiantes):
          </label>
          <input
            type="text"
            id="colab-integrantes"
            placeholder="Nombres de tus compañeros de grupo..."
            value={answers.colaborativo_integrantes}
            onChange={(e) => onChange({ colaborativo_integrantes: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Ejercicio Desafiante */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="colab-ejercicio" className="text-xs font-bold text-purple-950 block">
            2. Ítem o problema del cuadernillo que consideraste más desafiante (marcado con carita de esfuerzo o triste):
          </label>
          <textarea
            id="colab-ejercicio"
            rows={2}
            placeholder="Menciona la materia e ítem (ej. Ciencia Pregunta 7 - Período de divergencia, o Matemática Pregunta 4)..."
            value={answers.colaborativo_ejercicioDesafiante}
            onChange={(e) => onChange({ colaborativo_ejercicioDesafiante: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Ruta Lógica */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="colab-ruta" className="text-xs font-bold text-purple-950 block">
            3. Explica la ruta lógica de pensamiento que intentaste seguir al resolverlo individualmente:
          </label>
          <textarea
            id="colab-ruta"
            rows={2}
            placeholder="Explica qué intentaste hacer y en qué punto te surgió la duda..."
            value={answers.colaborativo_rutaLogica}
            onChange={(e) => onChange({ colaborativo_rutaLogica: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Consulta de Libros */}
        <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-2">
          <label htmlFor="colab-libro" className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>4. Consulta de fuentes: ¿Qué regla, fórmula o teoría de tu libro de texto (ESMATE, ESCIENCIA, LENGUAJE) o notas te ayudó a validar o corregir tu hipótesis?</span>
          </label>
          <textarea
            id="colab-libro"
            rows={2}
            placeholder="Cita la regla de comprensión lectora, fórmula de ecuaciones cuadráticas o concepto biológico..."
            value={answers.colaborativo_consultaLibro}
            onChange={(e) => onChange({ colaborativo_consultaLibro: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Solución Consensuada y Error Corregido */}
        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-2">
          <label htmlFor="colab-solucion" className="text-xs font-bold text-amber-950 block">
            5. Solución Consensuada y Corrección de Errores: ¿Qué error descubrieron en sus notas y cómo lo corrigieron mediante el diálogo con su equipo?
          </label>
          <textarea
            id="colab-solucion"
            rows={3}
            placeholder="Escribe la solución acordada por el equipo y la explicación de cómo corrigieron el error..."
            value={answers.colaborativo_solucionConsensuada}
            onChange={(e) => onChange({ colaborativo_solucionConsensuada: e.target.value })}
            className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-2 border-t border-white/20">
          <button
            type="button"
            id="btn-colab-prev"
            onClick={onPrev}
            className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
          >
            Atrás: Socioemocional
          </button>

          <button
            type="button"
            id="btn-colab-next"
            disabled={!isFormValid}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            Siguiente: Diario Reflexivo
          </button>
        </div>
      </div>
    </div>
  );
}
