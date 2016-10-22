const express = require('express')
const router = express.Router()
const snsSubscribe = require('./snsSubscribe')
const notifyOfAvailability = require('./notifyOfAvailability')

router.post('/subscribe', snsSubscribe)
router.post('/send', notifyOfAvailability)

module.exports = router
