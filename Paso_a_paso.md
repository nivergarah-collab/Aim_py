# DOCUMENTO DE IMPLEMENTACIÓN PASO A PASO — AIM_PY MVP v2.0

**Destinatario:** IA desarrolladora con acceso MCP, lectura/escritura de archivos y ejecución de comandos.  
**Este documento reemplaza cualquier versión anterior del paso a paso.**

**Jerarquía de verdad aplicada:**
1. Diseño Stitch (archivos HTML en `Docs/Stitch/`) — fuente absoluta de diseño y funcionalidad implícita
2. PRD funcional (`Docs/PRD.md`) — complementa; se aplica solo donde Stitch no contradice

---

## REGLAS DE COMPORTAMIENTO OBLIGATORIAS

1. **ANTES de cada paso:** mostrar título + descripción breve + preguntar literalmente: `"¿Autorizas este paso?"`. Esperar confirmación explícita antes de ejecutar.
2. **AL FINALIZAR cada paso:** listar archivos tocados + resumen de cambios + preguntar: `"¿Puedo continuar al siguiente paso?"`.
3. PROHIBIDO avanzar más de un paso sin autorización explícita.
4. PROHIBIDO paralelizar pasos.
5. PROHIBIDO modificar funcionalidades no incluidas en el paso actual.
6. PROHIBIDO imprimir archivos completos en el chat.
7. PROHIBIDO volcar bloques de código extensos en el chat.
8. Reportar únicamente: archivos tocados, resumen de cambios, conteos o estados finales.

---

## CONFLICTOS ENTRE FUENTES — RESOLUCIONES GLOBALES

Los siguientes conflictos fueron detectados al comparar Stitch y PRD. Ya están resueltos en cada paso:

| Conflicto | Fuente Stitch | Fuente PRD | Resolución aplicada |
|---|---|---|---|
| Animación de cartas | Solo hover `translate-y-1` | Float continua `@keyframes` | **Seguir Stitch.** No implementar float. |
| Cartas opacas clicables | `pointer-events-none` en cartas bloqueadas | Cartas filtradas deben seguir clicables | **Seguir PRD.** No aplicar `pointer-events-none`. |
| Settings visual | Toggle switches para app preferences | Checkboxes de etiquetas | **Implementar ambas.** Toggle switches (visual, no funcional MVP) + sección adicional de filtros de etiquetas. |
| Manual page | Grid de 4 tarjetas temáticas | Un único placeholder card | **Seguir Stitch.** Implementar grid de 4 tarjetas. |
| User page | No existe pantalla independiente (perfil integrado en Settings) | Página placeholder separada | **Compromiso.** `/settings` = página combinada (perfil + preferencias + filtros). `/user` = página simple que reutiliza el profile card. |
| Exercise grid | `[2fr_3fr]` (código más ancho) | `50%` cada columna | **Seguir Stitch.** |
| Carta izquierda | Dos tarjetas separadas (Premisa + Pasos) | Una tarjeta dividida en dos mitades | **Seguir Stitch.** |
| Code toggle buttons | Botones circulares visibles en el layout | Funcionalidad futura | **Seguir Stitch.** Renderizar visual, no funcional en MVP. |
| TopAppBar | Presente en todos los diseños Stitch | No mencionado en PRD | **Seguir Stitch.** Implementar TopAppBar. |
| Background color | `#0B1121` (override en todos los HTML) | `#101415` (token design system) | **Seguir Stitch HTML.** Usar `#0B1121`. |

---

## PASO 0: VERIFICACIÓN DEL ESTADO ACTUAL DEL PROYECTO

### Objetivo
Determinar si el proyecto React ya existe, su estructura y qué está implementado. Establecer el punto de partida sin modificar nada.

### Qué debe leer la IA
- `c:/Users/nvher/Desktop/Proyectos/Aim_py/` — verificar contenido completo del directorio raíz
- Si existe un proyecto: leer `package.json` y listar `src/`

### Qué debe hacer
- Listar `c:/Users/nvher/Desktop/Proyectos/Aim_py/`
- Si existe proyecto React/Vite: reportar stack, dependencias actuales, archivos en `src/`
- Si NO existe proyecto: reportar "proyecto no inicializado, PASO 1 lo creará desde cero"

### Qué NO debe tocar
Nada. Solo lectura.

### Criterio de aceptación
Reporte de: ¿existe proyecto?, ¿qué stack?, ¿qué archivos existen en `src/`?

---

## PASO 1: INICIALIZACIÓN DEL PROYECTO

### Objetivo
Crear la estructura base del proyecto React + TypeScript + Vite. Si ya existe, verificar que tenga las dependencias correctas e instalar las que falten.

### Qué debe leer la IA
- Resultado del PASO 0
- `Docs/Stitch/aim_py/DESIGN.md` — confirmar stack

### Stack requerido (fuente: Stitch HTML)
- React 18+ con TypeScript
- Vite como build tool
- Tailwind CSS v3 con plugins `forms` y `container-queries`
- React Router DOM v6
- Material Symbols Outlined — cargado desde Google Fonts CDN (NO paquete npm)
- Fuentes: Google Fonts CDN (Geist, Inter, JetBrains Mono) — NO paquetes npm

### Qué debe crear/instalar

**Si el proyecto NO existe:**
```
npm create vite@latest aim_py_app -- --template react-ts
cd aim_py_app
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init -p
```

**Si ya existe:** verificar que `package.json` incluya las dependencias anteriores. Instalar las faltantes.

### Estructura de carpetas a crear dentro de `src/`
```
src/
  components/
    layout/       ← AppLayout, Sidebar, TopAppBar
    library/      ← Biblioteca, CartaEjercicio
    exercise/     ← VistaEjercicio, CartaPremisaPasos, CartaCodigoVolteable, PasoItem, CodigoToggleButtons
    settings/     ← Settings, UserProfileCard, SettingsPreferencesCard, TagFiltersSection
    manual/       ← Manual
    user/         ← User
  context/        ← ExercisesContext.tsx
  hooks/          ← useExercises.ts (hook wrapper del contexto)
  types/          ← index.ts (todos los tipos TypeScript)
public/
  data/
    exercises.json  ← placeholder con mínimo 3 ejercicios
```

