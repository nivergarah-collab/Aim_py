## Fase 1: Scaffold del layout base con navegación

**Objetivo:** Montar la estructura general de la SPA: barra lateral persistente, avatar de usuario, área de contenido con rutas, sin funcionalidad específica (páginas vacías).

**Tareas:**

1. Crear los componentes base:
   * `AppLayout`: contiene `Sidebar`, la esquina superior con `UserAvatarCorner` y el `<Routes>`.
   * `Sidebar`: lista de enlaces (Biblioteca, Ejercicios, Manual, Settings, User). El elemento “Ejercicios” será un botón (no un `<Link>`) sin acción aún.
   * `UserAvatarCorner`: avatar placeholder con nombre “Estudiante”, clicable, navega a `/user`.
2. Configurar React Router con los paths: `/`, `/exercise/:id`, `/manual`, `/settings`, `/user`. Cada ruta renderiza un componente placeholder (un `<div>` con el nombre de la vista).
3. Aplicar estilos iniciales según el HTML de diseño:
   * Fondo oscuro de la app.
   * Sidebar con el ancho correcto, colores base, tipografía.
   * Avatar posicionado en la esquina superior (puede estar dentro de una `TopBar` o flotante).
   * Responsividad básica (la barra lateral puede colapsar en móvil, pero no es prioritario; mantener visible en escritorio).
4. Asegurar que los enlaces de la barra lateral marquen el ítem activo según la ruta actual.

**Criterios de aceptación:**

* La aplicación muestra la barra lateral, el avatar y el contenido de la ruta activa.
* Al hacer clic en “Biblioteca” se muestra el placeholder de Biblioteca; en “Manual” el de Manual, etc.
* El avatar redirige a `/user`.
* La estética coincide con el diseño visual (modo oscuro, colores, tipografía).

**Pausa de aprobación:**

> “Fase 1 completada. Estructura de navegación y layout base implementada y estilizada. ¿Puedo continuar con la fase 2 (carga de datos y contexto)?”

---

## Fase 2: Carga de datos y contexto global

**Objetivo:** Implementar la capa de datos estática y el estado global de ejercicios y etiquetas.

**Tareas:**

1. Colocar el archivo `exercises.json` en `public/data/` (o similar).
2. Crear `ExercisesContext` con React Context que:
   * Al montar la app, haga `fetch('/data/exercises.json')` y almacene el array.
   * Compute `etiquetasDisponibles`: extraer todas las etiquetas únicas de los ejercicios.
   * Maneje `etiquetasSeleccionadas`:
     * Carga inicial desde `localStorage` (clave `"aimpy_tags"`). Si no hay nada, seleccionar todas.
     * Función `setEtiquetasSeleccionadas` que actualiza estado y persiste en `localStorage`.
   * Proporcione `ejerciciosFiltrados`: ejercicios que tengan al menos una etiqueta en `etiquetasSeleccionadas`. Si `etiquetasSeleccionadas` está vacío, ningún ejercicio coincide.
   * Funciones `getEjercicioById(id)` y `getRandomEjercicioId()` (según el PRD).
3. Probar la lógica con datos mock; verificar que el JSON se carga correctamente.

**Criterios de aceptación:**

* El contexto se carga al iniciar y los datos están disponibles para toda la app.
* Las funciones de filtrado y aleatoriedad funcionan según lo definido.

**Pausa de aprobación:**

> “Fase 2 completada. Los datos se cargan y el contexto global funciona. ¿Puedo continuar con la fase 3 (vista Biblioteca con cartas)?”

---

## Fase 3: Vista Biblioteca (Home)

**Objetivo:** Construir la cuadrícula de cartas de ejercicios con toda la interactividad visual: flotación, hover, expansión de texto y estados opacos por filtro.

**Tareas:**

1. Crear componente `Biblioteca` que consuma `ejercicios` y `ejerciciosFiltrados` del contexto.
2. Renderizar un grid de `CartaEjercicio`.
3. Componente `CartaEjercicio`:
   * Recibe el objeto ejercicio completo.
   * Muestra `nombre` y un extracto truncado de la premisa (primeras \~100 caracteres).
   * Determina si está “activo” (pertenece a `ejerciciosFiltrados`).
   * Aplica clase `activo` u `opaco`:
     * Activo: animación de flotación (`float`), hover con escala y expansión de texto (mostrar premisa completa o un poco más).
     * Opaco: `opacity: 0.4`, sin animaciones, sin hover expansivo.
   * En ambos casos, es un enlace a `"/exercise/" + ejercicio.id`.
4. Importar las animaciones desde el CSS extraído del diseño (flotación, hover). Si no están en CSS separado, implementarlas.
5. Ajustar detalles visuales: sombras, bordes, tipografía, espaciado, transiciones suaves.

**Criterios de aceptación:**

* Se muestran todas las cartas del JSON.
* Las cartas flotan sutilmente cuando están activas.
* Al hacer hover, la carta activa se agranda y revela más texto.
* Las cartas filtradas (no activas) se ven opacas y sin animación; son clicables.
* Al hacer clic en una carta, se navega a la vista de ejercicio (ruta adecuada).

