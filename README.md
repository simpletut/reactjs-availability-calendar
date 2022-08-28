# reactjs-availability-calendar

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://simpletut.github.io/reactjs-availability-calendar/)

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
import { Calendar } from 'reactjs-availability-calendar'

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

Include default stylesheet in your html

Note: Please host the CSS in this file yourself

<a href="https://github.com/simpletut/reactjs-availability-calendar/blob/main/styles/main.min.css">Link to CSS</a>
<br />
<a href="https://github.com/simpletut/reactjs-availability-calendar/blob/main/styles/main.min.css">Link to Minified CSS</a>

```
<link rel="stylesheet" href="path/to/hosted/styles.css">

```

[npm-url]: https://www.npmjs.com/package/reactjs-availability-calendar
[npm-image]: https://img.shields.io/npm/v/reactjs-availability-calendar
[github-license]: https://img.shields.io/github/license/simpletut/reactjs-availability-calendar/blob/main/LICENSE
[github-license-url]: https://github.com/simpletut/reactjs-availability-calendar/blob/main/LICENSE
[github-build]: https://github.com/main/reactjs-availability-calendar/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/simpletut/reactjs-availability-calendar/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/reactjs-availability-calendar
