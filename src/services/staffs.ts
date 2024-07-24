import type { BaseStaff } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetEventStaffs(eventId: string, pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseStaff & { userId: string }>>>(
    `/events/${eventId}/staffs`,
    {
      params: {
        pageNumber,
        pageSize
      }
    }
  )
}

export function GetShowStaffs(showId: string) {
  return axiosClient.get<
    Response<{
      value: (BaseStaff & { userId: string })[]
    }>
  >(`/shows/${showId}/staffs`)
}

export function AssignStaff(userId: string, showId: string) {
  return axiosClient.post('/staff/assign', {
    userId,
    showId
  })
}

export function UnassignStaff(userId: string, showId: string) {
  return axiosClient.post('/staff/unassign', { userId, showId })
}

export function AddStaff(eventId: string, userId: string) {
  return axiosClient.post<Response<null>>(`/events/${eventId}/staff/${userId}`)
}

export type AttendeeInfo = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  dateOfBirth: Date
  ticketId: string
  canCheckin: boolean
}
export function GetCheckinInfo(showId: string, code: string) {
  return axiosClient.post<Response<AttendeeInfo>>('/staff/checkin-info', { showId, code })
}

export function Checkin(showId: string, ticketId: string, usedInFormat: string) {
  return axiosClient.put<Response<AttendeeInfo>>('/staff/checkin', {
    showId,
    ticketId,
    usedInFormat
  })
}
