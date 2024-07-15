import type { BaseStaff } from '@/types/items'
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

export function AssignStaff(userId: string, showId: string) {
  return axiosClient.post('/staff/assign', {
    userId,
    showId
  })
}
