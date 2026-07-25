import InputSelect, { type SelectOption } from '@/components/input-select'
import { components, type OptionProps, type GroupBase } from 'react-select'
import { Check, Diamond } from 'lucide-react'

interface UserOption extends SelectOption {
  avatarUrl: string
}

export function OptionWithAvatar(
  props: OptionProps<UserOption, boolean, GroupBase<UserOption>>,
) {
  return (
    <components.Option {...props}>
      <div className="w-full flex items-center gap-x-2">
        <img
          src={props.data.avatarUrl}
          alt=""
          className="size-8 rounded-full border border-borderColor bg-surface object-cover shrink-0"
        />
        <span className="truncate text-sm flex-1">{props.label}</span>
        {props.isSelected && (
          <Check size={15} className="shrink-0 text-primary" />
        )}
      </div>
    </components.Option>
  )
}

export const OptionWithIconColor = (
  props: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>,
) => {
  // 'Low' | 'Medium' | 'High'

  const customColor = (assignee: string): string => {
    if (assignee === 'Low') {
      return 'emerald-500'
    }
    if (assignee === 'Medium') {
      return 'blue-500'
    }

    if (assignee === 'High') {
      return 'red-500'
    }

    return ''
  }
  return (
    <components.Option {...props}>
      <div className="w-full flex items-center gap-x-2">
        <Diamond
          size={18}
          className={`fill-${customColor(props.label)} text-${customColor(props.label)}`}
        />
        <span
          className={`truncate text-sm flex-1 text-${customColor(props.label)}`}
        >
          {props.label}
        </span>
        {props.isSelected && (
          <Check size={15} className="shrink-0 text-primary" />
        )}
      </div>
    </components.Option>
  )
}
