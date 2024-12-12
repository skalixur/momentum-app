import utils from "./utils.js";
import COPY from "./COPY.js";
import dateFunctions from "./dateFunctions.js";
import promptFunctions from "./promptFunctions.js";
import animationFunctions from "./animationFunctions.js";
import getRandomQuote from "./getRandomQuote.js";

const { showElement, hideElement } = utils;
const { createPromptLabel, createPromptInput } = promptFunctions;
const { transitionAnimation } = animationFunctions;
const {
  getGreeting,
  getFormattedMonth,
  getFormattedDay,
  getFormattedSeconds,
  getFormatted12HourTime,
  getAmOrPm,
  getFormattedWeekday,
  getFormattedYear,
} = dateFunctions;

const yearDisplay = document.querySelector(".year-display");
const weekdayDisplay = document.querySelector(".weekday-display");
const monthDisplay = document.querySelector(".month-display");
const dayDisplay = document.querySelector(".day-display");
const timeDisplay = document.querySelector(".time-display");
const amPmDisplay = document.querySelector(".am-pm-display");
const secondsDisplay = document.querySelector(".seconds-display");

const promptContainer = document.querySelector(".prompt-container");
const submitButton = document.querySelector(".prompt-submit");

const AppState = {
  username: "",
  focus: "",
};

function updateDateAndClock() {
  const date = new Date();
  yearDisplay.textContent = getFormattedYear(date);
  weekdayDisplay.textContent = getFormattedWeekday(date) + ",";
  monthDisplay.textContent = getFormattedMonth(date);
  dayDisplay.textContent = getFormattedDay(date);
  timeDisplay.textContent = getFormatted12HourTime(date);
  amPmDisplay.textContent = getAmOrPm(date);
  secondsDisplay.textContent = getFormattedSeconds(date);
}

updateDateAndClock();
setInterval(updateDateAndClock, 50);

promptContainer.dataset.prompt = "name";

const namePromptLabel = createPromptLabel(COPY.NAME_PROMPT, "name");
const namePromptInput = createPromptInput("name", COPY.NAME_PROMPT_PLACEHOLDER);
const focusPromptLabel = createPromptLabel(COPY.FOCUS_PROMPT, "focus");
const focusPromptInput = createPromptInput(
  "focus",
  COPY.FOCUS_PROMPT_PLACEHOLDER,
);

promptContainer.insertAdjacentElement("afterbegin", namePromptInput);
promptContainer.insertAdjacentElement("afterbegin", namePromptLabel);
promptContainer.insertAdjacentElement("afterbegin", focusPromptInput);
promptContainer.insertAdjacentElement("afterbegin", focusPromptLabel);

hideElement(focusPromptInput);
hideElement(focusPromptLabel);
showElement(submitButton);

promptContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  if (promptContainer.dataset.prompt === "name") {
    promptContainer.dataset.prompt = "focus";

    transitionAnimation(
      "out",
      namePromptInput,
      "fade-out",
      false,
      false,
      () => {
        transitionAnimation("in", focusPromptInput, "fade-in");
      },
    );
    transitionAnimation(
      "out",
      namePromptLabel,
      "fade-out",
      false,
      false,
      () => {
        transitionAnimation("in", focusPromptLabel, "fade-in-slide-up");
      },
    );

    focusPromptInput.select();

    const name = namePromptInput.value;
  } else if (promptContainer.dataset.prompt === "focus") {
    transitionAnimation("out", focusPromptInput, "fade-out");
    transitionAnimation("out", focusPromptLabel, "fade-out");
    transitionAnimation("out", submitButton, "fade-out");

    let focus = e.target[0].value;
  }
});
