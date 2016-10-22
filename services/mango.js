const agent = require('../src/agent')
const { couchUrl } = require('./config')

const execMango = (db, mango) =>
  agent.post(`${couchUrl}/${db}/_find`)
  .send(mango)
  .then(({ body }) => body.docs)

module.exports = execMango
