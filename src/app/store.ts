import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from '#/features/dashboard/slice/dashboard-slice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
})

// Infer the types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
