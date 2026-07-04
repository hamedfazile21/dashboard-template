import { ChevronFirst, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'
import { sidebar_data, type SidebarChild } from './data/sidebar-data'
import { useAppDispatch, useAppSelector } from '#/hooks/redux'
import { toggleSidebar } from '#/features/theme/slice/theme-slice'

const Sidebar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [openItem, setOpenItem] = useState<string | null>(null)
  const { sidebarStatus } = useAppSelector((state) => state.themeConfig)
  const toggleItem = (id: string) => {
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
    setOpenItem(null)
    if (sidebarStatus === 'collapsible-vertical') {
      dispatch(toggleSidebar('vertical'))
    } else {
      dispatch(toggleSidebar('collapsible-vertical'))
    }
  }

  const renderSubNavItem = (item: any) => {
    return (
      <div className="mt-1 flex flex-col gap-y-1">
        {item.children?.map((child: SidebarChild, index: number) => {
          const isChildActive = isRouteActive(child.href)

          return (
            <Link
              key={child.title}
              to={child.href}
              onClick={() => setOpenItem(null)}
              className={`relative flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                isChildActive
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              {!(index === item.children.length - 1) && (
                <span className="absolute -bottom-4 ltr:left-5.25 rtl:right-5.25 h-7 w-0.5 bg-gray-300/80 z-0" />
              )}
              <span className="z-10 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300/80 bg-white">
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
    const isParentActive =
      isRouteActive(item.href) ||
      (hasChildren &&
        item.children?.some((child: any) => isRouteActive(child.href)))

    return (
      <div key={item.id} data-sidebar-item-root={item.id} className="relative">
        <button
          type="button"
          onClick={() => hasChildren && toggleItem(item.id)}
          className={`group  relative flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-2.5 transition-all duration-300 ${
            sidebarStatus === 'collapsible-vertical'
              ? 'flex-col items-center justify-center gap-y-1 p-1 min-h-14.5 mb-1'
              : ''
          } ${
            hasChildren ? 'cursor-pointer hover:bg-gray-100' : 'cursor-default'
          } ${isParentActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:text-primary'}`}
        >
          <div
            className={`flex ${sidebarStatus === 'collapsible-vertical' ? 'flex-col items-center justify-center gap-y-1' : 'gap-x-2 items-center'} `}
          >
            <div
              className={`rounded-lg p-1.5 transition-all duration-300 ${isParentActive ? 'bg-primary/15 text-primary' : 'bg-gray-100 text-gray-600 group-hover:bg-primary/15 group-hover:text-primary'}`}
            >
              <Icon size={18} />
            </div>
            <span
              className={`font-medium ${sidebarStatus === 'collapsible-vertical' ? 'text-center text-[10px] leading-3' : 'text-system'}`}
            >
              {t(item.title)}
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
            data-sidebar-panel={item.id}
            className={`${sidebarStatus === 'collapsible-vertical' ? 'absolute top-1/2 z-50 ml-2 w-56 -translate-y-1/2 rounded-xl bg-white p-2 shadow-xl ltr:left-full rtl:right-full' : ''} transition-all duration-300 ease-in-out ${
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
      const clickedInsideItem = target.closest('[data-sidebar-item-root]')
      const clickedInsidePanel = target.closest('[data-sidebar-panel]')

      if (clickedInsideItem || clickedInsidePanel) {
        return
      }

      setOpenItem(null)
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [sidebarStatus, openItem])

  return (
    <div
      className={`relative h-screen overflow-visible transition-all duration-300 ${sidebarStatus === 'vertical' ? 'w-75' : 'w-20'} border-light ltr:border-r rtl:border-l`}
    >
      <div className="flex h-14 items-center justify-between border-b border-light px-3">
        <p className="font-medium text-gray-800">{t('Name')}</p>
        {sidebarStatus === 'vertical' && (
          <p className="text-gray-500">{t('Icon')}</p>
        )}
      </div>

      <div className="flex flex-col p-2 ">
        {sidebar_data.map((item) => {
          if (item.type === 'group') {
            return (
              <div key={item.id} className=" first:mt-0">
                {sidebarStatus === 'vertical' && (
                  <div
                    className={`mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-x-3`}
                  >
                    <div className={`w-fit`}>{t(item.title)}</div>
                    <div className="border border-dashed border-light w-full" />
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
          className="absolute bottom-3 ltr:right-3 rtl:left-3 rounded-full border border-light bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-primary"
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
