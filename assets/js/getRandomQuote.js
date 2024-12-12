import utils from './utils.js'

const { getOnlyValueIfArrayLengthIs1 } = utils


export default async function getRandomQuote(amount = 1) {
  const res = await fetch(`https://dummyjson.com/quotes/random/${amount}`)
  const data = await res.json()
  let result = []

  for (let quoteData of data) {
    const { quote, author } = quoteData
    result.push({ quote, author })
  }

  result = getOnlyValueIfArrayLengthIs1(result)

  return result
}
