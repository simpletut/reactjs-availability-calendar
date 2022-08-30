export type BookingType = {
  from: string | Date
  to: string | Date
  middayCheckout?: boolean
}

export type blockedDaysType = string[]

export type ShowMonths = 12 | 4 | 2

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
  startDate: string | Date
  endDate: string | Date
}

export interface IControls {
  prev: () => void
  initCal: () => void
  next: () => void
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
  monthsFrom: number
}
