const timeDisplay = document.querySelector(".time-display");

function getFormattedTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const isPm = hours > 12;
  const pmAm = isPm ? "pm" : "am";

  const hoursIn12HourFormat = isPm ? hours - 12 : hours;

  return `${hoursIn12HourFormat}:${minutes} ${pmAm}`;
}
/**
 * Returns a formatted date.
 *
 * @param {Date} date - Date to format
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

  return month;
}
setInterval(() => {
  const date = new Date();
  console.log(getFormattedTime(date));
  console.log(getFormattedDate(date));
}, 50);
