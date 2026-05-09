import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useExercises } from '../../hooks/useExercises'

type NavLink = {
  label: string
  icon: string
  to: string
  match: (pathname: string) => boolean
}

const navLinks: NavLink[] = [
  { label: 'Library', icon: 'auto_stories', to: '/', match: (pathname) => pathname === '/' },
  { label: 'Manual', icon: 'book', to: '/manual', match: (pathname) => pathname === '/manual' },
]

const bottomLinks: NavLink[] = [
  { label: 'Settings', icon: 'settings', to: '/settings', match: (pathname) => pathname === '/settings' },
  { label: 'User', icon: 'account_circle', to: '/user', match: (pathname) => pathname === '/user' },
]

function navClass(active: boolean) {
  return active
    ? 'text-primary font-bold bg-secondary-container/10 border-r-4 border-primary flex items-center px-md py-xs gap-3 text-label-sm font-label-sm'
    : 'text-on-surface-variant hover:text-on-surface flex items-center px-md py-xs gap-3 transition-all duration-300 hover:bg-surface-container-high hover:translate-x-1 active:scale-[0.97] text-label-sm font-label-sm'
}

function Icon({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className="material-symbols-outlined text-[20px]"
      style={active ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
    >
      {name}
    </span>
  )
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { getRandomEjercicioId } = useExercises()
  const exerciseActive = location.pathname.startsWith('/exercise')

  function handleRandomExercise() {
    const id = getRandomEjercicioId()
    if (id) {
      navigate(`/exercise/${id}`)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col space-y-xs border-r border-outline-variant/30 bg-surface-container py-lg shadow-[4px_0_20px_rgba(59,130,246,0.05)]">
      <div className="mb-xl flex items-center gap-3 px-md">
        <span
          className="material-symbols-outlined text-[32px] text-primary"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          terminal
        </span>
        <div>
          <h1 className="text-headline-md font-headline-md font-bold text-primary">Aim_py</h1>
          <p className="text-label-sm font-label-sm text-on-surface-variant">Python Mastery</p>
        </div>
      </div>

      <nav className="flex flex-grow flex-col">
        {navLinks.slice(0, 1).map((item) => {
          const active = item.match(location.pathname)
          return (
            <Link key={item.to} to={item.to} className={navClass(active)}>
              <Icon name={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <button
          type="button"
          className={`${navClass(exerciseActive)} text-left`}
          aria-current={exerciseActive ? 'page' : undefined}
          onClick={handleRandomExercise}
        >
          <Icon name="terminal" active={exerciseActive} />
          <span>Exercises</span>
        </button>

        {navLinks.slice(1).map((item) => {
          const active = item.match(location.pathname)
          return (
            <Link key={item.to} to={item.to} className={navClass(active)}>
              <Icon name={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          )
        })}

        <div className="flex-grow" />

        {bottomLinks.map((item) => {
          const active = item.match(location.pathname)
          return (
            <Link key={item.to} to={item.to} className={navClass(active)}>
              <Icon name={item.icon} active={active} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
