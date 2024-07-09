import axiosClient from './axios'

type CreateEventRequest = {
  title: string
  description: string
  location: string
  categoryIds: string[]
}

export function CreateEvent(req: CreateEventRequest) {
  return axiosClient.post('/events', req)
}
