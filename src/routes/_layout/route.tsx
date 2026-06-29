import Header from '#/components/layout/header'
import Sidebar from '#/components/layout/sidebar'
import Setting from '#/components/setting'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: AppLayoutComponent,
})

function AppLayoutComponent() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-6">
            <Setting />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
