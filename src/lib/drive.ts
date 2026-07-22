/**
 * Google Drive API v3 helper functions for creating folders and uploading files.
 */

// Search for a folder by name created by this app
export async function findFolder(accessToken: string, folderName: string, parentId?: string): Promise<string | null> {
  let query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }
  
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  
  if (!res.ok) {
    const errText = await res.text();
    console.error('Error finding folder:', errText);
    throw new Error(`Error al buscar la carpeta "${folderName}" en Drive.`);
  }
  
  const data = await res.json();
  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }
  return null;
}

// Create a folder in Google Drive
export async function createFolder(accessToken: string, folderName: string, parentId?: string): Promise<string> {
  const body: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };
  if (parentId) {
    body.parents = [parentId];
  }
  
  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    const errText = await res.text();
    console.error('Error creating folder:', errText);
    throw new Error(`Error al crear la carpeta "${folderName}" en Drive.`);
  }
  
  const data = await res.json();
  return data.id;
}

// Upload a text file (creates metadata, then uploads media content)
export async function uploadTextFile(
  accessToken: string, 
  fileName: string, 
  content: string, 
  parentFolderId: string
): Promise<string> {
  // Step 1: Create file metadata
  const metadataRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fileName,
      mimeType: 'text/plain',
      parents: [parentFolderId],
    }),
  });
  
  if (!metadataRes.ok) {
    const errText = await metadataRes.text();
    console.error('Error creating file metadata:', errText);
    throw new Error(`Error al iniciar la creación del archivo "${fileName}".`);
  }
  
  const fileData = await metadataRes.json();
  const fileId = fileData.id;
  
  // Step 2: Upload file content (media)
  const mediaRes = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'text/plain; charset=UTF-8',
    },
    body: content,
  });
  
  if (!mediaRes.ok) {
    const errText = await mediaRes.text();
    console.error('Error uploading file media:', errText);
    throw new Error(`Error al subir el contenido del archivo "${fileName}".`);
  }
  
  return fileId;
}

// Generate the text reports for each area
export function generateInicioReport(studentName: string, answers: any): string {
  return `=== REFLEXIÓN DE INICIO: LA FOTO INCOMPLETA ===
Estudiante: ${studentName}
Fecha: ${new Date().toLocaleString()}
Jornada: 4 (Junio 2026)
Docente Orientador: Gustavo Pérez
Sección: 9o Grado B - Centro Escolar Napoleón Ríos

1. En una palabra o frase, ¿qué creías que estaba sucediendo aquí al ver la foto parcial?
Respuesta: ${answers.inicio_juicioInicial || 'No contestado'}

2. Al ver la imagen completa (Estación de Bomberos / derrumbe), ¿cambió tu juicio? ¿Qué dato te faltaba?
Respuesta: ${answers.inicio_juicioFinal || 'No contestado'}

3. Discusión - ¿Qué pasa si un científico publica un resultado analizando solo una parte de la muestra?
Respuesta: ${answers.inicio_muestraParcial || 'No contestado'}

4. Discusión - ¿Hay ejemplos en la cotidianidad donde suceda esta presentación parcial de información?
Respuesta: ${answers.inicio_ejemplosCotidianos || 'No contestado'}

5. Discusión - ¿Cómo se siente juzgar a alguien o ser juzgado sin evidencia?
Respuesta: ${answers.inicio_juzgarSinEvidencia || 'No contestado'}
`;
}

