const express = require('express')
const agent = require('./agent')
const moment = require('moment')

const router = express.Router()

// example service
const timeFormat = 'YYYY-MMM-DD hh:mm:ss A Z'
router.get('/now', (req, res, next) => {
  agent.get('http://www.timeapi.org/utc/now')
  .accept('json')
  .then(({ body: { dateString } }) => res.send(`Current time is ${moment(dateString).format(timeFormat)}`))
  .catch(next)
})

module.exports = router
