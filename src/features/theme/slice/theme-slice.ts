import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Language, SidebarStatusType, ThemeMode } from './theme-types'
import i18n from '#/app/i18n'

interface ThemeState {
  themeMode: ThemeMode
  direction: 'ltr' | 'rtl'
  sidebarStatus: SidebarStatusType
  language: Language
}

const initialState: ThemeState = {
  themeMode: (localStorage.getItem('theme-mode') as ThemeMode) || 'system',
  direction: 'ltr',
  sidebarStatus:
    (localStorage.getItem('sidebar-status') as SidebarStatusType) || 'vertical',
  language: (localStorage.getItem('system-language') as Language) || 'english',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload
    },
    toggleTheme(state, action: PayloadAction<ThemeMode>) {
      const theme = action.payload
      const html = document.documentElement

      html.classList.remove('dark')

      switch (theme) {
        case 'light':
          break

        case 'dark':
          html.classList.add('dark')
          break

        case 'system':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark')
          }
          break
      }

      localStorage.setItem('theme-mode', theme)
      state.themeMode = theme
    },

    changeDirection(state, action: PayloadAction<'ltr' | 'rtl'>) {
      const selectedDir = action.payload
      document.dir = selectedDir
      localStorage.setItem('dir', selectedDir)
      state.direction = selectedDir
    },

    changeLanguage(state, action: PayloadAction<Language>) {
      const selectedLanguage = action.payload
      localStorage.setItem('system-language', selectedLanguage)
      state.language = selectedLanguage
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

export const { setTheme, toggleTheme, changeDirection, toggleSidebar , changeLanguage } =
  themeSlice.actions

export default themeSlice.reducer
