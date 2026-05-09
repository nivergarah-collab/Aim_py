import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useExercises } from '../../hooks/useExercises'
import type { Ejercicio } from '../../types'
import { CartaPremisaPasos } from './CartaPremisaPasos'
import { CartaCodigoVolteable } from './CartaCodigoVolteable'
import { CodigoToggleButtons } from './CodigoToggleButtons'

function getExtracto(premisa: string) {
  const normalized = premisa.replace(/\s+/g, ' ').trim()
  return normalized.length > 80 ? `${normalized.slice(0, 80)}...` : normalized
}

export function VistaEjercicio() {
  const { id } = useParams()
  const { getEjercicioById, loading } = useExercises()
  const ejercicio = id ? getEjercicioById(id) : undefined

  if (loading) {
    return (
      <div className="p-4 md:p-8 lg:p-12">
        <div className="level-1-card rounded-xl p-md text-body-md font-body-md text-on-surface-variant">Cargando ejercicio...</div>
      </div>
    )
  }

  if (!id || !ejercicio) {
    return (
      <div className="p-4 md:p-8 lg:p-12">
        <div className="level-1-card rounded-xl p-md">
          <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Ejercicio no encontrado</h1>
          <Link className="text-label-sm font-label-sm text-primary hover:text-primary-fixed" to="/">
            Volver a Biblioteca
          </Link>
        </div>
      </div>
    )
  }

  return <VistaEjercicioContent key={ejercicio.id} ejercicio={ejercicio} />
}

function VistaEjercicioContent({ ejercicio }: { ejercicio: Ejercicio }) {
  const [pasosMarcados, setPasosMarcados] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ejercicio.pasos.map((paso) => [paso.id, false])),
  )

  function handleTogglePaso(pasoId: string) {
    setPasosMarcados((current) => ({
      ...current,
      [pasoId]: !current[pasoId],
    }))
  }

  return (
    <main className="mx-auto w-full max-w-container-max p-4 md:p-8 lg:p-12">
      <div className="mb-lg">
        <h1 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Ejercicio: {ejercicio.nombre}</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">{getExtracto(ejercicio.premisa)}</p>
      </div>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[2fr_3fr]">
        <CartaPremisaPasos ejercicio={ejercicio} pasosMarcados={pasosMarcados} onTogglePaso={handleTogglePaso} />
        <div className="group/container relative flex">
          <CodigoToggleButtons />
          <CartaCodigoVolteable ejercicio={ejercicio} />
        </div>
      </div>
    </main>
  )
}
