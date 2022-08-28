import React from 'react'

const Key = (): JSX.Element => {
  return (
    <div className='key' data-testid='key'>
      <div className='type bookedType' data-testid='bookedType'>
        <span>Booked</span>
      </div>

      <div className='type lateCheckoutType' data-testid='lateCheckoutType'>
        <span>Late Checkout</span>
      </div>
    </div>
  )
}

export default Key
