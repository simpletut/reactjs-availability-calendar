import React, { useEffect, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { handleBookings } from './Utils'
import Controls from './Controls'
import Year from './Year'
import Key from './Key'
import { ICalendarPropTypes, IControls, blockedDaysType, IYear } from './types'

dayjs.extend(isBetween)

const Calendar = ({
  bookings = [],
  showNumberOfMonths = 12,
  showKey = true,
  showCurrentYear = true,
  showControls = true,
}: ICalendarPropTypes): JSX.Element => {
  const initialMonth = 1
  const initialPage = 1
  const totalCalendarMonths = 12
  const _year = dayjs().year()
  const [activeYear, setActiveYear] = useState(_year)
  const [bookedDates, setBookedDates] = useState<blockedDaysType>([])
  const [lateCheckouts, setLateCheckouts] = useState<blockedDaysType>([])
  const [monthsFrom, setMonthsFrom] = useState(initialMonth)
  const [page, setPage] = useState(initialPage)

  const totalPages = totalCalendarMonths / showNumberOfMonths

  const resetCalendarYear = () => {
    setMonthsFrom(initialMonth)
    setPage(initialPage)
  }

  const initCal = useCallback(() => {
    const now = dayjs();
    const _year = now.year()
    setActiveYear(_year)
  }, [])

  const prev = useCallback(() => {
    const isFirstPage = page === 1

    if (isFirstPage) {
      const _previousYear = dayjs(`${activeYear}`).subtract(1, 'year').year()
      setActiveYear(_previousYear)

      if (showNumberOfMonths === totalCalendarMonths) {
        resetCalendarYear()
        return
      }

      const nxtStartingMonth = totalCalendarMonths - showNumberOfMonths + 1
      const nxtPage = totalPages

      setMonthsFrom(nxtStartingMonth)
      setPage(nxtPage)
      return
    }

    const nxtStartingMonth = monthsFrom - showNumberOfMonths
    const nxtPage = page - 1
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)
  }, [page, showNumberOfMonths, monthsFrom, totalPages, activeYear])

  const next = useCallback(() => {
    const isLastPage = page === totalPages
    if (isLastPage) {
      const _nextYear = dayjs(`${activeYear}`).add(1, 'year').year()
      setActiveYear(_nextYear)
      resetCalendarYear()
      return
    }

    const nxtStartingMonth = page * showNumberOfMonths + 1
    const nxtPage = page + 1
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)
  }, [page, totalPages, showNumberOfMonths, activeYear])

  const configControls: IControls = {
    prev,
    next,
    initCal,
  }

  useEffect(() => {
    if (!Array.isArray(bookings) || bookings.length < 1) return
    const { halfDays, bookedDays } = handleBookings({ bookings, year: activeYear })

    setBookedDates(bookedDays)
    setLateCheckouts(halfDays)
  }, [bookings, activeYear])

  const configYear: IYear = {
    showNumberOfMonths,
    bookedDates,
    lateCheckouts,
    activeYear,
    monthsFrom,
  }

  const shouldRender = {
    key: showKey,
    currentYear: showCurrentYear,
    controls: showControls,
  }

  const layoutClassName =
    showNumberOfMonths !== totalCalendarMonths ? (showNumberOfMonths > 1 ? 'twoCol' : 'singleCol') : ''

  return (
    <section className={`calendar ${layoutClassName}`} data-testid='calendar'>
      <div className='wrap'>
        {!shouldRender.controls && !shouldRender.currentYear ? null : (
          <div className='controlWrap'>
            {shouldRender.currentYear && (
              <h1 className='currentYear' data-testid='currentYear'>
                {activeYear}
              </h1>
            )}

            {shouldRender.controls && <Controls {...configControls} />}
          </div>
        )}

        <Year {...configYear} />

        {shouldRender.key && <Key />}
      </div>
    </section>
  )
}

export default Calendar
