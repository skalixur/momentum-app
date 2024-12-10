import COPY from "./COPY.js";

const dateFunctions = {
  /**
   * Returns a formatted time.
   *
   * @param {Date} date - Date to get the formatted time of.
   * @returns string
   *
   */
  getFormatted12HourTime: function (date) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours += 12;
    }
    const hoursIn12HourFormat = hours.toString().padStart(2, "0");

    return `${hoursIn12HourFormat}:${minutes}`;
  },

  /**
   * Returns pm or am depending on the date
   *
   * @param {Date} date - Date to get am/pm of.
   * @returns string
   *
   */
  getAmOrPm: function (date) {
    const hours = date.getHours();
    const isPm = hours > 12;
    return isPm ? "PM" : "AM";
  },

  /**
   * Returns formatted seconds.
   *
   * @param {Date} date - Date to get the formatted seconds of.
   * @returns string
   *
   */
  getFormattedSeconds: function (date) {
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return seconds;
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()];

    return `${month}`;
  },

  /**
   * Returns a formatted day.
   *
   * @param {Date} date - Date to get the formatted day of.
   * @returns string
   *
   */
  getFormattedDay: function (date) {
    return date.getDate().toString();
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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekDay = weekDays[date.getDay()]; // .slice(0, 3);

    return weekDay;
  },

  /**
   * Returns a formatted year.
   *
   * @param {Date} date - Date to get the formatted year of.
   * @returns string
   */
  getFormattedYear: function (date) {
    return date.getFullYear().toString();
  },

  /**
   * Returns a greeting depending on the time.
   *
   * @param {String} name - Name to put in the greeting.
   * @param {Date} date - Date to get the formatted year of.
   * @returns string
   */
  getGreeting: function (name, date) {
    const hours = date.getHours();

    let timeDependentGreeting = "";
    if (hours < 12) {
      timeDependentGreeting = "Good morning";
    } else if (hours >= 12 && hours < 18) {
      timeDependentGreeting = "Good afternoon";
    } else if (hours >= 18) {
      timeDependentGreeting = "Good evening";
    }

    let result = `${COPY.GREETING_BEFORE_NAME}${name}${COPY.GREETING_AFTER_NAME}`;
    result = result.replaceAll("%%greeting%%", timeDependentGreeting);
    return result;
  },
};

export default dateFunctions;
