import type { $Fetch, FetchOptions } from 'ofetch'

/**
 * Core $fetch factory. Every other API composable (useApiGet, useApiPost)
 * delegates to this. Configure cross-cutting concerns here:
 * base URL, default headers, auth injection, retries, error logging.
 */
export const useApi = (): { apiFetch: $Fetch } => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl as string,

    // Accept header only — do NOT set Content-Type here.
    // ofetch detects it automatically: FormData → multipart, object → json.
    headers: {
      Accept: 'application/json',
    },

    // Retry once on transient failures; skip retrying on client errors.
    retry: 1,
    retryDelay: 400,
    retryStatusCodes: [408, 429, 503, 504],

    async onRequest({ options }) {
      // ── Auth injection (uncomment when tokens are introduced) ────────────
      // const token = useCookie<string>('auth_token').value
      // if (token) {
      //   const h = (options.headers ?? {}) as Record<string, string>
      //   h['Authorization'] = `Bearer ${token}`
      //   options.headers = h
      // }
    },

    async onResponseError({ request, response }) {
      if (import.meta.dev) {
        console.error(
          `[API] ${response.status} ${String(request)}`,
          response._data,
        )
      }
    },
  } satisfies FetchOptions)

  return { apiFetch }
}
