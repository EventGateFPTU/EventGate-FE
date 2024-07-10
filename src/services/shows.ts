import type { PaginationValue, Response } from '@/types/results'
import axiosClient from './axios'
import type { BaseShow } from '@/types/items'

export function GetEventShows(eventId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<
    Response<
      PaginationValue & {
        shows: BaseShow[]
      }
    >
  >(`/events/${eventId}/shows`, {
    params: {
      pageNumber,
      pageSize
    }
  })
}

type CreateShowRequest = {
  eventId: string
  startsAt: Date
  endsAt: Date
}

export function createShow(req: CreateShowRequest) {
  return axiosClient.post(`/shows`, req)
}