import dateFunctions from "./dateFunctions.js";
import getRandomQuote from "./getRandomQuote.js";

const yearDisplay = document.querySelector(".year-display");
const weekdayDisplay = document.querySelector(".weekday-display");
const monthDisplay = document.querySelector(".month-display");
const dayDisplay = document.querySelector(".day-display");
const timeDisplay = document.querySelector(".time-display");
const amPmDisplay = document.querySelector(".am-pm-display");
const secondsDisplay = document.querySelector(".seconds-display");

const {
  getFormattedMonth,
  getFormattedDay,
  getFormattedSeconds,
  getFormatted12HourTime,
  getAmOrPm,
  getFormattedWeekday,
  getFormattedYear,
} = dateFunctions;

setInterval(() => {
  const date = new Date();
  yearDisplay.textContent = getFormattedYear(date);
  weekdayDisplay.textContent = getFormattedWeekday(date);
  monthDisplay.textContent = getFormattedMonth(date);
  dayDisplay.textContent = getFormattedDay(date);
  timeDisplay.textContent = getFormatted12HourTime(date);
  amPmDisplay.textContent = getAmOrPm(date);
  secondsDisplay.textContent = getFormattedSeconds(date);
}, 50);
