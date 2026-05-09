const toggles = [
  { label: 'Imports', active: false },
  { label: 'Logic', active: true },
  { label: 'Tests', active: true },
]

export function CodigoToggleButtons() {
  return (
    <div className="mr-4 hidden flex-col justify-between py-12 md:flex">
      {toggles.map((toggle) => (
        <div key={toggle.label} className="group/toggle relative">
          <button
            type="button"
            className={
              toggle.active
                ? 'flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-on-primary shadow-[0_0_10px_rgba(173,198,255,0.3)] transition-all active:scale-95'
                : 'flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-high text-on-surface-variant transition-all hover:border-primary/50 active:scale-95'
            }
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
          </button>
          <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded border border-outline-variant/20 bg-surface-container-highest px-2 py-1 text-[10px] text-on-surface opacity-0 transition-opacity group-hover/toggle:opacity-100">
            {toggle.label}
          </span>
        </div>
      ))}
    </div>
  )
}
