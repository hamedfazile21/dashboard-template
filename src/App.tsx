import { useEffect, useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { startup } from './app/startup'
import { SplashScreen } from './components/splash-screen'
import Toaster from './components/toast'
import { useAppSelector } from './hooks/redux'

export function App() {
  const [ready, setReady] = useState(false)
  const { direction } = useAppSelector((state) => state.themeConfig)
  useEffect(() => {
    async function initialize() {
      await startup()
      setReady(true)
    }

    initialize()
  }, [])

  if (!ready) {
    return <SplashScreen />
  }

  return (
    <>
      <Toaster
        position={direction === 'ltr' ? 'bottom-right' : 'bottom-left'}
      />
      <RouterProvider router={getRouter()} />
    </>
  )
}
