const express = require('express')
const router = express.Router()
const getAll = require('./getAll')
const getById = require('./getById')
const findClose = require('./findClose')

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

router.post('/', (req, res, next) => {
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
  findClose({ origin: `${expectedBody.lat}, ${expectedBody.long}` })
  .then(response => res.json(response))
  .catch(next)
})

module.exports = router
