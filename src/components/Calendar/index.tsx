import React, { FC, useEffect, useState, useCallback } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { handleBookings } from './Utils'
import Controls from './Controls'
import Year from './Year'
import Key from './Key'
import { ICalendarPropTypes, IControls, blockedDaysType, IYear } from './types'

dayjs.extend(isBetween)

const Calendar: FC<ICalendarPropTypes> = ({
  bookings,
  showNumberOfMonths,
  showKey,
  showCurrentYear,
  showControls,
}): JSX.Element => {
  const [currentYear, setCurrentYear] = useState(dayjs().year())
  const [bookedDates, setBookedDates] = useState<blockedDaysType>([])
  const [lateCheckouts, setLateCheckouts] = useState<blockedDaysType>([])

  const initCal = useCallback(() => {
    const _currYear = dayjs().year()
    setCurrentYear(_currYear)
  }, [])

  const prevYear = useCallback(() => {
    const _previousYear = dayjs(`${currentYear}`).subtract(1, 'year')
    setCurrentYear(_previousYear.year())
  }, [currentYear])

  const nextYear = useCallback(() => {
    const _nextYear = dayjs(`${currentYear}`).add(1, 'year')
    setCurrentYear(_nextYear.year())
  }, [currentYear])

  const configControls: IControls = {
    prevYear,
    nextYear,
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

Calendar.defaultProps = {
  bookings: [],
  showNumberOfMonths: 12,
  showKey: true,
  showCurrentYear: true,
  showControls: true,
}

export default Calendar
