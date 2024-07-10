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
}

export interface BaseShow {
  id: string
  startsAt: Date
  endsAt: Date
}
