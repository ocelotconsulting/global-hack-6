const agent = require('../src/agent')
const { couchUrl } = require('./config')
const express = require('express')

const router = express.Router()

router.post('/', (req, res, next) => {
  agent.post(`${couchUrl}/foobar/_bulk_docs`)
  .send({ docs: require('./docs.json') })
  .then(({ body }) => res.json(body))
  .catch(next)
})

module.exports = router
