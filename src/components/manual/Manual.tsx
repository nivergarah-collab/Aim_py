type ManualCard = {
  title: string
  description: string
  icon: string
  iconClass: string
}

const cards: ManualCard[] = [
  {
    title: 'Sintaxis Basica',
    description: 'Aprende los fundamentos del lenguaje: variables, tipos de datos, operadores y estructuras de control elementales.',
    icon: 'code',
    iconClass: 'text-primary',
  },
  {
    title: 'Estructuras de Control',
    description: 'Domina el flujo de tu programa utilizando condicionales y bucles para crear logica compleja.',
    icon: 'account_tree',
    iconClass: 'text-tertiary',
  },
  {
    title: 'Funciones y Modulos',
    description: 'Organiza tu codigo escribiendo bloques reutilizables e importa librerias estandar o externas.',
    icon: 'extension',
    iconClass: 'text-primary',
  },
  {
    title: 'Programacion Orientada a Objetos',
    description: 'Entiende las clases, objetos, herencia y polimorfismo para estructurar aplicaciones escalables.',
    icon: 'view_in_ar',
    iconClass: 'text-secondary',
  },
]

export function Manual() {
  return (
    <main className="mx-auto max-w-[1000px] px-sm py-xl md:px-lg">
      <div className="mb-8 rounded-xl border border-primary/30 bg-primary/10 px-md py-sm text-center shadow-[0_0_24px_rgba(59,130,246,0.12)]">
        <p className="text-headline-md font-headline-md text-primary">Seccion no disponible</p>
      </div>

      <div className="opacity-35 grayscale transition-opacity duration-300">
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl" style={{ color: '#f59e0b' }}>
              menu_book
            </span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">Manual de Python</h1>
          </div>
          <p className="max-w-2xl text-body-lg font-body-lg text-on-surface-variant">
            Documentacion tecnica y guias teoricas para complementar tu aprendizaje.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <a key={card.title} className="content-card group rounded-xl p-md" href="#">
              <div className="flex h-full flex-col">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(59,130,246,0.1)] p-3">
                  <span className={`material-symbols-outlined text-2xl ${card.iconClass}`}>{card.icon}</span>
                </div>
                <h3 className="mb-2 text-headline-md font-headline-md text-on-surface">{card.title}</h3>
                <p className="flex-grow text-body-md font-body-md text-on-surface-variant">{card.description}</p>
                <div className="mt-6 flex items-center text-label-sm font-label-sm text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explorar modulo <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </div>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
