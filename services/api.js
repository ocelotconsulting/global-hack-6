const express = require('express')
const agent = require('../src/agent')
const moment = require('moment')
const clients = require('./clients')
const shelters = require('./shelters')
const snsSubscribe = require('./snsSubscribe')

const router = express.Router()

// example service
const timeFormat = 'YYYY-MMM-DD hh:mm:ss A Z'

router.get('/now', (req, res, next) => {
  agent.get('http://www.timeapi.org/utc/now')
  .accept('json')
  .then(({ body: { dateString } }) => res.send(`Current time is ${moment(dateString).format(timeFormat)}`))
  .catch(next)
})

router.post('/subscribe', snsSubscribe)

router.use('/clients', clients)

router.post('/shelters/', (req, res, next) => {
  console.log('searching shelters with a body of: ', req.body)
  const expectedBody = {
    lat: 38.628551,
    long: -90.197504,
    people: {
      men: 0,
      women: 1,
      children: 0,
      infants: 1
    }
  }
  shelters.findClose({
    origin: `${expectedBody.lat}, ${expectedBody.long}`
  })
  .then((response) => {
    return res.json(response)
  })
  .catch((err) => res.json(err))
})

router.use('/*', (req, res, next) => {
  res.status(404).send('Route not found')
})

module.exports = router
