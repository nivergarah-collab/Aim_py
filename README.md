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

## Repositorio y deploy

- Repositorio oficial de trabajo: `https://github.com/nivergarah-collab/Aim_py`
- Proyecto Vercel: `aim_lab_py`
- Produccion: `https://aimlabpy.vercel.app`
- Repo creado automaticamente por Vercel: `https://github.com/nivergarah-collab/aim_lab_py`

El repositorio oficial es `Aim_py`. El repo `aim_lab_py` existe porque Vercel lo creo automaticamente durante el despliegue y no debe usarse como fuente principal del codigo, salvo que se decida migrar explicitamente.

Vercel debe desplegar desde la rama `main` del repositorio oficial. Las variables sensibles deben configurarse en Vercel Project Settings > Environment Variables o en un `.env.local` local no versionado.
