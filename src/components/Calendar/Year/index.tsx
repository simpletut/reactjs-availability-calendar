import React from 'react'
import dayjs from 'dayjs'
import { IYear } from './../types'
import { daysOfTheWeek, daysOfTheWeekOffset, getMonthName } from './../Utils'

const Year = ({
  activeYear,
  showNumberOfMonths = 12,
  bookedDates = [],
  lateCheckouts = [],
  monthsFrom = 1,
}: IYear): JSX.Element => {
  const _year = activeYear || dayjs.tz().year()

  return (
    <div className='year' data-testid='year'>
      {new Array(showNumberOfMonths).fill('').map((_, pos) => {
        const arrOffset = 1
        const month = monthsFrom + pos
        const date = `${_year}-${month}`
        const monthName = getMonthName(month)
        const totalDays = dayjs.tz(date).daysInMonth()
        const firstDayOfWeek = dayjs.tz(`${date}-01`).day()

        const offsetDays =
          firstDayOfWeek !== 0
            ? new Array(firstDayOfWeek - arrOffset).fill('')
            : new Array(Number(daysOfTheWeekOffset[firstDayOfWeek])).fill('')

        const daysArr = new Array(totalDays).fill('')

        return (
          <div key={pos} className='month' data-testid='month'>
            <h3 className='monthName'>{monthName}</h3>

            <div className='content dayOfTheWeek'>
              {daysOfTheWeek.map((dayOfTheWeek, pos) => {
                return (
                  <div key={pos} className='day'>
                    {dayOfTheWeek}
                  </div>
                )
              })}
            </div>

            <div className='content'>
              {offsetDays.map((_, pos) => {
                return <div key={pos} className='day' />
              })}

              {daysArr.map((_, pos) => {
                const day = pos + arrOffset
                const _date = `${month}-${day}-${_year}`

                const isBooked = Array.isArray(bookedDates) ? bookedDates.includes(_date) : false

                const isLateCheckout = Array.isArray(lateCheckouts) ? lateCheckouts.includes(_date) : false

                return (
                  <div
                    key={pos}
                    className={`day ${isBooked ? 'booked' : ''} ${isLateCheckout ? 'isLateCheckout' : ''}`}
                  >
                    <span>{day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Year