**Pausa de aprobación:**

> “Fase 3 completada. Biblioteca con cartas interactivas y sistema de filtrado visual. ¿Puedo continuar con la fase 4 (Settings y persistencia de filtros)?”

---

## Fase 4: Vista Settings y gestión de etiquetas

**Objetivo:** Permitir al usuario seleccionar/desseleccionar etiquetas temáticas y que los cambios afecten inmediatamente a la Biblioteca.

**Tareas:**

1. Crear componente `Settings` que consuma `etiquetasDisponibles`, `etiquetasSeleccionadas` y `setEtiquetasSeleccionadas`.
2. Renderizar una lista de checkboxes personalizados, uno por etiqueta.
   * Checkbox con estilo según el diseño visual (borde redondeado, interior marcado con color azul/verde).
3. Incluir botones “Seleccionar todas” y “Deseleccionar todas”.
4. Asegurar que al cambiar un checkbox se actualice el contexto y se refleje en la Biblioteca (vista ya implementada).
5. Verificar que la selección persiste tras recargar la página (localStorage).

**Criterios de aceptación:**

* La vista Settings muestra todas las etiquetas con su estado correcto.
* Al marcar/desmarcar, la Biblioteca se actualiza instantáneamente (las cartas cambian a opacas o activas).
* La configuración se conserva al recargar.
* Consistencia visual con el diseño: colores, checkboxes, botones.

**Pausa de aprobación:**

> “Fase 4 completada. Settings funcional con impacto en la Biblioteca. ¿Puedo continuar con la fase 5 (botón Ejercicios aleatorio)?”

---

## Fase 5: Botón “Ejercicios” (aleatorio)

**Objetivo:** Implementar la lógica del botón de la barra lateral para abrir un ejercicio aleatorio respetando filtros.

**Tareas:**

1. En el `Sidebar`, el botón “Ejercicios” (no enlace) debe llamar a `getRandomEjercicioId()` del contexto.
2. Usar el hook `useNavigate` para redirigir a `/exercise/{id}`.
3. Manejar el caso de que no haya ejercicios en `ejerciciosFiltrados`: usar la lista completa como fallback.
4. El botón debe ser funcional desde cualquier vista; si ya hay un ejercicio activo, igual navega a otro.
5. Estilizar el botón según el diseño (acento azul, etc.).

**Criterios de aceptación:**

* Al pulsar “Ejercicios” se carga un ejercicio aleatorio.
* Si se repite la pulsación, se va a otro ejercicio (puede coincidir ocasionalmente pero es aleatorio).
* Respeta los filtros activos (si todas las etiquetas están desmarcadas, usa el fallback).
* La estética del botón es la del diseño.

**Pausa de aprobación:**

> “Fase 5 completada. El botón de ejercicios aleatorios funciona correctamente. ¿Puedo continuar con la fase 6 (vista de ejercicio completa)?”

---

## Fase 6: Vista de Ejercicio (premisa + pasos + código con volteo)

**Objetivo:** Construir la página más compleja con las dos cartas verticales: izquierda con premisa y pasos interactivos, derecha con código y animación de volteo.

**Tareas:**

1. Crear componente `VistaEjercicio` que extraiga el `id` de la URL, obtenga el ejercicio del contexto y muestre un mensaje de error si no existe.
2. Diseñar el layout de dos columnas (50% cada una) usando CSS Grid o Flexbox, con la altura completa.
3. **Carta izquierda** (`CartaPremisaPasos`):
   * Mitad superior: premisa completa con scroll si es necesario.
   * Mitad inferior: lista de pasos. Cada paso es un componente `PasoItem` con un checkbox y el texto del paso.
   * Estado local `pasosMarcados` (objeto `{ [paso_id]: boolean }`). Al hacer clic en el checkbox, se alterna el estado.
   * Estilo: checkbox personalizado, texto tachado/atenuado cuando está marcado.
4. **Carta derecha** (`CartaCodigoVolteable`):
   * Implementar el contenedor con perspectiva y dos caras usando el CSS de volteo del diseño.
   * Cara frontal: muestra el código (campo `solucion`) en un bloque `<pre><code>` con resaltado básico (usar clases para keywords, strings, etc., o una librería ligera de resaltado si se considera necesario). En el MVP no es editable.
   * Cara posterior: fondo gris opaco (según diseño), con el texto “Código oculto” o similar.
   * Botón de “Voltear” que alterna una clase `carta-volteada` en el contenedor.
   * La animación debe ser suave, girando sobre el eje Y.
5. Asegurar que NO haya animaciones excesivas dentro de esta vista; solo el volteo.
6. Integrar los datos de `bloques` en el componente, aunque no se usen, dejando una prop preparada para el futuro.

**Criterios de aceptación:**

* La vista de ejercicio muestra correctamente los datos del ejercicio seleccionado.
* La carta izquierda permite marcar/desmarcar pasos manualmente (sin persistencia, se reinicia al cambiar de ejercicio).
* La carta derecha muestra el código; al pulsar “Voltear” se oculta y muestra la cara posterior; al volver a pulsar, regresa.
* La animación de volteo es fluida y visualmente agradable.
* El diseño respeta el HTML de referencia en colores, espaciados, etc.

