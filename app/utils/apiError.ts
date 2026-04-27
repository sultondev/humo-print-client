import type { FetchError } from 'ofetch'
import type { ApiError } from '~/types/api'

/**
 * Normalizes any thrown value from $fetch into a typed ApiError.
 * Nuxt's $fetch wraps server responses in FetchError; the parsed body
 * lives on err.data — not on err itself.
 */
export const parseApiError = (err: unknown): ApiError => {
  const fetchErr = err as FetchError
  const body = fetchErr?.data

  if (body !== null && typeof body === 'object') {
    const b = body as Partial<ApiError>
    return {
      statusCode: b.statusCode ?? fetchErr.status ?? 500,
      message:    b.message    ?? 'Request failed',
      errors:     b.errors,
    }
  }

  return {
    statusCode: fetchErr?.status ?? 500,
    message:    fetchErr?.message ?? 'Network error',
  }
}

/**
 * Returns true when the error is a 422 with per-field validation messages.
 * Use this to map backend field errors back onto a form's error state.
 */
export const isValidationError = (err: ApiError): err is ApiError & { errors: Record<string, string[]> } =>
  err.statusCode === 422 && typeof err.errors === 'object' && err.errors !== null
