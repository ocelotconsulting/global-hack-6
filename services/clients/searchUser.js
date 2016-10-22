const _ = require('underscore')
const mango = require('../mango')

const clientMango = (q) => ({
  selector: {
    _id: {
      $gt: null
    },
    last_name: {
      $regex: `(?i)^(${q})`
    }
  }
})

const searchUser = (req, res) =>
  mango('clients', clientMango(req.query.q))
  .then((clients) => res.json(_(clients).sortBy('first_name')))

module.exports = searchUser
