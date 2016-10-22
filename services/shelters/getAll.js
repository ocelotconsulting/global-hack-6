const agent = require('../../src/agent')
const { couchUrl } = require('../config')

module.exports = () =>
  agent.get(`${couchUrl}/shelters/_design/beds/_view/all_with_summary`)
  .then(({ body: { rows } }) =>
    rows.map(row => {
      row.value.id = row.id
      return row.value
    })
  )
