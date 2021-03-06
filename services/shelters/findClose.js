const _ = require('underscore')
const getAll = require('./getAll')
const distance = require('../distance')

module.exports = ({ origin }) => {
  return getAll()
  .then(docs => {
    const distances = docs.map(doc => {
      const shelterAddress = `${doc.street}, ${doc.city}, ${doc.state}, ${doc.zip}`

      const getAvailableBedCountByType = (type) => {
        let bedsAvailable = 0
        console.log('got a doc', doc)
        const matchingBeds = doc.beds.filter(bed => bed.who.indexOf(type) >= 0)

        if (matchingBeds && matchingBeds.length === 1) {
          const reserved = (doc.reservations && doc.reservations[type] && doc.reservations[type].length > 0) ? doc.reservations[type].length : 0
          bedsAvailable = matchingBeds[0].count - reserved
        }
        return bedsAvailable
      }

      return distance({ origin, destination: shelterAddress })
      .then(result => {
        return {
          shelter: doc,
          distance: {
            walking: result.rows[0].elements[0]
          }
        }
      })
    })
    return Promise.all(distances)
  })
  .then(results => _.sortBy(results, shelter => shelter.distance.walking.distance.value))
}
