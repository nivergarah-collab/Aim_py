export function UserProfileCard() {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container p-lg text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] lg:col-span-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative mb-6 h-32 w-32 rounded-full bg-gradient-to-b from-primary/40 to-surface-container-highest p-1 transition-transform duration-500 group-hover:scale-105">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-surface text-display font-display text-primary">
          E
        </div>
      </div>
      <h3 className="mb-2 text-headline-lg font-headline-lg text-on-surface">Estudiante</h3>
      <div className="mt-xs inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-highest px-3 py-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary-fixed-dim" />
        <p className="text-label-sm font-label-sm text-on-surface-variant">En espera de sistema de login</p>
      </div>
    </div>
  )
}
