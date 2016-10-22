const agent = require('../../src/agent')
const { couchUrl } = require('../config')

const execMango = (db, mango) =>
  agent.get(`${couchUrl}/_uuids?count=1`)
  .then(({ body }) => body.uuids[0])

module.exports = execMango
