const express = require('express')
const mango = require('./mango')

const shelterMango = (shelterId) => ({
  selector: {
    _id: {
      $eq: `${shelterId}`
    },
    'sns-topic': {
      $gt: null
    }
  },
  fields: ['_id', 'sns-topic']
})

const getTopic = (req, res, next) =>
 mango('shelters', shelterMango(req.query.shelterId))
  .then((shelters) => res.json(shelters))

module.exports = getTopic
