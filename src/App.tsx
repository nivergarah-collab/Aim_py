import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { VistaEjercicio } from './components/exercise/VistaEjercicio'
import { Biblioteca } from './components/library/Biblioteca'
import { Manual } from './components/manual/Manual'
import { Settings } from './components/settings/Settings'
import { User } from './components/user/User'
import { ExercisesProvider } from './context/ExercisesContext'

function App() {
  return (
    <ExercisesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Biblioteca />} />
            <Route path="exercise/:id" element={<VistaEjercicio />} />
            <Route path="manual" element={<Manual />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ExercisesProvider>
  )
}

export default App
