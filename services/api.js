const express = require('express')
const agent = require('../src/agent')
const moment = require('moment')
const clients = require('./clients')

const router = express.Router()

// example service
const timeFormat = 'YYYY-MMM-DD hh:mm:ss A Z'

router.get('/now', (req, res, next) => {
  agent.get('http://www.timeapi.org/utc/now')
  .accept('json')
  .then(({ body: { dateString } }) => res.send(`Current time is ${moment(dateString).format(timeFormat)}`))
  .catch(next)
})

router.use('/clients', clients)

router.use('/*', (req, res, next) => {
  res.status(404).send('Route not found')
})

module.exports = router
