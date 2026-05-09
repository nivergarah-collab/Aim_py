import { CartaEjercicio } from './CartaEjercicio'
import { useExercises } from '../../hooks/useExercises'

export function Biblioteca() {
  const { ejercicios, ejerciciosFiltrados, loading } = useExercises()
  const ejerciciosActivos = new Set(ejerciciosFiltrados.map((ejercicio) => ejercicio.id))

  return (
    <section className="mx-auto min-h-[calc(100vh-64px)] max-w-container-max px-lg py-xl">
      <header className="mb-lg flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-display font-display tracking-tight text-on-surface">Biblioteca de Ejercicios</h2>
          <p className="max-w-2xl text-body-lg font-body-lg text-on-surface-variant">
            Master core concepts through practical implementation. Filter by difficulty or track your progress across different modules.
          </p>
        </div>
        <div className="hidden items-center gap-4 rounded-lg border border-outline-variant/30 bg-surface-container-low/50 p-1 backdrop-blur-sm lg:flex">
          <button type="button" className="rounded border border-primary/20 bg-primary/10 px-4 py-2 text-label-sm font-label-sm text-primary">
            All Modules
          </button>
          <button type="button" className="rounded px-4 py-2 text-label-sm font-label-sm text-on-surface-variant transition-colors hover:text-on-surface">
            Data Structures
          </button>
          <button type="button" className="rounded px-4 py-2 text-label-sm font-label-sm text-on-surface-variant transition-colors hover:text-on-surface">
            Algorithms
          </button>
        </div>
      </header>

      <div className="mb-xl h-[1px] w-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

      {loading ? (
        <div className="level-1-card rounded-xl p-md text-body-md font-body-md text-on-surface-variant">Cargando ejercicios...</div>
      ) : (
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
          {ejercicios.map((ejercicio) => (
            <CartaEjercicio key={ejercicio.id} ejercicio={ejercicio} activo={ejerciciosActivos.has(ejercicio.id)} />
          ))}
        </div>
      )}
    </section>
  )
}
