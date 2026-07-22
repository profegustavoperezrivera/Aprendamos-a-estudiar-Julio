export type DificultadNivel = 'fácil' | 'intermedio' | 'difícil' | '';

export interface AnswersData {
  // Actividad de Inicio - Jornada 5 (Julio 2026): ¡ALERTA PARA ADOLESCENTES! (IA y Creatividad)
  inicio_filtroSocioemocional: string; // Emociones provocadas al leer el titular y sesgo emocional
  inicio_filtroLogicoCientifico: string; // Fallas de estructura, datos faltantes
  inicio_filtroCiudadano: string; // Consecuencias de difundir información no verificada
  inicio_reflexionCierre: string; // Humildad de regular emociones para evaluar datos reales

  // CIENCIA Y TECNOLOGÍA - Escudo de la Comunidad (Martha y Mateo)
  ciencia_ejemploLeido: boolean; // Confirmación de análisis del ejemplo "Pirueta en patineta"
  ciencia_p1_respuesta: string;
  ciencia_p1_explicacion: string;
  ciencia_p1_dificultad: DificultadNivel;

  ciencia_p2_opcion: string;
  ciencia_p2_explicacion: string;
  ciencia_p2_dificultad: DificultadNivel;

  ciencia_p3_respuesta: string;
  ciencia_p3_explicacion: string;
  ciencia_p3_dificultad: DificultadNivel;

  ciencia_p4_opcion: string;
  ciencia_p4_explicacion: string;
  ciencia_p4_dificultad: DificultadNivel;

  ciencia_p5_opcion: string;
  ciencia_p5_explicacion: string;
  ciencia_p5_dificultad: DificultadNivel;

  ciencia_p6_opcion: string;
  ciencia_p6_explicacion: string;
  ciencia_p6_dificultad: DificultadNivel;

  ciencia_p7_opcion: string;
  ciencia_p7_explicacion: string;
  ciencia_p7_dificultad: DificultadNivel;

  ciencia_p8_respuesta: string;
  ciencia_p8_explicacion: string;
  ciencia_p8_dificultad: DificultadNivel;

  ciencia_p9_respuesta: string;
  ciencia_p9_explicacion: string;
  ciencia_p9_dificultad: DificultadNivel;
  ciencia_dibujo_realizado?: boolean; // Espacio para confirmar esquema/dibujo físico de la vacuna
  ciencia_dibujo_foto?: string; // Adjuntar evidencia fotográfica (Base64)

  // LECTURA - La canción del pirata (José de Espronceda)
  lectura_ejemploLeido: boolean;
  lectura_p1_respuesta: string;
  lectura_p1_explicacion: string;
  lectura_p1_dificultad: DificultadNivel;

  lectura_p2_respuesta: string;
  lectura_p2_explicacion: string;
  lectura_p2_dificultad: DificultadNivel;

  lectura_p3_respuesta: string;
  lectura_p3_explicacion: string;
  lectura_p3_dificultad: DificultadNivel;

  lectura_p4_respuesta: string;
  lectura_p4_explicacion: string;
  lectura_p4_dificultad: DificultadNivel;

  lectura_p5_respuesta: string;
  lectura_p5_explicacion: string;
  lectura_p5_dificultad: DificultadNivel;
  lectura_dibujo_realizado?: boolean; // Confirmación de dibujo de 'El Temido' navegando
  lectura_dibujo_foto?: string; // Adjuntar foto del dibujo

  // MATEMÁTICA - El emprendimiento de ArtCase SV (Sofía)
  mate_ejemploLeido: boolean;
  mate_p1_pregunta1: string;
  mate_p1_pregunta2: string;
  mate_p1_pregunta3: string;
  mate_p1_explicacion: string;
  mate_p1_dificultad: DificultadNivel;

  mate_p2_datos: string;
  mate_p2_explicacion: string;
  mate_p2_dificultad: DificultadNivel;

  mate_p3_herramientas: string;
  mate_p3_explicacion: string;
  mate_p3_dificultad: DificultadNivel;

  mate_p4_desarrolla: string;
  mate_p4_responde: string;
  mate_p4_explicacion: string;
  mate_p4_dificultad: DificultadNivel;

  mate_p5_informacion: string;
  mate_p5_justificacion: string;
  mate_p5_dificultad: DificultadNivel;

  mate_reto_desarrolla: string;
  mate_reto_responde: string;
  mate_reto_explicacion: string;
  mate_reto_dificultad: DificultadNivel;
  mate_dibujo_realizado?: boolean; // Confirmación de gráfico de la función cuadrática / parábola
  mate_dibujo_foto?: string; // Adjuntar foto de la gráfica en cuaderno

