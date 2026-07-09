import i18n from '#/app/i18n'
import type { Language } from './slice/theme-types'

export function initializeTheme() {
  const theme = localStorage.getItem('theme-mode') ?? 'system'

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.toggle('dark', isDark)
}

export function initializeThemePrimaryColor() {
  const primaryColor = localStorage.getItem('primary-color')

  document.documentElement.style.setProperty('--color-primary', primaryColor)
}

export function initializeSystemDir() {
  const dir = localStorage.getItem('dir') ?? 'ltr'

  if (dir === 'rtl') {
    document.dir = 'rtl'
  } else {
    document.dir = 'ltr'
  }
}

export function initializeSystemLanguage() {
  const language = localStorage.getItem('system-language') as Language

  if (language === 'english') {
    i18n.changeLanguage('en')
  }

  if (language === 'farsi') {
    i18n.changeLanguage('fa')
  }
}
