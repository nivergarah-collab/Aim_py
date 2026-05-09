import { Link } from 'react-router-dom'
import { UserProfileCard } from '../settings/UserProfileCard'

export function User() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-lg">
      <div className="w-full max-w-md">
        <UserProfileCard />
      </div>
      <p className="mt-4 text-center text-body-md font-body-md text-on-surface-variant">
        Funcionalidades de usuario llegarán en versiones futuras.
      </p>
      <Link
        to="/settings"
        className="mt-4 inline-block rounded-md bg-primary px-6 py-2 text-label-sm font-label-sm text-on-primary transition-all hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      >
        Ir a Settings
      </Link>
    </main>
  )
}
