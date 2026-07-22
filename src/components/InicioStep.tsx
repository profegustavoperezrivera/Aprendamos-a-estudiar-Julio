import React from 'react';
import { AnswersData } from '../types';
import { HelpCircle, AlertTriangle, ShieldCheck, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';

interface InicioStepProps {
  answers: AnswersData;
  onChange: (updates: Partial<AnswersData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function InicioStep({
  answers,
  onChange,
  onNext,
  onPrev
}: InicioStepProps) {

  const isFormValid =
    (answers.inicio_filtroSocioemocional || '').trim().length > 0 &&
    (answers.inicio_filtroLogicoCientifico || '').trim().length > 0 &&
    (answers.inicio_filtroCiudadano || '').trim().length > 0 &&
    (answers.inicio_reflexionCierre || '').trim().length > 0;

  return (
    <div id="inicio-step" className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Step Header */}
      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/30 rounded-xl border border-amber-300/40">
            <HelpCircle className="h-6 w-6 text-amber-200" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Actividad de Inicio: Evaluación Crítica de Titulares</h2>
            <p className="text-xs text-white/80 font-medium">Jornada 5 — 15 minutos | Análisis de noticias sensacionalistas con tres filtros críticos</p>
          </div>
        </div>
      </div>

      {/* Simulated Blackboard Banner */}
      <div className="bg-slate-900 border-4 border-amber-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-amber-100 font-mono space-y-4">
        <div className="absolute top-2 right-3 text-[10px] text-amber-500/80 font-mono uppercase tracking-widest">
          Proyección en Pizarra
        </div>

        <div className="flex items-center gap-3 text-red-400 font-bold text-lg animate-pulse">
          <AlertTriangle className="h-6 w-6 shrink-0" />
          <span className="tracking-widest uppercase">¡ALERTA PARA ADOLESCENTES!</span>
        </div>

        <blockquote className="bg-slate-950/80 border-l-4 border-red-500 p-4 rounded-xl text-sm leading-relaxed text-slate-200 italic font-sans">
          «Un estudio matemático secreto revela que el nuevo algoritmo de la IA reducirá la creatividad humana en un 85 % para el próximo año. ¡Compártelo antes de que lo borren!»
        </blockquote>

        <p className="text-xs text-amber-200/80 font-sans">
          📌 <strong>Instrucción del Docente:</strong> Analiza este titular sensacionalista aplicando los <strong>tres filtros críticos</strong> con tu compañero de pareja antes de tomar una decisión.
        </p>
      </div>

      {/* Interactive 3 Critical Filters Form */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-6">

        {/* 1. Filtro Socioemocional */}
        <div className="bg-white/70 border border-white/60 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
            <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <span>1. Filtro Socioemocional</span>
          </div>
          <label htmlFor="filtro-socioemocional" className="text-xs text-slate-800 block font-medium leading-relaxed">
            ¿Qué emociones te provocó leer este titular al inicio? ¿Cómo esa emoción de alarma, indignación o miedo puede nublar tu capacidad para evaluar si es real?
          </label>
          <textarea
            id="filtro-socioemocional"
            rows={3}
            placeholder="Ejemplo: Al principio sentí preocupación e indignación porque me asustó perder creatividad. Las emociones intensas hacen que reaccionemos impulso sin verificar los hechos..."
            value={answers.inicio_filtroSocioemocional}
            onChange={(e) => onChange({ inicio_filtroSocioemocional: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-indigo-600 focus:ring focus:ring-indigo-100 font-medium"
          />
        </div>

        {/* 2. Filtro Lógico-Científico */}
        <div className="bg-white/70 border border-white/60 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <FileText className="h-4 w-4" />
            </div>
            <span>2. Filtro Lógico-Científico</span>
          </div>
          <label htmlFor="filtro-logico" className="text-xs text-slate-800 block font-medium leading-relaxed">
            ¿Qué fallas encuentras en la estructura del texto? ¿Qué datos faltan? (Por ejemplo: ¿Qué significa "estudio secreto"? ¿Cómo se mide la creatividad para dar un 85% exacto? ¿Cuál es la fuente?)
          </label>
          <textarea
            id="filtro-logico"
            rows={3}
            placeholder="Ejemplo: No citan la universidad o institución de investigación. Un estudio 'secreto' contradice el método científico. Además la creatividad no se mide en un porcentaje exacto como 85%..."
            value={answers.inicio_filtroLogicoCientifico}
            onChange={(e) => onChange({ inicio_filtroLogicoCientifico: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-indigo-600 focus:ring focus:ring-indigo-100 font-medium"
          />
        </div>

        {/* 3. Filtro Ciudadano */}
        <div className="bg-white/70 border border-white/60 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>3. Filtro Ciudadano</span>
          </div>
          <label htmlFor="filtro-ciudadano" className="text-xs text-slate-800 block font-medium leading-relaxed">
            Si este contenido apareciera en tus redes sociales (TikTok, WhatsApp, Facebook), ¿lo compartirías de inmediato o cuestionarías su veracidad? ¿Qué consecuencias tendría difundir información falsa?
          </label>
          <textarea
            id="filtro-ciudadano"
            rows={3}
            placeholder="Ejemplo: No lo compartiría sin verificar en sitios oficiales. Compartir noticias falsas genera desinformación, pánico innecesario y daña la confianza comunitaria..."
            value={answers.inicio_filtroCiudadano}
            onChange={(e) => onChange({ inicio_filtroCiudadano: e.target.value })}
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-indigo-600 focus:ring focus:ring-indigo-100 font-medium"
          />
        </div>

        {/* Conclusión Formativa y Reflexión de Cierre */}
        <div className="bg-indigo-950/20 border border-indigo-400/30 rounded-2xl p-5 space-y-3">
          <div className="text-xs font-bold text-indigo-950 flex items-center gap-2 uppercase tracking-wide">
            <CheckCircle2 className="h-4 w-4 text-indigo-700" />
            <span>Conclusión de la Actividad de Inicio</span>
          </div>
          <blockquote className="text-xs text-slate-900 italic font-semibold leading-relaxed border-l-2 border-indigo-600 pl-3">
            «El pensamiento crítico no consiste únicamente en ser inteligente; también requiere la humildad de regular nuestras emociones para que nuestra lógica pueda evaluar los datos reales antes de actuar.»
          </blockquote>

          <div className="pt-2">
            <label htmlFor="reflexion-cierre" className="text-xs font-bold text-slate-900 block mb-1">
              Escribe tu reflexión final: ¿Por qué es importante autorregular tus emociones antes de compartir una información?
            </label>
            <textarea
              id="reflexion-cierre"
              rows={2}
              placeholder="Explica con tus propias palabras la importancia de la humildad y la autorregulación emocional..."
              value={answers.inicio_reflexionCierre}
              onChange={(e) => onChange({ inicio_reflexionCierre: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-indigo-600 focus:ring focus:ring-indigo-100 font-medium"
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <button
            id="btn-inicio-prev"
            onClick={onPrev}
            className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
          >
            Atrás: Identificación
          </button>

          <button
            id="btn-inicio-next"
            disabled={!isFormValid}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            Siguiente: Práctica Individual (Cuadernillo)
          </button>
        </div>
      </div>
    </div>
  );
}