### Estructura requerida de `exercises.json` (placeholder)
Crear 3 ejercicios de ejemplo. Cada uno debe tener:
- `id`: string sin espacios (ej. `"suma_lista"`)
- `nombre`: `"nombre_archivo.py"`
- `premisa`: texto largo de al menos 3 líneas
- `solucion`: código Python de al menos 6 líneas
- `pasos`: array de al menos 3 objetos `{ "id": "paso_N", "texto": "..." }`
- `bloques`: array de al menos 2 objetos `{ "id": "bloque_N", "etiqueta": "...", "lineas": "...", "paso_asociado": "paso_1" }`
- `etiquetas`: array de strings; los 3 ejercicios deben cubrir al menos 4 etiquetas distintas entre todos

### Qué NO debe tocar
- No configurar Tailwind aún (PASO 2)
- No escribir componentes aún

### Criterio de aceptación
- `npm run dev` levanta sin errores
- Estructura de carpetas creada
- `exercises.json` en `/public/data/` con estructura correcta

---

## PASO 2: CONFIGURACIÓN DEL SISTEMA DE DISEÑO

### Objetivo
Configurar Tailwind CSS con los tokens exactos del diseño Stitch. Integrar fuentes de Google Fonts. Establecer estilos globales base.

### Qué debe leer la IA
- `Docs/Stitch/aim_py/DESIGN.md` — tokens completos
- `Docs/Stitch/ui_kit_style_guide/code.html` — bloque `<script id="tailwind-config">` (líneas 11-102)
- `Docs/Stitch/library_refined_blue_background/code.html` — confirmar mismos tokens (idénticos en todos los HTML)

### Qué debe crear/modificar

**`tailwind.config.ts`:** Replicar exactamente el objeto `theme.extend` del bloque `tailwind.config` de cualquier HTML de Stitch. Debe incluir:
- `colors`: todos los tokens del sistema (`primary`, `surface-container`, `on-surface-variant`, etc.)
- `borderRadius`: DEFAULT (`0.25rem`), lg (`0.5rem`), xl (`0.75rem`), full (`9999px`)
- `spacing`: base, xs, sm, md, lg, xl, gutter, container-max (con sus valores exactos en px)
- `fontFamily`: label-sm, code-md, body-md, headline-md, body-lg, display, headline-lg
- `fontSize`: con sus pares `[size, { lineHeight, fontWeight, letterSpacing? }]` exactos

**`index.html`:** Agregar en `<head>` (antes del cierre):
- Google Fonts preconnect para `fonts.googleapis.com` y `fonts.gstatic.com`
- Link de fuentes: Geist (wght 400;500;600;700), Inter (wght 400;500;600), JetBrains Mono (wght 400;500)
- Link de Material Symbols Outlined con parámetros de variable font

**`src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0B1121;
  /* NOTA: usar #0B1121, NO el token background (#101415). Override intencional de Stitch. */
  color: #e0e3e5;
  font-family: 'Inter', sans-serif;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Clases reutilizables extraídas de Stitch */
.tech-card {
  background-color: #161E2D;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.level-1-card {
  background-color: #161E2D;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.content-card {
  background-color: #161E2D;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Utilidades para el flip 3D (no cubiertas por Tailwind por defecto) */
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
```

### Qué NO debe tocar
- No crear componentes aún
- No modificar `src/App.tsx` aún

### Nota de diseño crítica
El background del `body` es `#0B1121` (override que aparece en TODOS los HTML de Stitch), no el token `background` del sistema (`#101415`). Respetar este override.

### Criterio de aceptación
- `npm run dev` levanta sin errores de CSS
- Fondo de página visible como azul marino muy oscuro (`#0B1121`)
- Clases Tailwind del sistema funcionan (ej. `bg-surface-container`, `text-primary`)
- Fuentes Google cargadas (verificar en DevTools > Network)

---

## PASO 3: LAYOUT BASE — AppLayout, Sidebar y TopAppBar

### Objetivo
Construir la shell de la aplicación: sidebar fijo, topbar fijo y área de contenido. Configurar React Router con todas las rutas. Las páginas renderizan placeholders por ahora.

### Qué debe leer la IA
- `Docs/Stitch/library_refined_blue_background/code.html` — secciones `<nav>` (sidebar) y `<header>` (topbar), líneas 117-167
- `Docs/Stitch/exercise_view_adjusted_code_toggles_layout/code.html` — confirmar mismo sidebar/topbar, líneas 189-231
- `Docs/Stitch/settings_user_profile/code.html` — variante del sidebar con logo icono `terminal`, líneas 111-177
- `Docs/PRD.md` — secciones 5 (Árbol de componentes) y 6 (Enrutamiento)

### Qué debe crear/modificar

**`src/types/index.ts`:** Definir TODOS los tipos TypeScript del proyecto:
- `Paso`: `{ id: string; texto: string }`
- `Bloque`: `{ id: string; etiqueta: string; lineas: string; paso_asociado?: string }`
- `Ejercicio`: `{ id, nombre, premisa, solucion, pasos: Paso[], bloques: Bloque[], etiquetas: string[] }`
- `ExercisesContextType`: todas las propiedades del contexto que se crearán en PASO 4

**`src/components/layout/Sidebar.tsx`:**
- Posición: `fixed left-0 top-0 h-screen w-60 z-50`
- Fondo: `bg-surface-container border-r border-outline-variant/30 shadow-[4px_0_20px_rgba(59,130,246,0.05)]`
- Layout interno: `flex flex-col py-lg space-y-xs`
- **Brand** (cabecera del sidebar): icono Material Symbols `terminal` (32px, fill 1, text-primary) + texto "Aim_py" (text-headline-md, font-bold, text-primary) + subtítulo "Python Mastery" (text-label-sm, text-on-surface-variant)
- **Nav links** — estructura de cada enlace:
  - Inactivo: `text-on-surface-variant hover:text-on-surface flex items-center px-md py-xs gap-3 transition-all duration-300 hover:bg-surface-container-high hover:translate-x-1 active:scale-[0.97] transition-transform duration-200 text-label-sm font-label-sm`
  - Activo (ruta actual): `text-primary font-bold bg-secondary-container/10 border-r-4 border-primary flex items-center px-md py-xs gap-3 text-label-sm font-label-sm`
  - Detectar ruta activa con `useLocation()` comparando `location.pathname`
