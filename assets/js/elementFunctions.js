const elementFunctions = {
  /**
   * Creates a prompt label.
   *
   * @param {String} promptLabelText - Text to show inside of the label
   * @param {String} inputFor - ID of the input element the label is for
   * @returns {HTMLLabelElement}
   *
   */
  createPromptLabel(promptLabelText, inputFor) {
    const promptLabel = document.createElement('label')
    promptLabel.textContent = promptLabelText
    promptLabel.setAttribute('for', inputFor)
    promptLabel.classList.add('prompt-label')
    return promptLabel
  },

  /**
   * Creates a prompt input.
   *
   * @param {String} promptInputIdentifier - ID, unique class, and name of the input
   * @param {String} promptInputPlaceholder - Placeholder text to put inside the input
   * @returns {HTMLInputElement}
   *
   */
  createPromptInput(promptInputIdentifier, promptInputPlaceholder) {
    const promptInput = document.createElement('input')
    promptInput.setAttribute('type', 'text')
    promptInput.setAttribute('name', promptInputIdentifier)
    promptInput.setAttribute('placeholder', promptInputPlaceholder)
    promptInput.classList.add(
      'prompt-input',
      `prompt-input-${promptInputIdentifier}`
    )
    promptInput.id = promptInputIdentifier
    return promptInput
  },
}

export default elementFunctions
