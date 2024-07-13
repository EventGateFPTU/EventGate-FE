import type { EventStatus } from '@/types/enums'
import type { BaseCategory, BaseEvent, BaseStaff } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetEventStaffs(eventId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseStaff>>>(`/events/${eventId}/staffs`, {
    params: {
      pageNumber,
      pageSize
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

type UpdateEventRequest = {
  title: string
  description: string
  location: string
  status: EventStatus
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
