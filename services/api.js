const express = require('express')
const agent = require('../src/agent')
const moment = require('moment')
const clients = require('./clients')
const shelters = require('./shelters')

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

router.get('/shelters/', (req, res, next) => {
  shelters.findClose({
    origin: '3264 Olive St, St. Louis, MO, 63103'
  })
  .then((response) => {
    console.log(response)
    return res.json(response)
  })
  .catch((err) => res.json(err))
})

module.exports = router
