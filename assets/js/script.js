import utils from "./utils.js";
import COPY from "./copy.js";
import dateFunctions from "./dateFunctions.js";
import elementFunctions from "./elementFunctions.js";
import animationFunctions from "./animationFunctions.js";
import getRandomQuote from "./getRandomQuote.js";

const { showElement, hideElement } = utils;
const { createPromptLabel, createPromptInput } = elementFunctions;
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

const greetingContainer = document.querySelector(".greeting-container");
const greetingPrefixDisplay = document.querySelector(
  ".greeting-prefix-display",
);
const greetingNameDisplay = document.querySelector(".greeting-name-display");
const greetingSuffixDisplay = document.querySelector(
  ".greeting-suffix-display",
);
const quoteDisplay = document.querySelector(".quote-display");
const focusDisplay = document.querySelector(".focus-display");

const promptContainer = document.querySelector(".prompt-container");
const submitButton = document.querySelector(".prompt-submit");

const AppState = {
  username: "User",
  focus: "",
};

// is this ok? or do i really pass in all the parameters
function updateDateAndClock() {
  const date = new Date();
  yearDisplay.textContent = getFormattedYear(date);
  weekdayDisplay.textContent = getFormattedWeekday(date) + ",";
  monthDisplay.textContent = getFormattedMonth(date);
  dayDisplay.textContent = getFormattedDay(date);
  timeDisplay.textContent = getFormatted12HourTime(date);
  amPmDisplay.textContent = getAmOrPm(date);
  secondsDisplay.textContent = getFormattedSeconds(date);

  const greeting = getGreeting(AppState.username, date);
  greetingPrefixDisplay.textContent = greeting[0];
  greetingNameDisplay.textContent = greeting[1];
  greetingSuffixDisplay.textContent = greeting[2];
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

const animations = {
  fadeOutFast: "fade-out-fast",
  fadeInFast: "fade-in-fast",
  fadeInSlideUp: "fade-in-slide-up",
};

const animationOptions = {
  fadeOutOpts: {
    mode: "out",
    animationClass: animations.fadeOutFast,
  },
  fadeInOpts: {
    animationClass: animations.fadeInFast,
  },
  fadeInSlideUpOpts: {
    animationClass: animations.fadeInSlideUp,
  },
};

promptContainer.addEventListener("submit", async (e) => {
  if (promptContainer.dataset.prompt === "focus") {
    return;
  }

  e.preventDefault();

  const { fadeOutOpts, fadeInOpts, fadeInSlideUpOpts } = animationOptions;

  transitionAnimation({ element: namePromptInput, ...fadeOutOpts });
  await transitionAnimation({ element: namePromptLabel, ...fadeOutOpts });

  transitionAnimation({ element: focusPromptInput, ...fadeInOpts });
  await transitionAnimation({ element: focusPromptLabel, ...fadeInOpts });

  promptContainer.dataset.prompt = "focus";

  focusPromptInput.select();

  AppState.username = namePromptInput.value;

  transitionAnimation({ element: greetingContainer, ...fadeInSlideUpOpts });
});

promptContainer.addEventListener("submit", async (e) => {
  if (promptContainer.dataset.prompt === "name") {
    return;
  }

  e.preventDefault();

  const { fadeOutOpts, fadeInSlideUpOpts } = animationOptions;

  transitionAnimation({ element: focusPromptInput, ...fadeOutOpts });
  transitionAnimation({ element: focusPromptLabel, ...fadeOutOpts });
  await transitionAnimation({ element: submitButton, ...fadeOutOpts });

  let focus = e.target[0].value;
  AppState.focus = focus;
  focusDisplay.textContent = AppState.focus;
  transitionAnimation({ element: focusDisplay, ...fadeInSlideUpOpts });
});

async function updateQuoteDisplay(quoteDisplay, quote) {
  const { fadeOutOpts, fadeInOpts } = animationOptions;

  await transitionAnimation({ element: quoteDisplay, ...fadeOutOpts });
  quoteDisplay.textContent = `"${quote.quote}" — ${quote.author}`;
  await transitionAnimation({
    mode: "in",
    element: quoteDisplay,
    ...fadeInOpts,
  });
}

(async () => {
  await updateQuoteDisplay(quoteDisplay, await getRandomQuote());
})();
setInterval(async () => {
  await updateQuoteDisplay(quoteDisplay, await getRandomQuote());
}, 1000 * 5);
