const mango = require('../mango')

const shelterMango = (shelterId) => ({
  selector: {
    _id: {
      $eq: `${shelterId}`
    },
    'sns-topic': {
      $gt: null
    }
  },
  fields: ['_id', 'sns-topic', 'contact', 'name']
})

const getTopic = (shelterId) =>
 mango('shelters', shelterMango(shelterId))
  .then((shelters) => shelters[0])

module.exports = getTopic
