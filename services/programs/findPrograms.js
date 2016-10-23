const agent = require('../../src/agent')
const { couchUrl } = require('../config')
const mango = require('../mango')

const db = 'programs'

const findByType = (type) =>
  mango(db, { selector: { type } })

const findAll = () =>
  agent.get(`${couchUrl}/${db}/_all_docs?include_docs=true`)
  .then(({ body: { rows } }) => rows.filter(row => row.id[0] !== '_').map(({ doc }) => doc))

module.exports = (type) => type ? findByType(type) : findAll()
