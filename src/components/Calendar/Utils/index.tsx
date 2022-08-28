import dayjs from 'dayjs'
import {
  BookingType,
  blockedDaysType,
  IHandleBookings,
  IFormatBookingsData,
  IGetAllBookedDays,
  IGetAllHalfDays,
  IGetDatesInRange,
  DaysOfWeekType,
  Days,
  DaysOfWeekOffsetType,
  DayOffset,
} from './../types'

export const formatBookingsData = ({ bookings, year }: IFormatBookingsData): BookingType[] => {
  if (!Array.isArray(bookings) || bookings.length < 1) return []

  const arr: BookingType[] = []

  bookings.forEach((booking) => {
    const from = booking?.from
    const to = booking?.to
    const middayCheckout = booking?.middayCheckout

    const validStartDate = dayjs(from).year() === Number(year)
    const validEndDate = dayjs(to).year() === Number(year)

    if (!validStartDate && !validEndDate) return null

    const nxtBooking: BookingType = {
      from,
      to,
      middayCheckout,
    }

    arr.push(nxtBooking)
  })

  return arr
}

export const getDatesInRange = ({ startDate, endDate }: IGetDatesInRange): blockedDaysType => {
  let _startDate = dayjs(startDate)
  const _endDate = dayjs(endDate)

  const dates: blockedDaysType = []

  while (!_startDate.isAfter(dayjs(_endDate))) {
    dates.push(_startDate.format('YYYY-M-D'))

    _startDate = _startDate.add(1, 'day')
  }

  return dates
}

export const getAllBookedDays = ({ dates }: IGetAllBookedDays): blockedDaysType => {
  if (!Array.isArray(dates) || dates.length < 1) return []

  const arr: blockedDaysType = []

  dates.forEach(({ to, from }) => {
    const nxt = getDatesInRange({ startDate: from, endDate: to })

    nxt.forEach((_date) => {
      arr.push(_date)
    })
  })

  return arr
}

export const getAllHalfDays = ({ dates }: IGetAllHalfDays): blockedDaysType => {
  if (!Array.isArray(dates) || dates.length < 1) return []

  const arr: blockedDaysType = []

  dates.forEach(({ to, middayCheckout }) => {
    if (middayCheckout) {
      arr.push(to)
    }
  })

  return arr
}

export const handleBookings = ({
  bookings,
  year,
}: IHandleBookings): { halfDays: blockedDaysType; bookedDays: blockedDaysType } => {
  const dates = formatBookingsData({ bookings, year })
  const bookedDays = getAllBookedDays({ dates })
  const halfDays = getAllHalfDays({ dates })

  return { halfDays, bookedDays }
}

export const daysOfTheWeek: DaysOfWeekType = [
  Days.Monday,
  Days.Tusday,
  Days.Wednesday,
  Days.Thursday,
  Days.Friday,
  Days.Saturday,
  Days.Sunday,
]

export const daysOfTheWeekOffset: DaysOfWeekOffsetType = [
  DayOffset.Monday,
  DayOffset.Tusday,
  DayOffset.Wednesday,
  DayOffset.Thursday,
  DayOffset.Friday,
  DayOffset.Saturday,
  DayOffset.Sunday,
]
