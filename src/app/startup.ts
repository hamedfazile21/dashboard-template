import {
  initializeSystemDir,
  initializeTheme,
  initializeThemePrimaryColor,
} from '@/features/theme/theme'

export async function startup() {
  // initializeTheme()

  initializeThemePrimaryColor()

  initializeSystemDir()
  

  // Future initialization
  // await restoreSession();
  // await fetchSettings();
  // await initializeAnalytics();
}
