// Manual sections data — each section has an id, icon, title, and content (JSX-ready HTML string)
// This file separates data from presentation for the Manual page

export const MANUAL_SECTIONS = [
  {
    id: 'intro',
    num: 1,
    icon: '🎓',
    title: 'Introducción a SMED',
    keywords: 'smed single minute exchange die cambio rápido lean shigeo shingo setup',
    content: `
      <h3>¿Qué es SMED?</h3>
      <p><strong>SMED</strong> (Single-Minute Exchange of Die) es una metodología Lean desarrollada por <strong>Shigeo Shingo</strong> cuyo objetivo es reducir drásticamente los tiempos de cambio o setup en un proceso productivo. El nombre "Single-Minute" indica que el tiempo de cambio debe medirse en un solo dígito de minutos (menos de 10 minutos).</p>
      <p>SMED es una de las herramientas fundamentales del <strong>Toyota Production System (TPS)</strong> y un pilar esencial para lograr producción flexible, lotes pequeños y entregas rápidas.</p>

      <h3>Las 3 Etapas de SMED</h3>
      <table class="manual-table"><thead><tr><th>Etapa</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>Etapa 1</strong></td><td>Separar Tareas Internas y Externas</td><td>Identificar qué operaciones requieren máquina detenida (internas) y cuáles pueden hacerse con la máquina en marcha (externas)</td></tr>
        <tr><td><strong>Etapa 2</strong></td><td>Convertir Internas a Externas</td><td>Encontrar maneras de realizar tareas internas fuera del tiempo de paro</td></tr>
        <tr><td><strong>Etapa 3</strong></td><td>Simplificar todas las Tareas</td><td>Reducir el tiempo de cada operación restante con técnicas Lean</td></tr>
      </tbody></table>

      <h3>Beneficios de SMED</h3>
      <table class="manual-table"><thead><tr><th>Beneficio</th><th>Impacto</th></tr></thead><tbody>
        <tr><td><strong>Menos tiempo de paro</strong></td><td>Mayor disponibilidad de equipo y OEE mejorado</td></tr>
        <tr><td><strong>Lotes más pequeños</strong></td><td>Reducción de inventario y mayor flexibilidad</td></tr>
        <tr><td><strong>Respuesta más rápida</strong></td><td>Capacidad de cambiar productos con frecuencia</td></tr>
        <tr><td><strong>Menor desperdicio</strong></td><td>Reducción de Muda, Muri y Mura en el proceso de cambio</td></tr>
        <tr><td><strong>Mayor productividad</strong></td><td>Más tiempo efectivo de producción por turno</td></tr>
      </tbody></table>

      <h3>¿Para quién es NexIA SMED?</h3>
      <table class="manual-table"><thead><tr><th>Perfil de Usuario</th><th>Uso Principal</th></tr></thead><tbody>
        <tr><td><strong>Ingenieros de proceso</strong></td><td>Analizar y optimizar tiempos de cambio</td></tr>
        <tr><td><strong>Supervisores de línea</strong></td><td>Estandarizar procedimientos de setup</td></tr>
        <tr><td><strong>Líderes Lean</strong></td><td>Liderar eventos Kaizen de reducción de setup</td></tr>
        <tr><td><strong>Técnicos de mantenimiento</strong></td><td>Identificar mejoras en herramental y fijaciones</td></tr>
        <tr><td><strong>Consultores Lean</strong></td><td>Implementar SMED con clientes de forma estandarizada</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'quickstart',
    num: 2,
    icon: '🚀',
    title: 'Inicio Rápido',
    keywords: 'inicio instalación requisitos npm ejecutar tutorial primeros pasos',
    content: `
      <h3>Requisitos del Sistema</h3>
      <table class="manual-table"><thead><tr><th>Requisito</th><th>Especificación</th></tr></thead><tbody>
        <tr><td><strong>Runtime</strong></td><td>Node.js versión 18 o superior</td></tr>
        <tr><td><strong>Navegador</strong></td><td>Chrome, Firefox, Edge o Safari (versiones recientes)</td></tr>
        <tr><td><strong>Sistema operativo</strong></td><td>Windows, macOS o Linux</td></tr>
        <tr><td><strong>Resolución recomendada</strong></td><td>1280 × 720 px o superior</td></tr>
        <tr><td><strong>Cámara (opcional)</strong></td><td>Webcam o cámara integrada para grabar el proceso</td></tr>
      </tbody></table>

      <h3>Instalación y Ejecución</h3>
      <table class="manual-table"><thead><tr><th>Paso</th><th>Comando</th><th>Descripción</th></tr></thead><tbody>
        <tr><td>1</td><td><code>npm install</code></td><td>Descarga e instala todas las dependencias del proyecto</td></tr>
        <tr><td>2</td><td><code>npm run dev</code></td><td>Inicia el servidor de desarrollo en modo local</td></tr>
      </tbody></table>
      <p>Una vez iniciado, la aplicación estará disponible en <strong>http://localhost:5173/</strong></p>

      <h3>Primeros Pasos (Tutorial Rápido)</h3>
      <table class="manual-table"><thead><tr><th>Paso</th><th>Acción</th><th>Resultado Esperado</th></tr></thead><tbody>
        <tr><td>1</td><td>Abre la aplicación en tu navegador</td><td>Verás la pantalla de Inicio con módulos y proyectos</td></tr>
        <tr><td>2</td><td>Haz clic en <strong>Nuevo Proyecto SMED</strong></td><td>Se abre un modal para nombrar tu proyecto</td></tr>
        <tr><td>3</td><td>Navega a <strong>Captura y Observación</strong></td><td>Cronómetro y grabación de video disponibles</td></tr>
        <tr><td>4</td><td>Registra los pasos del proceso de cambio con el cronómetro</td><td>Lista de pasos con duración exacta</td></tr>
        <tr><td>5</td><td>Ve a <strong>Clasificación</strong> y arrastra cada paso</td><td>Separación visual en Internas vs Externas</td></tr>
        <tr><td>6</td><td>Ve a <strong>Optimización</strong> y convierte o simplifica</td><td>Reducción calculada automáticamente</td></tr>
        <tr><td>7</td><td>Genera el <strong>Estándar (SOP)</strong></td><td>Instrucciones de trabajo digitalizadas</td></tr>
      </tbody></table>
      <div class="manual-note"><span class="manual-note-icon">📝</span><span>La aplicación guarda tus datos automáticamente. Puedes cerrar y reabrir el navegador sin perder tu progreso.</span></div>
    `
  },
  {
    id: 'navigation',
    num: 3,
    icon: '🧭',
    title: 'Navegación General',
    keywords: 'navegación barra lateral sidebar módulos persistencia datos localstorage interfaz',
    content: `
      <h3>3.1 Barra Lateral</h3>
      <p>La barra lateral izquierda es permanente y siempre visible. Es el punto central de navegación.</p>
      <table class="manual-table"><thead><tr><th>Icono</th><th>Sección</th><th>Ruta</th><th>Descripción</th></tr></thead><tbody>
        <tr><td>🏠</td><td><strong>Inicio</strong></td><td>/</td><td>Panel principal con proyectos, estadísticas y módulos</td></tr>
        <tr><td>🎥</td><td><strong>Captura y Observación</strong></td><td>/capture</td><td>Grabación de video y cronómetro para registrar pasos</td></tr>
        <tr><td>🔀</td><td><strong>Clasificación</strong></td><td>/classify</td><td>Drag & drop para separar tareas internas y externas</td></tr>
        <tr><td>⚡</td><td><strong>Optimización</strong></td><td>/optimize</td><td>Conversión y simplificación de tareas internas</td></tr>
        <tr><td>📋</td><td><strong>Estándares</strong></td><td>/standards</td><td>SOP digital con checklist y exportación</td></tr>
        <tr><td>📊</td><td><strong>Resultados</strong></td><td>/dashboard</td><td>Gráficas, KPIs y comparativos antes/después</td></tr>
        <tr><td>📘</td><td><strong>Manual</strong></td><td>/manual</td><td>Este manual de usuario</td></tr>
      </tbody></table>

      <h3>3.2 Persistencia de Datos</h3>
      <table class="manual-table"><thead><tr><th>Característica</th><th>Detalle</th></tr></thead><tbody>
        <tr><td><strong>Guardado automático</strong></td><td>Cada modificación se guarda inmediatamente sin presionar "Guardar"</td></tr>
        <tr><td><strong>Datos entre sesiones</strong></td><td>Al cerrar y reabrir el navegador, tus datos estarán donde los dejaste</td></tr>
        <tr><td><strong>Datos locales</strong></td><td>La información se almacena únicamente en el navegador (localStorage)</td></tr>
        <tr><td><strong>Multi-proyecto</strong></td><td>Puedes crear múltiples proyectos SMED y alternar entre ellos</td></tr>
      </tbody></table>

      <h3>3.3 Convenciones de la Interfaz</h3>
      <table class="manual-table"><thead><tr><th>Elemento</th><th>Descripción</th><th>Ejemplo de Uso</th></tr></thead><tbody>
        <tr><td><strong>Tarjetas de cristal</strong></td><td>Contenedores con efecto glassmorphism y borde sutil</td><td>Estadísticas, módulos, pasos</td></tr>
        <tr><td><strong>Badges de color</strong></td><td>Etiquetas que indican categoría o estado</td><td>Interna (rojo), Externa (verde), Convertida (cyan)</td></tr>
        <tr><td><strong>Botones primarios</strong></td><td>Acción principal de la sección (color accent)</td><td>"Nuevo Proyecto", "Registrar Paso"</td></tr>
        <tr><td><strong>Barras de progreso</strong></td><td>Indican avance en porcentaje</td><td>Clasificación, Checklist del SOP</td></tr>
        <tr><td><strong>Tema oscuro</strong></td><td>Interfaz diseñada con paleta oscura premium</td><td>Reducción de fatiga visual</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'home',
    num: 4,
    icon: '🏠',
    title: 'Página de Inicio',
    keywords: 'inicio home estadísticas módulos hero proyecto crear eliminar seleccionar',
    content: `
      <h3>4.1 Sección Hero</h3>
      <p>En la parte superior se presenta el encabezado de bienvenida con el nombre <strong>Nexia SMED</strong> y una breve descripción. Incluye el botón <strong>"Nuevo Proyecto SMED"</strong> para crear un nuevo análisis.</p>

      <h3>4.2 Tarjetas de Estadísticas</h3>
      <table class="manual-table"><thead><tr><th>Tarjeta</th><th>Indicador</th><th>Interpretación</th></tr></thead><tbody>
        <tr><td><strong>Proyectos</strong></td><td>Cantidad de proyectos SMED creados</td><td>Total de análisis en la aplicación</td></tr>
        <tr><td><strong>Proyecto Activo</strong></td><td>Nombre del proyecto seleccionado</td><td>El proyecto sobre el que se trabaja actualmente</td></tr>
        <tr><td><strong>Pasos Registrados</strong></td><td>Cantidad de pasos en el proyecto activo</td><td>Tareas observadas durante el proceso de cambio</td></tr>
      </tbody></table>

      <h3>4.3 Tarjetas de Módulos</h3>
      <p>Cinco tarjetas de acceso rápido permiten navegar directamente a cualquier módulo: Captura, Clasificación, Optimización, Estándares y Resultados.</p>

      <h3>4.4 Gestión de Proyectos</h3>
      <table class="manual-table"><thead><tr><th>Acción</th><th>Cómo</th><th>Resultado</th></tr></thead><tbody>
        <tr><td><strong>Crear proyecto</strong></td><td>Clic en "Nuevo Proyecto SMED" → Completa nombre y descripción</td><td>Se crea el proyecto y se activa automáticamente</td></tr>
        <tr><td><strong>Seleccionar proyecto</strong></td><td>Clic en cualquier tarjeta de proyecto</td><td>Se marca como activo (badge azul "Activo")</td></tr>
        <tr><td><strong>Eliminar proyecto</strong></td><td>Clic en el icono 🗑 de la tarjeta</td><td>Se elimina permanentemente (con confirmación)</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'capture',
    num: 5,
    icon: '🎥',
    title: 'Módulo: Captura y Observación',
    keywords: 'captura observación video cámara cronómetro pasos registrar grabar tiempo lap',
    content: `
      <p><strong>Propósito:</strong> Grabar el proceso de cambio en video y registrar cada paso con su duración exacta usando un cronómetro integrado.</p>

      <h3>5.1 Video del Proceso</h3>
      <table class="manual-table"><thead><tr><th>Funcionalidad</th><th>Descripción</th><th>Cómo usarla</th></tr></thead><tbody>
        <tr><td><strong>Activar Cámara</strong></td><td>Conecta la webcam del equipo</td><td>Clic en "📷 Activar Cámara"</td></tr>
        <tr><td><strong>Grabar</strong></td><td>Inicia la grabación de video</td><td>Clic en "⏺ Grabar" — también inicia el cronómetro automáticamente</td></tr>
        <tr><td><strong>Detener</strong></td><td>Finaliza la grabación</td><td>Clic en "⏹ Detener" — el video queda disponible para reproducir</td></tr>
        <tr><td><strong>Cerrar Cámara</strong></td><td>Desconecta el flujo de video</td><td>Clic en "Cerrar Cámara"</td></tr>
      </tbody></table>
      <div class="manual-tip"><span class="manual-tip-icon">💡</span><span>La grabación de video es <strong>opcional</strong>. Puedes usar solo el cronómetro para registrar los pasos sin necesidad de cámara.</span></div>

      <h3>5.2 Cronómetro</h3>
      <table class="manual-table"><thead><tr><th>Control</th><th>Acción</th><th>Detalle</th></tr></thead><tbody>
        <tr><td><strong>▶ Iniciar</strong></td><td>Inicia el conteo desde cero</td><td>El cronómetro empieza a correr</td></tr>
        <tr><td><strong>⏸ Pausar</strong></td><td>Detiene temporalmente el conteo</td><td>Puedes reanudar después sin perder el tiempo</td></tr>
        <tr><td><strong>▶ Reanudar</strong></td><td>Continúa el conteo desde donde se pausó</td><td>Solo visible si está pausado y hay tiempo acumulado</td></tr>
        <tr><td><strong>↺ Reset</strong></td><td>Reinicia el cronómetro a cero</td><td>No elimina los pasos ya registrados</td></tr>
      </tbody></table>

      <h3>5.3 Registro de Pasos</h3>
      <table class="manual-table"><thead><tr><th>Campo</th><th>Tipo</th><th>Descripción</th><th>Ejemplo</th></tr></thead><tbody>
        <tr><td><strong>Nombre del paso</strong></td><td>Texto</td><td>Descripción breve de la operación</td><td>"Aflojar tornillos del molde"</td></tr>
        <tr><td><strong>Duración</strong></td><td>Automática</td><td>Se calcula como el tiempo entre el último registro y el actual (lap)</td><td>1m 23s</td></tr>
      </tbody></table>
      <div class="manual-note"><span class="manual-note-icon">📝</span><span>Si no ingresas un nombre, el paso se nombra automáticamente como "Paso 1", "Paso 2", etc. Puedes presionar <strong>Enter</strong> para registar rápidamente.</span></div>

      <h3>5.4 Estadísticas de Captura</h3>
      <table class="manual-table"><thead><tr><th>Métrica</th><th>Cálculo</th></tr></thead><tbody>
        <tr><td><strong>Total Pasos</strong></td><td>Cantidad de pasos registrados</td></tr>
        <tr><td><strong>Tiempo Total</strong></td><td>Suma de todas las duraciones</td></tr>
        <tr><td><strong>Paso más largo</strong></td><td>El paso con mayor duración</td></tr>
        <tr><td><strong>Promedio</strong></td><td>Tiempo Total / Total de pasos</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'classification',
    num: 6,
    icon: '🔀',
    title: 'Módulo: Clasificación Visual',
    keywords: 'clasificación visual drag drop arrastrar interna externa máquina detenida paralelo',
    content: `
      <p><strong>Propósito:</strong> Clasificar cada paso del proceso de cambio como <strong>tarea interna</strong> (requiere máquina detenida) o <strong>tarea externa</strong> (puede hacerse con la máquina funcionando).</p>

      <h3>6.1 Concepto Clave: Interna vs Externa</h3>
      <table class="manual-table"><thead><tr><th>Tipo</th><th>Badge</th><th>Definición</th><th>Ejemplo</th></tr></thead><tbody>
        <tr><td><strong>Interna</strong></td><td>⛔ Rojo</td><td>Solo se puede realizar con la máquina / proceso detenido</td><td>Cambiar el molde, ajustar la altura</td></tr>
        <tr><td><strong>Externa</strong></td><td>✅ Verde</td><td>Se puede realizar mientras la máquina está produciendo</td><td>Traer herramientas, precalentar molde</td></tr>
      </tbody></table>

      <h3>6.2 Interfaz Drag & Drop</h3>
      <p>La interfaz presenta tres columnas donde puedes arrastrar y soltar cada tarea:</p>
      <table class="manual-table"><thead><tr><th>Columna</th><th>Contenido</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>📋 Sin clasificar</strong></td><td>Tareas nuevas sin categoría</td><td>Todas las tareas comienzan aquí</td></tr>
        <tr><td><strong>⛔ Internas</strong></td><td>Tareas que requieren máquina detenida</td><td>Arrastra aquí las tareas internas</td></tr>
        <tr><td><strong>✅ Externas</strong></td><td>Tareas que se pueden hacer en paralelo</td><td>Arrastra aquí las tareas externas</td></tr>
      </tbody></table>

      <h3>6.3 Barra de Progreso</h3>
      <table class="manual-table"><thead><tr><th>Indicador</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>Progreso de clasificación</strong></td><td>Muestra cuántas tareas han sido clasificadas vs el total</td></tr>
        <tr><td><strong>Barra de tiempo</strong></td><td>Desglose visual del tiempo: rojo (internas), verde (externas), gris (sin clasificar)</td></tr>
      </tbody></table>

      <h3>6.4 Resumen</h3>
      <table class="manual-table"><thead><tr><th>Métrica</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>Tiempo Interno</strong></td><td>Suma de duración de todas las tareas internas</td></tr>
        <tr><td><strong>Tiempo Externo</strong></td><td>Suma de duración de todas las tareas externas</td></tr>
        <tr><td><strong>Ratio Interno/Total</strong></td><td>Porcentaje del tiempo total que es interno — este es el tiempo de paro</td></tr>
      </tbody></table>
      <div class="manual-important"><span class="manual-tip-icon">⚠️</span><span>Clasificar correctamente es el paso más crítico de SMED. Un error aquí afecta todas las etapas siguientes. Usa la pregunta: <strong>"¿Esta tarea REQUIERE que la máquina esté detenida?"</strong></span></div>
    `
  },
  {
    id: 'optimization',
    num: 7,
    icon: '⚡',
    title: 'Módulo: Transformación y Simplificación',
    keywords: 'optimización transformación simplificación convertir externa lean técnicas abrazadera pre-ensamble checklist',
    content: `
      <p><strong>Propósito:</strong> Cuestionar cada tarea interna para convertirla a externa o simplificarla, reduciendo el tiempo efectivo de paro.</p>

      <h3>7.1 Preguntas Guía</h3>
      <p>Para cada tarea interna, la aplicación muestra preguntas orientadoras:</p>
      <table class="manual-table"><thead><tr><th>Nº</th><th>Pregunta</th></tr></thead><tbody>
        <tr><td>1</td><td>¿Se puede preparar este material/herramienta <strong>antes</strong> de detener la máquina?</td></tr>
        <tr><td>2</td><td>¿Se podría precalentar, pre-posicionar o pre-ensamblar <strong>externamente</strong>?</td></tr>
        <tr><td>3</td><td>¿Se puede usar un sistema de <strong>fijación rápida</strong> en vez de tornillos?</td></tr>
        <tr><td>4</td><td>¿Se puede <strong>estandarizar</strong> este ajuste para eliminarlo?</td></tr>
        <tr><td>5</td><td>¿Se puede hacer esta tarea <strong>en paralelo</strong> con otra?</td></tr>
      </tbody></table>

      <h3>7.2 Conversión a Externa</h3>
      <table class="manual-table"><thead><tr><th>Acción</th><th>Cómo</th><th>Resultado</th></tr></thead><tbody>
        <tr><td><strong>Escribir nota de conversión</strong></td><td>Campo de texto "¿Cómo se hará externamente?"</td><td>Documenta la solución propuesta</td></tr>
        <tr><td><strong>Convertir a Externa</strong></td><td>Clic en "→ Convertir a Externa"</td><td>La tarea se mueve al panel de convertidas y su tiempo se resta del paro</td></tr>
      </tbody></table>

      <h3>7.3 Técnicas Lean de Simplificación</h3>
      <table class="manual-table"><thead><tr><th>Técnica</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>🔧 Abrazaderas rápidas</strong></td><td>Cambiar tornillos por abrazaderas de liberación rápida</td></tr>
        <tr><td><strong>📐 Guías de posicionamiento</strong></td><td>Usar guías, pines o topes para eliminar ajustes</td></tr>
        <tr><td><strong>🔩 Pre-ensamble</strong></td><td>Ensamblar subconjuntos antes del cambio</td></tr>
        <tr><td><strong>🔥 Pre-calentamiento</strong></td><td>Precalentar moldes o herramientas antes del cambio</td></tr>
        <tr><td><strong>👥 Operaciones paralelas</strong></td><td>Asignar dos personas para hacer tareas simultáneamente</td></tr>
        <tr><td><strong>📏 Estandarización</strong></td><td>Estandarizar tamaños, alturas y conexiones</td></tr>
        <tr><td><strong>✅ Checklist previo</strong></td><td>Crear listas de verificación para asegurar preparación</td></tr>
        <tr><td><strong>👁 Gestión visual</strong></td><td>Marcar posiciones, colores y etiquetas para ubicación rápida</td></tr>
      </tbody></table>
      <div class="manual-tip"><span class="manual-tip-icon">💡</span><span>Haz clic en las etiquetas de técnicas Lean para agregarlas automáticamente a las notas de simplificación de cada tarea.</span></div>

      <h3>7.4 Métricas de Impacto</h3>
      <table class="manual-table"><thead><tr><th>Métrica</th><th>Cálculo</th></tr></thead><tbody>
        <tr><td><strong>Tiempo Original</strong></td><td>Duración total de todos los pasos</td></tr>
        <tr><td><strong>Tiempo Estimado</strong></td><td>Tiempo original − conversiones − simplificaciones</td></tr>
        <tr><td><strong>Reducción %</strong></td><td>Porcentaje de mejora logrado</td></tr>
        <tr><td><strong>Convertidas</strong></td><td>Cantidad de tareas que pasaron de internas a externas</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'standards',
    num: 8,
    icon: '📋',
    title: 'Módulo: Creador de Estándares',
    keywords: 'estándares SOP instrucciones trabajo checklist fase preparación cambio interno externo imprimir exportar',
    content: `
      <p><strong>Propósito:</strong> Generar automáticamente un SOP (Standard Operating Procedure) digital a partir del flujo optimizado, organizado en fases con checklist interactivo.</p>

      <h3>8.1 Estructura del SOP</h3>
      <table class="manual-table"><thead><tr><th>Fase</th><th>Badge</th><th>Contenido</th><th>Instrucción</th></tr></thead><tbody>
        <tr><td><strong>Fase 1 — Preparación Externa</strong></td><td>✅ Verde</td><td>Tareas externas + convertidas</td><td>Realizar ANTES de detener la máquina</td></tr>
        <tr><td><strong>Fase 2 — Cambio Interno</strong></td><td>⛔ Rojo</td><td>Tareas internas restantes</td><td>Realizar CON la máquina detenida, lo más rápido posible</td></tr>
      </tbody></table>

      <h3>8.2 Funcionalidades del SOP</h3>
      <table class="manual-table"><thead><tr><th>Función</th><th>Descripción</th></tr></thead><tbody>
        <tr><td><strong>Checklist interactivo</strong></td><td>Marca cada paso como completado con un clic</td></tr>
        <tr><td><strong>Barra de progreso</strong></td><td>Muestra el avance del checklist en porcentaje</td></tr>
        <tr><td><strong>Notas por paso</strong></td><td>Agrega instrucciones específicas a cualquier paso</td></tr>
        <tr><td><strong>Badges de conversión</strong></td><td>Indica qué tareas fueron convertidas de internas</td></tr>
        <tr><td><strong>Tiempos simplificados</strong></td><td>Muestra la duración nueva si fue simplificada</td></tr>
      </tbody></table>

      <h3>8.3 Exportación</h3>
      <table class="manual-table"><thead><tr><th>Formato</th><th>Botón</th><th>Uso</th></tr></thead><tbody>
        <tr><td><strong>Imprimir</strong></td><td>🖨 Imprimir SOP</td><td>Genera una versión imprimible del procedimiento</td></tr>
        <tr><td><strong>JSON</strong></td><td>📥 Exportar JSON</td><td>Exporta todo el proyecto en formato JSON</td></tr>
        <tr><td><strong>CSV</strong></td><td>📊 Exportar CSV</td><td>Exporta los pasos como hoja de cálculo</td></tr>
      </tbody></table>
      <div class="manual-tip"><span class="manual-tip-icon">💡</span><span>El SOP se genera automáticamente a partir de la clasificación y optimización. No necesitas escribirlo manualmente — la aplicación estructura el flujo de trabajo por ti.</span></div>
    `
  },
  {
    id: 'dashboard',
    num: 9,
    icon: '📊',
    title: 'Módulo: Panel de Resultados',
    keywords: 'dashboard resultados gráficas KPI antes después reducción OEE disponibilidad pie bar chart',
    content: `
      <p><strong>Propósito:</strong> Visualizar el impacto del análisis SMED con métricas, gráficas comparativas y cálculos de impacto en OEE.</p>

      <h3>9.1 Indicadores Principales</h3>
      <table class="manual-table"><thead><tr><th>KPI</th><th>Definición</th><th>Interpretación</th></tr></thead><tbody>
        <tr><td><strong>Tiempo Antes</strong></td><td>Duración total original de todos los pasos</td><td>Línea base del proceso de cambio</td></tr>
        <tr><td><strong>Tiempo Después</strong></td><td>Solo el tiempo de tareas internas restantes (con simplificaciones)</td><td>Tiempo efectivo de paro de máquina</td></tr>
        <tr><td><strong>Reducción %</strong></td><td>Porcentaje de mejora logrado</td><td>Meta: >50% en primera iteración</td></tr>
        <tr><td><strong>Tareas Convertidas</strong></td><td>Cantidad de tareas internas → externas</td><td>Indicador de oportunidades aprovechadas</td></tr>
      </tbody></table>

      <h3>9.2 Gráficas</h3>
      <table class="manual-table"><thead><tr><th>Gráfica</th><th>Tipo</th><th>Utilidad</th></tr></thead><tbody>
        <tr><td><strong>Antes vs Después</strong></td><td>Barras comparativas</td><td>Visualizar la reducción de tiempo en minutos</td></tr>
        <tr><td><strong>Desglose por Categoría</strong></td><td>Gráfico de dona</td><td>Proporción de tiempo interno, externo y convertido</td></tr>
      </tbody></table>

      <h3>9.3 Impacto en OEE — Disponibilidad</h3>
      <table class="manual-table"><thead><tr><th>Métrica</th><th>Cálculo</th><th>Uso</th></tr></thead><tbody>
        <tr><td><strong>Ahorro por Cambio</strong></td><td>Tiempo Antes − Tiempo Después</td><td>Minutos recuperados en cada cambio</td></tr>
        <tr><td><strong>Ahorro por Día</strong></td><td>Ahorro por cambio × Cambios por día</td><td>Impacto diario total</td></tr>
        <tr><td><strong>Ganancia Disponibilidad</strong></td><td>(Ahorro por día / Minutos por turno) × 100</td><td>Puntos porcentuales ganados en OEE</td></tr>
      </tbody></table>

      <h3>9.4 Parámetros de Cálculo</h3>
      <table class="manual-table"><thead><tr><th>Parámetro</th><th>Descripción</th><th>Valor por defecto</th></tr></thead><tbody>
        <tr><td><strong>Cambios por día</strong></td><td>Número de veces que se realiza el setup al día</td><td>3</td></tr>
        <tr><td><strong>Minutos por turno</strong></td><td>Duración neta del turno de producción</td><td>480 min (8 horas)</td></tr>
      </tbody></table>

      <h3>9.5 Historial de Proyectos</h3>
      <p>Si existen múltiples proyectos, se muestra una tabla comparativa con el nombre, cantidad de pasos, tiempos antes/después y reducción lograda en cada uno.</p>
    `
  },
  {
    id: 'glossary',
    num: 10,
    icon: '📖',
    title: 'Glosario de Términos',
    keywords: 'glosario términos definiciones smed lean setup cambio interno externo OEE SOP',
    content: `
      <table class="manual-table"><thead><tr><th>Término</th><th>Definición</th></tr></thead><tbody>
        <tr><td><strong>SMED</strong></td><td>Single-Minute Exchange of Die — metodología para reducir tiempos de cambio a menos de 10 minutos</td></tr>
        <tr><td><strong>Setup / Cambio</strong></td><td>Proceso de preparación o cambio de configuración en una máquina o proceso</td></tr>
        <tr><td><strong>Tarea Interna</strong></td><td>Operación que solo puede realizarse con la máquina detenida</td></tr>
        <tr><td><strong>Tarea Externa</strong></td><td>Operación que puede realizarse mientras la máquina está produciendo</td></tr>
        <tr><td><strong>Conversión</strong></td><td>Transformar una tarea interna en externa mediante mejoras en el método</td></tr>
        <tr><td><strong>Simplificación</strong></td><td>Reducir el tiempo de una tarea mediante técnicas Lean</td></tr>
        <tr><td><strong>OEE</strong></td><td>Overall Equipment Effectiveness — indicador de eficiencia que incluye Disponibilidad × Rendimiento × Calidad</td></tr>
        <tr><td><strong>Disponibilidad</strong></td><td>Porcentaje del tiempo planificado en que el equipo está realmente produciendo</td></tr>
        <tr><td><strong>SOP</strong></td><td>Standard Operating Procedure — instrucciones de trabajo estandarizadas</td></tr>
        <tr><td><strong>Kaizen</strong></td><td>Mejora continua — filosofía de hacer pequeñas mejoras incrementales constantemente</td></tr>
        <tr><td><strong>Muda</strong></td><td>Desperdicio — cualquier actividad que no agrega valor al cliente</td></tr>
        <tr><td><strong>Muri</strong></td><td>Sobrecarga — exigir más de lo que el sistema puede manejar de forma sostenible</td></tr>
        <tr><td><strong>Mura</strong></td><td>Variabilidad — irregularidad en el flujo de trabajo que causa desperdicios</td></tr>
        <tr><td><strong>Drag & Drop</strong></td><td>Interacción de arrastrar y soltar elementos en la interfaz</td></tr>
        <tr><td><strong>localStorage</strong></td><td>Almacenamiento del navegador que guarda datos entre sesiones</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'faq',
    num: 11,
    icon: '❓',
    title: 'Preguntas Frecuentes',
    keywords: 'preguntas frecuentes faq dudas ayuda resetear exportar datos cámara video',
    content: `
      <table class="manual-table"><thead><tr><th>Nº</th><th>Pregunta</th><th>Respuesta</th></tr></thead><tbody>
        <tr><td>1</td><td><strong>¿Necesito cámara para usar la app?</strong></td><td>No. La grabación de video es opcional. Puedes usar solo el cronómetro para registrar los pasos.</td></tr>
        <tr><td>2</td><td><strong>¿Puedo crear varios proyectos?</strong></td><td>Sí. Crea tantos proyectos SMED como necesites y alterna entre ellos desde la página de Inicio.</td></tr>
        <tr><td>3</td><td><strong>¿Cómo cambio la clasificación de un paso?</strong></td><td>En el módulo de Clasificación, arrastra el paso de una columna a otra.</td></tr>
        <tr><td>4</td><td><strong>¿Qué pasa si convierto una tarea por error?</strong></td><td>Actualmente no hay función de deshacer conversión. Puedes recrear el paso si es necesario.</td></tr>
        <tr><td>5</td><td><strong>¿Dónde se guardan los datos?</strong></td><td>En el localStorage del navegador. Son locales a ese navegador y dispositivo.</td></tr>
        <tr><td>6</td><td><strong>¿Cómo reseteo todos los datos?</strong></td><td>Consola del navegador: <code>localStorage.removeItem('nexia-smed-data')</code> y recarga la página.</td></tr>
        <tr><td>7</td><td><strong>¿Puedo imprimir el SOP?</strong></td><td>Sí. En el módulo de Estándares, haz clic en "🖨 Imprimir SOP".</td></tr>
        <tr><td>8</td><td><strong>¿Puedo exportar mis datos?</strong></td><td>Sí. En Estándares puedes exportar como JSON (todo el proyecto) o CSV (solo los pasos).</td></tr>
        <tr><td>9</td><td><strong>¿Cuántos pasos puede tener un proyecto?</strong></td><td>No hay límite definido en la aplicación.</td></tr>
        <tr><td>10</td><td><strong>¿Cómo se calcula la reducción?</strong></td><td>Reducción % = (Tiempo Antes − Tiempo Después) / Tiempo Antes × 100. "Después" solo cuenta tareas internas restantes.</td></tr>
      </tbody></table>
    `
  },
  {
    id: 'flow',
    num: 12,
    icon: '🔁',
    title: 'Flujo Recomendado de Trabajo',
    keywords: 'flujo recomendado recorrido paso a paso secuencia completa proceso SMED',
    content: `
      <h3>Paso 1: Crear Proyecto</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Crear un nuevo proyecto SMED</td><td>Inicio</td><td>Proyecto con nombre y descripción</td></tr>
        <tr><td>Describir el proceso a analizar</td><td>Inicio</td><td>Contexto del cambio / setup</td></tr>
      </tbody></table>

      <h3>Paso 2: Capturar el Proceso</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Grabar el proceso en video (opcional)</td><td>Captura y Observación</td><td>Video del cambio completo</td></tr>
        <tr><td>Registrar cada paso con el cronómetro</td><td>Captura y Observación</td><td>Lista de pasos con duración exacta</td></tr>
      </tbody></table>

      <h3>Paso 3: Clasificar las Tareas</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Arrastrar cada tarea a Interna o Externa</td><td>Clasificación</td><td>Separación completa de tareas</td></tr>
        <tr><td>Verificar el ratio Interno/Total</td><td>Clasificación</td><td>Línea base de tiempo interno</td></tr>
      </tbody></table>

      <h3>Paso 4: Optimizar</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Responder las preguntas guía para cada tarea</td><td>Optimización</td><td>Análisis de oportunidades</td></tr>
        <tr><td>Convertir tareas internas a externas</td><td>Optimización</td><td>Tareas reclasificadas</td></tr>
        <tr><td>Simplificar tareas restantes con técnicas Lean</td><td>Optimización</td><td>Tiempos reducidos</td></tr>
      </tbody></table>

      <h3>Paso 5: Estandarizar</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Revisar el SOP generado automáticamente</td><td>Estándares</td><td>Instrucciones ordenadas por fases</td></tr>
        <tr><td>Agregar notas específicas a cada paso</td><td>Estándares</td><td>SOP completo y documentado</td></tr>
        <tr><td>Imprimir o exportar el procedimiento</td><td>Estándares</td><td>Documento distribuible</td></tr>
      </tbody></table>

      <h3>Paso 6: Medir Resultados</h3>
      <table class="manual-table"><thead><tr><th>Actividad</th><th>Ubicación</th><th>Entregable</th></tr></thead><tbody>
        <tr><td>Revisar métricas antes vs después</td><td>Resultados</td><td>Reducción % y ahorro en minutos</td></tr>
        <tr><td>Evaluar impacto en OEE</td><td>Resultados</td><td>Ganancia de disponibilidad por día</td></tr>
        <tr><td>Comparar entre proyectos</td><td>Resultados</td><td>Historial de mejoras SMED</td></tr>
      </tbody></table>

      <div class="manual-tip"><span class="manual-tip-icon">💡</span><span><strong>NexIA SMED v1.0.0</strong> — Sistema de Reducción de Tiempos de Cambio. Desarrollado con ❤️ por NexIA</span></div>
    `
  }
];
