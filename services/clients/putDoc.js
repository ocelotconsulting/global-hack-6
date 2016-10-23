const agent = require('../../src/agent')
const { couchUrl } = require('../config')

const putDoc = (db, doc) =>
  agent.put(`${couchUrl}/${db}/${doc['_id']}`)
  .set({Accept: 'application/json'})
  .send(doc)

module.exports = putDoc
