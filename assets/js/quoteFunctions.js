import animationFunctions, { animationOptions } from "./animationFunctions.js";

const { transitionAnimation } = animationFunctions;

const quoteFunctions = {
  /**
   * Fetches a random quote from the API.
   * @returns {Promise<{quote: string, author: string}>} A promise that resolves to an object containing the quote and author.
   */
  async getRandomQuote() {
    const res = await fetch(
      `https://quoteslate.vercel.app/api/quotes/random?maxLength=99`,
    );
    const quoteData = await res.json();
    const { quote, author } = quoteData;
    const result = { quote, author };

    return result;
  },

  /**
   * Updates the quote display element with a new quote.
   * @param {HTMLElement} quoteDisplay - The HTML element where the quote will be displayed.
   * @param {{quote: string, author: string}} quote - An object containing the quote and author.
   * @returns {Promise<void>} A promise that resolves when the display update is complete.
   */
  async updateQuoteDisplay(quoteDisplay, quote) {
    const { fadeOutOpts, fadeInOpts } = animationOptions;

    await transitionAnimation({ element: quoteDisplay, ...fadeOutOpts });
    quoteDisplay.textContent = quote.author
      ? `“${quote.quote}” — ${quote.author}`
      : `${quote.quote}`;
    await transitionAnimation({
      mode: "in",
      element: quoteDisplay,
      ...fadeInOpts,
    });
  },
};

export default quoteFunctions;