- **Cinco elementos de navegación** con sus iconos Material Symbols:
  1. Library → icono `auto_stories` → `<Link to="/">`
  2. Exercises → icono `terminal` (fill 1 cuando activo) → `<button>` (no Link); sin acción aún, se conecta en PASO 7
  3. Manual → icono `book` → `<Link to="/manual">`
  4. Settings → icono `settings` (fill 1 cuando activo) → `<Link to="/settings">`
  5. User → icono `account_circle` → `<Link to="/user">`
- Settings y User van al fondo del sidebar: usar `flex-grow` spacer entre Manual y Settings para empujar los dos últimos hacia abajo (como en el HTML de exercise view)

**`src/components/layout/TopAppBar.tsx`:**
- Posición: `fixed top-0 right-0 w-[calc(100%-240px)] z-40`
- Altura: `h-16`
- Fondo: `bg-surface/80 backdrop-blur-md border-b border-outline-variant/20`
- Layout: `flex justify-between items-center px-md`
- Sección izquierda: `<div className="flex-1" />` (vacía)
- Sección derecha: `flex items-center gap-6`
  - **Barra de búsqueda** (solo visual en MVP): input `rounded-full`, `bg-surface-container-high`, icono `search` a la izquierda, placeholder "Search exercises...", `hidden md:flex`
  - **Iconos de acción**: botones con iconos `notifications` y `help` (text-on-surface-variant, hover:text-primary)
  - **Avatar del usuario**: `w-8 h-8 rounded-full border border-outline-variant/50 overflow-hidden cursor-pointer hover:border-primary transition-colors`. Contenido: div con iniciales "U" sobre fondo `bg-surface-container-highest` (NO usar URLs de imágenes externas del HTML de Stitch). Al hacer clic: navegar a `/user` usando `useNavigate()`

**`src/components/layout/AppLayout.tsx`:**
```
<div className="flex min-h-screen">
  <Sidebar />
  <div className="flex-1 ml-60">
    <TopAppBar />
    <main className="mt-16">
      <Outlet />   {/* React Router v6 Outlet */}
    </main>
  </div>
</div>
```

**`src/App.tsx`:**
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<div>Biblioteca - placeholder</div>} />
      <Route path="exercise/:id" element={<div>Vista Ejercicio - placeholder</div>} />
      <Route path="manual" element={<div>Manual - placeholder</div>} />
      <Route path="settings" element={<div>Settings - placeholder</div>} />
      <Route path="user" element={<div>User - placeholder</div>} />
    </Route>
  </Routes>
</BrowserRouter>
```

**`src/main.tsx`:** No necesita BrowserRouter si ya está en App.tsx con BrowserRouter; verificar que no se anide dos veces.

### Qué NO debe tocar
- No implementar lógica de rutas reales
- No conectar el botón Exercises
- No crear vistas reales todavía

### Criterio de aceptación
- App muestra sidebar + topbar en todas las rutas
- Links del sidebar navegan a las rutas correctas
- El link activo está visualmente marcado (borde azul derecha + texto brillante)
- El avatar navega a `/user`
- Settings y User están visualmente al fondo del sidebar
- Sin errores de consola

---

## PASO 4: CAPA DE DATOS — ExercisesContext

### Objetivo
Implementar el contexto global que carga los ejercicios desde el JSON, gestiona filtros de etiquetas y provee funciones de selección aleatoria.

### Qué debe leer la IA
- `Docs/PRD.md` — secciones 4 (Modelo de datos) y 7 (Gestión de estado)
- `public/data/exercises.json` — verificar estructura

### Qué debe crear/modificar

**`src/context/ExercisesContext.tsx`:**

Estado interno del provider:
- `ejercicios: Ejercicio[]` — inicia vacío, se carga en `useEffect`
- `loading: boolean` — inicia `true`, pasa a `false` al cargar
- `etiquetasSeleccionadas: string[]` — cargado desde `localStorage` clave `"aimpy_tags"`

Valores computados (no almacenados en estado, calculados al renderizar):
- `etiquetasDisponibles`: todos los tags únicos de todos los ejercicios (flatMap + Set)
- `ejerciciosFiltrados`: ejercicios con al menos una etiqueta en `etiquetasSeleccionadas`; si `etiquetasSeleccionadas` está vacío → retornar array vacío (ninguno coincide)

Comportamiento de carga inicial:
- Fetch a `/data/exercises.json` al montar
- Si localStorage `"aimpy_tags"` tiene datos: usar esos; si no: usar todas las etiquetas disponibles (setear después de cargar los datos)

Funciones expuestas en el contexto:
- `setEtiquetasSeleccionadas(tags: string[])`: actualizar estado + persistir en `localStorage("aimpy_tags")`
- `getEjercicioById(id: string): Ejercicio | undefined`
- `getRandomEjercicioId(): string | undefined`: id aleatorio de `ejerciciosFiltrados`; si está vacío, usar `ejercicios` como fallback; si sigue vacío, retornar `undefined`

**`src/hooks/useExercises.ts`:** Hook wrapper del contexto con verificación de que está dentro del provider.

**`src/App.tsx`:** Envolver las rutas con `<ExercisesProvider>`.

### Qué NO debe tocar
- No conectar el contexto a vistas todavía

### Criterio de aceptación
- Contexto monta sin errores
- `ejercicios` tiene los datos del JSON (verificar con `console.log` temporal, remover después)
- `etiquetasSeleccionadas` carga de localStorage en recarga
- `ejerciciosFiltrados` se recalcula al cambiar `etiquetasSeleccionadas`

---

## PASO 5: VISTA BIBLIOTECA — Grid de cartas

### Objetivo
Construir la vista principal con el grid de cartas. Implementar los estilos de carta (normal, hover, opaca) exactamente como en Stitch.

### Qué debe leer la IA
- `Docs/Stitch/library_refined_blue_background/code.html` — COMPLETO. Especialmente:
  - Header de la sección (título "Biblioteca de Ejercicios", divider line), líneas 169-183
  - Las 4 variantes de carta en el Exercise Grid, líneas 184-276
- `Docs/PRD.md` — sección 8.3

### Qué debe crear/modificar

**`src/components/library/CartaEjercicio.tsx`:**

Props: `ejercicio: Ejercicio`, `activo: boolean`

El componente raíz es un `<Link to={'/exercise/'+ejercicio.id}>` con `<article>` interior. **Nunca aplicar `pointer-events-none`** aunque `activo` sea false.

Estructura HTML (basada en variante normal del Stitch HTML):
```
<article>
  ← div decoración macOS: 3 círculos w-2.5 h-2.5 rounded-full (colores según estado)
  ← h3: icono "description" + nombre del ejercicio (font-code-md)
  ← p: extracto de premisa (primeras ~120 chars + "..."), line-clamp-1
  ← footer: badge primera etiqueta + indicador "N pasos" (texto secundario)
