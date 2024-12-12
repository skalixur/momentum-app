const utils = {
  /**
   * Returns the only value of an array if its length is 1, otherwise returns the array.
   *
   * @param {Array} arr - The array to get only value of.
   * @returns Array|any
   *
   */
  getOnlyValueIfArrayLengthIs1(arr) {
    return arr.length === 1 ? arr[0] : arr
  },

  /**
   * Shows an element.
   *
   * @param {Element} element - Element to show.
   * @param {String} displayMode - Display to set when showing the element
   * @returns {Element}
   *
   */
  showElement(element, displayMode = 'block') {
    element.style.display = displayMode
  },

  /**
   * Hides an element.
   *
   * @param {Element} element - Element to hide.
   * @returns {Element}
   *
   */
  hideElement(element) {
    element.style.display = 'none'
  },

  /**
   * Sets the styles of an element.
   *
   * @param element - Element to set the styles of
   * @param {Object} styleProperties - Object of style properties to set on the target element
   * @returns {undefined}
   *
   */
  setStyles(element, styleProperties) {
    for (const stylePropertyName in styleProperties) {
      const stylePropertyValue = styleProperties[stylePropertyName]
      element.style[stylePropertyName] = stylePropertyValue
    }
  },

  /**
   *
   * @callback Callback
   * @param {any} value - The current element being processed in the array or the singular value.
   * @param {number} index - The index of the current element being processed in the array, or 0 if processing a singular value.
   * @param {(Array|any)} arrayOrString - The array being processed, or the singular value.
   */

  /**
   * Executes a callback function for each element in an array or for a singular value.
   *
   * @param {(Array|any)} arrayOrString - The array or singular value to process.
   * @param {Callback} callback - The function to execute for each element or singular value.
   *
   * @returns {undefined}
   */
  supportArrayAndSingularValue(arrayOrString, callback) {
    if (!Array.isArray(arrayOrString)) {
      callback(arrayOrString, 0, arrayOrString)
      return
    }
    arrayOrString.forEach((v, i, a) => callback(v, i, a))
  },
}

export default utils
