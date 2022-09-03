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
      from: '2022-04-08T00:00:00.000Z',
      to: '2022-04-10T00:00:00.000Z',
      middayCheckout: true,
    },
    {
      from: '2022-09-03T19:20:35.593Z',
      to: '2022-09-03T19:20:35.593Z',
      middayCheckout: false,
    }
  ],
}
