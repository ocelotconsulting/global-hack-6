const { googleMapsKey } = require('./config')
const googleMapsClient = require('@google/maps').createClient({
  key: googleMapsKey
})

const distance = ({origin, destination}) => {
  return new Promise((resolve, reject) => {
    googleMapsClient.distanceMatrix({
      origins: [origin],
      destinations: [destination],
      mode: 'walking',
      departure_time: new Date().getTime(),
      units: 'imperial',
      avoid: [],
      traffic_model: 'best_guess'
    }, function (err, response) {
      if (!err) {
        resolve(response.json)
      } else {
        console.error(err)
        reject(err)
      }
    })
  })
}

module.exports = distance
