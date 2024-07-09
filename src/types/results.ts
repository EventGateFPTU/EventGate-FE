import type { ResultStatus } from './enums'

export type Response<T> = {
  value: T
  status: ResultStatus
  isSuccess: boolean
  successMessage: string
  correlationId: string
  errors: string[]
  validationErrors: unknown[]
}

export type ErrorResponse = {
  title: string
  status: number
  detail: string
}

export type PaginationValue = {
  pageNumber: number
  pageSize: number
}
