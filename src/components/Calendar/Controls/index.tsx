import React, { FC } from 'react'
import { IControls } from './../types'

const Controls: FC<IControls> = ({ prevYear, initCal, nextYear }): JSX.Element => {
  return (
    <div className='controls' data-testid='controls'>
      <button className='btn back' onClick={() => prevYear()} data-testid='back'>
        Back
      </button>

      <button className='btn now' onClick={() => initCal()} data-testid='now'>
        Current Year
      </button>

      <button className='btn next' onClick={() => nextYear()} data-testid='next'>
        Next
      </button>
    </div>
  )
}

export default Controls
