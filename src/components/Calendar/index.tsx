import React, { useEffect, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { handleBookings, isValidMonthsOption } from './Utils'
import Controls from './Controls'
import Year from './Year'
import Key from './Key'
import { ICalendarPropTypes, IControls, blockedDaysType, IYear } from './types'
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from 'dayjs/plugin/customParseFormat'

const defaultTimeZone = 'Europe/London';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.tz.setDefault(defaultTimeZone);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

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
  const _showNumberOfMonths = isValidMonthsOption(showNumberOfMonths) ? showNumberOfMonths : totalCalendarMonths
  const _year = dayjs.tz().year();
  const [activeYear, setActiveYear] = useState(_year)
  const [bookedDates, setBookedDates] = useState<blockedDaysType>([])
  const [lateCheckouts, setLateCheckouts] = useState<blockedDaysType>([])
  const [monthsFrom, setMonthsFrom] = useState(initialMonth)
  const [page, setPage] = useState(initialPage)

  const totalPages = totalCalendarMonths / _showNumberOfMonths

  const resetCalendarYear = () => {
    setMonthsFrom(initialMonth)
    setPage(initialPage)
  }

  const goToPage = useCallback(
    (_page: number): void => {
      const _monthsFrom = _page * _showNumberOfMonths - _showNumberOfMonths + 1
      setMonthsFrom(_monthsFrom)
      setPage(_page)
    },
    [_showNumberOfMonths],
  )

  const findActivePage = useCallback(() => {
    const now = dayjs.tz()
    const _month = now.month() + 1
    let _page = 1
    for (let i = 1; i <= totalPages; i++) {
      const found = _month <= i * _showNumberOfMonths
      _page = i
      if (found) break
    }

    goToPage(_page)
  }, [goToPage, _showNumberOfMonths, totalPages])

  useEffect(() => {
    if (_showNumberOfMonths !== totalCalendarMonths) {
      findActivePage()
    }
  }, [findActivePage, _showNumberOfMonths])

  const initCal = useCallback(() => {
    const now = dayjs.tz()
    const _year = now.year()
    setActiveYear(_year)
    if (_showNumberOfMonths !== totalCalendarMonths) findActivePage()
    else resetCalendarYear()
  }, [findActivePage, _showNumberOfMonths])

  const prev = useCallback(() => {
    const isFirstPage = page === 1

    if (isFirstPage) {
      const _previousYear = dayjs.tz(`${activeYear}`).subtract(1, 'year').year()
      setActiveYear(_previousYear)

      if (_showNumberOfMonths === totalCalendarMonths) {
        resetCalendarYear()
        return
      }

      const nxtStartingMonth = totalCalendarMonths - _showNumberOfMonths + 1
      const nxtPage = totalPages

      setMonthsFrom(nxtStartingMonth)
      setPage(nxtPage)
      return
    }

    const nxtStartingMonth = monthsFrom - _showNumberOfMonths
    const nxtPage = page - 1
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)
  }, [page, _showNumberOfMonths, monthsFrom, totalPages, activeYear])

  const next = useCallback(() => {
    const isLastPage = page === totalPages
    if (isLastPage) {
      const _nextYear = dayjs.tz(`${activeYear}`).add(1, 'year').year()
      setActiveYear(_nextYear)
      resetCalendarYear()
      return
    }

    const nxtStartingMonth = page * _showNumberOfMonths + 1
    const nxtPage = page + 1
    setMonthsFrom(nxtStartingMonth)
    setPage(nxtPage)
  }, [page, totalPages, _showNumberOfMonths, activeYear])

  const configControls: IControls = {
    prev,
    next,
    initCal,
  }

  useEffect(() => {
    const { halfDays, bookedDays } = handleBookings({ bookings, year: activeYear })

    setBookedDates(bookedDays)
    setLateCheckouts(halfDays)
  }, [bookings, activeYear])

  const configYear: IYear = {
    showNumberOfMonths: _showNumberOfMonths,
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
    _showNumberOfMonths !== totalCalendarMonths ? (_showNumberOfMonths > 1 ? 'twoCol' : 'singleCol') : ''

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
