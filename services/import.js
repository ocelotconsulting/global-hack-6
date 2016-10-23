const agent = require('../src/agent')
const { couchUrl } = require('./config')
const express = require('express')

const router = express.Router()

router.post('/', (req, res, next) => {
  const docs = require('./docs.json')
  Promise.all(docs.map(d =>
    agent.put(`${couchUrl}/programs/${d._id}`)
    .send(d)
    .then(({ body }) => body)
  ))
  .then(results => res.json(results))
  .catch(next)
})

module.exports = router
