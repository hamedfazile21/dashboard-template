import { ChevronFirst, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'
import { sidebar_data, type SidebarChild } from './data/sidebar-data'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { toggleSidebar } from '#/features/theme/slice/theme-slice'
import Tooltip from '../tooltip'

const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const [openItem, setOpenItem] = useState<string | null>(null)
  const { sidebarStatus } = useAppSelector((state) => state.themeConfig)
  const [submenuActiveTab, setSubmenuActiveTab] = useState<string>('')

  const getTruncatedTitle = (title: string) => {
    const limit = sidebarStatus === 'collapsible-vertical' ? 9 : 20
    return title.length > limit ? `${title.slice(0, limit)}...` : title
  }

  const toggleItem = (id: string) => {
    if (sidebarStatus === 'collapsible-vertical') {
      setSubmenuActiveTab(id)
    }
    setOpenItem((current) => (current === id ? null : id))
  }

  const isRouteActive = (href?: string) => {
    if (!href) return false

    const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '')
    const normalizedPath =
      location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')

    if (normalizedHref === '/') {
      return normalizedPath === '/'
    }

    return (
      normalizedPath === normalizedHref ||
      normalizedPath.startsWith(`${normalizedHref}/`)
    )
  }

  const handedToggleSidebar = () => {
    setSubmenuActiveTab('')
    if (sidebarStatus === 'collapsible-vertical') {
      dispatch(toggleSidebar('vertical'))
    } else {
      dispatch(toggleSidebar('collapsible-vertical'))
    }
  }

  const renderSubNavItem = (item: any) => {
    const titleMessage = getTruncatedTitle(item.title)
    return (
      <div className="mt-1 flex flex-col gap-y-1">
        {sidebarStatus === 'collapsible-vertical' && (
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground flex items-center gap-x-3">
            {titleMessage !== item.title ? (
              <Tooltip placement="right" content={item.title}>
                {<button className="uppercase">{titleMessage}</button>}
              </Tooltip>
            ) : (
              <span>{titleMessage}</span>
            )}
          </p>
        )}
        {item.children?.map((child: SidebarChild, index: number) => {
          const isChildActive = isRouteActive(child.href)

          return (
            <Link
              key={index}
              to={child.href}
              onClick={() => setOpenItem(null)}
              className={`relative flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                isChildActive
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted hover:bg-surface hover:text-primary'
              }`}
            >
              <span className="z-10 flex h-5 w-5 items-center justify-center rounded-full border border-borderColor bg-background">
                <span
                  className={`h-2.5 w-2.5 rotate-45 rounded-sm ${isChildActive ? 'bg-primary/70' : 'bg-gray-300/80'}`}
                />
              </span>
              <span>{t(child.title)}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  const renderNavItem = (item: any) => {
    const Icon = item.icon
    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    const isOpen = openItem === item.id
    const titleLabel = getTruncatedTitle(t(item.title))
    const isParentActive =
      isRouteActive(item.href) ||
      (hasChildren &&
        item.children?.some((child: any) => isRouteActive(child.href)))

    return (
      <div key={item.id} className="relative">
        <button
          type="button"
          onClick={() => hasChildren && toggleItem(item.id)}
          className={`group  relative flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-1.75 transition-all duration-300 ${
            sidebarStatus === 'collapsible-vertical'
              ? 'flex-col items-center justify-center gap-y-1 p-1 min-h-14.5 mb-1'
              : ''
          } ${
            hasChildren ? 'cursor-pointer hover:bg-surface' : 'cursor-default'
          } ${isParentActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
        >
          <div
            className={`flex ${sidebarStatus === 'collapsible-vertical' ? 'flex-col items-center justify-center gap-y-1' : 'gap-x-2 items-center'} `}
          >
            <div
              className={`rounded-lg p-1.5 transition-all duration-300 ${isParentActive ? 'bg-primary/15 text-primary' : 'bg-surface text-foreground group-hover:bg-primary/15 group-hover:text-primary'}`}
            >
              <Icon size={18} />
            </div>
            <span
              className={`max-w-full truncate font-medium text-foreground ${sidebarStatus === 'collapsible-vertical' ? 'text-center text-[10px] leading-3' : ''}`}
            >
              {titleLabel}
            </span>
          </div>

          {hasChildren ? (
            <ChevronRight
              size={18}
              className={`transition-transform duration-300 ${sidebarStatus === 'collapsible-vertical' ? 'hidden' : ''} ${isOpen ? 'rotate-90' : 'ltr:rotate-0 rtl:rotate-180'}`}
            />
          ) : null}
        </button>

        {hasChildren ? (
          <div
            className={`${sidebarStatus === 'collapsible-vertical' ? 'hidden' : ''} transition-all duration-300 ease-in-out ${
              sidebarStatus === 'collapsible-vertical'
                ? isOpen
                  ? 'pointer-events-auto visible opacity-100'
                  : 'pointer-events-none invisible opacity-0'
                : isOpen
                  ? 'mt-1 max-h-40 opacity-100'
                  : 'max-h-0 opacity-0'
            }`}
          >
            {renderSubNavItem(item)}
          </div>
        ) : null}
        {submenuActiveTab === item.id && (
          <div className="absolute bg-background p-2 ltr:left-18 top-0 w-55 rounded-lg shadow-lg border border-borderColor ">
            {renderSubNavItem(item)}
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    if (sidebarStatus === 'collapsible-vertical') {
      setOpenItem(null)
      return
    }

    const allItems = sidebar_data.flatMap((item: any) =>
      item.type === 'group' ? (item.children ?? []) : [item],
    )

    const activeParent = allItems.find((item: any) => {
      if (item.href && isRouteActive(item.href)) {
        return true
      }

      return item.children?.some((child: any) => isRouteActive(child.href))
    })

    if (activeParent?.id) {
      setOpenItem(activeParent.id)
    }
  }, [location.pathname, sidebarStatus])

  useEffect(() => {
    if (sidebarStatus !== 'collapsible-vertical') return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (sidebarRef.current?.contains(target)) {
        return
      }

      setOpenItem(null)
      setSubmenuActiveTab('')
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [sidebarStatus])

  return (
    <div
      ref={sidebarRef}
      className={`relative h-screen overflow-visible transition-all duration-300  ${sidebarStatus === 'vertical' ? 'w-75' : 'w-20'}  ltr:border-r rtl:border-l border-borderColor`}
    >
      <div className="flex h-14 items-center justify-between border-b border-borderColor  px-3">
        <p className="font-medium text-foreground">{t('Name')}</p>
        {sidebarStatus === 'vertical' && (
          <p className="text-foreground">{t('Icon')}</p>
        )}
      </div>

      <div className="flex flex-col p-2 ">
        {sidebar_data.map((item, index) => {
          if (item.type === 'group') {
            return (
              <div key={index} className=" first:mt-0">
                {sidebarStatus === 'vertical' && (
                  <div
                    className={`mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-x-3`}
                  >
                    <div className={`w-fit`}>{t(item.title)}</div>
                    {/* <div className="border border-dashed  w-full" /> */}
                  </div>
                )}
                <div className="flex flex-col">
                  {item.children?.map((child: any) => renderNavItem(child))}
                </div>
              </div>
            )
          }

          return renderNavItem(item)
        })}
      </div>
      <div>
        <button
          onClick={handedToggleSidebar}
          className="absolute bottom-3 ltr:right-3 rtl:left-3 rounded-full border border-borderColor p-2 text-foreground shadow-sm transition bg-background hover:bg-surface-hover hover:text-primary"
        >
          <ChevronFirst
            className={`transition-transform duration-300 ${sidebarStatus === 'collapsible-vertical' ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
