Perfecto. Ya tengo todas las respuestas y especificaciones necesarias. A continuación, voy a redactar el Product Requirements Document (PRD) completo para Aim_py MVP, en formato plano y con el nivel de detalle que permita a una IA de desarrollo implementar el proyecto. Incluyo la arquitectura, la estructura de datos generada, el árbol de componentes, las interacciones, los comportamientos de cada vista y las consideraciones sobre el diseño visual (sin definir estilos concretos, porque estos serán proporcionados por otro agente de diseño mediante un HTML o conexión MCP).

PRD: Aim_py — MVP (v0.1)
1. Resumen ejecutivo
Aim_py es una aplicación web educativa tipo SPA (Single Page Application) que permite estudiar fundamentos de Python de forma visual e interactiva. El producto muestra una biblioteca de ejercicios en forma de cartas, cada una con una premisa y su solución. El MVP no incluye backend; todos los datos se sirven desde archivos JSON estáticos generados previamente por un módulo de IA (procesamiento offline). La aplicación se entrega como un front-end puro que puede desplegarse en cualquier hosting estático.

El objetivo del MVP es ofrecer la experiencia completa de navegación, visualización de ejercicios con desglose de pasos y filtrado por etiquetas, dejando la arquitectura preparada para funcionalidades futuras como edición de código y ejecución.

2. Alcance funcional del MVP
Funcionalidades incluidas:

Barra lateral persistente con navegación entre secciones.

Vista principal (Biblioteca) con grid de cartas de ejercicios. Las cartas muestran nombre y premisa truncada. Animaciones sutiles al hover (escala y revelado de texto). Las cartas tienen un efecto de “flotación” continua.

Filtrado por etiquetas: desde la vista Settings el usuario puede seleccionar/desseleccionar etiquetas temáticas. Los ejercicios cuyas etiquetas no coincidan con las seleccionadas se muestran opacos, sin animaciones, pero siguen siendo clicables.

Vista de ejercicio (URL propia) con dos columnas:

Columna izquierda: carta con premisa (arriba) y lista de pasos con casillas de verificación manuales (abajo).

Columna derecha: carta con el código de la solución, con botón de “Voltear” que esconde el código mostrando una cara gris opaca (animación de volteo 3D).

Botón “Ejercicios” en la barra lateral: abre un ejercicio aleatorio respetando el filtro de etiquetas activo.

Sección Manual: página estática con una carta de prueba y texto dummy.

Sección Usuario: página estática con avatar y nombre de placeholder; en la esquina superior izquierda se muestra siempre el avatar/nombre clicable que lleva a la página de usuario.

Navegación SPA sin recarga completa de página (React Router).

Modo oscuro y paleta de colores basada en azules y blancos (el diseño detallado será provisto por una IA de estilos).

Datos de ejercicios consumidos desde un archivo JSON generado por un paso de procesamiento independiente. Los archivos .py originales se mantienen en el repositorio pero en .gitignore, solo como respaldo.

Funcionalidades explícitamente fuera del MVP (pero consideradas en el diseño de datos):

Ocultar/mostrar bloques lógicos de código con selector.

Ejecución de código.

Edición del código.

Sincronización automática entre pasos marcados y bloques ocultados.

Sistema de login real.

Contenido real en la sección Manual.

3. Arquitectura general
3.1 Stack tecnológico (recomendado y adaptable)
Librería principal: React 18+ con TypeScript (se puede omitir TS si la IA lo estima, pero se recomienda por seguridad de tipos).

Router: React Router v6 (cliente, BrowserRouter).

Estilos: CSS Modules o Tailwind CSS, según lo que determine la IA de estilos. La implementación debe permitir recibir tokens de diseño desde un sistema externo.

Manejo de estado: React Context + hooks locales. Para la selección de etiquetas se usará localStorage para persistencia.

Datos: Archivo JSON estático ubicado en /public/data/exercises.json (o ruta similar). La aplicación lo cargará al iniciar mediante fetch y lo almacenará en un contexto global.

