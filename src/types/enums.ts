export enum ResultStatus {
  Ok = 0,
  Error = 1,
  Forbidden = 2,
  Unauthorized = 3,
  Invalid = 4,
  NotFound = 5,
  Conflict = 6,
  CriticalError = 7,
  Unavailable = 8
}

export enum EventStatus {
  Canceled = 0,
  Draft = 1,
  Published = 2,
  Completed = 3
}

export function eventStatusToNumber(status: EventStatus) {
  switch (status) {
    case EventStatus.Canceled:
      return 0
    case EventStatus.Draft:
      return 1
    case EventStatus.Published:
      return 2
    case EventStatus.Completed:
      return 3
  }
}