</article>
```

Clases base (siempre aplicadas):
`group relative flex flex-col bg-surface-container rounded-xl p-4`

Clases cuando `activo === true`:
- `border border-white/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]`
- En hover (via clases `group-hover:`): macOS dots cambian a colores error/tertiary/primary; texto título pasa a blanco; badge de etiqueta se ilumina a `bg-primary/20 text-primary border-primary/40`

Clases cuando `activo === false`:
- `border border-white/5 opacity-40 grayscale-[20%]`
- NO aplicar transiciones de hover ni efectos de escala
- Los círculos macOS usan `bg-outline-variant/20` (apagados)

**`src/components/library/Biblioteca.tsx`:**
- Consume `ejercicios` y `ejerciciosFiltrados` del contexto via `useExercises()`
- Estructura:
  - Header: título "Biblioteca de Ejercicios" (`text-display font-display text-on-surface`) + descripción (`text-body-lg text-on-surface-variant`)
  - Divider: `<div className="h-[1px] w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 mb-xl" />`
  - Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg`
  - Mapear `ejercicios` (lista completa) — cada carta recibe `activo={ejerciciosFiltrados.some(f => f.id === ej.id)}`
- Aplicar padding general de la página: `px-lg py-xl`

Actualizar la ruta `/` en `App.tsx` para renderizar `<Biblioteca />`.

### Qué NO debe tocar
- No implementar animación de flotación continua (no existe en Stitch)
- No modificar el contexto

### Criterio de aceptación
- Todas las cartas del JSON se muestran en grid
- Las cartas activas: hover aplica translate, borde azul, glow y macOS dots de colores
- Las cartas inactivas: opacas, grises, sin hover effects, pero clicables
- Al hacer clic navega a `/exercise/:id`
- El divider gradient es visible

---

## PASO 6: VISTA SETTINGS — Perfil, preferencias y filtros de etiquetas

### Objetivo
Implementar la vista `/settings` que combina: perfil de usuario (columna izquierda), preferencias de app con toggle switches (columna derecha), sección de filtros de etiquetas (fila inferior).

### Qué debe leer la IA
- `Docs/Stitch/settings_user_profile/code.html` — COMPLETO. Secciones:
  - User Profile Card (líneas 188-199)
  - Settings Preferences Card (líneas 200-253)
  - Manual placeholder card al fondo (líneas 254-272)
- `Docs/PRD.md` — sección 8.5 (lógica de filtrado de etiquetas)

### Qué debe crear/modificar

**`src/components/settings/UserProfileCard.tsx`:**
- Columna `lg:col-span-4`
- Fondo: `bg-surface-container border border-outline-variant/20 rounded-xl p-lg`
- Hover glow sutil: `hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:-translate-y-1 transition-all duration-500`
- Avatar: `w-32 h-32 rounded-full` con borde gradient (`bg-gradient-to-b from-primary/40 to-surface-container-highest`) — contenido: div con iniciales "E" sobre `bg-surface` (NO usar URLs externas)
- Nombre: "Estudiante" (`text-headline-lg font-headline-lg text-on-surface`)
- Badge de estado: `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/30`
  - Círculo `w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse`
  - Texto "En espera de sistema de login" (`text-label-sm text-on-surface-variant`)

**`src/components/settings/SettingsPreferencesCard.tsx`:**
- Columna `lg:col-span-8`
- Fondo: `bg-surface-container border border-outline-variant/20 rounded-xl p-lg`
- Header: icono `tune` (text-primary) + título "App Preferences" (`text-headline-md`)
- Botones header: "Deselect all" (ghost: `border border-outline-variant/30 rounded-lg hover:bg-surface-container-highest`) + "Select all" (primary: `bg-primary text-on-primary rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]`)
- Lista de 3 toggle items fijos (no funcionales en MVP):
  1. "Syntax Highlighting" — descripción: "Enable rich colorization in the code editor." — estado: **activo** por defecto
  2. "Auto-Format Code" — descripción: "Automatically format Python code on save." — estado: **inactivo** por defecto
  3. "Telemetry & Analytics" — descripción: "Share anonymous usage data to improve Aim_py." — estado: **activo** por defecto
- Cada toggle item: `flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20`
- Toggle switch (CSS only, no funcional MVP):
  - Activo: `w-12 h-6 bg-primary rounded-full relative shadow-[0_0_10px_rgba(59,130,246,0.3)]` + bola interior `absolute left-1 top-1 w-4 h-4 bg-on-primary rounded-full translate-x-6`
  - Inactivo: `w-12 h-6 bg-surface-container-highest border border-outline-variant/30 rounded-full relative` + bola `absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full`

