const getUUID = require('./getUUID')
const _ = require('underscore')
const putDoc = require('./putDoc')
const getDoc = require('./getDoc'
)
const toDocJSON = (_id, client, _rev, ssn) =>
  _.defaults(client, Object.assign({_id}, {_rev}, {ssn}))

const getID = (client) => (client['_id'] !== undefined) ? Promise.resolve(client['_id']) : getUUID()

const upsertClient = (req, res) =>
  getID(req.body)
  .then((id) =>
    getDoc('clients', id)
    .then((doc) => putDoc('clients', toDocJSON(id, req.body,
      (doc && doc['_rev'] !== undefined) ? doc['_rev'] : undefined,
      (doc && doc['ssn'] !== undefined) ? doc['ssn'] : undefined))
    )
  )
  .then((resp) => {
    console.log(resp.body)
    res.json(resp.body)
  })

module.exports = upsertClient
