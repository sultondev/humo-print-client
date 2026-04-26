import type { UseFetchOptions } from 'nuxt/app'
import type { ApiError } from '~/types/api'

export interface UseApiGetReturn<T> {
  data:    Ref<T | null>
  pending: Ref<boolean>
  error:   ComputedRef<ApiError | null>
  refresh: () => Promise<void>
}

/**
 * SSR-compatible GET composable. Wraps Nuxt's useFetch with:
 * - Centralized base URL from runtimeConfig
 * - Typed ApiError (instead of raw FetchError)
 * - Reactive path support — re-fetches automatically when the path changes
 *
 * @example Static path
 * const { data, pending, error } = useApiGet<Service[]>('/api/services')
 *
 * @example Reactive path (re-fetches when id changes)
 * const id = ref('abc')
 * const { data } = useApiGet<Order>(() => `/api/orders/${id.value}`)
 *
 * @example With query params
 * const { data } = useApiGet<PaginatedResponse<Order>>('/api/orders', {
 *   query: { page: 1, limit: 20 },
 * })
 */
type ApiFetchOptions<T> = Omit<
  UseFetchOptions<any>,
  'method' | 'default' | 'getCachedData' | 'transform' | 'headers'
> & {
  headers?: Record<string, string>
  transform?: (input: any) => T
}

export function useApiGet<T>(
  path: string | Ref<string> | (() => string),
  options?: ApiFetchOptions<T>,
): UseApiGetReturn<T> {
  const config = useRuntimeConfig()

  const { ...rest } = options || {}

  const { data, pending, error, refresh } = useFetch<T>(path, {
    baseURL: config.public.apiUrl as string,

    ...rest,
    headers: {
      Accept: 'application/json',
      ...(options?.headers || {}),
    },

    transform: options?.transform as any,
  })

  const typedError = computed<ApiError | null>(() =>
    error.value ? parseApiError(error.value) : null,
  )

  return {
    data:    data as Ref<T | null>,
    pending: pending as Ref<boolean>,
    error:   typedError,
    refresh: refresh as () => Promise<void>,
  }
}
