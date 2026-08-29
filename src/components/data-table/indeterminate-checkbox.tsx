import { useEffect, useRef } from 'react'

interface IndeterminateCheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: (event: unknown) => void
  'aria-label'?: string
}

/**
 * A checkbox that supports the "indeterminate" (partial-selection) visual
 * state — used for the table header's select-all checkbox when some but
 * not all rows are selected. `indeterminate` isn't a real DOM attribute
 * settable via a React prop; it has to be set imperatively on the
 * underlying <input> element, hence the ref + effect.
 */
function IndeterminateCheckbox({
  checked,
  indeterminate = false,
  onChange,
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !checked && indeterminate
    }
  }, [checked, indeterminate])

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="checkbox"
      {...rest}
    />
  )
}

export default IndeterminateCheckbox
