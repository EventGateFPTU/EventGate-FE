import type { Response } from '@/types/results'
import axiosClient from './axios'

type CreateOrderRequest = {
  ticketTypeId: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateOfBirth: Date
}
export function CreateOrder(req: CreateOrderRequest) {
  return axiosClient.post<Response<{ id: string }>>('/orders', req)
}

export function ConfirmPaid(orderId: string) {
  return axiosClient.put<Response<unknown>>(`/orders/confirm-paid/${orderId}`)
}
