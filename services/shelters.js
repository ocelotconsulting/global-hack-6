const agent = require('../src/agent')
const distance = require('./distance')
const { couchUrl } = require('./config')

const get = () => {
  return agent.get(`${couchUrl}/shelters/_all_docs?include_docs=true`)
  .then(({ body }) => body)
}

const findClose = ({origin}) => {
  return Promise.resolve()
  .then(get)
  .then(({rows}) => {
    const distances = rows.map((row) => {
      const shelterAddress = `${row.doc.street}, ${row.doc.city}, ${row.doc.state}, ${row.doc.zip}`
      return distance({origin: origin, destination: shelterAddress})
      .then((result) => {
        return {
          shelter: {
            name: row.doc.name,
            address: shelterAddress,
            contact: row.doc.contact,
            open_beds: row.doc.beds.total,
            hours_for_intake: row.doc.hours_for_intake,
            restrictions: row.doc.restrictions
          }, distance: {
            walking: result.rows[0].elements[0]
          }
        }
      })
    })
    return Promise.all(distances)
  })
}

module.exports = {
  get: get,
  findClose: findClose
}
