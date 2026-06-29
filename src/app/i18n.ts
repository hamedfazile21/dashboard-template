import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/locales/en/common.json'
import faCommon from '@/locales/fa/common.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
    },
    fa: {
      common: faCommon,
    },
  },

  lng: 'en',
  fallbackLng: 'en',

  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
