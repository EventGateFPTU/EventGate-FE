import type { EventStatus } from './enums'

export interface BaseCategory {
  id: string
  name: string
}

export interface BaseEvent {
  id: string
  title: string
  description: string
  location: string
  organizerName: string
  backgroundImageUrl: string
  bannerImageUrl: string
  status: EventStatus
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
