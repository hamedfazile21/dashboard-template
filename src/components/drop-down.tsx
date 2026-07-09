import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '#/hooks/redux'

type Align = 'start' | 'end'
type Placement = 'top' | 'right' | 'bottom' | 'left'
type AnchorTo = `${Placement}` | `${Placement} ${Align}`

type menuItemContent = {
  title: string | null
  onClick: () => void
  className: string
  icon: React.ReactNode | null
  isHtmlElement?: boolean
  elementContent?: React.ReactNode
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
  placement = 'bottom end',
}) => {
  const { t } = useTranslation()
  const { direction } = useAppSelector((state) => state.themeConfig)
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton
          className={`btn btn-secondary btn-rounded-full ${menuButtonClassName}`}
        >
          {menuButtonContent}
        </MenuButton>
        <MenuItems
          anchor={placement}
          transition
          className={`absolute outline-0 border border-borderColor ltr:right-0 rtl:left-0 z-10 mt-2 w-fit rounded-md bg-surface shadow-lg p-1 space-y-0.5 origin-top-right transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 ${menuItemClassName}`}
        >
          {menuItemContent.map((item, index) => {
            return (
              <MenuItem key={index}>
                  <button
                    onClick={item.onClick}
                    className={`relative px-4 py-2 text-sm text-start text-foreground ${!item.elementContent ? 'hover:text-muted hover:bg-surface-hover' : 'cursor-default!'} data-focus:outline-hidden rounded-lg w-full flex items-center gap-x-2 ${item.className}`}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.isHtmlElement ? (
                      <span className="w-full">{item.elementContent}</span>
                    ) : (
                      <>{item.title && <span>{t(item.title)}</span>}</>
                    )}
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
