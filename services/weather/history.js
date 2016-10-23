const agent = require('../../src/agent')
const { couchUrl } = require('../config')

module.exports = () =>
  agent.get(`${couchUrl}/weather/_all_docs?include_docs=true`)
  .then(({ body: { rows } }) => rows)
