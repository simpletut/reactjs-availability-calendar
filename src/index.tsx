import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from 'reactjs-availability-calendar'

const bookings = [
  {
    from: '01-08-2022',
    to: '01-16-2022',
    middayCheckout: true,
  },
  {
    from: '06-25-2022',
    to: '07-03-2022',
    middayCheckout: false,
  },
]

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div className='demo'>
      <Calendar bookings={bookings} />
    </div>
  </React.StrictMode>,
)