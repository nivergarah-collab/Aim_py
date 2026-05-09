import type { Paso } from '../../types'

type PasoItemProps = {
  paso: Paso
  marcado: boolean
  onToggle: () => void
}

export function PasoItem({ paso, marcado, onToggle }: PasoItemProps) {
  return (
    <label className="group flex cursor-pointer items-start gap-3">
      <span className="relative mt-1 flex items-center justify-center">
        <input type="checkbox" className="sr-only" checked={marcado} onChange={onToggle} />
        <span
          className={[
            'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
            marcado ? 'border-primary bg-primary' : 'border-outline group-hover:border-primary',
          ].join(' ')}
        >
          <svg
            className={`h-3 w-3 text-on-primary transition-opacity ${marcado ? 'opacity-100' : 'opacity-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </span>
      </span>
      <span
        className={
          marcado
            ? 'text-body-md font-body-md text-on-surface-variant line-through opacity-70'
            : 'text-body-md font-body-md text-on-surface transition-colors group-hover:text-primary'
        }
      >
        {paso.texto}
      </span>
    </label>
  )
}