**`src/components/settings/TagFiltersSection.tsx`:** (sección adicional al diseño Stitch, requerida por PRD)
- Columna `lg:col-span-12`
- Fondo: `bg-surface-container border border-outline-variant/20 rounded-xl p-lg`
- Header: icono `filter_alt` (text-primary) + título "Filtros de ejercicios" (`text-headline-md`) + botones "Seleccionar todas" / "Deseleccionar todas" (mismos estilos que en SettingsPreferencesCard)
- Lista de checkboxes, uno por cada tag en `etiquetasDisponibles`:
  - Estructura de cada checkbox (estilo coherente con el exercise view): `flex items-center gap-3 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20 hover:border-primary/40 transition-colors`
  - Checkbox visual: `w-5 h-5 border-2 rounded-sm` — marcado: `bg-primary border-primary` + SVG check — desmarcado: `border-outline`
  - Label: nombre de la etiqueta (`text-body-md text-on-surface`)
- Al cambiar cualquier checkbox: llama a `setEtiquetasSeleccionadas` del contexto
- Botón "Seleccionar todas": `setEtiquetasSeleccionadas([...etiquetasDisponibles])`
- Botón "Deseleccionar todas": `setEtiquetasSeleccionadas([])`

**`src/components/settings/Settings.tsx`:**
- Header: título "Configuration Environment" (`text-display font-display`) + subtítulo "Manage your preferences and profile." (`text-body-lg text-on-surface-variant`)
- Grid bento: `grid grid-cols-1 lg:grid-cols-12 gap-md`
  - Fila 1: `<UserProfileCard />` (col-span-4) + `<SettingsPreferencesCard />` (col-span-8)
  - Fila 2: `<TagFiltersSection />` (col-span-12)
- Aplicar padding: `p-lg`

Actualizar ruta `/settings` en `App.tsx` para renderizar `<Settings />`.

### Criterio de aceptación
- La vista `/settings` muestra perfil, preferencias y filtros
- Al marcar/desmarcar etiquetas, el contexto se actualiza (verificar que `ejerciciosFiltrados` cambia)
- Cambios persisten al recargar
- Estilos coherentes con el HTML de Stitch en las secciones del perfil y preferencias

---

## PASO 7: BOTÓN "EXERCISES" — Navegación aleatoria

### Objetivo
Conectar el botón "Exercises" del sidebar para navegar a un ejercicio aleatorio respetando los filtros activos.

### Qué debe leer la IA
- `Docs/PRD.md` — sección 9 (Comportamiento del botón Exercises)
- `src/components/layout/Sidebar.tsx` — ver el `<button>` sin acción del PASO 3

### Qué debe modificar

**`src/components/layout/Sidebar.tsx`:**
- Importar `useNavigate` de React Router DOM
- Importar `useExercises` del hook del contexto
- En el botón "Exercises": al hacer click, llamar `getRandomEjercicioId()`. Si retorna un id válido: `navigate('/exercise/' + id)`. Si retorna `undefined`: no navegar (ejercicios vacíos — caso extremo)

### Qué NO debe tocar
- No modificar otros elementos del Sidebar
- No modificar el contexto

### Criterio de aceptación
- Al hacer clic en "Exercises", navega a un ejercicio
- Al pulsar repetidas veces, cambia (puede coincidir ocasionalmente — es aleatorio)
- Respeta filtros activos del Settings

---

## PASO 8: VISTA EJERCICIO — Estructura y carta izquierda

### Objetivo
Construir la vista de ejercicio con el layout de dos columnas y la carta izquierda (premisa + pasos interactivos). La columna derecha queda como placeholder hasta el PASO 9.

### Qué debe leer la IA
- `Docs/Stitch/exercise_view_adjusted_code_toggles_layout/code.html` — secciones:
  - Header del ejercicio (líneas 234-237)
  - Grid `grid-cols-[2fr_3fr]` (línea 238)
  - Premisa card (líneas 241-252)
  - Pasos card (líneas 253-311)
  - Estructura de cada PasoItem con checkbox (líneas 260-309)
- `Docs/PRD.md` — sección 8.4.1

### Qué debe crear/modificar

**`src/components/exercise/PasoItem.tsx`:**

Props: `paso: Paso`, `marcado: boolean`, `onToggle: () => void`

Estructura exacta de Stitch:
```
<label className="flex items-start gap-3 cursor-pointer group">
  ← input type="checkbox" className="sr-only" checked={marcado} onChange={onToggle}
  ← div visual del checkbox:
      "w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors"
      + condicional:
        marcado: "bg-primary border-primary"
        desmarcado: "border-outline group-hover:border-primary"
    ← SVG checkmark (path "M5 13l4 4L19 7", stroke-width 3)
        marcado: "opacity-100"
        desmarcado: "opacity-0"
  ← span texto del paso:
      marcado: "text-body-md font-body-md text-on-surface-variant line-through opacity-70"
      desmarcado: "text-body-md font-body-md text-on-surface group-hover:text-primary transition-colors"
</label>
```

**`src/components/exercise/CartaPremisaPasos.tsx`:**

Props: `ejercicio: Ejercicio`, `pasosMarcados: Record<string, boolean>`, `onTogglePaso: (id: string) => void`

Dos tarjetas separadas con `gap-gutter` entre ellas (`flex flex-col gap-gutter`):

1. **Premisa card** (`level-1-card rounded-xl p-md`):
   - Header: icono `lightbulb` (text-primary, 24px) + texto "Premisa" (`text-headline-md font-headline-md text-on-surface`)
   - Cuerpo: `ejercicio.premisa` (`text-body-md font-body-md text-on-surface-variant leading-relaxed`)

2. **Pasos card** (`level-1-card rounded-xl p-md flex-1`):
   - Header: icono `checklist` (text-primary) + texto "Pasos" (`text-headline-md`)
   - Lista: `<div className="space-y-3">` con un `<PasoItem />` por cada `ejercicio.pasos[i]`

**`src/components/exercise/VistaEjercicio.tsx`:** (versión inicial, sin carta de código)
- Extraer `id` con `useParams()`
- Obtener ejercicio con `getEjercicioById(id)` del contexto
- Si `id` undefined o ejercicio no encontrado: mostrar mensaje de error + `<Link to="/">Volver a Biblioteca</Link>`
- Header de la vista: `text-headline-lg` con formato "Ejercicio: {ejercicio.nombre}" + párrafo con primeras 80 chars de premisa (`text-body-lg text-on-surface-variant`)
- Estado local: `pasosMarcados` inicializado con todos los `paso.id` en `false`
  - `useEffect` que reinicia `pasosMarcados` cuando cambia el `id` de la ruta
