import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from 'reactjs-availability-calendar'

const bookings = [
  {
    from: '2022-04-08T00:00:00.000Z',
    to: '2022-04-10T00:00:00.000Z',
    middayCheckout: true,
  },
  {
    from: '2022-09-03T19:20:35.593Z',
    to: '2022-09-03T19:20:35.593Z',
    middayCheckout: false,
  }
]

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div className='demo'>
      <Calendar bookings={bookings} />
    </div>
  </React.StrictMode>,
)
