import { toast } from 'sonner'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from 'lucide-react'
import { X } from 'lucide-react'
import ObjectViewer from '#/components/object-viewer'
/**
 * Typed toast helpers with consistent icons, built on top of sonner's
 * base `toast()` API. Use these instead of calling `toast(...)`
 * directly so every toast in the app gets the same icon/style per type.
 *
 * Usage:
 *   import { showToast } from './toast-helpers'
 *   showToast.success('Changes saved')
 *   showToast.error('Something went wrong', { description: 'Try again in a moment.' })
 *   showToast.promise(saveUser(), {
 *     loading: 'Saving...',
 *     success: 'Saved!',
 *     error: 'Failed to save',
 *   })
 */
export const showToast = {
  success: (message: string, options?: Parameters<typeof toast.success>[1]) =>
    toast.success(message, {
      icon: <CheckCircle2 size={18} className="text-emerald-500" />,
      ...options,
    }),

  error: (message: string, options?: Parameters<typeof toast.error>[1]) =>
    toast.error(message, {
      icon: <XCircle size={18} className="text-red-500" />,
      ...options,
    }),

  warning: (message: string, options?: Parameters<typeof toast.warning>[1]) =>
    toast.warning(message, {
      icon: <AlertTriangle size={18} className="text-amber-500" />,
      ...options,
    }),

  info: (message: string, options?: Parameters<typeof toast.info>[1]) =>
    toast.info(message, {
      icon: <Info size={18} className="text-blue-500" />,
      ...options,
    }),

  loading: (message: string, options?: Parameters<typeof toast.loading>[1]) =>
    toast.loading(message, {
      icon: <Loader2 size={18} className="animate-spin text-primary" />,
      ...options,
    }),

  promise: toast.promise,
  dismiss: toast.dismiss,
}

/**
 * Shows a JS object (e.g. form submission result) inside a glass toast.
 *
 * Usage:
 *   showObjectToast('Form submitted', formData)
 */
export function showObjectToast(title: string, data: unknown) {
  toast.custom(
    (id) => (
      <div
        className="relative w-full"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <button
            type="button"
            onClick={() => toast.dismiss(id)}
            aria-label="Dismiss"
            className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <X size={14} />
          </button>
        </div>

        {/* max-h + overflow so a large object doesn't blow out the toast viewport */}
        <div className="max-h-64 overflow-y-auto">
          <ObjectViewer data={data} />
        </div>
      </div>
    ),
    { duration: 8000 }, // give the person enough time to actually read the object
  )
}