- Grid: `grid grid-cols-1 gap-gutter lg:grid-cols-[2fr_3fr]`
  - Columna izquierda: `<CartaPremisaPasos ... />`
  - Columna derecha: `<div className="level-1-card rounded-xl p-md min-h-[400px] flex items-center justify-center text-on-surface-variant">Código — próximo paso</div>`
- Aplicar padding: `p-4 md:p-8 lg:p-12`

Actualizar ruta `/exercise/:id` en `App.tsx` para renderizar `<VistaEjercicio />`.

### Criterio de aceptación
- Al navegar a `/exercise/:id`, muestra premisa y pasos del ejercicio correcto
- Los checkboxes se marcan/desmarcan correctamente
- Al cambiar de ejercicio (vía sidebar Exercises o nueva URL), los pasos se reinician en desmarcado
- Columna derecha muestra placeholder visible

---

## PASO 9: VISTA EJERCICIO — Carta de código con volteo 3D y toggles

### Objetivo
Implementar la carta derecha de la vista ejercicio: bloque de código con resaltado básico, animación de volteo 3D y botones de visibilidad de código (visual, no funcionales).

### Qué debe leer la IA
- `Docs/Stitch/exercise_view_adjusted_code_toggles_layout/code.html` — secciones:
  - Bloque `<style>` al inicio (perspectiva, transform-style, backface, rotate-y-180), líneas 162-185
  - Code Visibility Toggles (botones circulares a la izquierda), líneas 315-335
  - Code Card Column completo (cara frontal + cara posterior), líneas 337-383
- `Docs/VisualPRD.md` — sección 9 (especificaciones técnicas del flip)
- `Docs/PRD.md` — sección 8.4.2

### Qué debe crear/modificar

**`src/components/exercise/CodigoToggleButtons.tsx`:** (visual, no funcional en MVP)

- Columna vertical: `hidden md:flex flex-col justify-between py-12 mr-4`
- Tres botones con tooltip, estructura de cada uno:
  ```
  <div className="group/toggle relative">
    <button className="w-8 h-8 rounded-full border ... flex items-center justify-center">
      <span className="material-symbols-outlined text-sm">visibility</span>
    </button>
    <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface-container-highest text-[10px] rounded opacity-0 group-hover/toggle:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-outline-variant/20">
      {nombre del bloque}
    </span>
  </div>
  ```
- Botón 1 ("Imports") — inactivo: `bg-surface-container-high border-outline-variant/30 text-on-surface-variant`
- Botón 2 ("Logic") — activo: `bg-primary border-primary text-on-primary shadow-[0_0_10px_rgba(173,198,255,0.3)]`
- Botón 3 ("Tests") — activo: igual al botón 2

**`src/components/exercise/CartaCodigoVolteable.tsx`:**

Props: `ejercicio: Ejercicio` (recibir también `bloques` aunque no los use — prop preparada para futuro)

Estado local: `volteada: boolean` iniciado en `false`

Estructura externa:
```
<div className="perspective-1000 h-full min-h-[400px] flex-grow">
  <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${volteada ? 'rotate-y-180' : ''}`}>
    ← Cara frontal
    ← Cara posterior
  </div>
