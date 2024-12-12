import COPY from './copy.js'

const dateFunctions = {
  /**
   * Returns a formatted time.
   *
   * @param {Date} date - Date to get the formatted time of.
   * @returns string
   *
   */
  getFormatted12HourTime: function (date) {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')

    if (hours > 12) {
      hours -= 12
    } else if (hours === 0) {
      hours += 12
    }
    const hoursIn12HourFormat = hours.toString().padStart(2, '0')

    return `${hoursIn12HourFormat}:${minutes}`
  },

  /**
   * Returns pm or am depending on the date
   *
   * @param {Date} date - Date to get am/pm of.
   * @returns string
   *
   */
  getAmOrPm: function (date) {
    const hours = date.getHours()
    const isPm = hours > 12
    return isPm ? 'PM' : 'AM'
  },

  /**
   * Returns formatted seconds.
   *
   * @param {Date} date - Date to get the formatted seconds of.
   * @returns string
   *
   */
  getFormattedSeconds: function (date) {
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return seconds
  },

  /**
   * Returns a formatted date.
   *
   * @param {Date} date - Date to get the formatted date of.
   * @returns string
   *
   */
  getFormattedMonth: function (date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const month = months[date.getMonth()]

    return `${month}`
  },

  /**
   * Returns a formatted day.
   *
   * @param {Date} date - Date to get the formatted day of.
   * @returns string
   *
   */
  getFormattedDay: function (date) {
    return date.getDate().toString()
  },

  /**
   * Returns a formatted weekday.
   *
   * @param {Date} date - Date to get the formatted weekday of.
   * @returns string
   *
   */
  getFormattedWeekday: function (date) {
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    let weekDay = weekDays[date.getDay()] // .slice(0, 3);

    return weekDay
  },

  /**
   * Returns a formatted year.
   *
   * @param {Date} date - Date to get the formatted year of.
   * @returns string
   */
  getFormattedYear: function (date) {
    return date.getFullYear().toString()
  },

  /**
   * Returns a greeting depending on the time.
   *
   * @param {String} name - Name to put in the greeting.
   * @param {Date} date - Date to get the formatted year of.
   * @returns {String[]} An array containing the greeting message, name, and the greeting suffix.
   */
  getGreeting: function (name, date) {
    const hours = date.getHours()

    let timeDependentGreeting = ''
    if (hours < 12) {
      timeDependentGreeting = COPY.GREETING_MORNING
    } else if (hours >= 12 && hours < 18) {
      timeDependentGreeting = COPY.GREETING_AFTERNOON
    } else if (hours >= 18) {
      timeDependentGreeting = COPY.GREETING_EVENING
    }

    let timeDependentGreetingSuffix = ', '
    let nameSuffix = '!'
    timeDependentGreeting += timeDependentGreetingSuffix
    name
    let result = [timeDependentGreeting, name, nameSuffix]
    return result
  },

  /**
   * Returns true if the date is at the exact hour.
   *
   * @param {Date} date - Date to check if it is at the exact hour.
   * @returns {Boolean}
   */
  isExactHour: function (date) {
    return date.getMinutes() === 0 && date.getSeconds() === 0
  },
}

export default dateFunctions