export function generateMatematicasReport(studentName: string, answers: any): string {
  return `=== PRÁCTICA INDIVIDUAL: ÁREA DE MATEMÁTICA ===
Estudiante: ${studentName}
Fecha: ${new Date().toLocaleString()}

-- Ítem de Ejemplo: Venta de Panes con Pollo --
P1: ¿Cuánto dinero obtiene María en promedio vendiendo 40 panes a $2.50 cada uno?
Respuesta del estudiante: $${answers.mate_ejemploP1 || '0.00'}
Respuesta correcta del docente: $100.00

P2: Si vende el combo a $3.00 y realiza 5 ventas menos, ¿cuánto dinero obtiene ahora?
Respuesta del estudiante: $${answers.mate_ejemploP2 || '0.00'}
Respuesta correcta del docente: $105.00

P3: ¿Cuál de las dos opciones le genera más ingresos? Explica tu respuesta utilizando cálculos matemáticos.
Respuesta del estudiante: ${answers.mate_ejemploP3 || 'No contestado'}
Respuesta correcta del docente: La opción del combo genera $105.00, que son $5.00 más de ingresos en comparación con el pan solo ($100.00).

Nivel de dificultad autoasignado para el ejemplo: ${answers.mate_ejemploDificultad || 'No especificado'}

-- Ítem Principal: El Conductor de Uber en San Salvador --
P1: ¿Qué te pide encontrar el problema?
Respuesta del estudiante: ${answers.mate_uberP1 || 'No contestado'}
Guía docente: 
- Pregunta 1: Encontrar las dos tarifas promedio diferentes que Ernesto podría cobrar para obtener exactamente $495.00 semanales.
- Pregunta 2: Calcular cuántos viajes tendría que realizar con cada tarifa.

P2: ¿Qué datos te brinda el problema?
Respuesta del estudiante: ${answers.mate_uberP2 || 'No contestado'}
Guía docente: Tarifa promedio inicial $4.00; viajes iniciales 120; meta semanal $495.00; por cada aumento de $0.50 realiza 10 viajes menos.

P3: ¿Qué contenido matemático puede ayudarte a resolver el problema?
Respuesta del estudiante: ${answers.mate_uberP3 || 'No contestado'}
Guía docente: Álgebra básica, modelación, ecuaciones cuadráticas, factorización, expresiones algebraicas.

P4 - DESARROLLA (Aplica procedimientos para resolver):
Respuesta del estudiante:
${answers.mate_uberP4_desarrolla || 'No contestado'}

P4 - RESPONDE:
Respuesta del estudiante:
${answers.mate_uberP4_responde || 'No contestado'}
Guía docente de respuestas correctas:
x = 1 o x = 3 (cantidad de aumentos de $0.50).
- Opción 1 (x = 1): Tarifa de $4.50, viajes por semana = 110. (4.50 * 110 = $495)
- Opción 2 (x = 3): Tarifa de $5.50, viajes por semana = 90. (5.50 * 90 = $495)

P5: ¿Qué relación identificaste entre la tarifa por viaje y la cantidad de viajes realizados?
Respuesta del estudiante: ${answers.mate_uberP5 || 'No contestado'}
Guía docente: Relación inversa: a mayor tarifa, menor cantidad de viajes.

-- Reto: Desgaste y combustible del vehículo de Ernesto --
Costos de $1.50 por viaje (gasolina, mantenimiento, desgaste).
DESARROLLA:
${answers.mate_uberReto_desarrolla || 'No contestado'}

RESPONDE (Diferencia de ganancias, cuál opción es más conveniente):
Respuesta del estudiante:
${answers.mate_uberReto_responde || 'No contestado'}
Guía docente de respuestas correctas:
- Opción 1 ($4.50, 110 viajes): Costo operativo $165. Ganancia neta = $495 - $165 = $330.
- Opción 2 ($5.50, 90 viajes): Costo operativo $135. Ganancia neta = $495 - $135 = $360.
Conclusión: La Opción 2 de $5.50 es más conveniente porque genera una ganancia neta mayor ($360 vs $330) y hay menos desgaste del vehículo por hacer menos viajes (90 vs 110). La diferencia es de $30.00.

Nivel de dificultad asignado al ejercicio (1 al 5): ${answers.mate_uberDificultad}
`;
}

