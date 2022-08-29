# reactjs-availability-calendar

[![NPM version][npm-image]][npm-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://simpletut.github.io/reactjs-availability-calendar/)

Lightweight Availability Calendar Built with React & TypeScript

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

**Example:**
```
{
  from: '01-08-2022',
  to: '01-16-2022',
  middayCheckout: true,
}
```
**Type:** Array of Bookings\
**Default:** []\
**Description:** Dates should be in US format (MM-DD-YYYY).


### showNumberOfMonths

**Type:** Number\
**Default:** 12\
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
