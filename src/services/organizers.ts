import type { BaseEvent, BaseOrganizer } from '@/types/items'
import type { Response } from '@/types/results'
import axiosClient from './axios'

type CreateOrUpdateOrganizerRequest = {
  organizationName: string
  description: string
}

export function CreateOrganizer(req: CreateOrUpdateOrganizerRequest) {
  return axiosClient.post<
    Response<{
      organizerId: string
    }>
  >(`/organizers`, req)
}

export function UpdateOrganizer(organizerId: string, req: CreateOrUpdateOrganizerRequest) {
  return axiosClient.put<Response<BaseOrganizer>>(`/organizers/${organizerId}`, req)
}

export function UploadOrganizerLogo(organizerId: string, file: File) {
  return axiosClient.put(
    `/organizers/${organizerId}/image`,
    { file },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
}

export function GetOrganizerEvents() {
  return axiosClient.get<Response<BaseEvent[]>>(`/organizers/events`)
}

export function GetCurrentOrganization() {
  return axiosClient.get<Response<BaseOrganizer>>(`/organizers/organization`)
}
