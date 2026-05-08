# PRD: Aim_py — Guía de Diseño Visual (MVP)

## 1. Propósito del documento

Este documento es un PRD dirigido a una inteligencia artificial especializada en diseño visual (en adelante, **IA de diseño**). Su objetivo es definir la identidad visual, los componentes, las pantallas y las animaciones del MVP de Aim_py, de forma que la IA de diseño entregue un archivo HTML de referencia completo.

La IA de código utilizará este entregable visual junto con el PRD funcional de Aim_py para construir la SPA final, adoptando los estilos, las animaciones y la composición que aquí se especifican.

## 2. Visión general del producto

Aim_py es una aplicación web educativa SPA para aprender fundamentos de Python de forma visual e interactiva.

- Es una aplicación de página única con barra lateral persistente.
- Modo oscuro por defecto.
- Paleta cromática basada en **azules + blancos** (con ligeros grises para transiciones).
- Estética **moderna, minimalista, suave y de gran cuidado visual**.
- Pocos elementos en pantalla, pero muy trabajados en detalle.
- Las animaciones están presentes en la biblioteca (hover, flotación) y en el volteo de la carta de código. **En la vista de ejercicio no debe haber animaciones superfluas** para no distraer.
- El «goce visual» es un objetivo explícito: tipografía elegante, sombras sutiles, sensación de profundidad y limpieza.

## 3. Requisitos de entrega

La IA de diseño debe generar un **único archivo HTML estático** (o un pequeño conjunto de archivos si se requiere una carpeta de recursos, pero se recomienda un solo HTML autosuficiente) que muestre:

- Todas las pantallas del MVP (Biblioteca, Vista de Ejercicio, Manual, Settings, User) maquetadas visualmente.
- Los componentes aislados con sus diferentes estados (normal, hover, activo, opaco/apagado, etc.).
- Las animaciones CSS implementadas (no es necesario que sean interactivas vía JS, pueden ser simuladas con clases o mostradas en un estado fijo).
- La barra lateral, el avatar de usuario y la estructura de layout completa.

Este HTML no tendrá funcionalidad real (sin React, sin routing), pero servirá como **guía de estilo y referencia de píxeles** para la IA de código.

## 4. Principios estéticos

