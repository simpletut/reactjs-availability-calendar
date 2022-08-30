import React, { FC, useEffect, useState, useCallback } from 'react'
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
  const initialMonth = 1;
  const initialPage = 1;
  const totalCalendarMonths = 12;
  const [currentYear, setCurrentYear] = useState(dayjs().year())
  const [bookedDates, setBookedDates] = useState<blockedDaysType>([])
  const [lateCheckouts, setLateCheckouts] = useState<blockedDaysType>([])
  const [monthsFrom, setMonthsFrom] = useState(initialMonth)
  const [page, setPage] = useState(initialPage)

  const totalPages = totalCalendarMonths / showNumberOfMonths;

  const resetCalendarYear = () => {
    setMonthsFrom(initialMonth)
    setPage(initialPage)
  };

  const initCal = useCallback(() => {
    const _currYear = dayjs().year()
    setCurrentYear(_currYear)
  }, [])

  const prev = useCallback(() => {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      const _previousYear = dayjs(`${currentYear}`).subtract(1, 'year').year()
      setCurrentYear(_previousYear)

      if (showNumberOfMonths === totalCalendarMonths) {
        resetCalendarYear()
        return;
      }

      const nxtStartingMonth = totalCalendarMonths - showNumberOfMonths + 1;
      const nxtPage = totalPages;

      setMonthsFrom(nxtStartingMonth)
      setPage(nxtPage)
      return;
    }

    const nxtStartingMonth = monthsFrom - showNumberOfMonths;
    const nxtPage = page - 1;
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)

  }, [page, showNumberOfMonths, currentYear])

  const next = useCallback(() => {
    const isLastPage = page === totalPages;
    if (isLastPage) {
      const _nextYear = dayjs(`${currentYear}`).add(1, 'year').year()
      setCurrentYear(_nextYear)
      resetCalendarYear()
      return;
    }

    const nxtStartingMonth = page * showNumberOfMonths + 1;
    const nxtPage = page + 1;
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)

  }, [page, totalPages, showNumberOfMonths, currentYear])

  const configControls: IControls = {
    prev,
    next,
    initCal,
  }

  useEffect(() => {
    if (!Array.isArray(bookings) || bookings.length < 1) return
    const { halfDays, bookedDays } = handleBookings({ bookings, year: currentYear })

    setBookedDates(bookedDays)
    setLateCheckouts(halfDays)
  }, [bookings, currentYear])

  const configYear: IYear = {
    showNumberOfMonths,
    bookedDates,
    lateCheckouts,
    currentYear,
    monthsFrom
  }

  const shouldRender = {
    key: showKey,
    currentYear: showCurrentYear,
    controls: showControls,
  }

  return (
    <section className='calendar' data-testid='calendar'>
      <div className='wrap'>
        {!shouldRender.controls && !shouldRender.currentYear ? null : (
          <div className='controlWrap'>
            {shouldRender.currentYear && (
              <h1 className='currentYear' data-testid='currentYear'>
                {currentYear}
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
