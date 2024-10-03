import type { EventCategory } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function GetCategories(pageNumber: number, pageSize: number, searchTerm?: string) {
  return axiosClient.get<Response<PaginationResponse<EventCategory>>>('/categories', {
    params: {
      pageNumber,
      pageSize,
      searchTerm
    }
  })
}

export function CreateCategory(name: string) {
  return axiosClient.post<Response<EventCategory>>('/categories', { name })
}
