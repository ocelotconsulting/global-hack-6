const express = require('express')
const router = express.Router()
const searchUser = require('./searchUser')

router.get('/', searchUser)

module.exports = router