export function generateLecturaReport(studentName: string, answers: any): string {
  return `=== PRÁCTICA INDIVIDUAL: ÁREA DE LECTURA ===
Estudiante: ${studentName}
Fecha: ${new Date().toLocaleString()}

-- Ítem de Lectura: El negocio de Irene --
P1: Según el texto, ¿qué actitudes deben equilibrarse para orientar las acciones hacia el futuro?
Respuesta del estudiante: ${answers.lecturaP1 || 'No contestado'}
Respuesta correcta del docente: Actitud optimista equilibrada con mantener los "pies en la tierra", es decir, ser realista.

P2: ¿Cómo los pasos 6 y 7 permiten evitar errores en el futuro?
Respuesta del estudiante: ${answers.lecturaP2 || 'No contestado'}
Respuesta correcta del docente: El paso 6 implica reflexionar sobre las acciones pasadas para identificar errores, y el paso 7 permite hacer los ajustes necesarios para corregirlos.

P3: ¿Qué tipo de texto es el anterior ("Los panes de Irene")?
Respuesta del estudiante: ${answers.lecturaP3 || 'No contestado'}
Respuesta correcta del docente: Opción A - Narrativo.

P4: ¿Qué características de ese tipo de texto tiene "Los panes de Irene"?
Respuesta del estudiante: ${answers.lecturaP4 || 'No contestado'}
Respuesta correcta del docente: Narra hechos (reales o ficticios), tiene personajes (Irene, compañeros) y relata hechos que se desarrollan en un tiempo y lugar específicos.

P5: ¿Qué pasos del texto "Organizarse para el futuro" debería aplicar Irene para continuar con su negocio de panes con pollo?
Respuesta del estudiante: ${answers.lecturaP5 || 'No contestado'}
Respuesta correcta del docente: Pasos 6 y 7 (Aprender de las acciones pasadas e identificar errores, y supervisar para realizar los ajustes necesarios como el nivel de sal).

P6: Explica cómo llegaste a la respuesta de la pregunta anterior.
Respuesta del estudiante: ${answers.lecturaP6 || 'No contestado'}
Guía docente: El estudiante debe reflexionar sobre el proceso cognitivo (metacognición).

Nivel de dificultad asignado a Lectura (1 al 5): ${answers.lecturaDificultad}
`;
}

export function generateCienciaReport(studentName: string, answers: any): string {
  return `=== PRÁCTICA INDIVIDUAL: ÁREA DE CIENCIA ===
Estudiante: ${studentName}
Fecha: ${new Date().toLocaleString()}

-- Ítem de Ciencia: El clima y los datos --
P1: ¿Cuál es el punto principal de desacuerdo entre la conclusión de Carlos y la observación de Ana?
Respuesta del estudiante: ${answers.cienciaP1 || 'No contestado'}
Respuesta correcta del docente: El desacuerdo radica en la multicausalidad. Carlos sostiene una postura lineal de causa única (el CO2 es el único causante de la temperatura), mientras que Ana indica que la evidencia muestra desviaciones a corto plazo donde intervienen otros factores.

P2: ¿Cuál de los siguientes principios científicos permite analizar mejor esta gráfica?
Respuesta del estudiante: ${answers.cienciaP2 || 'No contestado'}
Respuesta correcta del docente: Opción A - La observación de patrones y tendencias históricas.

P3: Observa el "período de divergencia" resaltado en el círculo gris. ¿Qué sucede con la línea azul continua (CO2) y la línea naranja punteada (temperatura) durante esos años específicos (1940-1970)?
Respuesta del estudiante: ${answers.cienciaP3 || 'No contestado'}
Respuesta correcta del docente: La concentración de CO2 continúa su ascenso constante (311 a 325 ppm), pero la anomalía de temperatura no sube, sino que fluctúa con ligera tendencia a la baja o se estabiliza.

P4: ¿En qué valor de concentración de CO2 (ppm) se encontraba la atmósfera en el año 1940, justo cuando la temperatura comenzó a bajar temporalmente?
Respuesta del estudiante: ${answers.cienciaP4 || 'No contestado'}
Respuesta correcta del docente: Opción B - 311 ppm.

P5: Según el gráfico, ¿qué evidencia numérica entre 1940 y 1970 le da la razón a Ana?
Respuesta del estudiante: ${answers.cienciaP5 || 'No contestado'}
Respuesta correcta del docente: Opción A - El CO2 aumentó de 311 a 325 ppm, pero la temperatura bajó de 0.1 a 0.0 °C.

P6: Si seguimos la "tendencia general" marcada en el cuadro gris de la derecha de la gráfica, ¿qué se puede concluir sobre la relación a largo plazo (1880-2000) entre ambas variables?
Respuesta del estudiante: ${answers.cienciaP6 || 'No contestado'}
Respuesta correcta del docente: Opción B - A pesar de fluctuaciones temporales, ambas muestran una tendencia ascendente clara.

P7: ¿Qué función cumple el círculo gris etiquetado como "período de divergencia" en esta herramienta científica?
Respuesta del estudiante: ${answers.cienciaP7 || 'No contestado'}
Respuesta correcta del docente: Opción C - Señalar una excepción que obliga a pensar en otras variables además del CO2.

P8: Basándote en la gráfica, explica con tus palabras: ¿Por qué no se puede decir que el CO2 es el "único" factor que dicta la temperatura año tras año?
Respuesta del estudiante: ${answers.cienciaP8 || 'No contestado'}
Respuesta correcta del docente: Porque hay períodos (como 1940-1970) donde no se mueven en la misma dirección, demostrando que influyen otros factores de complejidad sistémica (aerosoles, ciclos solares, etc.).

P9: ¿Qué parte del texto o gráfico te ayudó más a responder?
Respuesta del estudiante: ${answers.cienciaP9 || 'No contestado'}
Guía docente: Generalmente las etiquetas, el círculo gris y el cuadro de tendencia general.

Nivel de dificultad asignado a Ciencia (1 al 5): ${answers.cienciaDificultad}
`;
}

