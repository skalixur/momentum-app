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
   * @param {Function} callback - Callback to be called after the animation ends.
   * @returns {undefined}
   *
   */
  transitionAnimation(
    mode = "in",
    element,
    animationClass,
    animationOutClass = false,
    styleProperties = false,
    callback,
  ) {
    if (animationOutClass) {
      element.classList.toggle(animationOutClass, false);
    }

    showElement(element);
    supportArrayAndSingularValue(animationClass, (value) => {
      element.classList.toggle(value);
    });

    element.addEventListener("animationend", () => {
      if (styleProperties) {
        setStyles(element, styleProperties);
      }
      element.classList.toggle(animationClass, false);
      if (mode === "out") {
        hideElement(element);
      }
      callback();
    });
  },
};

export default animationFunctions;
