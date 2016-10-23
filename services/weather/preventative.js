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
      avg = avgHigh
      message = `This months average temperature ${Number.parseInt(avg)}F is higher than normal.  This is a good opportunity raise awareness of the Utility Assistance Programs that are available.`
    } else if (avgLow < tooColdLimit) {
      avg = avgLow
      message = `This months average temperature ${Number.parseInt(avg)}F is lower than normal.  This is a good opportunity raise awareness of the Utility Assistance Programs that are available.`
    } else {
      avg = (avgHigh + avgLow) / 2
      message = `This months average high ${Number.parseInt(avgHigh)}F and average low ${Number.parseInt(avgLow)}F are not expected to have a significant impact to utiliy bills.`
    }

    return {
      monthlyAverage: avg,
      message: message
    }
  })
