import type { ApiError } from '~/types/api'
import { useApi } from '~/composables/useApi'

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface UseApiMutateReturn<TData, TBody> {
  data:    Ref<TData | null>
  pending: Ref<boolean>
  error:   Ref<ApiError | null>
  execute: (body?: TBody) => Promise<TData>
  reset:   () => void
}

/**
 * Imperative mutation composable — does NOT run on mount.
 * Call execute() explicitly (e.g. inside a form submit handler).
 *
 * Works with both JSON bodies and FormData. ofetch detects the type
 * automatically, so you never need to set Content-Type manually.
 *
 * Throws a typed ApiError on failure so the caller can react to it
 * (e.g. map 422 field errors back onto the form).
 *
 * @example JSON POST
 * const { execute, pending, error } = useApiPost<ContactResponse, CreateContactBody>('/api/contacts')
 * await execute({ name: 'John', phone: '+998901234567', message: 'Hello' })
 *
 * @example FormData POST (file upload)
 * const { execute, pending } = useApiPost<OrderResponse>('/api/orders')
 * const fd = new FormData()
 * fd.append('name', 'John')
 * fd.append('productType', 'Banner')
 * fd.append('quantity', '100')
 * fd.append('file', fileInput.files[0])
 * await execute(fd)
 *
 * @example PATCH
 * const { execute } = useApiPost<OrderResponse, { status: string }>(
 *   `/api/orders/${id}/status`, 'PATCH'
 * )
 * await execute({ status: 'done' })
 */
export function useApiPost<TData, TBody = unknown>(
  path: string,
  method: HttpMethod = 'POST',
): UseApiMutateReturn<TData, TBody> {
  const { apiFetch } = useApi()

  const data    = ref<TData | null>(null) as Ref<TData | null>
  const pending = ref(false)
  const error   = ref<ApiError | null>(null)

  const execute = async (body?: TBody): Promise<TData> => {
    pending.value = true
    error.value   = null

    try {
      const result = await apiFetch<TData>(path, {
        method,
        body: body as BodyInit | undefined,
      })
      data.value = result
      return result
    } catch (err) {
      const parsed = parseApiError(err)
      error.value  = parsed
      throw parsed    // re-throw so the caller can also react (e.g. map field errors)
    } finally {
      pending.value = false
    }
  }

  const reset = () => {
    data.value    = null
    error.value   = null
    pending.value = false
  }

  return { data, pending, error, execute, reset }
}
