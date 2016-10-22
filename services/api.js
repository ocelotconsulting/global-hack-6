const express = require('express')

const router = express.Router()

router.use('/clients', require('./clients'))

router.use('/shelters', require('./shelters'))

router.use('/notifications', require('./sms'))

// make sure /services sends a 404
router.use('/*', (req, res) => res.status(404).send('Route not found'))

module.exports = router
