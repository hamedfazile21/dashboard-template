import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ThemeMode } from './theme-types'

interface ThemeState {
  mode: ThemeMode
}

const initialState: ThemeState = {
  mode: 'system',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
    },

    toggleTheme(state) {
      if (state.mode === 'light') {
        state.mode = 'dark'
      } else {
        state.mode = 'light'
      }
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions

export default themeSlice.reducer
