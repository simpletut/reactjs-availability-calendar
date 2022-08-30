import dayjs from 'dayjs'
import {
  BookingType,
  blockedDaysType,
  IHandleBookings,
  IFormatBookingsData,
  IGetAllBookedDays,
  IGetAllHalfDays,
  IGetDatesInRange,
  IGetMonthName,
  DaysOfWeekType,
  Days,
  DaysOfWeekOffsetType,
  DayOffset,
} from './../types'

const dateFormat = 'M-D-YYYY'

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

export const getMonthName = (month: number): string => {
  const months: IGetMonthName = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  return months[month]
}

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
      from: dayjs(from).format(dateFormat),
      to: dayjs(to).format(dateFormat),
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

  while (!_startDate.isAfter(_endDate)) {
    dates.push(_startDate.format(dateFormat))

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
    if (middayCheckout && typeof to === 'string') {
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
