const utils = {
  getOnlyValueIfArrayLengthIs1: function (arr) {
    return arr.length === 1 ? arr[0] : arr
  },
}

export default utils
