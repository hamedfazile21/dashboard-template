import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

type menuItemContent = {
  title: string
  onClick: () => void
  className: string
}
interface props {
  menuButtonClassName?: string
  menuButtonContent: React.ReactNode
  menuItemClassName?: string
  menuItemContent: menuItemContent[]
}

const Dropdown: React.FC<props> = ({
  menuButtonClassName,
  menuButtonContent,
  menuItemClassName,
  menuItemContent,
}) => {
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton
          className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground inset-ring-1 inset-ring-white/5 outline-none ${menuButtonClassName}`}
        >
          {menuButtonContent}
        </MenuButton>

        <MenuItems
          transition
          className={`absolute right-0 shadow-lg z-10 mt-2 origin-top-right rounded-md bg-surface outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in p-1 ${menuItemClassName}`}
        >
          <div className="py-1">
            {menuItemContent.map((item, index) => {
              return (
                <MenuItem key={index}>
                  <button
                    onClick={item.onClick}
                    className={`block px-4 py-2 text-sm text-start text-foreground hover:text-muted hover:bg-surface-hover data-focus:outline-hidden rounded-lg w-full ${item.className}`}
                  >
                    {item.title}
                  </button>
                </MenuItem>
              )
            })}
          </div>
        </MenuItems>
      </Menu>
    </>
  )
}

export default Dropdown
