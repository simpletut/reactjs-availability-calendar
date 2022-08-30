import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Calendar from '../src'

const bookings = [
  {
    from: new Date('01-16-2022'),
    to: new Date('01-27-2022'),
    middayCheckout: true,
  },
  {
    from: '06-25-2022',
    to: '07-03-2022',
    middayCheckout: false,
  },
]

describe('Calendar', () => {
  it('Renders without Error', () => {
    const { queryByTestId } = render(<Calendar bookings={bookings} />)
    const component = queryByTestId('calendar')
    expect(component).toBeTruthy()
  })

  it('Should Renders Current Year', () => {
    const { queryByTestId } = render(<Calendar bookings={bookings} />)
    const component = queryByTestId('currentYear')
    expect(component).toBeTruthy()
  })

  it('Should NOT Render Current Year', () => {
    const { queryByTestId } = render(<Calendar showCurrentYear={false} bookings={bookings} />)
    const component = queryByTestId('currentYear')
    expect(component).toBeFalsy()
  })

  it('Should Render Controls', () => {
    const { queryByTestId } = render(<Calendar bookings={bookings} />)
    const controls = queryByTestId('controls')
    const back = queryByTestId('back')
    const now = queryByTestId('now')
    const next = queryByTestId('next')

    expect(controls).toBeTruthy()
    expect(back).toBeTruthy()
    expect(now).toBeTruthy()
    expect(next).toBeTruthy()
  })

  it('Should NOT Render Controls', () => {
    const { queryByTestId } = render(<Calendar showControls={false} bookings={bookings} />)
    const controls = queryByTestId('controls')
    const back = queryByTestId('back')
    const now = queryByTestId('now')
    const next = queryByTestId('next')

    expect(controls).toBeFalsy()
    expect(back).toBeFalsy()
    expect(now).toBeFalsy()
    expect(next).toBeFalsy()
  })

  it('Should Render Key', () => {
    const { queryByTestId } = render(<Calendar bookings={bookings} />)
    const key = queryByTestId('key')
    const bookedType = queryByTestId('bookedType')
    const lateCheckoutType = queryByTestId('lateCheckoutType')

    expect(key).toBeTruthy()
    expect(bookedType).toBeTruthy()
    expect(lateCheckoutType).toBeTruthy()
  })

  it('Should NOT Render Key', () => {
    const { queryByTestId } = render(<Calendar showKey={false} bookings={bookings} />)
    const key = queryByTestId('key')
    const bookedType = queryByTestId('bookedType')
    const lateCheckoutType = queryByTestId('lateCheckoutType')

    expect(key).toBeFalsy()
    expect(bookedType).toBeFalsy()
    expect(lateCheckoutType).toBeFalsy()
  })

  it('Should Render 12 Months', () => {
    const { getAllByTestId } = render(<Calendar bookings={bookings} />)
    const months = getAllByTestId('month')

    expect(months).toHaveLength(12)
  })

  it('Should Render 4 Months', () => {
    const { getAllByTestId } = render(<Calendar showNumberOfMonths={4} bookings={bookings} />)
    const months = getAllByTestId('month')

    expect(months).toHaveLength(4)
  })

  it('Should Render 21 Booked Days', () => {
    const { container } = render(<Calendar bookings={bookings} />)
    expect(container.getElementsByClassName('booked').length).toBe(21)
  })

  it('Should Render 1 Late Checkout Day', () => {
    const { container } = render(<Calendar bookings={bookings} />)
    expect(container.getElementsByClassName('isLateCheckout').length).toBe(1)
  })
})
