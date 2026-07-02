import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ThemeMode } from './theme-types'

interface ThemeState {
  mode: ThemeMode
  direction: 'ltr' | 'rtl'
}

const initialState: ThemeState = {
  mode: 'system',
  direction : 'ltr'
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
    
    changeDirection(state, action: PayloadAction<'ltr' | 'rtl'>) {
      state.direction = action.payload
    }
  },
})

export const { setTheme, toggleTheme, changeDirection } = themeSlice.actions

export default themeSlice.reducer
