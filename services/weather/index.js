const express = require('express')
const router = express.Router()
const getForecast = require('./getForecast')

router.get('/', (req, res, next) =>
  getForecast()
  .then(forecast => res.json(forecast))
  .catch(next)
)

module.exports = router
