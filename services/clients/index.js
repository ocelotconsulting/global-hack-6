const express = require('express')
const _ = require('underscore')
const mango = require('../mango')
const router = express.Router()

const clientMango = (q) => ({
  selector: {
    _id: {
      $gt: null
    },
    last_name: {
      $regex: `(?i)^(${q})`
    }
  }
})

router.get('/', (req, res) =>
  mango('clients', clientMango(req.query.q))
  .then((clients) => res.json(_(clients).sortBy('first_name')))
)

module.exports = router
