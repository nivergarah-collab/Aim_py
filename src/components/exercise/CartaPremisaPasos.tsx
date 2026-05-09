import type { Ejercicio } from '../../types'
import { PasoItem } from './PasoItem'

type CartaPremisaPasosProps = {
  ejercicio: Ejercicio
  pasosMarcados: Record<string, boolean>
  onTogglePaso: (id: string) => void
}

export function CartaPremisaPasos({ ejercicio, pasosMarcados, onTogglePaso }: CartaPremisaPasosProps) {
  return (
    <div className="flex flex-col gap-gutter">
      <section className="level-1-card rounded-xl p-md">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lightbulb</span>
          <h2 className="text-headline-md font-headline-md text-on-surface">Premisa</h2>
        </div>
        <p className="whitespace-pre-line text-body-md font-body-md leading-relaxed text-on-surface-variant">
          {ejercicio.premisa}
        </p>
      </section>

      <section className="level-1-card flex-1 rounded-xl p-md">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">checklist</span>
          <h2 className="text-headline-md font-headline-md text-on-surface">Pasos</h2>
        </div>
        <div className="space-y-3">
          {ejercicio.pasos.map((paso) => (
            <PasoItem
              key={paso.id}
              paso={paso}
              marcado={Boolean(pasosMarcados[paso.id])}
              onToggle={() => onTogglePaso(paso.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
