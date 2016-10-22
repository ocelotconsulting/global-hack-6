const express = require('express')
const agent = require('../../src/agent')
const { couchUrl } = require('../config')
const _ = require('underscore')

const router = express.Router()

const getClients = (q) =>
  agent.post(`${couchUrl}/clients/_find`)
  .send({
    selector: {
      _id: {
        $gt: null
      },
      last_name: {
        $regex: `(?i)^(${q})`
      }
    }
  })
  .then(({ body }) => body.docs)

router.get('/', (req, res) =>
  getClients(req.query.q)
  .then((clients) => res.json(_(clients).sortBy('first_name')))
)

module.exports = router
