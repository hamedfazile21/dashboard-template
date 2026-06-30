import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from '#/features/dashboard/slice/dashboard-slice'
import themeSlice from '../features/theme/slice/theme-slice'

export const store = configureStore({
  reducer: {
    themeConfig: themeSlice,
    dashboard: dashboardSlice,
  },
})

// Infer the types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
