/**
 * Returns a formatted time.
 *
 * @param {Date} date - Date to get the formatted time of.
 * @returns string
 *
 */
function getFormattedTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const isPm = hours > 12;
  const pmAm = isPm ? "pm" : "am";

  const hoursIn12HourFormat = isPm ? hours - 12 : hours;

  return `${hoursIn12HourFormat}:${minutes} ${pmAm}`;
}

/**
 * Returns formatted seconds.
 *
 * @param {Date} date - Date to get the formatted seconds of.
 * @returns string
 *
 */
function getFormattedSeconds(date) {
  const seconds = date.getSeconds();

  return seconds;
}

/**
 * Returns a formatted date.
 *
 * @param {Date} date - Date to get the formatted date of.
 * @returns string
 *
 */
function getFormattedDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
}

/**
 * Returns a formatted weekday.
 *
 * @param {Date} date - Date to get the formatted weekday of.
 * @returns string
 *
 */
function getFormattedWeekday(date) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()].slice(0, 3);

  return weekDay;
}

/**
 * Returns a formatted year.
 *
 * @param {Date} date - Date to get the formatted year of.
 */
function getFormattedYear(date) {
  return date.getFullYear();
}

/**
 * Returns a greeting depending on the time.
 *
 * @param {String} name - Name to put in the greeting.
 * @param {Date} date - Date to get the formatted year of.
 */
function getGreeting(name, date) {
  const hours = date.getHours();

  let timeDependentGreeting = "";
  if (hours < 12) {
    timeDependentGreeting = "Good morning.";
  } else if (hours >= 12 && hours < 18) {
    timeDependentGreeting = "Good afternoon.";
  } else if (hours >= 18) {
    timeDependentGreeting = "Good evening.";
  }

  return `${name}! ${timeDependentGreeting}`;
}
