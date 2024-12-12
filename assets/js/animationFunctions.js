import utils from './utils.js'

const { showElement, hideElement, setStyles, supportArrayAndSingularValue } =
  utils

/**
 * Object containing animation functions.
 *
 * @namespace animationFunctions
 */

/**
 * Animate an element in or out.
 *
 * @function transitionAnimation
 * @memberof animationFunctions
 * @param {Object} opts - Options for the animation.
 * @param {'in'|'out'} [opts.mode='in'] - Hide or show element after animating.
 * @param {Element} opts.element - Element to animate.
 * @param {(String|String[])} opts.animationClass - Class with the element's in animation.
 * @param {String|boolean} [opts.animationOutClass=false] - 'Out' class to remove.
 * @param {Object} [opts.styleProperties=false] - Object of style properties to set on the target element.
 * @param {Function} callback - Callback to be called after the animation ends.
 * @returns {Promise} Promise that resolves after the animation ends.
 */
const animationFunctions = {
  transitionAnimation(opts, callback = () => {}) {
    console.log()
    const {
      mode = 'in',
      element,
      animationClass,
      animationOutClass = false,
      styleProperties = false,
    } = opts

    const transitionAnimationPromise = new Promise(resolve => {
      if (animationOutClass) {
        element.classList.toggle(animationOutClass, false)
      }

      showElement(element)
      supportArrayAndSingularValue(animationClass, value => {
        element.classList.toggle(value)
      })

      element.addEventListener('animationend', () => {
        if (styleProperties) {
          setStyles(element, styleProperties)
        }
        element.classList.toggle(animationClass, false)
        if (mode === 'out') {
          hideElement(element)
        }
        resolve(1)
        callback()
      })
    })

    return transitionAnimationPromise
  },
}

export default animationFunctions
