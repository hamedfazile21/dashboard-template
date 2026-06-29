import { createSlice } from '@reduxjs/toolkit'

interface DashboardState {
  counter: number
  token: string | null
}

const initialState: DashboardState = {
  counter: 1,
  token: null,
}

const dashboardState = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    add(state) {
      state.counter++
    },
    min(state) {
      state.counter--
    },
  },
})

export const { add , min } = dashboardState.actions

export default dashboardState.reducer
