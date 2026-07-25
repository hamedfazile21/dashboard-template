import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  parentClassName?: string
  labelClassName?: string
  error?: string
  showCount?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      label,
      parentClassName = '',
      labelClassName = '',
      error,
      id,
      required,
      placeholder = '',
      rows = 4,
      maxLength,
      showCount = false,
      value,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    return (
      <div className={`w-full ${parentClassName}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className={`text-sm font-medium text-foreground ${labelClassName}`}
          >
            {label}
            {required && (
              <span className="text-red-500 ltr:ml-0.5 rtl:mr-0.5">*</span>
            )}
          </label>
        )}

        <div className="relative w-full">
          <textarea
            ref={ref}
            id={textareaId}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            required={required}
            rows={rows}
            maxLength={maxLength}
            value={value}
            className={`input resize-y ${
              error ? 'border-red-500 focus:ring-red-500/30' : ''
            } ${className}`}
            {...rest}
          />
        </div>

        <div className="mt-1 flex items-start justify-between gap-x-2">
          {error ? (
            <p id={`${textareaId}-error`} className="text-xs text-red-500">
              {error}
            </p>
          ) : (
            <span />
          )}

          {showCount && maxLength && (
            <span className="shrink-0 text-xs text-muted">
              {String(value ?? '').length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
