import type { BaseCategory, BaseEvent } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetEvents(pageNumber: number, pageSize: number, searchTerm?: string) {
  return axiosClient.get<Response<PaginationResponse<BaseEvent>>>('/events', {
    params: {
      pageNumber,
      pageSize,
      searchTerm
    }
  })
}

export function GetFeaturedEvents(pageNumber: number, pageSize: number, searchTerm?: string) {
  return axiosClient.get<Response<PaginationResponse<BaseEvent>>>('/events/featured', {
    params: {
      pageNumber,
      pageSize,
      searchTerm
    }
  })
}

export function SearchEvents(
  pageNumber: number,
  pageSize: number,
  categoryIds: string[],
  searchTerm?: string,
  location?: string,
  date?: Date
) {
  return axiosClient.post<Response<PaginationResponse<BaseEvent>>>('/events/search', {
    pageNumber,
    pageSize,
    searchTerm,
    location,
    date,
    categoryIds: categoryIds ?? []
  })
}

export type GetEventByIdResponse = BaseEvent & {
  categories: BaseCategory[]
  organizerImageUrl: string
  organizerDescription: string
}

export function GetEventById(eventId: string) {
  return axiosClient.get<Response<GetEventByIdResponse>>(`/events/${eventId}`, {})
}

type CreateEventRequest = {
  title: string
  description: string
  location: string
  categoryIds: string[]
}

export function CreateEvent(req: CreateEventRequest) {
  return axiosClient.post<Response<BaseEvent>>('/events', req)
}

type UpdateEventRequest = {
  title: string
  description: string
  location: string
  status: number
  categoryIds: string[]
}

export function UpdateEvent(eventId: string, req: UpdateEventRequest) {
  return axiosClient.put(`/events/${eventId}`, req)
}

export function UploadBackground(eventId: string, file: File) {
  return axiosClient.put(
    `/events/${eventId}/background`,
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export function UploadBanner(eventId: string, file: File) {
  return axiosClient.put(
    `/events/${eventId}/banner`,
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export function GetStaffEvents(pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseEvent>>>('/staff/events', {
    params: { pageNumber, pageSize }
  })
}
