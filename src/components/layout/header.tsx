import Dropdown from '../drop-down'
import {
  CircleUser,
  Globe,
  LaptopMinimal,
  LogOut,
  Mail,
  Moon,
  Settings,
  Sun,
  User,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import {
  changeDirection,
  changeLanguage,
  toggleTheme,
} from '#/features/theme/slice/theme-slice'
import type { ThemeMode } from '#/features/theme/slice/theme-types'
import { AfghanistanFlag, EnglishFlag, UserPNG } from '../../../public/assets'
import i18n from '#/app/i18n'
import { useNavigate } from '@tanstack/react-router'
const Header = () => {
  const navigate = useNavigate()
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
        <button
          className="btn btn-secondary btn-rounded-full"
          onClick={() => navigate({ to: '.' })}
        >
          <Settings size={18} />
        </button>

        <Dropdown
          menuButtonClassName="!p-1"
          menuButtonContent={
            <button className="flex items-center gap-x-2 ">
              <span className="rounded-full bg-surface-hover size-6.75 flex items-center justify-center  ">
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
        <Dropdown
          menuItemClassName="!w-[250px]"
          menuButtonContent={
            <div className="flex items-center text-foreground">
              <User strokeWidth={2} size={18} />
            </div>
          }
          menuItemContent={[
            {
              className: `!px-1`,
              onClick: () => {},
              title: null,
              icon: null,
              isHtmlElement: true,
              elementContent: (
                <div className="w-full flex items-center gap-x-3 border-b border-borderColor pb-2 ">
                  <div>
                    <img src={UserPNG} className="size-10 rounded-full" />
                  </div>
                  <div className="flex flex-col justify-start">
                    <p className="font-medium text-foreground text-md">
                      Hamed Fazeli
                    </p>
                    <p className="text-muted text-sm hover:text-blue-500 cursor-pointer hover:underline">
                      hamed@gmail.com
                    </p>
                  </div>
                </div>
              ),
            },
            {
              className: ``,
              onClick: () => {},
              title: 'Profile',
              icon: <UserRound size={18} />,
            },
            {
              className: ``,
              onClick: () => {},
              title: 'Inbox',
              icon: <Mail size={18} />,
            },
            {
              className: `text-red-500`,
              onClick: () => {},
              title: 'Logout',
              icon: <LogOut size={18} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Header
