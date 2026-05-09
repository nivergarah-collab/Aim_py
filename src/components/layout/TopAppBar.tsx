import { useNavigate } from 'react-router-dom'

export function TopAppBar() {
  const navigate = useNavigate()

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-[calc(100%-240px)] items-center justify-between border-b border-outline-variant/20 bg-surface/80 px-md backdrop-blur-md">
      <div className="flex-1" />
      <div className="flex items-center gap-6">
        <div className="hidden items-center rounded-full border border-outline-variant/30 bg-surface-container-high px-4 py-1.5 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50 md:flex">
          <span className="material-symbols-outlined mr-2 text-sm text-on-surface-variant">search</span>
          <input
            className="w-48 border-none bg-transparent text-label-sm font-label-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0"
            placeholder="Search exercises..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-4 text-on-surface-variant">
          <button type="button" className="transition-colors duration-200 hover:text-primary" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button type="button" className="transition-colors duration-200 hover:text-primary" aria-label="Help">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button
            type="button"
            className="ml-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-outline-variant/50 bg-surface-container-highest text-label-sm font-label-sm text-on-surface transition-colors hover:border-primary"
            aria-label="Open user profile"
            onClick={() => navigate('/user')}
          >
            U
          </button>
        </div>
      </div>
    </header>
  )
}
