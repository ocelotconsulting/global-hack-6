const express = require('express')
const router = express.Router()
const snsSubscribe = require('./snsSubscribe')

router.post('/subscribe', snsSubscribe)

module.exports = router
