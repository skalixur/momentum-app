import utils from './utils.js'
import COPY from './copy.js'
import dateFunctions from './dateFunctions.js'
import elementFunctions from './elementFunctions.js'
import animationFunctions, {
  animations,
  animationOptions,
} from './animationFunctions.js'
import quoteFunctions from './quoteFunctions.js'

const { showElement, hideElement } = utils
const {
  getGreeting,
  getFormattedMonth,
  getFormattedDay,
  getFormattedSeconds,
  getFormatted12HourTime,
  getAmOrPm,
  getFormattedWeekday,
  getFormattedYear,
  isExactHour,
} = dateFunctions
const { createPromptLabel, createPromptInput } = elementFunctions
const { transitionAnimation } = animationFunctions
const { fadeInOpts, fadeOutOpts, fadeInSlideUpOpts } = animationOptions
const { getRandomQuote, updateQuoteDisplay } = quoteFunctions

const yearDisplay = document.querySelector('.year-display')
const weekdayDisplay = document.querySelector('.weekday-display')
const monthDisplay = document.querySelector('.month-display')
const dayDisplay = document.querySelector('.day-display')
const timeDisplay = document.querySelector('.time-display')
const amPmDisplay = document.querySelector('.am-pm-display')
const secondsDisplay = document.querySelector('.seconds-display')

const greetingContainer = document.querySelector('.greeting-container')
const greetingPrefixDisplay = document.querySelector('.greeting-prefix-display')
const greetingNameDisplay = document.querySelector('.greeting-name-display')
const greetingSuffixDisplay = document.querySelector('.greeting-suffix-display')
const quoteDisplay = document.querySelector('.quote-display')
const focusDisplay = document.querySelector('.focus-display')

const promptContainer = document.querySelector('.prompt-container')
const submitButton = document.querySelector('.prompt-submit')

const namePromptLabel = createPromptLabel(COPY.NAME_PROMPT, 'name')
const namePromptInput = createPromptInput('name', COPY.NAME_PROMPT_PLACEHOLDER)
const focusPromptLabel = createPromptLabel(COPY.FOCUS_PROMPT, 'focus')
const focusPromptInput = createPromptInput(
  'focus',
  COPY.FOCUS_PROMPT_PLACEHOLDER
)

promptContainer.insertAdjacentElement('afterbegin', namePromptInput)
promptContainer.insertAdjacentElement('afterbegin', namePromptLabel)
promptContainer.insertAdjacentElement('afterbegin', focusPromptInput)
promptContainer.insertAdjacentElement('afterbegin', focusPromptLabel)

hideElement(focusPromptInput)
hideElement(focusPromptLabel)

let AppState = {
  username: '',
  focus: '',
  customQuote: '',
}

AppState = JSON.parse(localStorage.getItem('appState')) || AppState

let nextHourToUpdateQuote = (new Date().getHours() + 1) % 24

async function updateDateAndClock(date) {
  yearDisplay.textContent = getFormattedYear(date)
  weekdayDisplay.textContent = getFormattedWeekday(date) + ','
  monthDisplay.textContent = getFormattedMonth(date)
  dayDisplay.textContent = getFormattedDay(date)
  timeDisplay.textContent = getFormatted12HourTime(date)
  amPmDisplay.textContent = getAmOrPm(date)
  secondsDisplay.textContent = getFormattedSeconds(date)

  const greeting = getGreeting(AppState.username, date)
  greetingPrefixDisplay.textContent = greeting[0]
  greetingSuffixDisplay.textContent = greeting[2]

  if (isExactHour(date) && date.getHours() === nextHourToUpdateQuote) {
    nextHourToUpdateQuote = (nextHourToUpdateQuote + 1) % 24
    if (AppState.customQuote) {
      return
    }
    await updateQuoteDisplay(quoteDisplay, await getRandomQuote())
  }
}

updateDateAndClock(new Date())
;(async () => {
  if (AppState.customQuote) {
    await updateQuoteDisplay(quoteDisplay, {
      quote: AppState.customQuote,
      author: false,
    })
    return
  }
  await updateQuoteDisplay(quoteDisplay, await getRandomQuote())
})()

setInterval(() => {
  const date = new Date()
  updateDateAndClock(date)
}, 100)

if (AppState.username) {
  hideElement(namePromptInput)
  hideElement(namePromptLabel)
  hideElement(submitButton)
  greetingNameDisplay.textContent = getGreeting(
    AppState.username,
    new Date()
  )[1]
  transitionAnimation({ element: greetingContainer, ...fadeInSlideUpOpts })
}

if (AppState.focus) {
  focusDisplay.textContent = AppState.focus
  transitionAnimation({ element: focusDisplay, ...fadeInSlideUpOpts })
}

promptContainer.dataset.prompt = 'name'

promptContainer.addEventListener('submit', async e => {
  if (promptContainer.dataset.prompt === 'focus') {
    return
  }

  e.preventDefault()

  transitionAnimation({ element: namePromptInput, ...fadeOutOpts })
  await transitionAnimation({ element: namePromptLabel, ...fadeOutOpts })

  transitionAnimation({ element: focusPromptInput, ...fadeInOpts })
  focusPromptInput.select()
  await transitionAnimation({ element: focusPromptLabel, ...fadeInOpts })

  promptContainer.dataset.prompt = 'focus'

  AppState.username = namePromptInput.value
  localStorage.setItem('appState', JSON.stringify(AppState))
  greetingNameDisplay.textContent = getGreeting(
    AppState.username,
    new Date()
  )[1]

  transitionAnimation({ element: greetingContainer, ...fadeInSlideUpOpts })
})

promptContainer.addEventListener('submit', async e => {
  if (promptContainer.dataset.prompt === 'name') {
    return
  }

  e.preventDefault()

  transitionAnimation({ element: focusPromptInput, ...fadeOutOpts })
  transitionAnimation({ element: focusPromptLabel, ...fadeOutOpts })
  await transitionAnimation({ element: submitButton, ...fadeOutOpts })

  let focus = e.target[0].value
  AppState.focus = focus
  localStorage.setItem('appState', JSON.stringify(AppState))
  focusDisplay.textContent = AppState.focus
  transitionAnimation({ element: focusDisplay, ...fadeInSlideUpOpts })
})

greetingNameDisplay.addEventListener('keydown', e => {
  if (!greetingNameDisplay.textContent) {
    greetingNameDisplay.textContent = 'User'
  }
  greetingNameDisplay.textContent = greetingNameDisplay.textContent.replaceAll(
    /\n+/g,
    ''
  )
  AppState.username = greetingNameDisplay.textContent
  localStorage.setItem('appState', JSON.stringify(AppState))
})

focusDisplay.addEventListener('keydown', e => {
  if (!focusDisplay.textContent) {
    focusDisplay.textContent = 'Focus'
  }
  focusDisplay.textContent = focusDisplay.textContent.replaceAll(/\n+/g, '')
  AppState.focus = focusDisplay.textContent
  localStorage.setItem('appState', JSON.stringify(AppState))
})

quoteDisplay.addEventListener('keydown', async e => {
  if (!quoteDisplay.textContent) {
    await updateQuoteDisplay(quoteDisplay, await getRandomQuote())
  }

  AppState.customQuote = quoteDisplay.textContent
  localStorage.setItem('appState', JSON.stringify(AppState))
})
