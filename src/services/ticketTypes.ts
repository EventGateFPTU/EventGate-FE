import type { BaseTicketType } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetTicketTypeById(ticketTypeId: string) {
  return axiosClient.get<Response<BaseTicketType>>(`/ticket-types/${ticketTypeId}`)
}
export function GetShowTicketTypes(showId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseTicketType>>>(`/shows/${showId}/tickets`, {
    params: {
      pageNumber,
      pageSize
    }
  })
}

type CreateTicketTypeRequest = {
  eventId: string
  showId: string[]
  name: string
  description: string
  price: number
  fromDate: Date
  toDate: Date
  amount: number
  leastAmountBuy: number
  mostAmountBuy: number
  imageUrl: string
}

export function CreateTicketType(req: CreateTicketTypeRequest) {
  return axiosClient.post<Response<BaseTicketType>>(`/ticket-types`, req)
}

type TicketTypeItem = {
  id: string
  ticketTypeName: string
  showId: string
  showName: string
  startsAt: Date
  endsAt: Date
  price: number
  amount: number
}
export function GetEventTicketTypes(eventId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<TicketTypeItem>>>(
    `/events/${eventId}/ticket-types`,
    { params: { pageNumber, pageSize } }
  )
}
