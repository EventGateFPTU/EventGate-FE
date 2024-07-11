import type { PaginationValue, Response } from '@/types/results'
import axiosClient from './axios'
import type { BaseShow } from '@/types/items'

export function GetShowTicketTypes(showId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<
    Response<
      PaginationValue & {
        shows: BaseShow[]
      }
    >
  >(`/shows/${showId}/tickets`, {
    params: {
      pageNumber,
      pageSize
    }
  })
}

type CreateTicketTypeRequest = {
  showId: string[]
  name: string
  description: string
  price: number
  fromDate: Date
  endDate: Date
  amount: number
  leastAmountBuy: number
  mostAmountBuy: number
}

export function createTicketType(req: CreateTicketTypeRequest) {
  return axiosClient.post(`/ticket-types`, req)
}
