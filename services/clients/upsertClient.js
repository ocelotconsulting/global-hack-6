const getUUID = require('./getUUID')
const _ = require('underscore')
const putDoc = require('./putDoc')
const getDoc = require('./getDoc'
)
const toDocJSON = (_id, client, _rev) =>
  _.defaults(client, Object.assign({
    _id,
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '1/1/00',
    email: '',
    phone: ''
  }, {_rev}))

const getID = (client) => (client['_id'] !== undefined) ? Promise.resolve(client['_id']) : getUUID()

const searchUser = (req, res) =>
  getID(req.body)
  .then((id) =>
    getDoc('clients', id)
    .then((doc) => putDoc('clients', toDocJSON(id, req.body, (doc && doc['_rev'] !== undefined) ? doc['_rev'] : undefined)))
  )
  .then((resp) => res.json(resp))

module.exports = searchUser