**Pausa de aprobación:**

> “Fase 6 completada. La vista de ejercicio con las dos cartas interactivas está operativa. ¿Puedo continuar con la fase 7 (páginas Manual y User)?”

---

## Fase 7: Páginas placeholder Manual y User

**Objetivo:** Completar las secciones secundarias con contenido estático.

**Tareas:**

1. Componente `Manual`: renderiza una carta similar a las de la biblioteca, con texto dummy “Próximamente: material teórico” (o el diseño exacto del HTML). Puede ser estático, sin conexión con datos.
2. Componente `User`: muestra el avatar grande, el nombre “Estudiante” y el texto “En espera de sistema de login”. Usar el mismo avatar placeholder que en la esquina.
3. Estilos según el diseño visual.

**Criterios de aceptación:**

* La vista Manual muestra la carta dummy.
* La vista User muestra la información estática.
* Ambas se ven integradas con el resto de la app.

**Pausa de aprobación:**

> “Fase 7 completada. Páginas de Manual y User implementadas. ¿Puedo continuar con la fase 8 (integración profunda del diseño visual)?”

---

## Fase 8: Integración definitiva del diseño visual

**Objetivo:** Asegurar que cada componente y cada detalle visual coincida exactamente con el HTML de diseño proporcionado por la IA de diseño.

**Tareas:**

1. Comparar uno a uno los componentes implementados con los equivalentes en el HTML de diseño:
   * Sidebar, avatar, cartas de biblioteca, vista de ejercicio, settings, botones, checkboxes, animaciones.
2. Extraer y aplicar cualquier token de diseño (colores, sombras, border-radius, gradientes, tipografías) que no se haya utilizado ya.
3. Ajustar el responsive si el diseño lo contempla (en MVP no es crítico, pero mantener al menos una versión desktop perfecta).
4. Verificar que las animaciones (flotación, hover, volteo) funcionan exactamente como en el HTML de referencia.
5. Revisar la opacidad de las cartas filtradas, el aspecto inactivo.

**Criterios de aceptación:**

* La aplicación luce idéntica al prototipo visual en todos sus estados.
* No hay desviaciones de estilo no intencionadas.

**Pausa de aprobación:**

> “Fase 8 completada. El aspecto visual está alineado con la guía de diseño. ¿Puedo continuar con la fase 9 (refinamiento de animaciones y micro-interacciones)?”

---

## Fase 9: Refinamiento de animaciones y pulido general

**Objetivo:** Optimizar las animaciones, transiciones y detalles de micro-interacción para el goce visual.

**Tareas:**

1. Ajustar duraciones y curvas de easing para que todas las animaciones se sientan suaves y coherentes (hover 200ms ease, flotación 3-4s ease-in-out, volteo 0.6s ease-in-out).
2. Asegurar que las transiciones CSS estén bien prefijadas y funcionen en navegadores modernos.
3. Añadir pequeños detalles (brillo en hover, sombras en profundidad, gradientes en la cara posterior del volteo) tal como en el diseño.
4. Verificar que en la vista de ejercicio no haya animaciones no deseadas; mantener solo las necesarias.
5. Comprobar que las animaciones de la biblioteca se detengan correctamente en estado opaco.

**Criterios de aceptación:**

* Las animaciones son fluidas y agradables.
* No hay parpadeos ni saltos inesperados.
* La aplicación se siente “viva” pero sin excesos.

**Pausa de aprobación:**

> “Fase 9 completada. Animaciones refinadas y aspecto pulido. ¿Puedo continuar con la fase 10 (entrega final)?”

---

## Fase 10: Pruebas finales y preparación para despliegue

**Objetivo:** Validar que todos los criterios de aceptación del PRD se cumplen, construir la versión de producción y generar las instrucciones de despliegue.

**Tareas:**

1. Recorrer la lista completa de criterios de aceptación del MVP (PRD funcional, sección 13):
   * Carga sin errores, sidebar, avatar.
   * Biblioteca con grid, animaciones, estados opacos.
   * Navegación a ejercicio con premisa, pasos interactivos, código y volteo.
   * Botón aleatorio respetando filtros.
   * Settings persistiendo y afectando a la biblioteca.
   * Placeholders de Manual y User.
2. Corregir cualquier bug encontrado.
3. Ejecutar `npm run build` para generar los archivos estáticos.
4. Probar la versión de producción localmente (`npx serve dist` o similar).
5. Documentar cómo desplegar (basta con subir la carpeta `dist` a cualquier hosting estático).
6. Empaquetar todo el código fuente, el PRD, el HTML de diseño y los ejercicios JSON en un repositorio listo para entregar.

**Criterios de aceptación:**

* El build de producción funciona sin errores.
* La aplicación cumple todos los requisitos del MVP.
* Está lista para ser desplegada.

**Pausa final:**

> “Fase 10 completada. La aplicación MVP de Aim\_py está construida y probada, lista para producción. Aprobación final humana requerida para dar por concluido el desarrollo.”
>
