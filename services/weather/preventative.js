const history = require('./history')

const tooHotLimit = 90
const tooColdLimit = 40

module.exports = () =>
  history()
  .then((weatherHistory) => {
    console.log('got history', weatherHistory)
    const sumLow = weatherHistory.reduce(((currValue, nextWeather) => currValue + nextWeather.doc.temperatureMin), 0)
    const avgLow = sumLow / weatherHistory.length
    const sumHigh = weatherHistory.reduce(((currValue, nextWeather) => currValue + nextWeather.doc.temperatureMax), 0)
    const avgHigh = sumHigh / weatherHistory.length

    console.log(`avgLow: ${avgLow}`)
    console.log(`avgHigh: ${avgHigh}`)

    let message = ''
    let avg = 0
    if (avgHigh > tooHotLimit) {
      message = 'This months average temperature is higher than normal.  Expect to see an increase in utility bills and homeless conversations to the street.'
      avg = avgHigh
    } else if (avgLow < tooColdLimit) {
      message = 'This months average temperature is lower than normal.  Expect to see an increase in utility bills and homeless conversations to the street.'
      avg = avgLow
    }

    return {
      monthlyAverage: avg,
      message: message
    }
  })
