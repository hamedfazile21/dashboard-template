import ReactSelect, {
  components,
  type ClassNamesConfig,
  type DropdownIndicatorProps,
  type GroupBase,
  type Props as ReactSelectProps,
} from 'react-select'
import { Check, ChevronDown, X } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<
  ReactSelectProps<SelectOption, boolean, GroupBase<SelectOption>>,
  'classNames' | 'unstyled'
> {
  label?: string
  error?: string
}

const glassClassNames: ClassNamesConfig<
  SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  control: (state) =>
    `glass-solid flex rounded-md px-2 py-1 text-sm transition-all duration-200 cursor-pointer ${
      state.isFocused ? 'border-primary/50 ring-2 ring-primary/30' : ''
    }`,
  placeholder: () => 'text-muted',
  singleValue: () => 'text-foreground',
  input: () => 'text-foreground',
  valueContainer: () => 'gap-x-1',
  indicatorSeparator: () => 'hidden',
  indicatorsContainer: () => 'gap-x-1',
  clearIndicator: () =>
    'text-muted hover:text-red-500 transition-colors cursor-pointer p-1',
  dropdownIndicator: () => 'text-muted p-1',
  menu: () =>
    `z-50 mt-2 rounded-xl border border-black/8 bg-surface/70 p-1 shadow-lg shadow-black/5
     backdrop-blur-xl backdrop-saturate-150
     dark:border-white/10 dark:bg-surface/35 dark:shadow-black/20`,
  menuList: () => 'space-y-0.5 max-h-60 overflow-y-auto scrollbar-thin',
  option: (state) =>
    `flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
      state.isSelected
        ? 'bg-primary/15 text-primary'
        : state.isFocused
          ? 'bg-surface-hover text-foreground'
          : 'text-foreground'
    } ${state.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`,
  noOptionsMessage: () => 'px-3 py-2 text-sm text-muted',
  loadingMessage: () => 'px-3 py-2 text-sm text-muted',
  multiValue: () =>
    'flex items-center gap-x-1 rounded-md bg-primary/15 pl-2 pr-1 py-0.5',
  multiValueLabel: () => 'text-xs font-medium text-primary',
  multiValueRemove: () =>
    'text-primary hover:text-red-500 transition-colors cursor-pointer rounded-sm',
}

function DropdownIndicator(
  props: DropdownIndicatorProps<SelectOption, boolean, GroupBase<SelectOption>>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${props.selectProps.menuIsOpen ? 'rotate-180' : ''}`}
      />
    </components.DropdownIndicator>
  )
}

function ClearIndicator(props: any) {
  return (
    <components.ClearIndicator {...props}>
      <X size={14} />
    </components.ClearIndicator>
  )
}

function OptionWithCheck(props: any) {
  return (
    <components.Option {...props}>
      <span className="truncate text-md">{props.label}</span>
      {props.isSelected && (
        <Check size={15} className="shrink-0 text-primary" />
      )}
    </components.Option>
  )
}

function InputSelect({ label, error, id, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <ReactSelect
        inputId={id}
        unstyled
        classNames={glassClassNames}
        components={{
          DropdownIndicator,
          ClearIndicator,
          Option: OptionWithCheck,
        }}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default InputSelect
