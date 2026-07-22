import React, { useState } from 'react';
import { AnswersData, DificultadNivel } from '../types';
import ActiveBreak from './ActiveBreak';
import { 
  BookOpen, 
  Check, 
  Calculator, 
  Activity, 
  Award,
  BarChart2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Upload,
  CheckCircle
} from 'lucide-react';

interface PraticaStepProps {
  answers: AnswersData;
  onChange: (updates: Partial<AnswersData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PraticaStep({
  answers,
  onChange,
  onNext,
  onPrev
}: PraticaStepProps) {
  const [subTab, setSubTab] = useState<'ciencia' | 'lectura' | 'mate'>('ciencia');
  const [showActiveBreakModal, setShowActiveBreakModal] = useState(false);

  // Helper for difficulty picker
  const renderDifficultyPicker = (
    value: DificultadNivel,
    onSelect: (val: DificultadNivel) => void,
    fieldId: string
  ) => (
    <div className="flex items-center gap-2 pt-2">
      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Dificultad:</span>
      <div className="flex gap-2">
        <button
          type="button"
          id={`diff-easy-${fieldId}`}
          onClick={() => onSelect('fácil')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
            value === 'fácil'
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
              : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <span>😃 Fácil</span>
        </button>
        <button
          type="button"
          id={`diff-med-${fieldId}`}
          onClick={() => onSelect('intermedio')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
            value === 'intermedio'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <span>🤔 Intermedio</span>
        </button>
        <button
          type="button"
          id={`diff-hard-${fieldId}`}
          onClick={() => onSelect('difícil')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
            value === 'difícil'
              ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
              : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <span>🙁 Difícil</span>
        </button>
      </div>
    </div>
  );

  // Validation Check for CIENCIA (9 questions, each requiring answer + explanation)
  const cienciaItems = [
    { ans: answers.ciencia_p1_respuesta, exp: answers.ciencia_p1_explicacion },
    { ans: answers.ciencia_p2_opcion, exp: answers.ciencia_p2_explicacion },
    { ans: answers.ciencia_p3_respuesta, exp: answers.ciencia_p3_explicacion },
    { ans: answers.ciencia_p4_opcion, exp: answers.ciencia_p4_explicacion },
    { ans: answers.ciencia_p5_opcion, exp: answers.ciencia_p5_explicacion },
    { ans: answers.ciencia_p6_opcion, exp: answers.ciencia_p6_explicacion },
    { ans: answers.ciencia_p7_opcion, exp: answers.ciencia_p7_explicacion },
    { ans: answers.ciencia_p8_respuesta, exp: answers.ciencia_p8_explicacion },
    { ans: answers.ciencia_p9_respuesta, exp: answers.ciencia_p9_explicacion }
  ];
  const cienciaTotal = 9;
  const cienciaFilled = cienciaItems.filter(i => (i.ans || '').trim() !== '' && (i.exp || '').trim() !== '').length;
  const isCienciaCompleted = cienciaFilled === cienciaTotal;

  // Validation Check for LECTURA (5 questions, each requiring answer + explanation)
  const lecturaItems = [
    { ans: answers.lectura_p1_respuesta, exp: answers.lectura_p1_explicacion },
    { ans: answers.lectura_p2_respuesta, exp: answers.lectura_p2_explicacion },
    { ans: answers.lectura_p3_respuesta, exp: answers.lectura_p3_explicacion },
    { ans: answers.lectura_p4_respuesta, exp: answers.lectura_p4_explicacion },
    { ans: answers.lectura_p5_respuesta, exp: answers.lectura_p5_explicacion }
  ];
  const lecturaTotal = 5;
  const lecturaFilled = lecturaItems.filter(i => (i.ans || '').trim() !== '' && (i.exp || '').trim() !== '').length;
  const isLecturaCompleted = lecturaFilled === lecturaTotal;

  // Validation Check for MATEMÁTICA (6 main sections/questions, each requiring answer/development + explanation)
  const mateItems = [
    { ans: (answers.mate_p1_pregunta1 || '') + (answers.mate_p1_pregunta2 || '') + (answers.mate_p1_pregunta3 || ''), exp: answers.mate_p1_explicacion },
    { ans: answers.mate_p2_datos, exp: answers.mate_p2_explicacion },
    { ans: answers.mate_p3_herramientas, exp: answers.mate_p3_explicacion },
    { ans: (answers.mate_p4_desarrolla || '') + (answers.mate_p4_responde || ''), exp: answers.mate_p4_explicacion },
    { ans: (answers.mate_p5_informacion || '') + (answers.mate_p5_justificacion || ''), exp: answers.mate_p5_justificacion },
    { ans: (answers.mate_reto_desarrolla || '') + (answers.mate_reto_responde || ''), exp: answers.mate_reto_explicacion }
  ];
  const mateTotal = 6;
  const mateFilled = mateItems.filter(i => (i.ans || '').trim() !== '' && (i.exp || '').trim() !== '').length;
  const isMateCompleted = mateFilled === mateTotal;

  // Strict enforcement: ALL 3 subjects MUST be 100% completed!
  const allSubjectsCompleted = isCienciaCompleted && isLecturaCompleted && isMateCompleted;

  return (
    <div id="pratica-step" className="max-w-4xl mx-auto space-y-6 py-2 text-slate-900">
      
      {/* Floating Active Pause Banner */}
      <div className="bg-amber-500/30 backdrop-blur-md border border-amber-300/40 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/40 p-2 rounded-xl text-amber-950 shadow-sm animate-pulse">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-white drop-shadow-sm text-sm">¿Llevas 50 minutos de trabajo individual?</h4>
            <p className="text-xs text-white/90 font-medium">Te corresponde realizar la pausa activa guiada (respiración y estiramiento).</p>
          </div>
        </div>
        <button
          type="button"
          id="btn-trigger-active-break"
          onClick={() => setShowActiveBreakModal(!showActiveBreakModal)}
          className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          {showActiveBreakModal ? 'Ocultar Pausa' : 'Abrir Pausa Activa'}
        </button>
      </div>

      {showActiveBreakModal && (
        <div className="animate-fade-in transition-all">
          <ActiveBreak />
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-white/20 pb-3">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-md flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-white" />
          <span>Fase Central: Práctica Individual del Cuadernillo</span>
        </h2>
        <p className="text-white/90 text-xs mt-1 font-medium leading-relaxed">
          Lee el ejemplo guiado paso a paso en cada materia y luego responde de forma autónoma cada ejercicio. <strong>Debes incluir tu reflexión/explicación en cada respuesta.</strong>
        </p>
      </div>

      {/* Mandatory Subject Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/25 bg-white/20 backdrop-blur-md rounded-2xl p-1.5 gap-2 shadow-lg">
        {/* Ciencia Tab */}
        <button
          type="button"
          id="tab-sub-ciencia"
          onClick={() => setSubTab('ciencia')}
          className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
            subTab === 'ciencia'
              ? 'bg-white text-indigo-950 shadow-md scale-[1.02]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 shrink-0 text-sky-600" />
            <span>1. Ciencia y Tec.</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black ${
            isCienciaCompleted 
              ? 'bg-emerald-500 text-white' 
              : 'bg-amber-500/30 text-white border border-amber-300/40'
          }`}>
            {isCienciaCompleted && <Check className="h-3 w-3" />}
            <span>{cienciaFilled}/{cienciaTotal}</span>
          </span>
        </button>

        {/* Lectura Tab */}
        <button
          type="button"
          id="tab-sub-lectura"
          onClick={() => setSubTab('lectura')}
          className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
            subTab === 'lectura'
              ? 'bg-white text-indigo-950 shadow-md scale-[1.02]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>2. Lectura</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black ${
            isLecturaCompleted 
              ? 'bg-emerald-500 text-white' 
              : 'bg-amber-500/30 text-white border border-amber-300/40'
          }`}>
            {isLecturaCompleted && <Check className="h-3 w-3" />}
            <span>{lecturaFilled}/{lecturaTotal}</span>
          </span>
        </button>

        {/* Matemática Tab */}
        <button
          type="button"
          id="tab-sub-mate"
          onClick={() => setSubTab('mate')}
          className={`py-3 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
            subTab === 'mate'
              ? 'bg-white text-indigo-950 shadow-md scale-[1.02]'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 shrink-0 text-indigo-600" />
            <span>3. Matemática</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-black ${
            isMateCompleted 
              ? 'bg-emerald-500 text-white' 
              : 'bg-amber-500/30 text-white border border-amber-300/40'
          }`}>
            {isMateCompleted && <Check className="h-3 w-3" />}
            <span>{mateFilled}/{mateTotal}</span>
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CIENCIA Y TECNOLOGÍA */}
      {/* ========================================================================= */}
      {subTab === 'ciencia' && (
        <div id="sub-ciencia-content" className="space-y-6 animate-fade-in">
          
          {/* STEP-BY-STEP EXAMPLE FROM GUÍA DOCENTE */}
          <div className="bg-sky-950/20 border-2 border-sky-400/40 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/30 rounded-xl border border-sky-300/50">
                <Sparkles className="h-5 w-5 text-sky-200" />
              </div>
              <div>
                <span className="text-[10px] bg-sky-400/20 text-sky-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Guía del Docente — Ejemplo Explicado Paso a Paso
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Ítem de Ejemplo: Pirueta en Patineta</h3>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>
                <strong>Situación:</strong> En una feria en San Salvador, un joven se desliza en una rampa extrema de patinaje. Parte del reposo en el <strong>Punto A (altura máxima)</strong>, desciende perdiendo altura y ganando velocidad hasta el <strong>Punto B (punto más bajo)</strong>, y sube hasta detenerse momentáneamente en el <strong>Punto C (extremo opuesto)</strong>.
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl font-mono text-[11px] text-sky-300 space-y-1">
                <div>• Paso 1: Concepto científico → Conservación de Energía Mecánica (Energía Total = Ep + Ec constante).</div>
                <div>• Paso 2: Evaluar en cada punto:</div>
                <div className="pl-3">- Punto A (Reposo, altura máx): Velocidad=0 → <strong>Energía Potencial Máxima</strong>.</div>
                <div className="pl-3">- Punto B (Más bajo, máx velocidad): Altura=0 → <strong>Energía Cinética Máxima</strong>.</div>
                <div className="pl-3">- Punto C (Sube y se detiene): Se transforma de nuevo en <strong>Energía Potencial</strong>.</div>
                <div>• Paso 3: Opción Correcta → <strong>B</strong>.</div>
              </div>
            </div>

            <button
              type="button"
              id="btn-ciencia-confirm-ejemplo"
              onClick={() => onChange({ ciencia_ejemploLeido: !answers.ciencia_ejemploLeido })}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                answers.ciencia_ejemploLeido
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              <Check className="h-4 w-4" />
              <span>{answers.ciencia_ejemploLeido ? '✓ Ejemplo Analizado. Listo para resolver el ítem principal.' : 'Haz clic para confirmar que leíste y entendiste el ejemplo paso a paso'}</span>
            </button>
          </div>

          {/* MAIN ITEM: ESCUDO DE LA COMUNIDAD */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="border-b border-white/30 pb-3">
              <span className="text-[10px] bg-sky-500/20 text-sky-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Ítem de Ciencia y Tecnología — Escudo de la comunidad
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">Martha y Mateo: Cobertura de Vacunación e Incidencia de Enfermedad</h3>
              <p className="text-xs text-slate-800 font-medium mt-1 leading-relaxed">
                Martha y Mateo analizan un gráfico con dos líneas (2010-2024): Cobertura de vacunación (línea sólida) e Incidencia de enfermedades respiratorias (línea punteada). Mateo dice que la vacuna evita cualquier síntoma para siempre. Martha nota que en 2021 hubo un pequeño brote de fiebre a pesar de alta vacunación y aclara que la vacuna es un escudo, no un campo mágico.
              </p>
            </div>

            {/* PREGUNTA 1 (Fase 1) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 1: Pregunta 1 — Comparación de datos</span>
              <p className="text-xs text-slate-900 font-bold">
                Mateo afirma que la salud depende solo de la vacuna. ¿Qué dos datos se están comparando en el gráfico?
              </p>
              <textarea
                id="ciencia-p1-ans"
                rows={2}
                placeholder="Escribe tu respuesta..."
                value={answers.ciencia_p1_respuesta}
                onChange={(e) => onChange({ ciencia_p1_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p1-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué esa respuesta es así?
                </label>
                <textarea
                  id="ciencia-p1-exp"
                  rows={2}
                  placeholder="Explica qué variables observaste en el eje vertical y horizontal..."
                  value={answers.ciencia_p1_explicacion}
                  onChange={(e) => onChange({ ciencia_p1_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p1_dificultad, (val) => onChange({ ciencia_p1_dificultad: val }), 'c1')}
            </div>

            {/* PREGUNTA 2 (Fase 2) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 2: Pregunta 2 — Principio Científico</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Cuál de los siguientes principios científicos permite analizar mejor esta situación?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'A', text: 'A. Identificación de correlaciones entre prevención y propagación' },
                  { key: 'B', text: 'B. Clasificación biológica de tipos de virus' },
                  { key: 'C', text: 'C. Análisis del tiempo de incubación en laboratorio' },
                  { key: 'D', text: 'D. Registro aislado de pacientes en emergencias' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    id={`ciencia-p2-opt-${opt.key}`}
                    onClick={() => onChange({ ciencia_p2_opcion: opt.key })}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all border ${
                      answers.ciencia_p2_opcion === opt.key
                        ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p2-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué elegiste esta opción?
                </label>
                <textarea
                  id="ciencia-p2-exp"
                  rows={2}
                  placeholder="Justifica tu elección basándote en tendencias históricas..."
                  value={answers.ciencia_p2_explicacion}
                  onChange={(e) => onChange({ ciencia_p2_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p2_dificultad, (val) => onChange({ ciencia_p2_dificultad: val }), 'c2')}
            </div>

            {/* PREGUNTA 3 (Fase 2) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 2: Pregunta 3 — Efectos Secundarios</span>
              <p className="text-xs text-slate-900 font-bold">
                Hay un punto donde la línea de vacunación llega al 95%, pero los síntomas leves no llegan a cero. ¿Qué indica esto sobre los efectos secundarios naturales?
              </p>
              <textarea
                id="ciencia-p3-ans"
                rows={2}
                placeholder="Escribe tu respuesta..."
                value={answers.ciencia_p3_respuesta}
                onChange={(e) => onChange({ ciencia_p3_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p3-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué ocurre esta reacción inmune?
                </label>
                <textarea
                  id="ciencia-p3-exp"
                  rows={2}
                  placeholder="Explica la diferencia entre enfermar gravemente y generar anticuerpos..."
                  value={answers.ciencia_p3_explicacion}
                  onChange={(e) => onChange({ ciencia_p3_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p3_dificultad, (val) => onChange({ ciencia_p3_dificultad: val }), 'c3')}
            </div>

            {/* PREGUNTA 4 (Fase 3) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 3: Pregunta 4 — Cálculo de Eficacia</span>
              <p className="text-xs text-slate-900 font-bold">
                Cobertura 60% (40 hospitalizaciones) vs Cobertura 90% (2 hospitalizaciones). ¿Qué valor de eficacia demuestra la vacuna?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { key: 'A', text: 'A. 10%' },
                  { key: 'B', text: 'B. 50%' },
                  { key: 'C', text: 'C. 95%' },
                  { key: 'D', text: 'D. 0%' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    id={`ciencia-p4-opt-${opt.key}`}
                    onClick={() => onChange({ ciencia_p4_opcion: opt.key })}
                    className={`p-2.5 rounded-xl text-center font-medium transition-all border ${
                      answers.ciencia_p4_opcion === opt.key
                        ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p4-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Cómo realizaste el cálculo numérico de reducción de 40 a 2 casos?
                </label>
                <textarea
                  id="ciencia-p4-exp"
                  rows={2}
                  placeholder="Muestra la proporción de reducción de casos..."
                  value={answers.ciencia_p4_explicacion}
                  onChange={(e) => onChange({ ciencia_p4_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p4_dificultad, (val) => onChange({ ciencia_p4_dificultad: val }), 'c4')}
            </div>

            {/* PREGUNTA 5 (Fase 3) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 3: Pregunta 5 — Evidencia Inmune</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué evidencia le da la razón a Martha sobre por qué vacunarse no evita "todos" los síntomas?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'A', text: 'A. Porque inyecta virus vivo fuerte' },
                  { key: 'B', text: 'B. El sistema inmune genera respuesta (fiebre leve) al aprender a fabricar anticuerpos' },
                  { key: 'C', text: 'C. Funciona solo en adultos' },
                  { key: 'D', text: 'D. Borra la memoria de glóbulos blancos' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    id={`ciencia-p5-opt-${opt.key}`}
                    onClick={() => onChange({ ciencia_p5_opcion: opt.key })}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all border ${
                      answers.ciencia_p5_opcion === opt.key
                        ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p5-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué esta es la explicación biológica correcta?
                </label>
                <textarea
                  id="ciencia-p5-exp"
                  rows={2}
                  placeholder="Explica la función natural de los glóbulos blancos..."
                  value={answers.ciencia_p5_explicacion}
                  onChange={(e) => onChange({ ciencia_p5_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p5_dificultad, (val) => onChange({ ciencia_p5_dificultad: val }), 'c5')}
            </div>

            {/* PREGUNTA 6 (Fase 3) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 3: Pregunta 6 — Tendencia a Largo Plazo</span>
              <p className="text-xs text-slate-900 font-bold">
                Observando la tendencia general de 15 años, ¿qué se concluye sobre la vacunación masiva?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'A', text: 'A. No tiene ningún impacto' },
                  { key: 'B', text: 'B. Aunque hay casos aislados, reduce significativamente muertes y hospitalizaciones' },
                  { key: 'C', text: 'C. Hace virus más visibles' },
                  { key: 'D', text: 'D. Solo sirve para perder clases' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    id={`ciencia-p6-opt-${opt.key}`}
                    onClick={() => onChange({ ciencia_p6_opcion: opt.key })}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all border ${
                      answers.ciencia_p6_opcion === opt.key
                        ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p6-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué debemos ver el gráfico completo y no solo un año?
                </label>
                <textarea
                  id="ciencia-p6-exp"
                  rows={2}
                  placeholder="Justifica por qué las decisiones de salud pública se basan en tendencias completas..."
                  value={answers.ciencia_p6_explicacion}
                  onChange={(e) => onChange({ ciencia_p6_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p6_dificultad, (val) => onChange({ ciencia_p6_dificultad: val }), 'c6')}
            </div>

            {/* PREGUNTA 7 (Fase 4) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 4: Pregunta 7 — Período de Divergencia</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué función cumple analizar los años donde hubo "brotes" a pesar de la vacuna?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'A', text: 'A. Decir que las vacunas no sirven' },
                  { key: 'B', text: 'B. Entender que existen otros factores (mutaciones, higiene) además de la vacuna' },
                  { key: 'C', text: 'C. Demostrar error del personal de salud' },
                  { key: 'D', text: 'D. Calcular minutos exactos de efecto' }
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    id={`ciencia-p7-opt-${opt.key}`}
                    onClick={() => onChange({ ciencia_p7_opcion: opt.key })}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all border ${
                      answers.ciencia_p7_opcion === opt.key
                        ? 'bg-sky-600 text-white border-sky-700 font-bold shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p7-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué la ciencia es multicausal?
                </label>
                <textarea
                  id="ciencia-p7-exp"
                  rows={2}
                  placeholder="Explica qué otros factores influyen en un brote..."
                  value={answers.ciencia_p7_explicacion}
                  onChange={(e) => onChange({ ciencia_p7_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p7_dificultad, (val) => onChange({ ciencia_p7_dificultad: val }), 'c7')}
            </div>

            {/* PREGUNTA 8 (Fase 4) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 4: Pregunta 8 — Mito del "Campo de Fuerza Mágico"</span>
              <p className="text-xs text-slate-900 font-bold">
                Escribe basándote en lo discutido: ¿Por qué es científicamente incorrecto decir que una vacuna es un "campo de fuerza mágico"?
              </p>
              <textarea
                id="ciencia-p8-ans"
                rows={2}
                placeholder="Escribe tu respuesta argumentada..."
                value={answers.ciencia_p8_respuesta}
                onChange={(e) => onChange({ ciencia_p8_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p8-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Justifica tu respuesta usando vocabulario técnico (anticuerpos, respuesta inmunitaria):
                </label>
                <textarea
                  id="ciencia-p8-exp"
                  rows={2}
                  placeholder="Usa términos científicos..."
                  value={answers.ciencia_p8_explicacion}
                  onChange={(e) => onChange({ ciencia_p8_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p8_dificultad, (val) => onChange({ ciencia_p8_dificultad: val }), 'c8')}
            </div>

            {/* PREGUNTA 9 (Fase 4) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-sky-900 uppercase">Fase 4: Pregunta 9 — Reflexión Personal Metacognitiva</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué te parece más convincente para explicarle a tu familia la importancia de las vacunas: mostrarles la gráfica de reducción de enfermedades o explicarles cómo funcionan los glóbulos blancos? ¿Por qué?
              </p>
              <textarea
                id="ciencia-p9-ans"
                rows={2}
                placeholder="Escribe tu elección..."
                value={answers.ciencia_p9_respuesta}
                onChange={(e) => onChange({ ciencia_p9_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="ciencia-p9-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Justifica por qué esa forma de comunicación resulta más efectiva:
                </label>
                <textarea
                  id="ciencia-p9-exp"
                  rows={2}
                  placeholder="Explica qué tipo de evidencia convence más a tu familia..."
                  value={answers.ciencia_p9_explicacion}
                  onChange={(e) => onChange({ ciencia_p9_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.ciencia_p9_dificultad, (val) => onChange({ ciencia_p9_dificultad: val }), 'c9')}
            </div>
          </div>

          {/* Espacio para Dibujo / Esquema Físico (Ciencia) */}
          <div className="p-4 bg-sky-950/30 border border-sky-300/40 rounded-2xl space-y-3 text-white">
            <div className="flex items-center gap-2 text-sky-200 text-xs font-bold">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Espacio de Dibujo / Esquema: Representación visual del Escudo de la Vacunación y Anticuerpos</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Si realizaste un esquema o dibujo en tu cuaderno de trabajo mostrando la respuesta inmunológica o la cobertura de vacunación, marca la casilla y adjunta la foto:
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-medium">
                <input
                  type="checkbox"
                  checked={answers.ciencia_dibujo_realizado || false}
                  onChange={(e) => onChange({ ciencia_dibujo_realizado: e.target.checked })}
                  className="h-4 w-4 rounded text-sky-600 focus:ring-sky-400 cursor-pointer"
                />
                <span>Ya realicé mi esquema / dibujo en mi cuaderno</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{answers.ciencia_dibujo_foto ? 'Cambiar foto del dibujo' : 'Adjuntar foto del dibujo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => onChange({ ciencia_dibujo_foto: reader.result as string, ciencia_dibujo_realizado: true });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {answers.ciencia_dibujo_foto && (
                  <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Foto adjuntada
                  </span>
                )}
              </div>
            </div>
            {answers.ciencia_dibujo_foto && (
              <div className="mt-2 p-2 bg-black/40 rounded-xl border border-sky-300/30 w-32 h-32 overflow-hidden">
                <img src={answers.ciencia_dibujo_foto} alt="Esquema Ciencia" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Simple Bottom Advance Button for Ciencia */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-sky-200 font-semibold">
              Ciencia y Tecnología: ({cienciaFilled}/{cienciaTotal} respondidos)
            </span>
            <button
              type="button"
              id="btn-goto-lectura-bottom"
              onClick={() => {
                setSubTab('lectura');
                document.getElementById('pratica-step')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Continuar a 2. Lectura</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LECTURA */}
      {/* ========================================================================= */}
      {subTab === 'lectura' && (
        <div id="sub-lectura-content" className="space-y-6 animate-fade-in">
          
          {/* STEP-BY-STEP EXAMPLE FROM GUÍA DOCENTE */}
          <div className="bg-emerald-950/20 border-2 border-emerald-400/40 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/30 rounded-xl border border-emerald-300/50">
                <Sparkles className="h-5 w-5 text-emerald-200" />
              </div>
              <div>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Guía del Docente — Protocolo de Lectura en 3 Fases
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Estrategia de Comprensión Lectoras</h3>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>
                <strong>Protocolo de aplicación paso a paso:</strong>
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl font-mono text-[11px] text-emerald-300 space-y-1">
                <div>• Fase 1: Anticipa → Formular hipótesis antes de leer a partir del título o imágenes.</div>
                <div>• Fase 2: Busca información → Escaneo rápido de palabras clave y datos explícitos (Nivel Literal).</div>
                <div>• Fase 3: Comprende → Hacer inferencias, identificar idea central e intencionalidad (Nivel Inferencial).</div>
              </div>
            </div>

            <button
              type="button"
              id="btn-lectura-confirm-ejemplo"
              onClick={() => onChange({ lectura_ejemploLeido: !answers.lectura_ejemploLeido })}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                answers.lectura_ejemploLeido
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              <Check className="h-4 w-4" />
              <span>{answers.lectura_ejemploLeido ? '✓ Protocolo Analizado. Listo para el poema.' : 'Haz clic para confirmar que leíste y entendiste las 3 fases del protocolo de lectura'}</span>
            </button>
          </div>

          {/* MAIN ITEM: LA CANCIÓN DEL PIRATA */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="border-b border-white/30 pb-3">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Ítem de Lectura — Poema Lírico
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">La canción del pirata (Fragmento - José de Espronceda)</h3>
            </div>

            {/* POEM TEXT DISPLAY BOX */}
            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-700 font-serif text-xs leading-relaxed space-y-3 shadow-inner">
              <div className="text-center font-bold text-amber-300 text-sm tracking-wide">
                La canción del pirata (Fragmento)
              </div>
              <p className="italic text-center text-slate-300">
                Con diez cañones por banda,<br/>
                viento en popa, a toda vela,<br/>
                no corta el mar, sino vuela<br/>
                un velero bergantín.<br/>
                Bajel pirata que llaman,<br/>
                por su bravura, el Temido,<br/>
                en todo mar conocido<br/>
                del uno al otro confín.<br/>
                (...)<br/>
                Que es mi barco mi tesoro,<br/>
                que es mi dios la libertad,<br/>
                mi ley, la fuerza y el viento,<br/>
                mi única patria, la mar.
              </p>
              <div className="text-right text-[10px] text-slate-400 font-sans">
                — José de Espronceda
              </div>
            </div>

            {/* PREGUNTA 1 (Fase 1: Anticipa) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase">Fase 1: Pregunta 1 — Anticipa</span>
              <p className="text-xs text-slate-900 font-bold">
                Tomando en cuenta el título, ¿de qué crees que tratará el texto?
              </p>
              <textarea
                id="lectura-p1-ans"
                rows={2}
                placeholder="Escribe tu hipótesis inicial..."
                value={answers.lectura_p1_respuesta}
                onChange={(e) => onChange({ lectura_p1_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="lectura-p1-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Qué pistas del título activaron esa idea?
                </label>
                <textarea
                  id="lectura-p1-exp"
                  rows={2}
                  placeholder="Explica qué conocimientos previos o palabras del título te guiaron..."
                  value={answers.lectura_p1_explicacion}
                  onChange={(e) => onChange({ lectura_p1_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.lectura_p1_dificultad, (val) => onChange({ lectura_p1_dificultad: val }), 'l1')}
            </div>

            {/* PREGUNTA 2 (Fase 2: Busca información) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase">Fase 2: Pregunta 2 — Palabras Clave</span>
              <p className="text-xs text-slate-900 font-bold">
                Lee el poema para identificar las palabras clave. ¿Cuáles encontraste?
              </p>
              <textarea
                id="lectura-p2-ans"
                rows={2}
                placeholder="Ej. cañones, mar, vela, velero, pirata, Temido, libertad, patria..."
                value={answers.lectura_p2_respuesta}
                onChange={(e) => onChange({ lectura_p2_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="lectura-p2-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué esas palabras son claves para el significado del poema?
                </label>
                <textarea
                  id="lectura-p2-exp"
                  rows={2}
                  placeholder="Explica el campo semántico del tema..."
                  value={answers.lectura_p2_explicacion}
                  onChange={(e) => onChange({ lectura_p2_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.lectura_p2_dificultad, (val) => onChange({ lectura_p2_dificultad: val }), 'l2')}
            </div>

            {/* PREGUNTA 3 (Fase 2) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase">Fase 2: Pregunta 3 — Nombre del Barco</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Cómo llaman al barco pirata debido a su bravura (valentía)?
              </p>
              <textarea
                id="lectura-p3-ans"
                rows={2}
                placeholder="Escribe el nombre del barco..."
                value={answers.lectura_p3_respuesta}
                onChange={(e) => onChange({ lectura_p3_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="lectura-p3-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Cita la estrofa y explica en qué verso aparece:
                </label>
                <textarea
                  id="lectura-p3-exp"
                  rows={2}
                  placeholder="Cita el verso exacto..."
                  value={answers.lectura_p3_explicacion}
                  onChange={(e) => onChange({ lectura_p3_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.lectura_p3_dificultad, (val) => onChange({ lectura_p3_dificultad: val }), 'l3')}
            </div>

            {/* PREGUNTA 4 (Fase 2) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase">Fase 2: Pregunta 4 — Patria del Pirata</span>
              <p className="text-xs text-slate-900 font-bold">
                Según la última estrofa, ¿cuál es la única patria del pirata?
              </p>
              <textarea
                id="lectura-p4-ans"
                rows={2}
                placeholder="Escribe la patria del pirata..."
                value={answers.lectura_p4_respuesta}
                onChange={(e) => onChange({ lectura_p4_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="lectura-p4-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Qué simboliza "la mar" como patria para el pirata?
                </label>
                <textarea
                  id="lectura-p4-exp"
                  rows={2}
                  placeholder="Explica el significado de la libertad y el rechazo a las fronteras..."
                  value={answers.lectura_p4_explicacion}
                  onChange={(e) => onChange({ lectura_p4_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.lectura_p4_dificultad, (val) => onChange({ lectura_p4_dificultad: val }), 'l4')}
            </div>

            {/* PREGUNTA 5 (Fase 3: Comprende) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-emerald-900 uppercase">Fase 3: Pregunta 5 — Idea Central y Tema del Poema</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Cuál es la idea principal o el tema central del poema?
              </p>
              <textarea
                id="lectura-p5-ans"
                rows={2}
                placeholder="Escribe el tema central..."
                value={answers.lectura_p5_respuesta}
                onChange={(e) => onChange({ lectura_p5_respuesta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="lectura-p5-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión Metacognitiva: ¿Qué pasos mentales realizaste para llegar a esta respuesta inferencial?
                </label>
                <textarea
                  id="lectura-p5-exp"
                  rows={2}
                  placeholder="Explica cómo relacionaste las metáforas de tesoro, dios y patria..."
                  value={answers.lectura_p5_explicacion}
                  onChange={(e) => onChange({ lectura_p5_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.lectura_p5_dificultad, (val) => onChange({ lectura_p5_dificultad: val }), 'l5')}
            </div>
          </div>

          {/* Espacio para Dibujo / Ilustración (Lectura) */}
          <div className="p-4 bg-emerald-950/30 border border-emerald-300/40 rounded-2xl space-y-3 text-white">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Espacio de Ilustración: Dibujo de "El Temido" navegando los mares en libertad</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Si dibujaste o ilustraste en tu cuaderno el bergantín "El Temido", sus diez cañones por banda o la bandera pirata, marca la casilla y adjunta tu foto:
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-medium">
                <input
                  type="checkbox"
                  checked={answers.lectura_dibujo_realizado || false}
                  onChange={(e) => onChange({ lectura_dibujo_realizado: e.target.checked })}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-400 cursor-pointer"
                />
                <span>Ya realicé mi ilustración / dibujo en mi cuaderno</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{answers.lectura_dibujo_foto ? 'Cambiar foto de ilustración' : 'Adjuntar foto de ilustración'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => onChange({ lectura_dibujo_foto: reader.result as string, lectura_dibujo_realizado: true });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {answers.lectura_dibujo_foto && (
                  <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Foto adjuntada
                  </span>
                )}
              </div>
            </div>
            {answers.lectura_dibujo_foto && (
              <div className="mt-2 p-2 bg-black/40 rounded-xl border border-emerald-300/30 w-32 h-32 overflow-hidden">
                <img src={answers.lectura_dibujo_foto} alt="Ilustración Lectura" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Simple Bottom Advance Button for Lectura */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              id="btn-goto-ciencia-from-lectura"
              onClick={() => {
                setSubTab('ciencia');
                document.getElementById('pratica-step')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Volver a 1. Ciencia</span>
            </button>

            <button
              type="button"
              id="btn-goto-mate-from-lectura"
              onClick={() => {
                setSubTab('mate');
                document.getElementById('pratica-step')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Continuar a 3. Matemática</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MATEMÁTICA */}
      {/* ========================================================================= */}
      {subTab === 'mate' && (
        <div id="sub-mate-content" className="space-y-6 animate-fade-in">
          
          {/* STEP-BY-STEP EXAMPLE FROM GUÍA DOCENTE */}
          <div className="bg-indigo-950/20 border-2 border-indigo-400/40 rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/30 rounded-xl border border-indigo-300/50">
                <Sparkles className="h-5 w-5 text-indigo-200" />
              </div>
              <div>
                <span className="text-[10px] bg-indigo-400/20 text-indigo-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Guía del Docente — Modelado Algebraico Cuadrático
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Estrategia: Ecuaciones Cuadráticas para Ingresos</h3>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>
                <strong>Procedimiento de resolución paso a paso:</strong>
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl font-mono text-[11px] text-indigo-300 space-y-1">
                <div>• Ingreso Total = (Precio) × (Cantidad vendida)</div>
                <div>• Sea x = cantidad de aumentos de $1.00 en el precio</div>
                <div>• Nuevo Precio P = 12 + x</div>
                <div>• Nueva Cantidad C = 50 - 2x</div>
                <div>• Ecuación: (12 + x)(50 - 2x) = 680</div>
                <div>• Desarrollando: 600 - 24x + 50x - 2x² = 680  =&gt;  -2x² + 26x - 80 = 0</div>
                <div>• Dividiendo entre -2: x² - 13x + 40 = 0  =&gt;  Factorización: (x - 8)(x - 5) = 0</div>
                <div>• Soluciones: x = 5 o x = 8  =&gt;  Opción 1: $17 (40 fundas) | Opción 2: $20 (34 fundas).</div>
              </div>
            </div>

            <button
              type="button"
              id="btn-mate-confirm-ejemplo"
              onClick={() => onChange({ mate_ejemploLeido: !answers.mate_ejemploLeido })}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                answers.mate_ejemploLeido
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
              }`}
            >
              <Check className="h-4 w-4" />
              <span>{answers.mate_ejemploLeido ? '✓ Modelo Analizado. Listo para el ítem de ArtCase SV.' : 'Haz clic para confirmar que leíste y entendiste el procedimiento algebraico paso a paso'}</span>
            </button>
          </div>

          {/* MAIN ITEM: ARTCASE SV */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="border-b border-white/30 pb-3">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Ítem de Matemática — El emprendimiento de ArtCase SV
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">Sofía y la estrategia de precios para la impresora</h3>
              <p className="text-xs text-slate-800 font-medium mt-1 leading-relaxed">
                Sofía vende fundas para celular a $12.00 c/u y vende 50 al mes. Necesita un ingreso mensual exacto de $680.00 para comprar una máquina de impresión. Sabe que por cada $1.00 de aumento en el precio, venderá 2 fundas menos al mes.
              </p>
            </div>

            {/* PREGUNTA 1 (Fase 1: El Desafío) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-indigo-900 uppercase">Fase 1: Pregunta 1 — Metas de búsqueda</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  id="mate-p1-preg1"
                  placeholder="Pregunta 1: Precios ($17 y $20)"
                  value={answers.mate_p1_pregunta1}
                  onChange={(e) => onChange({ mate_p1_pregunta1: e.target.value })}
                  className="bg-white border border-slate-300 rounded-xl p-2 text-xs font-medium text-slate-900"
                />
                <input
                  type="text"
                  id="mate-p1-preg2"
                  placeholder="Pregunta 2: Fundas (40 y 34)"
                  value={answers.mate_p1_pregunta2}
                  onChange={(e) => onChange({ mate_p1_pregunta2: e.target.value })}
                  className="bg-white border border-slate-300 rounded-xl p-2 text-xs font-medium text-slate-900"
                />
                <input
                  type="text"
                  id="mate-p1-preg3"
                  placeholder="Pregunta 3: Recomendación"
                  value={answers.mate_p1_pregunta3}
                  onChange={(e) => onChange({ mate_p1_pregunta3: e.target.value })}
                  className="bg-white border border-slate-300 rounded-xl p-2 text-xs font-medium text-slate-900"
                />
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-p1-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Razonamiento de tu recomendación
                </label>
                <textarea
                  id="mate-p1-exp"
                  rows={2}
                  placeholder="Explica por qué $20.00 por funda es más conveniente..."
                  value={answers.mate_p1_explicacion}
                  onChange={(e) => onChange({ mate_p1_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_p1_dificultad, (val) => onChange({ mate_p1_dificultad: val }), 'm1')}
            </div>

            {/* PREGUNTA 2 (Fase 1: Datos) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-indigo-900 uppercase">Fase 1: Pregunta 2 — Datos conocidos</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué datos te brinda el problema?
              </p>
              <textarea
                id="mate-p2-datos"
                rows={2}
                placeholder="Listado de datos (precio base, ventas base, variación, meta)..."
                value={answers.mate_p2_datos}
                onChange={(e) => onChange({ mate_p2_datos: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-p2-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Cómo clasificaste los datos del enunciado?
                </label>
                <textarea
                  id="mate-p2-exp"
                  rows={2}
                  placeholder="Explica qué datos son constantes y cuáles son variables..."
                  value={answers.mate_p2_explicacion}
                  onChange={(e) => onChange({ mate_p2_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_p2_dificultad, (val) => onChange({ mate_p2_dificultad: val }), 'm2')}
            </div>

            {/* PREGUNTA 3 (Fase 2: Herramientas) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-indigo-900 uppercase">Fase 2: Pregunta 3 — Herramientas Matemáticas</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué contenido matemático puede ayudarte a resolver el problema?
              </p>
              <textarea
                id="mate-p3-herramientas"
                rows={2}
                placeholder="Ej. Ecuaciones cuadráticas, modelo de ingreso = precio x cantidad, factorización..."
                value={answers.mate_p3_herramientas}
                onChange={(e) => onChange({ mate_p3_herramientas: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-p3-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Por qué se forma un grado 2 (cuadrática)?
                </label>
                <textarea
                  id="mate-p3-exp"
                  rows={2}
                  placeholder="Explica que multiplicar (precio + x) por (cantidad - 2x) genera el término x²..."
                  value={answers.mate_p3_explicacion}
                  onChange={(e) => onChange({ mate_p3_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_p3_dificultad, (val) => onChange({ mate_p3_dificultad: val }), 'm3')}
            </div>

            {/* PREGUNTA 4 (Fase 3: Desarrollo) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-indigo-900 uppercase">Fase 3: Pregunta 4 — Desarrollo y Solución Algebraica</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="mate-p4-des" className="text-[11px] font-bold text-slate-800 block mb-1">Desarrollo paso a paso:</label>
                  <textarea
                    id="mate-p4-des"
                    rows={3}
                    placeholder="Escribe el desarrollo de la ecuación..."
                    value={answers.mate_p4_desarrolla}
                    onChange={(e) => onChange({ mate_p4_desarrolla: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="mate-p4-res" className="text-[11px] font-bold text-slate-800 block mb-1">Respuestas finales:</label>
                  <textarea
                    id="mate-p4-res"
                    rows={3}
                    placeholder="Opción 1: $17 (40 fundas) | Opción 2: $20 (34 fundas)..."
                    value={answers.mate_p4_responde}
                    onChange={(e) => onChange({ mate_p4_responde: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-p4-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: ¿Cómo verificaste las soluciones x = 5 y x = 8?
                </label>
                <textarea
                  id="mate-p4-exp"
                  rows={2}
                  placeholder="Muestra la comprobación multiplicando precio x cantidad para dar $680..."
                  value={answers.mate_p4_explicacion}
                  onChange={(e) => onChange({ mate_p4_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_p4_dificultad, (val) => onChange({ mate_p4_dificultad: val }), 'm4')}
            </div>

            {/* PREGUNTA 5 (Fase 4: Validación) */}
            <div className="bg-white/80 border border-white/60 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-indigo-900 uppercase">Fase 4: Pregunta 5 — Validación de Resultados</span>
              <p className="text-xs text-slate-900 font-bold">
                ¿Qué información del problema utilizaste para determinar la ecuación y cuál opción es más conveniente?
              </p>
              <textarea
                id="mate-p5-inf"
                rows={2}
                placeholder="Escribe la información utilizada..."
                value={answers.mate_p5_informacion}
                onChange={(e) => onChange({ mate_p5_informacion: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
              />
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-p5-jus" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Justificación empresarial de fabricar 34 fundas a $20 en vez de 40 fundas a $17:
                </label>
                <textarea
                  id="mate-p5-jus"
                  rows={2}
                  placeholder="Explica el menor desgaste de equipos, menor esfuerzo y menor costo de materia prima..."
                  value={answers.mate_p5_justificacion}
                  onChange={(e) => onChange({ mate_p5_justificacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_p5_dificultad, (val) => onChange({ mate_p5_dificultad: val }), 'm5')}
            </div>

            {/* RETO: DESCUBRE LA GANANCIA REAL */}
            <div className="bg-rose-50/90 border-2 border-rose-300 rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-rose-950 font-bold text-xs uppercase tracking-wide">
                <Award className="h-4 w-4 text-rose-600 animate-bounce" />
                <span>RETO: Descubre la ganancia real de Sofía (Materiales $4.00/funda)</span>
              </div>
              <p className="text-xs text-rose-900 font-medium leading-relaxed">
                Hacer cada funda le cuesta $4.00 (resina, tinta, empaque). ¿Cuál de las dos opciones le deja mayor ganancia libre tras pagar los materiales?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="mate-reto-des" className="text-[11px] font-bold text-slate-800 block mb-1">Cálculos de ganancia neta:</label>
                  <textarea
                    id="mate-reto-des"
                    rows={3}
                    placeholder="Opción 1 ($17): $680 - (40 x $4 = $160) = $520. Opción 2 ($20): $680 - (34 x $4 = $136) = $544..."
                    value={answers.mate_reto_desarrolla}
                    onChange={(e) => onChange({ mate_reto_desarrolla: e.target.value })}
                    className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="mate-reto-res" className="text-[11px] font-bold text-slate-800 block mb-1">Respuesta y comparación:</label>
                  <textarea
                    id="mate-reto-res"
                    rows={3}
                    placeholder="Escribe la tarifa con mayor ganancia neta..."
                    value={answers.mate_reto_responde}
                    onChange={(e) => onChange({ mate_reto_responde: e.target.value })}
                    className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 space-y-1">
                <label htmlFor="mate-reto-exp" className="text-[11px] font-bold text-amber-950 block">
                  Explicación / Reflexión: Demuestra matemáticamente la diferencia de $24.00 a favor de la opción 2:
                </label>
                <textarea
                  id="mate-reto-exp"
                  rows={2}
                  placeholder="Restar $544 - $520 = $24.00 libres de ganancia extra..."
                  value={answers.mate_reto_explicacion}
                  onChange={(e) => onChange({ mate_reto_explicacion: e.target.value })}
                  className="w-full bg-white border border-amber-300 rounded-xl p-2 text-xs text-slate-900 font-medium"
                />
              </div>
              {renderDifficultyPicker(answers.mate_reto_dificultad, (val) => onChange({ mate_reto_dificultad: val }), 'mr')}
            </div>
          </div>

          {/* Espacio para Dibujo / Gráfica (Matemática) */}
          <div className="p-4 bg-indigo-950/30 border border-indigo-300/40 rounded-2xl space-y-3 text-white">
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Espacio de Gráfica / Dibujo: Parábola de Ganancias de ArtCase SV</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Si realizaste el trazo de la gráfica o modelo cuadrático de f(x) = (12+x)(50-2x) en tu cuaderno de trabajo, marca la casilla y sube tu foto:
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-medium">
                <input
                  type="checkbox"
                  checked={answers.mate_dibujo_realizado || false}
                  onChange={(e) => onChange({ mate_dibujo_realizado: e.target.checked })}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-400 cursor-pointer"
                />
                <span>Ya realicé mi gráfica / trazo en mi cuaderno</span>
              </label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{answers.mate_dibujo_foto ? 'Cambiar foto de la gráfica' : 'Adjuntar foto de la gráfica'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => onChange({ mate_dibujo_foto: reader.result as string, mate_dibujo_realizado: true });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                {answers.mate_dibujo_foto && (
                  <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Foto adjuntada
                  </span>
                )}
              </div>
            </div>
            {answers.mate_dibujo_foto && (
              <div className="mt-2 p-2 bg-black/40 rounded-xl border border-indigo-300/30 w-32 h-32 overflow-hidden">
                <img src={answers.mate_dibujo_foto} alt="Gráfica Matemática" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Simple Bottom Advance Button for Matemática */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              id="btn-goto-lectura-from-mate"
              onClick={() => {
                setSubTab('lectura');
                document.getElementById('pratica-step')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Volver a 2. Lectura</span>
            </button>

            <span className="text-xs text-indigo-200 font-semibold hidden sm:inline">
              Matemática: ({mateFilled}/{mateTotal} respondidos)
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STRICT SUBJECT COMPLETION ENFORCER & NAVIGATION */}
      {/* ========================================================================= */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl space-y-4">
        
        {/* Status indicator bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white font-bold bg-slate-900/40 p-3 rounded-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <span>Progreso Total del Cuadernillo:</span>
            {allSubjectsCompleted ? (
              <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-full flex items-center gap-1 font-black">
                <Check className="h-3.5 w-3.5" /> ¡3/3 Materias Completadas!
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-full font-black">
                {isCienciaCompleted ? 1 : 0} + {isLecturaCompleted ? 1 : 0} + {isMateCompleted ? 1 : 0} / 3 Materias
              </span>
            )}
          </div>

          <div className="flex gap-2 text-[11px]">
            <span className={isCienciaCompleted ? 'text-emerald-300' : 'text-rose-300'}>Ciencia: {isCienciaCompleted ? '✓' : `${cienciaFilled}/${cienciaTotal}`}</span>
            <span>|</span>
            <span className={isLecturaCompleted ? 'text-emerald-300' : 'text-rose-300'}>Lectura: {isLecturaCompleted ? '✓' : `${lecturaFilled}/${lecturaTotal}`}</span>
            <span>|</span>
            <span className={isMateCompleted ? 'text-emerald-300' : 'text-rose-300'}>Matemática: {isMateCompleted ? '✓' : `${mateFilled}/${mateTotal}`}</span>
          </div>
        </div>

        {/* Warning Banner if incomplete */}
        {!allSubjectsCompleted && (
          <div className="bg-rose-500/30 border border-rose-300/50 rounded-2xl p-4 text-xs text-white space-y-1 font-medium flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-200 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-rose-100 block">⚠️ Restricción de Avance:</strong>
              No puedes avanzar a la Franja Socioemocional hasta completar <strong>TODAS las 3 materias del cuadernillo</strong> (Ciencia, Lectura y Matemática). Cada pregunta debe contar con su respuesta y su correspondiente <strong>explicación/reflexión</strong>.
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            id="btn-pratica-prev"
            onClick={onPrev}
            className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
          >
            Atrás: Actividad de Inicio
          </button>

          <button
            type="button"
            id="btn-pratica-next"
            disabled={!allSubjectsCompleted}
            onClick={onNext}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2 ${
              allSubjectsCompleted
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-white/20 text-white/50 border border-white/10 cursor-not-allowed'
            }`}
          >
            <span>Siguiente: Franja Socioemocional</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
