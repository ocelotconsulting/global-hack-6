const agent = require('../src/agent')
const distance = require('./distance')
const { couchUrl } = require('./config')

const get = () =>
  agent.get(`${couchUrl}/shelters/_design/beds/_view/all?include_docs=true`)
  .then(({ body: { rows } }) =>
    rows.map(({ doc }) => doc)
  )

const getAvailableBedCountByType = (doc, type) => {
  let bedsAvailable = 0
  console.log('got a doc', doc)
  const matchingBeds = doc.beds.filter(bed => bed.who.indexOf(type) >= 0)

  if (matchingBeds && matchingBeds.length === 1) {
    const reserved = (doc.reservations && doc.reservations[type] && doc.reservations[type].length > 0) ? doc.reservations[type].length : 0
    bedsAvailable = matchingBeds[0].count - reserved
  }
  return bedsAvailable
}

exports.get = get

exports.findClose = ({ origin }) => {
  return get()
  .then(docs => {
    const distances = docs.map(doc => {
      const shelterAddress = `${doc.street}, ${doc.city}, ${doc.state}, ${doc.zip}`
      return distance({ origin, destination: shelterAddress })
      .then(result => {
        return {
          shelter: {
            name: doc.name,
            address: shelterAddress,
            contact: doc.contact,
            open_beds: {
              men: getAvailableBedCountByType(doc, 'men'),
              women: getAvailableBedCountByType(doc, 'women'),
              children: getAvailableBedCountByType(doc, 'children'),
              infants: getAvailableBedCountByType(doc, 'infants')
            },
            hours_for_intake: doc.hours_for_intake,
            restrictions: doc.restrictions
          },
          distance: {
            walking: result.rows[0].elements[0]
          }
        }
      })
    })
    return Promise.all(distances)
  })
}
