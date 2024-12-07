import dateFunctions from './dateFunctions.js'
import getRandomQuote from './getRandomQuote.js'

const {
  getFormattedDate,
  getFormattedSeconds,
  getFormattedTime,
  getFormattedWeekday,
  getFormattedYear,
} = dateFunctions

const timeDisplay = document.querySelector('.time-display')

setInterval(() => {
  const date = new Date()
  timeDisplay.textContent = `
${getFormattedDate(date)}
${getFormattedTime(date)}
${getFormattedYear(date)}
${getFormattedWeekday(date)}
${getFormattedSeconds(date)}
`
}, 50)
console.log(await getRandomQuote())
