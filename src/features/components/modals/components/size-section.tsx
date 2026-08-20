import { useModal, type Size } from './modal-provider'

function SizeSection() {
  const { activeSize, open, setActiveSize, setOpen, sizeOptions } = useModal()

  const openSize = (size: Size) => {
    setActiveSize(size)
    setOpen('size')
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Size</h2>
        <p className="text-xs text-muted">Click any to preview</p>
      </div>

      <div className="card grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {sizeOptions.map(({ size, label, badgeWidth }) => (
          <button
            key={size}
            type="button"
            onClick={() => openSize(size)}
            className={`flex flex-col items-center gap-y-2.5 rounded-lg border py-4 text-xs font-medium transition-all duration-150 ${
              activeSize === size && open === 'size'
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-transparent text-muted hover:border-white/10 hover:bg-surface-hover hover:text-foreground'
            }`}
          >
            <span
              className={`h-2 rounded-full ${badgeWidth} ${
                activeSize === size && open === 'size'
                  ? 'bg-primary'
                  : 'bg-current opacity-40'
              }`}
            />
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SizeSection
