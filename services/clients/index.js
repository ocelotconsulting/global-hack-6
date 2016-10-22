const express = require('express')
const router = express.Router()
const searchClient = require('./searchClient')
const upsertClient = require('./upsertClient')
const getClient = require(`./getClient`)

router.get('/', searchClient)
router.post('/', upsertClient)
router.get('/:id', getClient)

module.exports = router