  // FRANJA SOCIOEMOCIONAL - El Ancla del Navegante
  socio_pausaCompletada: boolean;
  socio_pensamientoInicial: string;
  socio_fraseAncla: string;
  socio_palabraClave: string;
  socio_reflexionAutorregulacion: string;

  // TRABAJO COLABORATIVO DIRIGIDO
  colaborativo_integrantes: string;
  colaborativo_ejercicioDesafiante: string;
  colaborativo_rutaLogica: string;
  colaborativo_consultaLibro: string;
  colaborativo_solucionConsensuada: string;

  // DIARIO REFLEXIVO
  diario_dificultadInicio: string;
  diario_dificultadRazon: string;
  diario_cambioProceso: string;
  diario_fraseResumen: string;
  diario_climaMental: string;
}

export const INITIAL_ANSWERS: AnswersData = {
  inicio_filtroSocioemocional: '',
  inicio_filtroLogicoCientifico: '',
  inicio_filtroCiudadano: '',
  inicio_reflexionCierre: '',

  ciencia_ejemploLeido: false,
  ciencia_p1_respuesta: '',
  ciencia_p1_explicacion: '',
  ciencia_p1_dificultad: '',

  ciencia_p2_opcion: '',
  ciencia_p2_explicacion: '',
  ciencia_p2_dificultad: '',

  ciencia_p3_respuesta: '',
  ciencia_p3_explicacion: '',
  ciencia_p3_dificultad: '',

  ciencia_p4_opcion: '',
  ciencia_p4_explicacion: '',
  ciencia_p4_dificultad: '',

  ciencia_p5_opcion: '',
  ciencia_p5_explicacion: '',
  ciencia_p5_dificultad: '',

  ciencia_p6_opcion: '',
  ciencia_p6_explicacion: '',
  ciencia_p6_dificultad: '',

  ciencia_p7_opcion: '',
  ciencia_p7_explicacion: '',
  ciencia_p7_dificultad: '',

  ciencia_p8_respuesta: '',
  ciencia_p8_explicacion: '',
  ciencia_p8_dificultad: '',

  ciencia_p9_respuesta: '',
  ciencia_p9_explicacion: '',
  ciencia_p9_dificultad: '',
  ciencia_dibujo_realizado: false,
  ciencia_dibujo_foto: '',

  lectura_ejemploLeido: false,
  lectura_p1_respuesta: '',
  lectura_p1_explicacion: '',
  lectura_p1_dificultad: '',

  lectura_p2_respuesta: '',
  lectura_p2_explicacion: '',
  lectura_p2_dificultad: '',

  lectura_p3_respuesta: '',
  lectura_p3_explicacion: '',
  lectura_p3_dificultad: '',

  lectura_p4_respuesta: '',
  lectura_p4_explicacion: '',
  lectura_p4_dificultad: '',

  lectura_p5_respuesta: '',
  lectura_p5_explicacion: '',
  lectura_p5_dificultad: '',
  lectura_dibujo_realizado: false,
  lectura_dibujo_foto: '',

  mate_ejemploLeido: false,
  mate_p1_pregunta1: '',
  mate_p1_pregunta2: '',
  mate_p1_pregunta3: '',
  mate_p1_explicacion: '',
  mate_p1_dificultad: '',

  mate_p2_datos: '',
  mate_p2_explicacion: '',
  mate_p2_dificultad: '',

  mate_p3_herramientas: '',
  mate_p3_explicacion: '',
  mate_p3_dificultad: '',

  mate_p4_desarrolla: '',
  mate_p4_responde: '',
  mate_p4_explicacion: '',
  mate_p4_dificultad: '',

  mate_p5_informacion: '',
  mate_p5_justificacion: '',
  mate_p5_dificultad: '',

  mate_reto_desarrolla: '',
  mate_reto_responde: '',
  mate_reto_explicacion: '',
  mate_reto_dificultad: '',
  mate_dibujo_realizado: false,
  mate_dibujo_foto: '',

  socio_pausaCompletada: false,
  socio_pensamientoInicial: '',
  socio_fraseAncla: '',
  socio_palabraClave: '',
  socio_reflexionAutorregulacion: '',

  colaborativo_integrantes: '',
  colaborativo_ejercicioDesafiante: '',
  colaborativo_rutaLogica: '',
  colaborativo_consultaLibro: '',
  colaborativo_solucionConsensuada: '',

  diario_dificultadInicio: '',
  diario_dificultadRazon: '',
  diario_cambioProceso: '',
  diario_fraseResumen: '',
  diario_climaMental: ''
};
