import Dropdown from '../drop-down'
import { Globe, LaptopMinimal, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDirection,
  changeLanguage,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import type { ThemeMode } from '#/features/theme/slice/theme-types'
import { AfghanistanFlag, EnglishFlag } from '../../../public/assets'
import i18n from '#/app/i18n'

const Header = () => {
  const dispatch = useAppDispatch()
  const {
    themeConfig: { themeMode, direction },
  } = useAppSelector((state) => state)
  const { t } = useTranslation()
  const handelChangeTheme = (theme: ThemeMode) => {
    dispatch(toggleTheme(theme))
  }
  const handelChangeLanguage = (language: string) => {
    if (language === 'fa') {
      dispatch(changeDirection('rtl'))
      dispatch(changeLanguage('farsi'))
      i18n.changeLanguage('fa')
    } else {
      dispatch(changeDirection('ltr'))
      dispatch(changeLanguage('english'))
      i18n.changeLanguage('en')
    }
  }
  return (
    <div className="w-full border-b border-borderColor h-14 flex items-center justify-between px-5">
      <div>
        <p>Header</p>
      </div>
      <div className="flex items-center gap-x-3">
        <Dropdown
          menuButtonClassName="!rounded-full w-fit !p-1 bg-surface border border-borderColor"
          menuButtonContent={
            <button className="flex items-center gap-x-2 ">
              <span className="rounded-full bg-surface-hover size-6.75 flex items-center justify-center ">
                {themeMode === 'light' ? (
                  <Sun size={18} />
                ) : themeMode === 'dark' ? (
                  <Moon size={18} />
                ) : (
                  <LaptopMinimal size={18} />
                )}
              </span>
              <span className="text-sm ltr:pr-1 rtl:pl-1">
                {themeMode.slice(0, 1).toUpperCase() + themeMode.slice(1)}
              </span>
            </button>
          }
          menuItemContent={[
            {
              className: `${themeMode === 'light' && '!bg-surface-hover'}`,
              onClick: () => handelChangeTheme('light'),
              title: 'Light',
              icon: <Sun size={18} />,
            },
            {
              className: `${themeMode === 'dark' && '!bg-surface-hover'}`,
              onClick: () => handelChangeTheme('dark'),
              title: 'Dark',
              icon: <Moon size={18} />,
            },
            {
              className: `${themeMode === 'system' && '!bg-surface-hover'}`,
              onClick: () => handelChangeTheme('system'),
              title: 'System',
              icon: <LaptopMinimal size={18} />,
            },
          ]}
        />
        <Dropdown
          menuButtonClassName="!rounded-full w-fit !p-2 bg-surface border border-borderColor"
          menuItemClassName="!w-[150px]"
          menuButtonContent={
            <div className="flex items-center text-foreground">
              <Globe size={18} />
            </div>
          }
          menuItemContent={[
            {
              className: `${direction === 'ltr' && '!bg-surface-hover'}`,
              onClick: () => handelChangeLanguage('en'),
              title: 'English',
              icon: <img src={EnglishFlag} />,
            },
            {
              className: `${direction === 'rtl' && '!bg-surface-hover'}`,
              onClick: () => handelChangeLanguage('fa'),
              title: 'Farsi',
              icon: <img src={AfghanistanFlag} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Header
