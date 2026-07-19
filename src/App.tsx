import { useEffect, useState } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { startup } from './app/startup'
import { SplashScreen } from './components/splash-screen'
import Toaster from './components/toast'

export function App() {
  const [ready, setReady] = useState(false)
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
        position={"bottom-right"}
      />
      <RouterProvider router={getRouter()} />
    </>
  )
}
