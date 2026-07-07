import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ThemeMode } from './theme-types'

type SidebarStatusType = 'vertical' | 'collapsible-vertical'
interface ThemeState {
  mode: ThemeMode
  direction: 'ltr' | 'rtl'
  sidebarStatus: SidebarStatusType
}

const initialState: ThemeState = {
  mode: 'system',
  direction: 'ltr',
  sidebarStatus:
    (localStorage.getItem('sidebar-status') as SidebarStatusType) || 'vertical',
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
    },

    toggleSidebar(
      state,
      action: PayloadAction<'vertical' | 'collapsible-vertical'>,
    ) {
      localStorage.setItem('sidebar-status', action.payload)
      state.sidebarStatus = action.payload
    },
  },
})

export const { setTheme, toggleTheme, changeDirection, toggleSidebar } =
  themeSlice.actions

export default themeSlice.reducer
