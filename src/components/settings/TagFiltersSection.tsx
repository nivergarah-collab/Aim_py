import { useExercises } from '../../hooks/useExercises'

export function TagFiltersSection() {
  const { etiquetasDisponibles, etiquetasSeleccionadas, setEtiquetasSeleccionadas } = useExercises()
  const selectedTags = new Set(etiquetasSeleccionadas)

  function toggleTag(tag: string) {
    if (selectedTags.has(tag)) {
      setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter((selectedTag) => selectedTag !== tag))
      return
    }

    setEtiquetasSeleccionadas([...etiquetasSeleccionadas, tag])
  }

  return (
    <section className="rounded-xl border border-outline-variant/20 bg-surface-container p-lg lg:col-span-12">
      <div className="mb-md flex flex-col gap-4 border-b border-outline-variant/20 pb-4 md:flex-row md:items-center md:justify-between">
        <h3 className="flex items-center gap-3 text-headline-md font-headline-md text-on-surface">
          <span className="material-symbols-outlined text-primary">filter_alt</span>
          Filtros de ejercicios
        </h3>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-label-sm font-label-sm text-on-primary shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors duration-200 hover:bg-primary-container hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            onClick={() => setEtiquetasSeleccionadas([...etiquetasDisponibles])}
          >
            Seleccionar todas
          </button>
          <button
            type="button"
            className="rounded-lg border border-outline-variant/30 px-4 py-2 text-label-sm font-label-sm text-on-surface-variant transition-colors duration-200 hover:border-primary/50 hover:bg-surface-container-highest hover:text-primary"
            onClick={() => setEtiquetasSeleccionadas([])}
          >
            Deseleccionar todas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {etiquetasDisponibles.map((tag) => {
          const checked = selectedTags.has(tag)
          return (
            <label
              key={tag}
              className="group flex cursor-pointer items-center gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-4 transition-colors hover:border-primary/40"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggleTag(tag)}
              />
              <span
                className={[
                  'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                  checked ? 'border-primary bg-primary' : 'border-outline group-hover:border-primary',
                ].join(' ')}
              >
                <svg
                  className={`h-3 w-3 text-on-primary transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                </svg>
              </span>
              <span className="text-body-md font-body-md capitalize text-on-surface">{tag}</span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
