import { Checkbox } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'

interface props {
  checked: boolean
  onChange: () => void
}

const CheckBox: React.FC<props> = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className={`group size-5 rounded-md bg-surface p-1 ring-1 ring-borderColor ring-inset focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2 data-focus:outline-white cursor-pointer`}
    >
      <CheckIcon strokeWidth={4} className="hidden size-3 group-data-checked:block" />
    </Checkbox>
  )
}

export default CheckBox
