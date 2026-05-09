# Aim_py

MVP educativo para aprender fundamentos de Python con una SPA visual e interactiva.

Este repositorio contiene la documentacion del proyecto y servira como base para implementar la aplicacion con React, TypeScript, Vite y Tailwind CSS.

## Datos de ejercicios

Los ejercicios de la app viven en `public/data/exercises.json`.

Para regenerar ese archivo desde una carpeta local de archivos `.py`:

```bash
npm run import:exercises -- "C:\ruta\a\ejercicios"
```

El importador lee la premisa desde los comentarios iniciales del archivo y usa el resto como solucion.
