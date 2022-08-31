import React from 'react'
import ReactDOM from 'react-dom/client'
import Calendar from 'reactjs-availability-calendar'

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <header className='header'>
      <div className='info'>
        <a className='backBtn' href='https://www.npmjs.com/package/reactjs-availability-calendar'>
          <span>Back</span>
        </a>
        <a className='packageInfo' href='https://www.npmjs.com/package/reactjs-availability-calendar'>
          <span>
            <strong>NPM Package:</strong> reactjs-availability-calendar
          </span>
          <span className='sm'>
            Lightweight Availability/Bookings Calendar Built with React & TypeScript
          </span>
        </a>
      </div>
      <div className='demoNotice'>
        <span>
          This is a Demo
        </span>
      </div>
    </header>
    <div className='demo'>
      <Calendar bookings={bookings} />
    </div>
  </React.StrictMode>,
)