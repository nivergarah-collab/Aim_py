import { Link } from 'react-router-dom'
import type { Ejercicio } from '../../types'

type CartaEjercicioProps = {
  ejercicio: Ejercicio
  activo: boolean
}

function getExtracto(premisa: string) {
  const normalized = premisa.replace(/\s+/g, ' ').trim()
  return normalized.length > 120 ? `${normalized.slice(0, 120)}...` : normalized
}

export function CartaEjercicio({ ejercicio, activo }: CartaEjercicioProps) {
  const dotsClass = activo ? 'bg-outline-variant/30 group-hover:bg-error/60' : 'bg-outline-variant/20'
  const secondDotClass = activo ? 'bg-outline-variant/30 group-hover:bg-tertiary/60' : 'bg-outline-variant/20'
  const thirdDotClass = activo ? 'bg-outline-variant/30 group-hover:bg-primary/60' : 'bg-outline-variant/20'

  return (
    <Link to={`/exercise/${ejercicio.id}`} className="block">
      <article
        className={[
          'group relative flex flex-col bg-surface-container rounded-xl p-4',
          activo
            ? 'border border-white/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
            : 'border border-white/5 opacity-40 grayscale-[20%]',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />

        <div className="mb-3 flex gap-1.5">
          <div className={`h-2.5 w-2.5 rounded-full ${dotsClass}`} />
          <div className={`h-2.5 w-2.5 rounded-full ${secondDotClass}`} />
          <div className={`h-2.5 w-2.5 rounded-full ${thirdDotClass}`} />
        </div>

        <h3
          className={[
            'mb-1.5 flex items-center gap-2 font-code-md text-lg',
            activo ? 'text-primary-fixed transition-colors group-hover:text-white' : 'text-on-surface-variant',
          ].join(' ')}
        >
          <span className={`material-symbols-outlined text-lg ${activo ? 'text-primary' : 'text-outline-variant'}`}>
            description
          </span>
          {ejercicio.nombre}
        </h3>

        <p
          className={[
            'line-clamp-1 flex-grow text-sm font-body-md leading-snug',
            activo ? 'text-on-surface-variant group-hover:text-on-surface' : 'text-outline',
          ].join(' ')}
        >
          {getExtracto(ejercicio.premisa)}
        </p>

        <footer
          className={[
            'mt-4 flex items-center justify-between border-t pt-3',
            activo ? 'border-outline-variant/20 group-hover:border-primary/30' : 'border-outline-variant/10',
          ].join(' ')}
        >
          <span
            className={[
              'rounded border px-2 py-0.5 text-[10px] font-label-sm uppercase tracking-wider',
              activo
                ? 'border-secondary/20 bg-secondary/10 text-secondary group-hover:border-primary/40 group-hover:bg-primary/20 group-hover:text-primary'
                : 'border-outline-variant/20 bg-surface/50 text-outline-variant',
            ].join(' ')}
          >
            {ejercicio.etiquetas[0] ?? 'python'}
          </span>
          <span
            className={[
              'flex items-center gap-1 text-[11px] font-label-sm',
              activo ? 'text-on-surface-variant' : 'text-outline-variant',
            ].join(' ')}
          >
            <span className="material-symbols-outlined text-[14px]">checklist</span>
            {ejercicio.pasos.length} pasos
          </span>
        </footer>
      </article>
    </Link>
  )
}
