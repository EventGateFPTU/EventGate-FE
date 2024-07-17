import dayjs from 'dayjs'

export function getHeader(startsAt: Date, endsAt: Date) {
  const startString = dayjs(startsAt).format('HH:mm, DD [tháng] MM, YYYY')
  const endString = dayjs(endsAt).format('HH:mm, DD [tháng] MM, YYYY')

  return `${startString} - ${endString}`
}
