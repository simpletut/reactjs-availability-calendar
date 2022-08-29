export type BookingType = {
  from: string
  to: string
  middayCheckout?: boolean
}

export type blockedDaysType = string[]

export type ShowMonths = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ICalendarPropTypes {
  bookings?: BookingType[]
  showNumberOfMonths?: ShowMonths
  showKey?: boolean
  showCurrentYear?: boolean
  showControls?: boolean
}

export interface IHandleBookings {
  bookings: BookingType[]
  year: number
}

export interface IFormatBookingsData {
  bookings: BookingType[]
  year: number
}

export interface IGetAllBookedDays {
  dates: BookingType[]
}

export interface IGetAllHalfDays {
  dates: BookingType[]
}

export interface IGetDatesInRange {
  startDate: string
  endDate: string
}

export interface IControls {
  prevYear: () => void
  initCal: () => void
  nextYear: () => void
}

export enum Days {
  Monday = 'M',
  Tusday = 'T',
  Wednesday = 'W',
  Thursday = 'T',
  Friday = 'F',
  Saturday = 'S',
  Sunday = 'S',
}

export type DaysOfWeekType = Days[]

export enum DayOffset {
  Monday = '6',
  Tusday = '5',
  Wednesday = '4',
  Thursday = '3',
  Friday = '2',
  Saturday = '1',
  Sunday = '0',
}

export type DaysOfWeekOffsetType = DayOffset[]

export interface IYear {
  showNumberOfMonths?: ShowMonths
  bookedDates: blockedDaysType
  lateCheckouts: blockedDaysType
  currentYear: number
}
