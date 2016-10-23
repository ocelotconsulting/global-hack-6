const express = require('express')
const router = express.Router()
const getAll = require('./getAll')
const getById = require('./getById')
const findClose = require('./findClose')
const reserve = require('./reserve')

router.get('/', (req, res, next) =>
  getAll()
  .then(shelters => res.json(shelters))
  .catch(next)
)

router.get('/:id', ({ params: { id } }, res, next) =>
  getById(id)
  .then(shelter => shelter ? res.json(shelter) : res.status(404).send('not found'))
  .catch(next)
)

router.post('/', (req, res, next) => {
  console.log(`searching for beds at ${req.body.lat}, ${req.body.long}`)
  return findClose({ origin: `${req.body.lat}, ${req.body.long}` })
  .then(response => res.json(response))
  .catch(next)
})

router.post('/:id/reservations', (req, res, next) => {
  console.log(`making a reservation on ${req.params.id} with`, req.body)
  return reserve({ shelterId: req.params.id, clientId: req.body.clientId, bedTypes: req.body.bedTypes })
  .then(response => res.json(response))
  .catch(next)
})

module.exports = router
