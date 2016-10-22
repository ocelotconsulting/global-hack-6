const agent = require('../../src/agent')
const { couchUrl } = require('../config')

module.exports = () =>
  agent.get(`${couchUrl}/shelters/_design/beds/_view/all?include_docs=true`)
  .then(({ body: { rows } }) =>
    rows.map(({ doc }) => doc)
  )
