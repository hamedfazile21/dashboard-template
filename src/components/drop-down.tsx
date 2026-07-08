import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '#/hooks/redux'

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left'
type AnchorTo = `${Placement}` | `${Placement} ${Align}`

type menuItemContent = {
  title: string | null
  onClick: () => void
  className: string
  icon: React.ReactNode | null
}
interface props {
  menuButtonClassName?: string
  menuButtonContent: React.ReactNode
  menuItemClassName?: string
  menuItemContent: menuItemContent[]
  placement?: AnchorTo
}

const Dropdown: React.FC<props> = ({
  menuButtonClassName,
  menuButtonContent,
  menuItemClassName,
  menuItemContent,
  placement = "bottom end",
}) => {
  const { t } = useTranslation()
  const { direction } = useAppSelector((state) => state.themeConfig)
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground inset-ring-1 inset-ring-white/5 outline-none ${menuButtonClassName}`}
        >
          {menuButtonContent}
        </MenuButton>
        <MenuItems
          anchor={placement}
          className={`absolute space-y-0.5 ltr:right-0 rtl:left-0 shadow-lg z-10 mt-2 ltr:origin-top-right rtl:origin-top-left rounded-md bg-surface outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in p-1 w-fit ${menuItemClassName}`}
        >
            {menuItemContent.map((item, index) => {
              return (
                <MenuItem key={index} >
                  <button
                    onClick={item.onClick}
                    className={`px-4 py-2 text-sm text-start text-foreground hover:text-muted hover:bg-surface-hover data-focus:outline-hidden rounded-lg w-full flex items-center gap-x-2 ${item.className}`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.title && <span>{t(item.title)}</span>}
                  </button>
                </MenuItem>
              )
            })}
        </MenuItems>
      </Menu>
    </>
  )
}

export default Dropdown
