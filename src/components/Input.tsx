import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  parentClassName?: string
  labelClassName?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      type = 'text',
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const isPassword = type === 'password'
    const [visible, setVisible] = useState(false)

    return (
      <div className={`w-full ${parentClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`text-sm font-medium text-foreground ${labelClassName}`}
          >
            {label}
            {required && (
              <span className="text-red-500 ltr:ml-0.5 rtl:mr-0.5">*</span>
            )}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (visible ? 'text' : 'password') : type}
            autoComplete="off"
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            required={required}
            className={`input ${isPassword ? 'pr-10 rtl:pr-3 rtl:pl-10' : ''} ${
              error ? 'border-red-500 focus:ring-red-500/30' : ''
            } ${className}`}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
              aria-pressed={visible}
              tabIndex={-1}
              className="btn btn-secondary btn-rounded-full w-fit! ltr:right-2 rtl:left-2 p-1! top-1.25 absolute!"
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
