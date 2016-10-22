const agent = require('../src/agent')
const distance = require('./distance')
const { couchUrl } = require('./config')

const get = () =>
  agent.get(`${couchUrl}/shelters/_all_docs?include_docs=true`)
  .then(({ body: { rows } }) =>
    rows.map(({ doc }) => doc)
  )

exports.get = get

exports.findClose = ({ origin }) => {
  get()
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
            open_beds: doc.beds.total,
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
