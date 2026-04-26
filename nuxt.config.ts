// https://nuxt.com/docs/api/configuration/nuxt-config

// Fallback base URLs per environment.
// In CI/CD, inject NUXT_PUBLIC_API_URL — this overrides everything, no code changes needed.
const API_URLS: Record<string, string> = {
  development: 'http://localhost:3001',
  staging:     'https://api-staging.humoprint.uz',
  production:  'https://api.humoprint.uz',
}
const _env = process.env.NODE_ENV ?? 'development'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_API_URL env var wins; falls back to per-environment default above
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? API_URLS[_env] ?? API_URLS.development,
      appEnv: _env,
    },
  },

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
  devServer: {
    port: 3002,
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },
})
