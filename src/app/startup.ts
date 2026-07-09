import {
  initializeSystemDir,
  initializeSystemLanguage,
  initializeTheme,
  initializeThemePrimaryColor,
} from '@/features/theme/theme'

export async function startup() {
  initializeTheme()

  initializeThemePrimaryColor()

  initializeSystemDir()

  initializeSystemLanguage()

  // Future initialization
  // await restoreSession();
  // await fetchSettings();
  // await initializeAnalytics();
}
