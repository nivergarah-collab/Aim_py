import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopAppBar } from './TopAppBar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B1121] text-on-surface">
      <Sidebar />
      <div className="ml-60 flex-1">
        <TopAppBar />
        <main className="mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
