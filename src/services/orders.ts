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
  return axiosClient.post<
    Response<{
      bin: string
      accountNumber: string
      amount: number
      description: string
      orderCode: number
      currency: string
      paymentLinkId: string
      status: string
      expiredAt: Date | null
      checkoutUrl: string
      qrCode: string
    }>
  >('/orders', req)
}

export function ConfirmPaid(orderId: string) {
  return axiosClient.put<Response<unknown>>(`/orders/confirm-paid/${orderId}`)
}