Sintaxis de código: Para resaltado se puede usar highlight.js o prism-react-renderer. En el MVP basta con un bloque <pre><code> con clases de resaltado básico, pero la arquitectura debe permitir cambiar fácilmente a un editor real en el futuro (ej. CodeMirror). Así que la carta derecha tendrá un componente contenedor que actualmente renderiza solo texto, pero con una prop readOnly y sin funcionalidad de edición.

Animaciones: CSS transitions/animations. Para la biblioteca se usarán animaciones de flotación sutil con @keyframes. Para el hover se usará transform: scale y transition. Para el volteo de la carta del código se implementará una animación de rotación 3D con transform-style: preserve-3d y backface-visibility.

3.2 Flujo de generación de datos
Existe un repositorio base que contiene archivos .py organizados. (Estos están incluidos en el repo pero ignorados por Git mediante .gitignore; se preservan como respaldo.)

Un “módulo IA creador de código” (que no forma parte de la SPA) procesa estos archivos y genera:

Extracción de premisa (primer comentario multilínea o líneas con #).

Solución completa.

Generación de pasos (array de objetos con id, texto descriptivo).

Generación de bloques lógicos (array de objetos con id, líneas de código y etiqueta).

Inferencia de etiquetas (array de strings, ej.: ["bucles", "funciones"]).

El resultado se guarda en un archivo JSON estructurado que se coloca en la carpeta pública de la SPA.

El formato de ese JSON se detalla en la sección de Modelo de Datos.

En el MVP este JSON es el único insumo de datos de la aplicación.

4. Modelo de datos (JSON de ejercicios)
El archivo exercises.json contiene un array de objetos con esta estructura:

text
[
  {
    "id": "nombre_archivo_sin_extension",
    "nombre": "nombre_archivo.py",
    "premisa": "Texto completo de la premisa (puede contener saltos de línea).",
    "solucion": "Código Python completo de la solución.",
    "pasos": [
      {
        "id": "paso_1",
        "texto": "Descripción del primer paso (ej. 'Definir la función principal')."
      },
      {
        "id": "paso_2",
        "texto": "Descripción del segundo paso."
      }
      ...
    ],
    "bloques": [
      {
        "id": "bloque_1",
        "etiqueta": "def main():",
        "lineas": "def main():\n    pass  # fragmento real",
        "paso_asociado": "paso_1"   // para futura sincronización, opcional en MVP
      }
      ...
    ],
    "etiquetas": ["listas", "comprension", "bucles"]
  },
  ...
]
Notas importantes:

El campo bloques y paso_asociado se incluyen desde ahora para preparar la fase de bloque a bloque, aunque el MVP no los utilice para interacción.

pasos es la base para la lista de verificación manual. Inicialmente todos los pasos tienen un estado local no persistente (marcado/desmarcado) que no viene del JSON.

Las etiquetas son strings en minúsculas, constantes, únicas globalmente (se computará el conjunto total a partir de todos los ejercicios).

5. Árbol de componentes (estructura propuesta)
text
<App>
  <UserAvatarCorner />   // fijo en la esquina superior izquierda, clicable -> /user
  <Layout>
    <Sidebar>
      <NavigationLinks>
        <Link to="/">Biblioteca</Link>
        <RandomExerciseButton />  // botón "Ejercicios", llama a lógica aleatoria
        <Link to="/manual">Manual</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/user">User</Link>
      </NavigationLinks>
    </Sidebar>
    <MainContent>
      <Routes>
        <Route path="/" element={<Biblioteca />} />
        <Route path="/exercise/:id" element={<VistaEjercicio />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </MainContent>
  </Layout>
  <ExercisesProvider>   // contexto con los datos del JSON, filtros, etc.
</App>
Comunicación:

ExercisesProvider carga el JSON al montar la app; proporciona la lista completa, el conjunto de etiquetas únicas, y las funciones para filtrar y seleccionar aleatoriamente.

Las etiquetas seleccionadas se almacenan en localStorage y se sincronizan con el estado global.

El botón de “Ejercicios” recibe la función getRandomExerciseId() y navega a /exercise/{id}.

La vista Settings lee/escribe el contexto de etiquetas.

6. Enrutamiento
/ → Vista Biblioteca (Home)

/exercise/:id → Vista de ejercicio concreto

/manual → Página dummy

/settings → Configuración de filtros

/user → Página de usuario estática

Todo el enrutamiento es cliente. La navegación desde la barra lateral cambia la ruta sin recargar.

7. Gestión de estado
7.1 Contexto global (ExercisesContext)
Propiedades que proporciona:

ejercicios: array completo de objetos de ejercicio.

etiquetasDisponibles: array de strings únicos (todas las etiquetas existentes).

etiquetasSeleccionadas: array de strings (las activas). Se carga desde localStorage con clave "aimpy_tags". Si no hay datos, por defecto todas las etiquetas disponibles están seleccionadas.

setEtiquetasSeleccionadas: función para actualizar y persistir.

ejerciciosFiltrados: array de ejercicios que cumplen al menos una etiqueta de etiquetasSeleccionadas. Si etiquetasSeleccionadas está vacío, consideramos que ningún ejercicio coincide (todos se muestran opacos). (Regla: un ejercicio es “activo” si al menos una de sus etiquetas está presente; se muestra opaco si no tiene ninguna coincidencia.)

getEjercicioById(id): retorna el objeto o undefined.

getRandomEjercicioId(): retorna un id aleatorio de entre los ejerciciosFiltrados. Si ejerciciosFiltrados está vacío, caerá sobre ejercicios (todos) como fallback.

7.2 Estado local
Vista Biblioteca: no necesita más estado.

Carta individual en biblioteca: estado hover interno para animación, manejado con CSS o con estado React para expandir texto.

Vista Ejercicio:

pasosMarcados: objeto { [paso_id]: boolean } inicializado con todos en false. No se persiste; al recargar se reinicia. Se alterna al hacer clic en el checkbox.

cartaVolteada: booleano para el estado de volteo de la carta derecha. Inicia en false (código visible).

Settings: solo lectura/escritura de contexto global, se reflejan inmediatamente en los checkboxes.

8. Vistas detalladas
8.1 Barra lateral (Sidebar)
Contenedor vertical fijo a la izquierda, ancho ~240px.

Enlaces: “Biblioteca”, botón “Ejercicios”, “Manual”, “Settings”, “User”.

El botón “Ejercicios” tiene un comportamiento especial: al hacer clic obtiene un id aleatorio con el contexto y navega a /exercise/{id}. No hace nada si no hay ejercicios disponibles (raro). Si ya hay un ejercicio activo en pantalla, igual navega a otro aleatorio (comportamiento esperado).

El diseño visual exacto (colores, iconos) lo definirá la IA de estilos, pero debe mantenerse minimalista y en modo oscuro con acentos azules/blancos.

8.2 Avatar de usuario (esquina superior izquierda)
Visible en todas las páginas, superpuesto o integrado en la barra superior (el diseño exacto dependerá de la IA visual).

Muestra una imagen de avatar (placeholder cuadrado con iniciales o ícono) y un nombre ficticio (ej. “Estudiante”).

Al hacer clic, navega a /user.

Este elemento está fuera del área de contenido principal, probablemente en la barra superior de la aplicación.

8.3 Biblioteca (Home)
Grid responsivo de cartas (tarjetas). Número de columnas adaptable (3-4 en escritorio, 1-2 en móvil).

Cada carta contiene:

Nombre del archivo (ej. 01_variables.py) en la parte superior.

Extracto truncado de la premisa (primeras ~100 caracteres). Al hacer hover, se muestra más texto (transición suave de altura o cambio a scroll interno). La implementación exacta se deja a la IA, pero debe ser visualmente placentera.

Efecto flotante: todas las cartas tienen una animación continua sutil de desplazamiento vertical (levitación) con @keyframes float. Al hacer hover, la animación se pausa y se aplica una escala (ej. 1.03) y sombra más pronunciada.

Filtrado visual:

Si un ejercicio NO pertenece al conjunto ejerciciosFiltrados (no tiene etiquetas seleccionadas), la carta se renderiza con opacidad baja (ej. 0.4) y sin animación de flotación, ni efectos hover. Sin embargo, sigue siendo un enlace clicable a /exercise/:id.

Si pertenece, se muestra toda la vitalidad.

Orden de las cartas: según aparecen en el JSON o alfabético; no es crítico.

8.4 Vista de Ejercicio (/exercise/:id)
Se obtiene el id de la URL y se busca el objeto con el contexto. Si no existe, se puede mostrar un mensaje de error o redirigir a la biblioteca.

Maquetación general: dos columnas verticales (al menos 50% cada una) que son dos cartas grandes.

8.4.1 Carta izquierda: Premisa + Paso a paso
Dividida verticalmente en dos mitades:

Mitad superior: muestra la premisa completa. Debe tener scroll si es larga, pero ocupar el espacio restante.

Mitad inferior: muestra la lista de pasos.

Lista de pasos:

Cada elemento tiene un checkbox y el texto del paso.

El estado pasosMarcados se maneja localmente. Al hacer clic en el checkbox se alterna.

Visualmente, un paso marcado podría tener un tachado o un estilo diferenciado (gris, menos opacidad) para indicar completado. Esto será refinado por la IA de diseño.

No hay ninguna automatización en MVP; solo interacción manual.

No requiere animaciones complejas para no distraer.

8.4.2 Carta derecha: Código con volteo
Comportamiento de “volteo”:

La carta completa actúa como un contenedor con dos caras (front/back) usando CSS 3D.

Estado inicial: cara frontal visible → muestra el código de la solución.

Al pulsar un botón “Voltear” (icono o texto), se desencadena una animación de rotación de 180° en el eje Y, y se revela la cara posterior.

Cara posterior: una superficie gris opaca, sin ningún código, opcionalmente con un texto “???”, “Código oculto” o similar.

Al volver a pulsar, la animación de vuelta a la cara frontal.

Contenido de la cara frontal:

El código completo de la solución (ejercicio.solucion) se muestra dentro de un bloque <pre><code> con resaltado de sintaxis básico.

No es editable.

En un futuro se reemplazará por un editor con bloques ocultables, pero en MVP solo mostramos el texto completo.

Preparación para bloques: La carta derecha debe recibir los datos de bloques aunque no los use; el componente puede ser un SolucionCode que en MVP renderiza solucion directamente, pero con una prop bloques por si luego se habilita la funcionalidad.

8.5 Settings
Título y una lista de checkboxes, uno por cada etiqueta disponible.

El estado de cada checkbox refleja si esa etiqueta está en etiquetasSeleccionadas.

Al marcar/desmarcar, se actualiza el contexto y se persiste en localStorage.

Posibilidad de botones “Seleccionar todas” / “Deseleccionar todas”.

La vista debe indicar claramente que al modificar los filtros se afecta la Biblioteca y el botón aleatorio.

8.6 Manual
Muestra una única carta (similar a las de la biblioteca) con un texto dummy: “Próximamente: material teórico”. Sin funcionalidad.

El diseño será consistente con la biblioteca pero estático.

8.7 User
Texto estático: “En espera de sistema de login”.

Se muestra el avatar y nombre (los mismos placeholders de la esquina superior).

Podría incluir un mensaje de que las funcionalidades de usuario llegarán en futuras versiones.

9. Comportamiento del botón “Ejercicios” (barra lateral)
Al hacer clic, llama a getRandomEjercicioId() del contexto.

Si ejerciciosFiltrados tiene elementos, elige uno aleatorio con igual probabilidad.

Si no hay ejercicios filtrados (todas las etiquetas deseleccionadas o conjunto vacío), se usará la lista completa de ejercicios como fallback.

Navega inmediatamente a /exercise/{id}.

10. Estética y lineamientos de animaciones (para la IA de código)
La IA de código implementará la estructura y las animaciones funcionales según las siguientes reglas; el diseño visual concreto (colores exactos, tipografías, sombras, etc.) será inyectado por otra IA especializada en diseño, posiblemente a través de un archivo HTML de referencia o una conexión MCP. Por lo tanto, el código debe:

Utilizar clases CSS o variables de diseño fácilmente sobreescribibles (ej. custom properties).

Incluir las animaciones siguientes:

Flotación suave en las cartas de la biblioteca: movimiento vertical cíclico de 2-3px, duración 3-4s, ease-in-out infinito.

Hover en cartas activas: transición de transform: scale(1.03) y box-shadow, duración 200ms.

Volteo de la carta de código: transición de 0.6s con transform: rotateY(0deg) a rotateY(180deg), preservando la perspectiva.

Asegurar que las cartas de la biblioteca en estado “opaco” deshabiliten toda animación (sin float, sin hover).

Modo oscuro por defecto; la paleta base será azules y blancos. Esto se traduce en fondos oscuros, texto claro, acentos en azul. La IA de diseño dará las especificaciones exactas.

11. Consideraciones de rendimiento y despliegue
La aplicación es totalmente estática. Se puede construir con npm run build y servir con cualquier servidor HTTP.

El archivo exercises.json se carga una vez en el montaje de la app y se mantiene en memoria. No se hacen más peticiones.

La carga inicial debe ser ligera: el JSON no debería exceder un tamaño razonable (< 1MB). Si los ejercicios son muchos, valorar cargar bajo demanda en futuro; en MVP no es necesario.

localStorage solo se usa para las etiquetas seleccionadas, de forma mínima.

12. Preparación para futuras versiones
El PRD actual deja el terreno preparado para:

Backend: la carga de datos se hace desde un archivo estático, pero el contexto ExercisesProvider centraliza la obtención; una migración a API solo necesitaría cambiar la fuente de datos en ese provider.

Editor de código: la carta derecha tiene un componente aislado (SolucionCode) que actualmente muestra texto estático, pero se puede reemplazar progresivamente por un CodeMirror con funciones de bloque.

Sistema de bloques: los datos ya están en bloques por ejercicio; el estado pasosMarcados podrá enlazarse con bloques usando paso_asociado para implementar el marcado automático futuro.

Login real: la sección User es un placeholder; la estructura de rutas ya soporta /user.

13. Criterios de aceptación del MVP
La aplicación carga sin errores y muestra la barra lateral y el avatar de usuario.

La vista Biblioteca muestra todas las cartas del JSON. Las cartas tienen animación de flotación y responden al hover con escala y texto expandido.

Al hacer clic en una carta, se navega a /exercise/:id y se muestra la premisa, la lista de pasos con checkboxes funcionales (marcar/desmarcar) y la carta de código con botón de volteo que oculta el código.

El botón “Ejercicios” en la barra lateral carga un ejercicio aleatorio; al pulsarlo repetidas veces, cambia de ejercicio.

La vista Settings permite gestionar las etiquetas; los cambios se reflejan instantáneamente en la biblioteca (las cartas filtradas aparecen opacas y sin animación) y en la selección aleatoria.

La selección de etiquetas persiste al recargar la página (localStorage).

Las vistas Manual y User muestran contenido placeholder.

La estética general es modo oscuro con acentos azules/blancos, animaciones fluidas y la disposición descrita.

Nota final para la IA de código:
Este PRD contiene la especificación funcional y de comportamiento completa. El diseño visual detallado (colores, tamaños, tipografías, espaciados, iconos) será suministrado por una IA de diseño mediante un documento HTML o MCP de referencia. Por tanto, la implementación debe ser modular y estilizable a través de hojas de estilo o temas. No se incluyen en este documento las reglas CSS concretas; sin embargo, se describen las animaciones y la intención de la interacción para que el código base las implemente con variables o placeholders que luego se puedan personalizar.