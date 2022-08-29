import React, { FC } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IYear } from './../types'
import { daysOfTheWeek, daysOfTheWeekOffset } from './../Utils'

dayjs.extend(isBetween)

const Year: FC<IYear> = ({
  showNumberOfMonths,
  bookedDates,
  lateCheckouts,
  currentYear = dayjs().year(),
}): JSX.Element => {
  return (
    <div className='year' data-testid='year'>
      {new Array(showNumberOfMonths).fill('').map((_, pos) => {
        const arrOffset = 1
        const month = pos + arrOffset
        const date = `${currentYear}-${month}`
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
                const isBooked = Array.isArray(bookedDates) ? bookedDates.includes(`${date}-${day}`) : false
                const isLateCheckout = Array.isArray(lateCheckouts)
                  ? lateCheckouts.includes(`${dayjs(`${date}-${day}`).format('MM-DD-YYYY')}`)
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

Year.defaultProps = {
  showNumberOfMonths: 12,
  bookedDates: [],
  lateCheckouts: [],
}

export default Year