</div>
```

**Cara frontal** (`absolute w-full h-full backface-hidden rounded-xl overflow-hidden`):
- Fondo: `bg-[#010409]`
- Borde: `border border-outline-variant/30`
- Shadow: `shadow-[0_8px_30px_rgb(0,0,0,0.5)]`
- Header macOS: `bg-surface-container-high px-4 py-3 flex items-center gap-2 border-b border-outline-variant/20`
  - Círculo rojo: `w-3 h-3 rounded-full bg-error`
  - Círculo amarillo: `w-3 h-3 rounded-full bg-tertiary`
  - Círculo verde: `w-3 h-3 rounded-full bg-primary`
  - Nombre archivo: `ml-4 text-label-sm font-label-sm text-on-surface-variant font-code-md` → "solution.py"
  - Spacer: `flex-grow`
  - Botón volteo: `w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors cursor-pointer` con icono `360` → `onClick={() => setVolteada(true)}`
- Bloque de código: `p-md flex-grow overflow-auto`
  - `<pre className="text-code-md font-code-md leading-relaxed">` con resaltado básico manual de Python
  - Resaltado manual (componente auxiliar o función pura): usar regex para identificar y envolver en `<span>`:
    - Keywords (`def`, `class`, `for`, `while`, `if`, `elif`, `else`, `return`, `import`, `from`, `in`, `not`, `and`, `or`, `pass`, `True`, `False`, `None`): `text-primary`
    - Strings (entre `"..."` o `'...'`): `text-secondary-fixed`
    - Comentarios (desde `#` hasta fin de línea): `text-on-surface-variant italic`
    - Funciones built-in (`print`, `len`, `range`, `type`, `str`, `int`, `list`, `dict`): `text-tertiary`
    - Texto restante: `text-on-surface`

**Cara posterior** (`absolute w-full h-full backface-hidden rounded-xl overflow-hidden rotate-y-180`):
- Fondo: `bg-gradient-to-br from-[#0a192f] to-[#0B1121]`
- Borde: `border border-primary/30`
- Shadow: `shadow-[0_0_40px_rgba(59,130,246,0.15)]`
- Overlay decorativo: `absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,...)] from-primary via-transparent to-transparent`
- Contenido centrado (`flex flex-col items-center justify-center`):
  - Icono `lock` Material Symbols: `text-6xl text-primary mb-4` con fill 1 (`style="font-variation-settings: 'FILL' 1;"`)
  - Título "Código oculto": `text-headline-md font-headline-md text-primary mb-2 z-10`
  - Descripción: "Completa los pasos para desbloquear la solución óptima." (`text-body-md text-on-surface-variant text-center max-w-xs z-10`)
  - Botón de regreso: `mt-8 w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary z-10 hover:bg-primary/10 transition-colors cursor-pointer` con icono `undo` → `onClick={() => setVolteada(false)}`

**`src/components/exercise/VistaEjercicio.tsx`** (modificar columna derecha):
- Reemplazar el placeholder div por:
  ```jsx
  <div className="relative flex group/container">
    <CodigoToggleButtons />
    <CartaCodigoVolteable ejercicio={ejercicio} />
  </div>
  ```

### Criterio de aceptación
- La carta de código muestra el código de `ejercicio.solucion` con resaltado básico (keywords, strings, comentarios en colores distintos)
- Al clic en icono `360` (cara frontal): la carta rota 180° mostrando la cara posterior
- Al clic en icono `undo` (cara posterior): la carta vuelve a mostrar el código
- La animación dura 700ms y es suave
- Los 3 toggle buttons de código son visibles con sus tooltips al hover
- La altura de la columna derecha es igual o mayor a la columna izquierda

---

## PASO 10: VISTA MANUAL

### Objetivo
Implementar la vista Manual como un grid de 4 tarjetas de contenido temático, basándose exactamente en el HTML de Stitch.

### Qué debe leer la IA
- `Docs/Stitch/manual_documentation_hub/code.html` — COMPLETO. Especialmente:
  - Header con icono `menu_book` y estilo dorado, líneas 244-253
  - Content Grid con las 4 cartas, líneas 254-316

### Qué debe crear/modificar

**`src/components/manual/Manual.tsx`:**

- Padding de página: `max-w-[1000px] mx-auto px-sm md:px-lg py-xl`
- Header section:
  - Flex row con icono `menu_book` (48px, color amber/golden — usar `style={{ color: '#f59e0b' }}`) + título "Manual de Python" (`text-headline-lg`)
  - Párrafo: "Documentación técnica y guías teóricas para complementar tu aprendizaje." (`text-body-lg text-on-surface-variant`)
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6` con 4 tarjetas `.content-card`
- Cada tarjeta (estructura interna):
  - icon-container: `bg-[rgba(59,130,246,0.1)] rounded-lg p-3 inline-flex items-center justify-center w-12 h-12 mb-6`
  - Título (`text-headline-md`)
  - Descripción (`text-body-md text-on-surface-variant flex-grow`)
  - "Explorar módulo →": `flex items-center text-primary text-label-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-6`

**Las 4 tarjetas:**
1. **Sintaxis Básica** — icono `code` (text-primary) — "Aprende los fundamentos del lenguaje: variables, tipos de datos, operadores y estructuras de control elementales."
2. **Estructuras de Control** — icono `account_tree` (text-tertiary) — "Domina el flujo de tu programa utilizando condicionales y bucles para crear lógica compleja."
3. **Funciones y Módulos** — icono `extension` (text-primary) — "Organiza tu código escribiendo bloques reutilizables e importa librerías estándar o externas."
4. **Programación Orientada a Objetos** — icono `view_in_ar` (text-secondary) — "Entiende las clases, objetos, herencia y polimorfismo para estructurar aplicaciones escalables."

Actualizar ruta `/manual` en `App.tsx` para renderizar `<Manual />`.

### Criterio de aceptación
- 4 tarjetas visibles con iconos en los colores correctos
- Hover: tarjeta sube, borde azul, "Explorar módulo" aparece
- Coherencia visual con el resto de la app

---

## PASO 11: VISTA USER

### Objetivo
Implementar la vista `/user` como página de perfil dedicada que reutiliza el componente `UserProfileCard`.

### Qué debe leer la IA
- `src/components/settings/UserProfileCard.tsx` — ya creado en PASO 6
- `Docs/PRD.md` — sección 8.7

### Qué debe crear/modificar

**`src/components/user/User.tsx`:**
- Padding: `p-lg`
- Layout: centrado verticalmente en la altura disponible (`flex flex-col items-center justify-center min-h-[calc(100vh-64px)]`)
- Contenido:
  - `<UserProfileCard />` (reutilizar componente existente)
  - Párrafo adicional debajo: "Funcionalidades de usuario llegarán en versiones futuras." (`text-body-md text-on-surface-variant text-center mt-4`)
  - Botón: `<Link to="/settings">` con estilos `btn-primary` (o Tailwind equivalente: `bg-primary text-on-primary px-6 py-2 rounded-md text-label-sm font-label-sm mt-4 inline-block hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all`) → texto "Ir a Settings"

Actualizar ruta `/user` en `App.tsx` para renderizar `<User />`.

### Criterio de aceptación
- Navegando a `/user` se muestra el perfil del usuario
- El avatar en TopAppBar navega aquí
- El botón "Ir a Settings" funciona

---

## PASO 12: INTEGRACIÓN Y VALIDACIÓN VISUAL FINAL

### Objetivo
Comparar elemento por elemento la implementación contra los HTML de Stitch. Corregir cualquier desviación visual o de comportamiento.

### Qué debe leer la IA
- TODOS los HTML de Stitch en `Docs/Stitch/` (uno por uno, comparando contra la implementación)
- `Docs/PRD.md` — sección 13 (criterios de aceptación del MVP)
- Todo el código fuente en `src/`

### Checklist de validación por vista

Para cada punto, verificar en el navegador y reportar ✓ (correcto) o ✗ (desviación):

**Sidebar:**
- [ ] Ancho 240px, fondo bg-surface-container, border derecha, shadow azul sutil
- [ ] Brand con icono terminal + "Aim_py" + "Python Mastery"
- [ ] Cada link: icono + texto, estilos inactivo/activo/hover correctos
- [ ] Link activo: borde azul derecho, fondo bg-secondary-container/10, texto primary, bold
- [ ] Settings y User al fondo (spacer entre Manual y Settings)

**TopAppBar:**
- [ ] Altura 16 (64px), fondo translúcido con blur, borde inferior
- [ ] Barra de búsqueda (solo desktop), iconos de acción, avatar circular

**Biblioteca (`/`):**
- [ ] Grid responsive (1 col mobile, 2 col md, 3 col desktop)
- [ ] Header con título display y divider gradiente
- [ ] Cartas activas: macOS dots en colores correctos (hover: rojo/amarillo/azul), hover translate + glow + borde azul
- [ ] Cartas inactivas: opacidad 0.4, grayscale, sin hover — pero clicables

**Vista Ejercicio (`/exercise/:id`):**
- [ ] Grid [2fr_3fr], header con nombre del ejercicio
- [ ] Premisa card: icono lightbulb, texto correcto
- [ ] Pasos card: checkboxes funcionales, marcado con line-through y bg-primary en checkbox
- [ ] Toggle buttons (3): visibles, tooltips al hover, estilos activo/inactivo
- [ ] Carta código: macOS dots en rojo/amarillo/verde, código con resaltado básico, botón 360
- [ ] Flip animation: 700ms suave, cara posterior con lock + texto + botón undo

**Settings (`/settings`):**
- [ ] Bento grid: perfil (4 cols), preferencias (8 cols), filtros (12 cols)
- [ ] Perfil: avatar con borde gradient, nombre, badge animate-pulse
- [ ] Preferencias: toggle switches en estados activo/inactivo correctos (visual)
- [ ] Filtros de etiquetas: checkboxes funcionales, cambios reflejados inmediatamente en Biblioteca

**Manual (`/manual`):**
- [ ] 4 tarjetas con iconos en colores correctos (primary/tertiary/secondary)
- [ ] Hover: elevación, borde azul, "Explorar módulo" visible

**User (`/user`):**
- [ ] Perfil centrado, botón "Ir a Settings" funcional

**Funcionalidad global:**
- [ ] Selección de etiquetas persiste al recargar (localStorage)
- [ ] Botón Exercises navega a ejercicio aleatorio respetando filtros
- [ ] Al cambiar de ejercicio, pasosMarcados se reinicia
- [ ] Sin errores en consola del navegador

### Qué debe hacer
Documentar cada ✗ encontrado y corregirlo. Reportar lista de correcciones aplicadas.

### Criterio de aceptación
Todos los checkboxes del listado marcados con ✓.

---

## PASO 13: BUILD DE PRODUCCIÓN Y ENTREGA

### Objetivo
Verificar todos los criterios de aceptación del PRD, generar build de producción y validar que funciona.

### Qué debe hacer la IA

1. Recorrer la lista de criterios del PRD sección 13 y reportar estado de cada uno
2. Ejecutar `npm run build`
3. Si el build falla: reportar el error exacto y corregirlo (NO usar `--no-check` ni `--force`)
4. Si el build es exitoso: ejecutar `npm run preview` (Vite) para probar la versión de producción localmente
5. Verificar que la versión de producción funciona igual que dev
6. Reportar:
   - Estado de build (exitoso/fallido)
   - Tamaño del bundle generado en `dist/`
   - URL local para preview
   - Lista de todos los criterios del PRD con ✓/✗

### Criterio de aceptación
- Build completado sin errores de compilación ni TypeScript
- Preview de producción funciona correctamente
- Todos los criterios del PRD sección 13 marcados con ✓

### Pausa final
> "PASO 13 completado. El MVP de Aim_py está construido, probado y listo para producción. Se requiere aprobación humana final para dar por concluido el desarrollo."

---

## APÉNDICE A — INSTRUCCIONES PERMANENTES PARA LA IA EJECUTORA

### Sobre URLs externas e imágenes
Los HTML de Stitch contienen URLs de imágenes en `lh3.googleusercontent.com` (generadas por la IA de diseño). **NO usar estas URLs en producción.** Reemplazar por:
- Avatar de usuario: div con iniciales "U" o "E" sobre fondo `bg-surface-container-highest`, `rounded-full`
- No hay otras imágenes necesarias en el MVP

### Sobre resaltado de código
El resaltado es manual (regex básico) en MVP. Implementar como función pura que recibe `solucion: string` y retorna JSX con spans de colores. El componente `CartaCodigoVolteable` debe recibir la prop `bloques` (aunque no la use) para preparar la futura implementación de bloques ocultables.

### Sobre persistencia
Solo `etiquetasSeleccionadas` se persiste en `localStorage`. El estado `pasosMarcados` y `volteada` son locales sin persistencia; se reinician al cambiar de ruta.

### Sobre TypeScript
Usar TypeScript estricto. Todos los tipos en `src/types/index.ts`. No usar `any`. Las props de componentes deben estar tipadas.

### Sobre responsive
El diseño está optimizado para desktop (≥1024px). El sidebar es fijo. La app debe ser funcional en viewports menores pero la experiencia perfecta en desktop es el objetivo del MVP.

### Sobre la configuración de Vite
Si se usan clases de Tailwind dinámicas (ej. construidas con string concatenation), asegurar que estén en la safelist de `tailwind.config.ts` o usar clases completas directamente para garantizar que Tailwind las incluya en el build.

---

## APÉNDICE B — REFERENCIAS DE ARCHIVOS

| Archivo Stitch | Contenido | Pasos que lo usan |
|---|---|---|
| `Docs/Stitch/aim_py/DESIGN.md` | Tokens de diseño, tipografías, sistema de colores | PASO 1, 2 |
| `Docs/Stitch/ui_kit_style_guide/code.html` | UI Kit completo, configuración Tailwind, componentes base | PASO 2 |
| `Docs/Stitch/library_refined_blue_background/code.html` | Vista Biblioteca con sidebar y topbar | PASO 2, 3, 5 |
| `Docs/Stitch/exercise_view_adjusted_code_toggles_layout/code.html` | Vista Ejercicio completa | PASO 3, 8, 9 |
| `Docs/Stitch/settings_user_profile/code.html` | Vista Settings+User combinada | PASO 3, 6 |
| `Docs/Stitch/manual_documentation_hub/code.html` | Vista Manual con 4 tarjetas | PASO 3, 10 |
| `Docs/PRD.md` | PRD funcional completo | Todos los pasos |
| `Docs/VisualPRD.md` | PRD visual (especificaciones técnicas de animaciones) | PASO 9 |
