import React, { useState } from 'react';
import { AnswersData } from '../types';
import { 
  Award, 
  CheckCircle, 
  RefreshCw, 
  Sparkles, 
  Download, 
  FileJson,
  Check
} from 'lucide-react';

interface FinalStepProps {
  studentName: string;
  answers: AnswersData;
  onPrev: () => void;
  onReset: () => void;
}

export default function FinalStep({
  studentName,
  answers,
  onPrev,
  onReset
}: FinalStepProps) {
  const [downloaded, setDownloaded] = useState(false);

  // Structured report JSON for Gustavo Pérez's iPad
  const reportJson = {
    info_general: {
      estudiante: studentName,
      fecha_entrega: new Date().toISOString(),
      centro_escolar: "Centro Escolar Napoleón Ríos",
      docente: "Prof. Gustavo Pérez",
      grado_seccion: "9o Grado B",
      jornada: "Jornada 5 - Aprendamos a Estudiar (Julio 2026)"
    },
    actividad_inicio: {
      alerta_adolescentes: {
        filtro_socioemocional: answers.inicio_filtroSocioemocional || '',
        filtro_logico_cientifico: answers.inicio_filtroLogicoCientifico || '',
        filtro_ciudadano: answers.inicio_filtroCiudadano || '',
        reflexion_final: answers.inicio_reflexionCierre || ''
      }
    },
    cuadernillo_ejercicios: {
      ciencia_y_tecnologia: {
        ejemplo_leido: answers.ciencia_ejemploLeido,
        item_escudo_comunidad: {
          p1_comparacion: { ans: answers.ciencia_p1_respuesta, exp: answers.ciencia_p1_explicacion, diff: answers.ciencia_p1_dificultad },
          p2_principio: { opcion: answers.ciencia_p2_opcion, exp: answers.ciencia_p2_explicacion, diff: answers.ciencia_p2_dificultad },
          p3_efectos: { ans: answers.ciencia_p3_respuesta, exp: answers.ciencia_p3_explicacion, diff: answers.ciencia_p3_dificultad },
          p4_eficacia: { opcion: answers.ciencia_p4_opcion, exp: answers.ciencia_p4_explicacion, diff: answers.ciencia_p4_dificultad },
          p5_evidencia: { opcion: answers.ciencia_p5_opcion, exp: answers.ciencia_p5_explicacion, diff: answers.ciencia_p5_dificultad },
          p6_tendencia: { opcion: answers.ciencia_p6_opcion, exp: answers.ciencia_p6_explicacion, diff: answers.ciencia_p6_dificultad },
          p7_divergencia: { opcion: answers.ciencia_p7_opcion, exp: answers.ciencia_p7_explicacion, diff: answers.ciencia_p7_dificultad },
          p8_mito_campo_fuerza: { ans: answers.ciencia_p8_respuesta, exp: answers.ciencia_p8_explicacion, diff: answers.ciencia_p8_dificultad },
          p9_comunicacion_familiar: { ans: answers.ciencia_p9_respuesta, exp: answers.ciencia_p9_explicacion, diff: answers.ciencia_p9_dificultad },
          evidencia_dibujo: { realizado: answers.ciencia_dibujo_realizado || false, foto_adjunta: !!answers.ciencia_dibujo_foto }
        }
      },
      lectura: {
        ejemplo_leido: answers.lectura_ejemploLeido,
        item_cancion_pirata: {
          p1_anticipa: { ans: answers.lectura_p1_respuesta, exp: answers.lectura_p1_explicacion, diff: answers.lectura_p1_dificultad },
          p2_palabras_clave: { ans: answers.lectura_p2_respuesta, exp: answers.lectura_p2_explicacion, diff: answers.lectura_p2_dificultad },
          p3_nombre_barco: { ans: answers.lectura_p3_respuesta, exp: answers.lectura_p3_explicacion, diff: answers.lectura_p3_dificultad },
          p4_patria_mar: { ans: answers.lectura_p4_respuesta, exp: answers.lectura_p4_explicacion, diff: answers.lectura_p4_dificultad },
          p5_tema_central: { ans: answers.lectura_p5_respuesta, exp: answers.lectura_p5_explicacion, diff: answers.lectura_p5_dificultad },
          evidencia_dibujo: { realizado: answers.lectura_dibujo_realizado || false, foto_adjunta: !!answers.lectura_dibujo_foto }
        }
      },
      matematica: {
        ejemplo_leido: answers.mate_ejemploLeido,
        item_artcase_sv: {
          p1_desafio: { preg1: answers.mate_p1_pregunta1, preg2: answers.mate_p1_pregunta2, preg3: answers.mate_p1_pregunta3, exp: answers.mate_p1_explicacion, diff: answers.mate_p1_dificultad },
          p2_datos: { datos: answers.mate_p2_datos, exp: answers.mate_p2_explicacion, diff: answers.mate_p2_dificultad },
          p3_herramientas: { herramientas: answers.mate_p3_herramientas, exp: answers.mate_p3_explicacion, diff: answers.mate_p3_dificultad },
          p4_desarrollo: { desarrollo: answers.mate_p4_desarrolla, respuesta: answers.mate_p4_responde, exp: answers.mate_p4_explicacion, diff: answers.mate_p4_dificultad },
          p5_validacion: { info: answers.mate_p5_informacion, justificacion: answers.mate_p5_justificacion, diff: answers.mate_p5_dificultad },
          reto_ganancia: { desarrollo: answers.mate_reto_desarrolla, respuesta: answers.mate_reto_responde, exp: answers.mate_reto_explicacion, diff: answers.mate_reto_dificultad },
          evidencia_dibujo: { realizado: answers.mate_dibujo_realizado || false, foto_adjunta: !!answers.mate_dibujo_foto }
        }
      }
    },
    franja_socioemocional: {
      pausa_ancla_completada: answers.socio_pausaCompletada,
      pensamiento_inicial: answers.socio_pensamientoInicial,
      frase_ancla: answers.socio_fraseAncla,
      palabra_clave: answers.socio_palabraClave,
      reflexion_autorregulacion: answers.socio_reflexionAutorregulacion
    },
    trabajo_colaborativo: {
      integrantes: answers.colaborativo_integrantes,
      ejercicio_desafiante: answers.colaborativo_ejercicioDesafiante,
      ruta_logica: answers.colaborativo_rutaLogica,
      consulta_libro: answers.colaborativo_consultaLibro,
      solucion_consensuada: answers.colaborativo_solucionConsensuada
    },
    diario_reflexivo: {
      dificultad_inicio: answers.diario_dificultadInicio,
      dificultad_razon: answers.diario_dificultadRazon,
      cambio_proceso: answers.diario_cambioProceso,
      frase_resumen: answers.diario_fraseResumen,
      clima_mental: answers.diario_climaMental
    }
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportJson, null, 2));
    const downloadAnchorElement = document.createElement('a');
    downloadAnchorElement.setAttribute("href", dataStr);
    const safeStudentName = (studentName || '').trim().replace(/\s+/g, '_') || 'Estudiante';
    downloadAnchorElement.setAttribute("download", `Respuestas_Jornada5_${safeStudentName}.json`);
    document.body.appendChild(downloadAnchorElement);
    downloadAnchorElement.click();
    downloadAnchorElement.remove();
    setDownloaded(true);
  };

  return (
    <div id="final-step" className="max-w-2xl mx-auto space-y-6 py-4">
      <div className="border-b border-white/20 pb-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white/40 text-indigo-955 rounded-full mb-3 border border-white/40 shadow-sm">
          <Award className="h-10 w-10 text-white animate-bounce" />
        </div>
        <h2 className="text-3xl font-extrabold text-white drop-shadow-sm">¡Felicitaciones, {studentName}!</h2>
        <p className="text-white/80 text-xs mt-1 font-medium">
          Has completado con éxito la Jornada 5 "Aprendamos a Estudiar" (Julio 2026).
        </p>
      </div>

      {/* Habit of the month card */}
      <div className="bg-gradient-to-r from-sky-500/25 to-indigo-500/25 border border-sky-200/40 rounded-2xl p-6 shadow-lg space-y-3">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400 fill-amber-300" />
          <span>Principio de la Jornada: Aprender a Hacer y Explicar</span>
        </h3>
        <p className="text-xs text-white/90 leading-relaxed font-medium">
          Recuerda: Un verdadero estudiante no solo entrega una respuesta; comprende la razón lógica y la evidencia científica que la respalda. ¡Usa tus anclas emocionales para mantener la calma ante cualquier problema académico!
        </p>
      </div>

      {/* Main Download Block */}
      <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-6 text-slate-900">
        <div>
          <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-indigo-700 animate-pulse" />
            <span>Descargar Archivo de Respuestas y Reflexiones (JSON)</span>
          </h3>
          <p className="text-xs text-slate-850 mt-1 font-medium leading-relaxed">
            Hemos guardado el 100% de tus respuestas, explicaciones y reflexiones. Tu docente Gustavo Pérez revisará tu archivo en su iPad.
          </p>
        </div>

        <div className="space-y-4">
          {!downloaded ? (
            <button
              type="button"
              id="btn-download-json"
              onClick={handleDownloadJson}
              className="w-full py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Download className="h-5 w-5" />
              <span>Generar y Descargar mi Archivo de Respuestas (Jornada 5)</span>
            </button>
          ) : (
            <div id="download-success-card" className="p-6 bg-emerald-500/25 border border-emerald-200/40 text-emerald-950 rounded-2xl space-y-4 animate-fade-in font-medium">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-955">
                <CheckCircle className="h-6 w-6 text-emerald-800" />
                <span>¡Archivo de Respuestas Descargado!</span>
              </div>
              
              <p className="text-xs text-emerald-900 leading-relaxed font-semibold">
                Hola, <strong>{studentName}</strong>. Tu archivo <code>Respuestas_Jornada5_{(studentName || '').trim().replace(/\s+/g, '_')}.json</code> está listo en tu dispositivo.
              </p>

              <div className="p-3 bg-white/60 border border-emerald-200/40 rounded-xl text-xs space-y-2 text-emerald-950 font-semibold">
                <p><strong>Instrucciones para la entrega:</strong></p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Envía el archivo descargado a tu docente Prof. Gustavo Pérez.</li>
                  <li>El docente abrirá el reporte en su iPad para analizar tus razonamientos y reflexiones de cada materia.</li>
                </ol>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="btn-reset-app"
                  onClick={onReset}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Registrar nuevo estudiante
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2 border-t border-white/20">
        <button
          type="button"
          id="btn-final-prev"
          onClick={onPrev}
          className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
        >
          Atrás: Diario Reflexivo
        </button>

        <button
          type="button"
          id="btn-final-reset"
          onClick={onReset}
          className="px-5 py-2 border border-white/40 hover:bg-white/10 text-slate-900 text-xs font-bold rounded-xl transition-all"
        >
          Reiniciar Todo
        </button>
      </div>
    </div>
  );
}
