import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Calendar from './../components/Calendar'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const Default = Template.bind({})

export const WithBookings = Template.bind({})
WithBookings.args = {
  bookings: [
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
  ],
}
