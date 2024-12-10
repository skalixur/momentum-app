import utils from "./utils.js";

const { showElement, hideElement, setStyles, supportArrayAndSingularValue } =
  utils;

const animationFunctions = {
  /**
   * Animate an element in our out.
   *
   * @param {'in'|'out'} mode - Hide or show element after animating
   * @param  {Element} element - Element to animate in
   * @param {(String|String[])} animationClass - Class with the element's in animation
   * @param {String|boolean} animationOutClass - 'Out' class to remove.
   * @param {Object} styleProperties - Object of style properties to set on the target element
   * @returns {undefined}
   *
   */
  transitionAnimation(
    mode = "in",
    element,
    animationClass,
    animationOutClass = false,
    styleProperties = false,
  ) {
    if (animationOutClass) {
      element.classList.toggle(animationOutClass, false);
    }

    if (styleProperties) {
      setStyles(element, styleProperties);
    }

    showElement(element);
    supportArrayAndSingularValue(animationClass, (value) => {
      element.classList.toggle(value);
    });

    element.addEventListener("animationend", () => {
      element.classList.toggle(animationClass, false);
      if (mode === "out") {
        hideElement(element);
      }
    });
  },
};

export default animationFunctions;
