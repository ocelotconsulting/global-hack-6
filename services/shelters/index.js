const express = require('express')
const router = express.Router()
const getAll = require('./getAll')
const getById = require('./getById')

router.get('/', (req, res, next) =>
  getAll()
  .then(shelters => res.json(shelters))
  .catch(next)
)

router.get('/:id', ({ params: { id } }, res, next) =>
  getById(id)
  .then(shelter => res.json(shelter))
  .catch(next)
)
