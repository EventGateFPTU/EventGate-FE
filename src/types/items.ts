import type { EventStatus } from './enums'

export interface EventCategory {
  id: string
  name: string
}

export interface Event {
  image: string
  title: string
  description: string
}

export interface BaseEvent {
  id: string
  title: string
  description: string
  location: string
  categories: EventCategory[] 
  status: EventStatus
  organizerName: string
  organizerImageUrl: string
  organizerDescription: string
  backgroundImageUrl: string
  bannerImageUrl: string
  additionalImages: string[] 
  fromPrice: number
  createdAt: string 
}

// Response structure
export interface GetAllEventsResponse {
  value: {
    data: Event[]
    pageNumber: number
    pageSize: number
    count: number
  }
  status: number
  isSuccess: boolean
  successMessage: string
  correlationId?: string
  errors: string[]
  validationErrors: string[]
}

export interface BaseShow {
  id: string
  startsAt: Date
  endsAt: Date
}

export interface BaseTicketType {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  fromDate: Date
  toDate: Date
  amount: number
}

export interface BaseStaff {
  id: string
  fullName: string
  email: string
}

export interface BaseOrganizer {
  id: string
  organizationName: string
  description: string
  imageUrl: string
}

export interface BaseUser {
  id: string
  email: string
  name: string
}
