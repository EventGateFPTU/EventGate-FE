import type { BaseCategory } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

type CreateOrderRequest = {
  ticketTypeId: string
  currency: string
  phoneNumber: string
  dateOfBirth: Date
}
export function CreateOrder(req: CreateOrderRequest) {
  return axiosClient.post<Response<unknown>>('/categories', req)
}

export function CreateCategory(name: string) {
  return axiosClient.post<Response<BaseCategory>>('/categories', { name })
}
