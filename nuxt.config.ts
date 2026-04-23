// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  i18n: {
    compilation: {
      strictMessage: false,
    },
    locales: [
      { code: 'uz', name: "O'zbekcha", language: 'uz-UZ', file: 'uz.json' },
      { code: 'ru', name: 'Русский', language: 'ru-RU', file: 'ru.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'uz',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },
})