- **Oscuro acogedor:** fondo principal oscuro (#0A0F1F o similar), no negro puro, con texturas muy sutiles o degradados.
- **Acentos azules:** desde un cian vibrante hasta azules profundos. Ejemplo de jerarquía:
  - Elementos interactivos (enlaces activos, botón de volteo): azul brillante.
  - Fondos de cartas: tono azul muy oscuro, ligeramente translúcido o con borde difuminado azul.
  - Sombras y resplandores: azul (#1E3A8A con opacidad baja).
- **Blancos puros limitados:** solo para texto principal y algún contraste intenso. El texto secundario puede ser blanco con opacidad (0.7-0.85) o gris claro.
- **Minimalismo extremo:** sin decoraciones innecesarias, solo los elementos funcionales con excelente tipografía y espaciado.
- **Suavidad y “flotación”:** redondeado de esquinas (~12-16px), sombras múltiples para crear profundidad, transiciones suaves.

## 5. Paleta de colores sugerida

(La IA de diseño puede proponer alternativas manteniendo la sensación azul+blanco oscuro.)

- **Fondo de la app:** `#0B1121` (azul muy oscuro)
- **Fondo de cartas:** `#141D33` o `#172242` con un borde sutil `#2A3A5C`
- **Color primario (acento):** `#3B82F6` (azul brillante)
- **Acento secundario (hover, resplandor):** `#60A5FA`
- **Texto principal:** `#F8FAFC` (blanco frío)
- **Texto secundario:** `#94A3B8` (gris azulado)
- **Éxito / completado:** `#10B981` (para checkboxes marcados, sutil)
- **Elementos inactivos / opacos:** fondo `#0F172A`, texto `#475569` con opacidad reducida (usar `opacity: 0.5` en la carta completa)
- **Volteo carta posterior:** `#1E293B` (gris azulado opaco)

## 6. Tipografía

- Familia: sans-serif moderna, como **Inter**, **DM Sans** o **Geist**. La IA de diseño elegirá una que transmita elegancia y legibilidad en código.
- Escala sugerida (puede ajustarse):
  - Nombre de archivo en carta: `1rem` (bold)
  - Premisa: `0.875rem` (regular, línea 1.5)
  - Código: fuente monoespaciada (`JetBrains Mono`, `Fira Code` o `Cascadia Code`), `0.85rem`.
  - Títulos de sección: `1.25rem`
- Espaciado generoso, párrafos con buen margen.

## 7. Componentes visuales a diseñar (con estados)

Cada componente debe mostrarse en el HTML final en todas sus variantes significativas. No es necesario replicar la funcionalidad, solo la apariencia.

### 7.1 Barra lateral (Sidebar)
- Fondo oscuro fijo a la izquierda (ancho ~240px).
- Elementos de navegación: enlaces “Biblioteca”, “Ejercicios”, “Manual”, “Settings”, “User”.
- Estado normal: texto blanco opacidad media.
- Estado activo (ruta actual): texto blanco brillante, fondo o indicador azul a la izquierda.
- Botón “Ejercicios” diferenciado: un botón con acento azul (fondo o borde).
- Hover sobre enlaces: transición suave de color a blanco o azul claro.

### 7.2 Avatar de usuario (Barra superior izquierda)
- Posición: esquina superior izquierda, flotante sobre el contenido o integrado en una barra superior mínima.
- Muestra un círculo con iniciales “U” (avatar placeholder) + nombre “Estudiante” al lado.
- Efecto hover: ligero brillo, cursor pointer.

### 7.3 Carta de ejercicio (Biblioteca)
- Dimensiones: tarjeta vertical de aprox. 280px de ancho, altura definida por el contenido (máximo ~220px).
- Fondo de tarjeta, borde suave, sombra múltiple (box-shadow) para efecto de elevación.
- Contenido:
  - Título (nombre de archivo .py) en la parte superior con un pequeño badge o color azul.
  - Extracto de premisa truncado (3 líneas con puntos suspensivos).
- **Estado normal:** ligera animación de flotación (movimiento vertical de 2-3px, ciclo de 3s, ease-in-out, infinito). Profundidad media.
- **Estado hover:** la animación de flotación se detiene, la carta escala a `1.03` y la sombra se intensifica (resplandor azul). Además, se revela más texto de la premisa (expansión vertical suave, con scroll interno si es necesario, o un tooltip no, mejor desvanecimiento de gradiente inferior).
- **Estado opaco (filtrado fuera):** la carta tiene `opacity: 0.4`, sin animación de flotación, sin transición hover, sombra muy reducida o ausente. Sigue teniendo cursor pointer porque se mantiene clicable.

### 7.4 Vista de ejercicio (layout de dos columnas)
- El área de contenido principal (a la derecha de la barra lateral) se divide en dos columnas ocupando cada una ~50%.
- Sin animaciones distractoras; solo los estados descritos.

#### 7.4.1 Carta izquierda (Premisa + Pasos)
- Tarjeta vertical que ocupe casi toda la altura de la ventana.
- **Mitad superior:** fondo ligeramente diferenciado, se muestra el texto de la premisa con scroll si es largo.
- **Mitad inferior:** lista de pasos.
  - Cada paso: un checkbox cuadrado redondeado + texto del paso.
  - Estado desmarcado: checkbox borde gris, interior vacío.
  - Estado marcado: checkbox con fondo azul/verde sutil y tic; el texto del paso puede mostrarse tachado o con opacidad reducida.
  - Se recomienda mostrar ambos estados visualmente.

#### 7.4.2 Carta derecha (Código con volteo)
- Tarjeta con la misma altura que la izquierda.
- **Cara frontal (código visible):** muestra un bloque de código con fondo oscuro (#1E293B), resaltado sintáctico básico (palabras clave en azul, strings en verde, etc.), usando una fuente monoespaciada. Debe tener sombra y borde para distinguirse.
- **Cara posterior (oculta):** superficie gris azulada opaca, sin código. Opcionalmente con un texto enigmático “???”, “Código oculto” o un patrón sutil.
- **Botón de volteo:** situado dentro o fuera de la carta (p.ej., un ícono en la esquina superior derecha). Aspecto de botón circular con icono de “flechas giratorias” o “ojo”.
- **Animación de volteo:** la tarjeta debe mostrar la rotación 3D completa (perspectiva de 800px, `transform-style: preserve-3d`, rotación sobre el eje Y). La IA de diseño debe incluir el CSS que realiza este efecto; en el HTML estático puede mostrar ambos lados por separado, pero debe quedar claro cómo funciona la transición. Puede simularse mediante un ejemplo aislado.

### 7.5 Botones y elementos de formulario
- Estilo para botones (como el de Settings, Manual): fondo azul, texto blanco, bordes redondeados, transición de color.
- Checkboxes de Settings: personalizados (ocultar el nativo y mostrar un diseño de acuerdo a la estética).
- Scrollbar personalizada acorde al tema oscuro.

### 7.6 Sección Settings
- Una página con lista de etiquetas y checkboxes.
- Checkbox marcado/desmarcado.
- Botones “Seleccionar todas” / “Deseleccionar todas”.

### 7.7 Sección Manual
- Una carta similar a las de Biblioteca pero con texto dummy: “Próximamente: material teórico”.

### 7.8 Sección User
- Avatar grande + nombre + texto “En espera de sistema de login”.

## 8. Estructura sugerida del HTML estático

El archivo debe contener secciones claramente diferenciadas, por ejemplo con encabezados:

1. **Paleta y tipografía** – muestra de colores, fuentes usadas.
2. **Sidebar** – en un contenedor simulado.
3. **Avatar de usuario** – aislado y en contexto.
4. **Biblioteca** – grid de cartas con estado normal, hover y opaco (usando clases CSS fijas para mostrar cada variante).
5. **Carta de biblioteca (detalle)** – con las variantes.
6. **Vista de ejercicio** – maquetación completa con las dos cartas, mostrando los checkboxes de pasos en ambos estados y la carta de código con ambas caras.
7. **Animación de volteo** – un ejemplo funcional con CSS que al hacer clic (o mediante un checkbox) muestre el giro.
8. **Settings, Manual, User** – layouts respectivos.

## 9. Comportamiento de las animaciones (especificación técnica para el diseño)

- **Flotación continua:** `@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }` con `animation: float 3s ease-in-out infinite;`. En estado opaco, no se aplica.
- **Hover suave:** `transition: transform 0.2s ease, box-shadow 0.2s ease;`. Al hacer hover: `transform: scale(1.03); box-shadow: 0 10px 25px rgba(59,130,246,0.15);`.
- **Volteo 3D:**
  ```css
  .carta-volteo {
    perspective: 1000px;
  }
  .carta-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .carta-volteada .carta-inner {
    transform: rotateY(180deg);
  }
  .cara-frontal, .cara-posterior {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
  }
  .cara-posterior {
    transform: rotateY(180deg);
    background: #1E293B;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ```
  El HTML de ejemplo debe activar la clase `.carta-volteada` mediante un botón (simulado con un checkbox oculto).

## 10. Notas adicionales

- La IA de diseño no debe implementar lógica de negocio, sólo la representación visual.
- Los textos pueden ser placeholders realistas (premisas de ejemplo, pasos de ejemplo).
- Se valorará que el diseño sea “pixel perfect” y contenga detalles como sombras anidadas, micro-interacciones y coherencia cromática.
- El HTML será interpretado por una IA de código, por lo que debe ser limpio, semántico y con estilos preferiblemente en un bloque `<style>` o en atributos inline (siendo consistente). Las clases deben estar bien nombradas.

La IA de código utilizará este diseño como fuente de verdad visual para estilar los componentes React de Aim_py, reemplazando los placeholders con datos reales pero manteniendo el aspecto idéntico.