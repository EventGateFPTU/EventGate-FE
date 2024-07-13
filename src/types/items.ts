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
}

export interface BaseStaff {
  id: string
  fullName: string
  email: string
}
