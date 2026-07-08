import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SidebarStatusType, ThemeMode } from './theme-types'

interface ThemeState {
  themeMode: ThemeMode
  direction: 'ltr' | 'rtl'
  sidebarStatus: SidebarStatusType
}

const initialState: ThemeState = {
  themeMode: 'system',
  direction: 'ltr',
  sidebarStatus:
    (localStorage.getItem('sidebar-status') as SidebarStatusType) || 'vertical',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload
    },
    toggleTheme(state) {
      if (state.themeMode === 'light') {
        state.themeMode = 'dark'
      } else {
        state.themeMode = 'light'
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
