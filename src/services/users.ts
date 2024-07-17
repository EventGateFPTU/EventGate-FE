import type { BaseTicketType, BaseUser } from '@/types/items'
import type { PaginationResponse, Response } from '@/types/results'
import axiosClient from './axios'

export function SearchUserByEmail(pageNumber: number, pageSize: number, searchTerm?: string) {
  return axiosClient.get<Response<PaginationResponse<BaseUser>>>(`/users/search`, {
    params: {
      pageNumber,
      pageSize,
      searchTerm
    }
  })
}
export function GetUserTickets(pageNumber: number, pageSize: number) {
  return axiosClient.get<Response<PaginationResponse<BaseTicketType>>>(`/users/tickets`, {
    params: {
      pageNumber,
      pageSize
    }
  })
}
