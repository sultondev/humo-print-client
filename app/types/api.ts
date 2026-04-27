// ─── Environments ─────────────────────────────────────────────────────────────

export type AppEnv = 'development' | 'staging' | 'production'

// ─── Error shapes (mirrors the NestJS backend) ────────────────────────────────

export interface ApiError {
  statusCode: number
  message: string
  errors?: Record<string, string[]>   // present on 422 validation failures
}

// ─── Generic wrappers ─────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// ─── Domain: Orders ───────────────────────────────────────────────────────────

export type ProductType =
  | 'Business Card'
  | 'Catalogue'
  | 'Banner'
  | 'Flyer'
  | 'Sticker'
  | 'Mug / Souvenir'
  | 'Packaging'
  | 'Other'

export type OrderStatus = 'new' | 'in_progress' | 'done' | 'cancelled'

export interface OrderResponse {
  id: string
  name: string
  phone: string
  productType: ProductType
  quantity: number
  requiredDate: string | null
  note: string | null
  fileUrl: string | null
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface CreateOrderBody {
  name: string
  phone: string
  productType: ProductType
  quantity: number
  requiredDate?: string
  note?: string
}

// ─── Domain: Contacts ─────────────────────────────────────────────────────────

export interface ContactResponse {
  id: string
  name: string
  phone: string
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateContactBody {
  name: string
  phone: string
  message: string
}
