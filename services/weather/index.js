const express = require('express')
const router = express.Router()
const getForecast = require('./getForecast')
const getHistory = require('./history')
const preventative = require('./preventative')

router.get('/', (req, res, next) =>
  getForecast()
  .then(forecast => res.json(forecast))
  .catch(next)
)

router.get('/history', (req, res, next) =>
  getHistory()
  .then(history => res.json(history))
  .catch(next)
)

router.get('/preventative', (req, res, next) =>
  preventative()
  .then(history => res.json(history))
  .catch(next)
)

module.exports = router
