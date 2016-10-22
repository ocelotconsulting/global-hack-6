const agent = require('../src/agent')
const { couchUrl } = require('./config')

module.exports = (id) =>
  agent.get(`${couchUrl}/${encodeURIComponent(id)}`)
  .then(({ body }) => body)
