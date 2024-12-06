const timeDisplay = document.querySelector(".time-display");

setInterval(() => {
  const date = new Date();
  timeDisplay.textContent = `
${getFormattedDate(date)}
${getFormattedTime(date)}
${getFormattedYear(date)}
${getFormattedWeekday(date)}
${getFormattedSeconds(date)}

`;
}, 50);
