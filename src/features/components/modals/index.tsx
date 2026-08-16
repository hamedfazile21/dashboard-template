import { useState } from 'react'
import {
  Info,
  AlertTriangle,
  Pencil,
  ArrowUpToLine,
  CheckCircle2,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import Dialog from '@/components/dialog'
import Input from '@/components/input'

type TransitionVariant =
  | 'fadeIn'
  | 'slideInDown'
  | 'fadeInUp'
  | 'slideInUp'
  | 'fadeInLeft'
  | 'rotateInLeft'
  | 'fadeInRight'
  | 'zoomInUp'

const transitionOptions: {
  variant: TransitionVariant
  label: string
  icon: typeof ArrowDown
}[] = [
  { variant: 'fadeIn', label: 'Fade In', icon: Sparkles },
  { variant: 'slideInDown', label: 'Slide Down', icon: ArrowDown },
  { variant: 'fadeInUp', label: 'Fade Up', icon: ArrowUp },
  { variant: 'slideInUp', label: 'Slide Up', icon: ArrowUp },
  { variant: 'fadeInLeft', label: 'Fade Left', icon: ArrowLeft },
  { variant: 'rotateInLeft', label: 'Rotate Left', icon: RotateCcw },
  { variant: 'fadeInRight', label: 'Fade Right', icon: ArrowRight },
  { variant: 'zoomInUp', label: 'Zoom Up', icon: Sparkles },
]

interface PatternCardProps {
  icon: typeof Info
  iconColor: string
  title: string
  description: string
  onOpen: () => void
}

function PatternCard({
  icon: Icon,
  iconColor,
  title,
  description,
  onOpen,
}: PatternCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="card card-hover group flex w-full flex-col items-start gap-y-3 p-5 text-left"
    >
      <div
        className={`flex size-10 items-center justify-center rounded-full ${iconColor}`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <span className="flex items-center gap-x-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        Preview
        <ChevronRight size={13} />
      </span>
    </button>
  )
}

function Modals() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const [transitionOpen, setTransitionOpen] = useState(false)
  const [activeTransition, setActiveTransition] =
    useState<TransitionVariant>('fadeIn')

  const openTransition = (variant: TransitionVariant) => {
    setActiveTransition(variant)
    setTransitionOpen(true)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setFormOpen(false)
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-y-8">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Modals</h1>
        <p className="mt-1 text-sm text-muted">
          Reusable dialog patterns and enter/exit transitions, built on the
          shared Dialog component.
        </p>
      </div>

      {/* ---- Transitions ---- */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Transitions</h2>
          <p className="text-xs text-muted">Click any to preview</p>
        </div>

        <div className="card grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
          {transitionOptions.map(({ variant, label, icon: Icon }) => (
            <button
              key={variant}
              type="button"
              onClick={() => openTransition(variant)}
              className={`flex flex-col items-center gap-y-2 rounded-lg border py-4 text-xs font-medium transition-all duration-150 ${
                activeTransition === variant && transitionOpen
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-transparent text-muted hover:border-white/10 hover:bg-surface-hover hover:text-foreground'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Patterns ---- */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Patterns</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PatternCard
            icon={Info}
            iconColor="bg-blue-500/15 text-blue-500"
            title="Basic"
            description="Title, body copy, and a single acknowledging action."
            onOpen={() => setBasicOpen(true)}
          />
          <PatternCard
            icon={AlertTriangle}
            iconColor="bg-red-500/15 text-red-500"
            title="Confirmation"
            description="Destructive action — outside click is disabled on purpose."
            onOpen={() => setConfirmOpen(true)}
          />
          <PatternCard
            icon={Pencil}
            iconColor="bg-primary/15 text-primary"
            title="Form"
            description="Inline fields with Cancel / Save actions."
            onOpen={() => setFormOpen(true)}
          />
          <PatternCard
            icon={ArrowUpToLine}
            iconColor="bg-indigo-500/15 text-indigo-500"
            title="Top-anchored"
            description="Anchored near the top — quick-create, announcements."
            onOpen={() => setTopOpen(true)}
          />
          <PatternCard
            icon={CheckCircle2}
            iconColor="bg-emerald-500/15 text-emerald-500"
            title="Success"
            description="No title bar — fully custom centered content."
            onOpen={() => setSuccessOpen(true)}
          />
        </div>
      </section>

      {/* ---- Dialogs ---- */}

      <Dialog
        open={transitionOpen}
        position="top"
        onClose={() => setTransitionOpen(false)}
        title={
          transitionOptions.find((o) => o.variant === activeTransition)?.label
        }
        transition={activeTransition}
        size="sm"
      >
        <p className="text-sm text-muted">
          Opened with the{' '}
          <span className="font-medium text-foreground">
            {activeTransition}
          </span>{' '}
          transition.
        </p>
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4 dark:border-white/8">
          <button
            type="button"
            onClick={() => setTransitionOpen(false)}
            className="btn btn-primary w-auto px-4"
          >
            Close
          </button>
        </div>
      </Dialog>

      <Dialog
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="About this workspace"
      >
        <p className="text-sm text-muted">
          This workspace was created on Aug 12, 2026 and currently has 8 active
          members. You can manage access and billing from the workspace settings
          page.
        </p>
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4 dark:border-white/8">
          <button
            type="button"
            onClick={() => setBasicOpen(false)}
            className="btn btn-primary w-auto px-4"
          >
            Got it
          </button>
        </div>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        closeOnOutsideClick={false}
        size="sm"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <AlertTriangle size={22} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            Delete this project?
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            This will permanently delete the project and all of its tasks. This
            action can't be undone.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-2">
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            className="btn w-full justify-center rounded-md bg-red-500 p-2 text-sm font-semibold text-white! transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Dialog>

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Edit profile"
      >
        <form onSubmit={handleSave} className="flex flex-col gap-y-4">
          <Input
            id="modal-name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hamed Fazeli"
          />
          <Input
            id="modal-email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <div className="mt-2 flex items-center justify-end gap-x-2 border-t border-white/10 pt-4 dark:border-white/8">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={topOpen}
        onClose={() => setTopOpen(false)}
        title="Quick create"
        position="top"
        size="sm"
      >
        <Input id="quick-create" placeholder="Task title..." autoFocus />
        <div className="mt-4 flex justify-end gap-x-2">
          <button
            type="button"
            onClick={() => setTopOpen(false)}
            className="btn btn-secondary w-auto px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setTopOpen(false)}
            className="btn btn-primary w-auto px-4"
          >
            Create
          </button>
        </div>
      </Dialog>

      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        showCloseButton={false}
        size="sm"
      >
        <div className="flex flex-col items-center py-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
            <CheckCircle2 size={26} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">
            Payment successful
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            Your subscription is now active. A receipt has been sent to your
            email.
          </p>
          <button
            type="button"
            onClick={() => setSuccessOpen(false)}
            className="btn btn-primary mt-6 w-full"
          >
            Continue
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default Modals
