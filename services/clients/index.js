const express = require('express')
// const agent = require('../src/agent')
// const moment = require('moment')
const mockData = require('./mockData.json')
const _ = require('underscore')

const router = express.Router()

router.get('/', (req, res) => {
  const {q} = req.query
  const data = mockData
  .filter((data) => (data.last_name || '').toLowerCase().startsWith(q.toLowerCase()))
  res.json(_(data).sortBy('first_name'))
})

module.exports = router
