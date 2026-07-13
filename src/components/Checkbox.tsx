import { Checkbox } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

export default function CheckBox() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group size-5 rounded-md bg-surface p-1 ring-1 ring-borderColor ring-inset focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
    >
      <CheckIcon className="hidden size-3 group-data-checked:block" />
    </Checkbox>
  )
}
