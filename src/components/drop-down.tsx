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
          anchor={{ to: placement, gap: 8 }}
          transition
          className={`z-10 w-fit min-w-40 origin-top-right space-y-0.5 rounded-xl border border-white/10 bg-surface/40 p-1
          shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150
          outline-0 ring-1 ring-black/5
          transition ease-out
          data-closed:scale-95 data-closed:opacity-1 data-closed:-translate-y-1
          data-enter:duration-150 data-enter:ease-out
          data-leave:duration-100 data-leave:ease-in
          ${menuItemClassName}`}
        >
          {menuItemContent.map((item, index) => {
            return (
              <MenuItem key={index}>
                <button
                  onClick={item.onClick}
                  className={`group relative flex w-full items-center gap-x-2 rounded-lg px-4 py-2 text-start text-sm text-foreground
                  transition-colors duration-150
                  data-focus:outline-hidden
              ${
                !item.isHtmlElement
                  ? 'hover:bg-surface-hover hover:text-muted data-focus:bg-surface-hover data-focus:text-muted'
                  : 'cursor-default!'
              } ${item.className}`}
                >
                  {item.icon && (
                    <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                      {item.icon}
                    </span>
                  )}
                  {item.isHtmlElement ? (
                    <span className="w-full">{item.elementContent}</span>
                  ) : (
                    <>
                      {item.title && (
                        <span className="truncate">{t(item.title)}</span>
                      )}
                    </>
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
