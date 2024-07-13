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

export type GetEventByIdResponse = BaseEvent & {
  categories: BaseCategory[]
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

type CreateOrganizerRequest = {
  organizationName: string
  description: string
  imageUrl: ''
}

export function CreateOrganizer(req: CreateOrganizerRequest) {
  return axiosClient.post<
    Response<{
      organizerId: string
    }>
  >(`/organizers`, req)
}

export function UploadOrganizerLogo(organizerId: string, file: File) {
  return axiosClient.put(
    `/organizers/${organizerId}/image`,
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
