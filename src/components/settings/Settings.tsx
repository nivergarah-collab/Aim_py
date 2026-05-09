import { SettingsPreferencesCard } from './SettingsPreferencesCard'
import { TagFiltersSection } from './TagFiltersSection'
import { UserProfileCard } from './UserProfileCard'

export function Settings() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-background p-lg">
      <div className="mx-auto max-w-container-max">
        <header className="mb-lg">
          <h2 className="text-display font-display text-on-surface">Configuration Environment</h2>
          <p className="mt-2 text-body-lg font-body-lg text-on-surface-variant">Manage your preferences and profile.</p>
        </header>

        <div className="grid grid-cols-1 gap-md lg:grid-cols-12">
          <UserProfileCard />
          <SettingsPreferencesCard />
          <TagFiltersSection />
        </div>
      </div>
    </main>
  )
}
