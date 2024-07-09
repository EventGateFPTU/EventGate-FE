import type { PaginationValue, Response } from '@/types/results'
import axiosClient from './axios'

export function GetCategories(pageNumber: number, pageSize: number, searchTerm?: string) {
  return axiosClient.get<
    Response<
      PaginationValue & {
        categories: BaseCategory[]
      }
    >
  >('/categories', {
    params: {
      pageNumber,
      pageSize,
      searchTerm
    }
  })
}

export function CreateCategory(name: string) {
  return axiosClient.post<Response<BaseCategory>>('/categories', { name })
}
