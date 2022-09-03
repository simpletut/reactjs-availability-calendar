# reactjs-availability-calendar

[![NPM version][npm-image]][npm-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://reactjs-availability-calendar-demo-simpletut.vercel.app/)

Lightweight Availability/Bookings Calendar Built with React & TypeScript

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.paypal.com/donate/?hosted_button_id=5XUQK37UT4Z7Y)

![ReactJS-Availability-Calendar](https://user-images.githubusercontent.com/20645523/187097982-7cfa4790-308c-4fdb-8965-a7705269fd6e.png)

## Installation:

```bash
npm install reactjs-availability-calendar
```

or

```bash
yarn add reactjs-availability-calendar
```

## Usage :

Add `Calendar` to your component:

```js
import React from 'react'
import Calendar from 'reactjs-availability-calendar'

export default function App() {
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

  return (
    <Calendar bookings={bookings} />
  )
}


```

## Default CSS

Please copy and self host the default CSS linked below.

<a href="https://github.com/simpletut/reactjs-availability-calendar/blob/main/styles/main.css">Default CSS</a>
<br />
<a href="https://github.com/simpletut/reactjs-availability-calendar/blob/main/styles/main.min.css">Minified Default CSS</a>

```
<link href="path/to/your/styles.css" rel="stylesheet">

```

## Settings / Configurations:

### bookings

**Type:** Array of Bookings\
**Default:** []\
**Example:**
```
[{
  from: '2022-04-08T00:00:00.000Z',
  to: '2022-04-10T00:00:00.000Z',
  middayCheckout: true,
}]
```
**Important:** Dates must be in valid ISO 8601 format. <a href="https://en.wikipedia.org/wiki/ISO_8601">Learn more</a>\
**Description:** Dates to be shown as unavailable on the calendar


### showNumberOfMonths

**Type:** Number\
**Default:** 12\
**Options:** 12 | 4 | 2 | 1\
**Description:** Number of Months to show

### showCurrentYear

**Type:** Bool\
**Default:** true\
**Description:** Render active Calendar Year

### showControls

**Type:** Bool\
**Default:** true\
**Description:** Render navigation buttons to move forward and previous Calendar Years

### showKey

**Type:** Bool\
**Default:** true\
**Description:** Render Key for the different Calendar States

[npm-url]: https://www.npmjs.com/package/reactjs-availability-calendar
[npm-image]: https://img.shields.io/npm/v/reactjs-availability-calendar
[github-license]: https://img.shields.io/github/license/simpletut/reactjs-availability-calendar
[github-license-url]: https://github.com/simpletut/reactjs-availability-calendar/blob/main/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/reactjs-availability-calendar
