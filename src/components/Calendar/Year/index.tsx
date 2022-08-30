import React, { FC } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IYear } from './../types'
import { daysOfTheWeek, daysOfTheWeekOffset } from './../Utils'

dayjs.extend(isBetween)

const Year = ({
  activeYear,
  showNumberOfMonths = 12,
  bookedDates = [],
  lateCheckouts = [],
  monthsFrom = 1
}: IYear): JSX.Element => {
  const _year = activeYear || dayjs().year()

  return (
    <div className='year' data-testid='year'>
      {new Array(showNumberOfMonths).fill('').map((_, pos) => {
        const arrOffset = 1
        const month = monthsFrom + pos
        const date = `${_year}-${month}`
        const monthName = dayjs(date).format('MMMM')
        const totalDays = dayjs(date).daysInMonth()

        const firstDayOfWeek = dayjs(`${date}-01`).day()
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
                const _date = dayjs(`${date}-${day}`).format('MM-DD-YYYY')
                const isBooked = Array.isArray(bookedDates) ? bookedDates.includes(`${date}-${day}`) : false
                const isLateCheckout = Array.isArray(lateCheckouts)
                  ? lateCheckouts.includes(_date)
                  : false

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
