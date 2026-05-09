type Preference = {
  title: string
  description: string
  active: boolean
}

const preferences: Preference[] = [
  {
    title: 'Syntax Highlighting',
    description: 'Enable rich colorization in the code editor.',
    active: true,
  },
  {
    title: 'Auto-Format Code',
    description: 'Automatically format Python code on save.',
    active: false,
  },
  {
    title: 'Telemetry & Analytics',
    description: 'Share anonymous usage data to improve Aim_py.',
    active: true,
  },
]

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <div
      className={
        active
          ? 'relative h-6 w-12 cursor-pointer rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]'
          : 'relative h-6 w-12 cursor-pointer rounded-full border border-outline-variant/30 bg-surface-container-highest'
      }
    >
      <div
        className={
          active
            ? 'absolute left-1 top-1 h-4 w-4 translate-x-6 rounded-full bg-on-primary transition-transform duration-300'
            : 'absolute left-1 top-1 h-4 w-4 rounded-full bg-on-surface-variant transition-transform duration-300'
        }
      />
    </div>
  )
}

export function SettingsPreferencesCard() {
  return (
    <div className="group flex flex-col rounded-xl border border-outline-variant/20 bg-surface-container p-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] lg:col-span-8">
      <div className="mb-md flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <h3 className="flex items-center gap-3 text-headline-md font-headline-md text-on-surface">
          <span className="material-symbols-outlined text-primary">tune</span>
          App Preferences
        </h3>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-lg border border-outline-variant/30 px-4 py-2 text-label-sm font-label-sm text-on-surface-variant transition-colors duration-200 hover:border-primary/50 hover:bg-surface-container-highest hover:text-primary"
          >
            Deselect all
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-label-sm font-label-sm text-on-primary shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors duration-200 hover:bg-primary-container hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Select all
          </button>
        </div>
      </div>

      <div className="mt-xs flex-1 space-y-3">
        {preferences.map((preference) => (
          <div
            key={preference.title}
            className={[
              'flex items-center justify-between rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-4 transition-colors duration-300',
              preference.active ? 'hover:border-primary/40' : 'hover:border-outline-variant/60',
            ].join(' ')}
          >
            <div>
              <h4 className="text-body-md font-body-md font-medium text-on-surface">{preference.title}</h4>
              <p className="mt-1 text-label-sm font-label-sm text-on-surface-variant">{preference.description}</p>
            </div>
            <ToggleSwitch active={preference.active} />
          </div>
        ))}
      </div>
    </div>
  )
}
