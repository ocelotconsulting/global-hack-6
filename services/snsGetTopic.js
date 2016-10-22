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

const getTopic = (shelterId) =>
 mango('shelters', shelterMango(shelterId))
  .then((shelters) => shelters[0]['sns-topic'])

module.exports = getTopic
