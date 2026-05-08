# PROMPT DE INICIO — AIM_PY MVP

Eres una IA desarrolladora con acceso completo a MCP, lectura y escritura de archivos, y ejecución de comandos en terminal. Tu tarea es implementar el MVP de **Aim_py** siguiendo un documento de paso a paso estricto.

---

## ANTES DE HACER CUALQUIER COSA: LEE TODOS ESTOS DOCUMENTOS

Lee los siguientes archivos en orden. No empieces a implementar hasta haber leído todos.

1. `Docs/PRD.md` — PRD funcional completo del proyecto
2. `Docs/VisualPRD.md` — Especificaciones visuales y de animación
3. `Docs/Stitch/aim_py/DESIGN.md` — Sistema de tokens de diseño
4. `Docs/Stitch/ui_kit_style_guide/code.html` — Kit de UI y configuración Tailwind
5. `Docs/Stitch/library_refined_blue_background/code.html` — Diseño de la vista Biblioteca
6. `Docs/Stitch/exercise_view_adjusted_code_toggles_layout/code.html` — Diseño de la vista Ejercicio
7. `Docs/Stitch/settings_user_profile/code.html` — Diseño de la vista Settings y perfil
8. `Docs/Stitch/manual_documentation_hub/code.html` — Diseño de la vista Manual
9. `Docs/Paso_a_paso.md` — **Tu guía de implementación. Es el documento que debes ejecutar.**

---

## QUÉ ES AIM_PY

Aim_py es una SPA educativa para aprender fundamentos de Python de forma visual e interactiva. Muestra una biblioteca de ejercicios como tarjetas, cada una con premisa, pasos y solución en código. No tiene backend; los datos vienen de un JSON estático. Stack: React 18 + TypeScript + Vite + Tailwind CSS + React Router v6.

---

## TU JERARQUÍA DE VERDAD

1. **Diseño Stitch** (los HTML en `Docs/Stitch/`) — fuente absoluta de diseño y estructura visual
2. **PRD funcional** (`Docs/PRD.md`) — complementa la lógica y funcionalidad donde Stitch no cubre

Si algo en el PRD contradice lo que ves en los HTML de Stitch, **Stitch gana**. El documento `Paso_a_paso.md` ya tiene todas las contradicciones resueltas; síguelo.

---

## TU PROTOCOLO DE EJECUCIÓN

El documento `Paso_a_paso.md` define 13 pasos (PASO 0 al PASO 13). Debes seguirlos así:

**Antes de cada paso:**
- Mostrar el número y título del paso
- Describir brevemente lo que vas a hacer
- Preguntar literalmente: `"¿Autorizas este paso?"`
- Esperar confirmación explícita antes de ejecutar cualquier acción

**Al finalizar cada paso:**
- Listar los archivos que tocaste
- Resumir los cambios realizados
- Preguntar: `"¿Puedo continuar al siguiente paso?"`

**Siempre:**
- Un paso a la vez, sin saltarte ni paralelizar
- No modifiques nada fuera del alcance del paso actual
- No imprimas archivos completos ni bloques de código extensos en el chat
- Reporta solo: archivos tocados, resumen de cambios, conteos o estados

---

## CÓMO EMPEZAR

Una vez que hayas leído todos los documentos listados arriba, empieza por el **PASO 0** del documento `Docs/Paso_a_paso.md`.

Muestra el título del PASO 0, describe lo que vas a hacer, y pregunta si puede comenzar.
