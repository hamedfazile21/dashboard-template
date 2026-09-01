import React from 'react'

interface props {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isIndeterminate?: boolean
  reset?: React.ComponentProps<'input'>
  rounded?: boolean
}

const CheckBox: React.FC<props> = ({
  checked,
  onChange,
  isIndeterminate,
  rounded,
  reset,
}) => {
  return (
    <input
      type="checkbox"
      className={`${rounded ? 'checkbox-rounded-full' : 'checkbox'}`}
      checked={checked}
      ref={(element) => {
        if (element) {
          element.indeterminate = isIndeterminate ?? false
        }
      }}
      onChange={onChange}
      {...reset}
    />
  )
}

export default CheckBox
