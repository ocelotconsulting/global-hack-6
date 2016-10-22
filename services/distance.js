const { googleMapsKey } = require('./config')
const cache = require('memory-cache')


const googleMapsClient = require('@google/maps').createClient({
  key: googleMapsKey
})

const distance = ({ origin, destination }) => {
  const origins = origin.split(', ')
  const cacheKey = `${Number.parseInt(origins[0])}_${Number.parseInt(origins[1])}_${destination}`
  const cachedResult = cache.get(cacheKey)
  if (cachedResult) {
    console.log(`found distance for ${cacheKey} in cache, returning...`)
    return Promise.resolve(cachedResult)
  } else {
    console.log(`couldn't found distance for ${cacheKey} in cache, querying...`)
    return new Promise((resolve, reject) =>
      googleMapsClient.distanceMatrix({
        origins: [origin],
        destinations: [destination],
        mode: 'walking',
        departure_time: Date.now(),
        units: 'imperial',
        avoid: [],
        traffic_model: 'best_guess'
      }, (err, response) => {
        if (!err) {
          cache.put(cacheKey, response.json)
          resolve(response.json)
        } else {
          console.error(err)
          reject(err)
        }
      })
    )
  }
}

module.exports = distance