export function generateDiarioYFranjaReport(studentName: string, answers: any): string {
  return `=== FRANJA SOCIOEMOCIONAL Y DIARIO REFLEXIVO ===
Estudiante: ${studentName}
Fecha: ${new Date().toLocaleString()}

-- Franja Socioemocional: El barómetro humano --
Dilema 1: ¿Debería una IA decidir becas escolares solo por notas/asistencia?
Postura (1-100, donde 1 es Totalmente en desacuerdo y 100 es Totalmente de acuerdo): ${answers.socio_dilema1_val}/100
Argumento: ${answers.socio_dilema1_arg || 'Sin comentarios'}

Dilema 2: ¿Se debe permitir construir un hotel turístico a costa de destruir manglares si dará empleo a 200 familias?
Postura (1-100): ${answers.socio_dilema2_val}/100
Argumento: ${answers.socio_dilema2_arg || 'Sin comentarios'}

Dilema 3: ¿Es justo que un algoritmo de red social recomiende publicidad de clínicas psicológicas privadas tras detectar mensajes tristes, y avise a la universidad de aplicación?
Postura (1-100): ${answers.socio_dilema3_val}/100
Argumento: ${answers.socio_dilema3_arg || 'Sin comentarios'}

-- Trabajo Individual o Colaborativo --
Notas de análisis y reflexiones del proceso:
${answers.colaborativo_notas || 'Sin notas'}

-- Argumentación y Socialización --
Notas para el debate y argumentación:
${answers.socializacion_notas || 'Sin notas'}

-- Diario Reflexivo del Estudiante --
1a. ¿Qué parte se te hizo más difícil al principio del cuadernillo?
Respuesta: ${answers.diario_dificultadInicio || 'No contestado'}

1b. ¿Por qué se te hizo difícil?
Respuesta: ${answers.diario_dificultadRazon || 'No contestado'}

2. Si volvieras a hacer el cuadernillo, ¿qué herramienta o técnica usarías primero o qué harías diferente?
Respuesta: ${answers.diario_cambioProceso || 'No contestado'}

3. Escribe una frase que resuma tu experiencia de la jornada de hoy:
Respuesta: ${answers.diario_fraseResumen || 'No contestado'}

Clima Mental final: ${answers.diario_climaMental ? answers.diario_climaMental.toUpperCase() : 'No seleccionado'}
`;
}
