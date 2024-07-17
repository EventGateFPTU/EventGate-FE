import type { BaseShow } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetEventShows(eventId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseShow>>>(`/events/${eventId}/shows`, {
    params: {
      pageNumber,
      pageSize
    }
  })
}

type CreateShowRequest = {
  eventId: string
  title: string
  startsAt: Date
  endsAt: Date
  ticketTypeIds: string[]
}

export function CreateShow(req: CreateShowRequest) {
  return axiosClient.post(`/shows`, req)
}

export function DeleteShow(showId: string) {
  return axiosClient.delete(`/shows/${showId}`)
}
