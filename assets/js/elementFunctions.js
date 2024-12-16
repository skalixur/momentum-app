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
    const promptLabel = document.createElement("label");
    promptLabel.textContent = promptLabelText;
    promptLabel.setAttribute("for", inputFor);
    promptLabel.classList.add("prompt-label");
    return promptLabel;
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
    const promptInput = document.createElement("input");
    promptInput.setAttribute("type", "text");
    promptInput.setAttribute("name", promptInputIdentifier);
    promptInput.setAttribute("placeholder", promptInputPlaceholder);
    promptInput.setAttribute("autocomplete", "off");
    promptInput.classList.add(
      "prompt-input",
      `prompt-input-${promptInputIdentifier}`,
    );
    promptInput.id = promptInputIdentifier;
    return promptInput;
  },

  createNewToDoItemElement({ displayText, onEdit, onRemove, index }) {
    const newToDoItemElement = document.createElement("li");

    newToDoItemElement.classList.add("to-do-item");

    const newToDoItemElementDisplay = document.createElement("span");

    newToDoItemElementDisplay.dataset.index = index;
    newToDoItemElementDisplay.classList.add("to-do-display");
    newToDoItemElementDisplay.textContent = displayText;
    newToDoItemElementDisplay.setAttribute("contenteditable", "true");
    newToDoItemElementDisplay.setAttribute("spellcheck", "false");
    newToDoItemElementDisplay.addEventListener("keydown", (e) => {
      onEdit(e);
    });

    const newToDoItemElementCheckButton = document.createElement("button");

    newToDoItemElementCheckButton.textContent = "✅";
    newToDoItemElementCheckButton.classList.add("to-do-checkbutton");

    newToDoItemElementCheckButton.addEventListener("click", (e) => {
      onRemove(e);
    });

    newToDoItemElement.insertAdjacentElement(
      "afterbegin",
      newToDoItemElementCheckButton,
    );

    newToDoItemElement.insertAdjacentElement(
      "beforeend",
      newToDoItemElementDisplay,
    );

    return newToDoItemElement;
  },
};

export default elementFunctions;
