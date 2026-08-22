// Add these to your header component's existing imports:
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import Dialog from '../dialog'
import { Input } from '@headlessui/react'

// Add this state + effect inside your Header component, alongside
// your existing themeMode/language state:
function useHeaderSearch() {
  const [searchOpen, setSearchOpen] = useState(false)

  // ⌘K (Mac) / Ctrl+K (Windows/Linux) opens search from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { searchOpen, setSearchOpen }
}


function HeaderSearchTrigger({ onOpen }: { onOpen: () => void }) {
  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().includes('MAC')

  return (
    <button
      type="button"
      onClick={onOpen}
      className="glass-solid flex w-64 items-center gap-x-2 rounded-md px-3 py-1.5 text-sm text-muted
        transition-colors duration-150
        hover:text-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      <Search size={16} className="shrink-0" />
      <span className="flex-1 text-left">Search...</span>
      <kbd className="hidden shrink-0 rounded border border-borderColor bg-surface px-1.5 py-0.5 font-mono text-[11px] text-muted sm:inline-block">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  )
}


function HeaderSearchDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      position="top"
      size="md"
      showCloseButton={false}
    >
      <Input
        id="global-search"
        placeholder="Search pages, tasks, people..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="mt-4">
        {query ? (
          <p className="px-1 py-6 text-center text-sm text-muted">
            No results for "{query}"
          </p>
        ) : (
          <div className="flex flex-col gap-y-0.5">
            <p className="px-1 pb-1 text-xs font-medium uppercase tracking-wide text-muted">
              Recent
            </p>
            {['Task Manager', 'Dashboard', 'Settings'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={onClose}
                className="rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors duration-150 hover:bg-surface-hover"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}

export { useHeaderSearch, HeaderSearchTrigger, HeaderSearchDialog }
