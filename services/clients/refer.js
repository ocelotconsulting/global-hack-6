const getDoc = require('./getDoc')
const putDoc = require('./putDoc')
const moment = require('moment')

const db = 'clients'

const update = (doc, referral) => {
  const newHistory = {
    id: referral.id,
    referralDate: moment().toISOString(),
    name: referral.name,
    center: referral.location
  }
  doc.history = [newHistory].concat(doc.history || [])
  return doc
}

module.exports = ({ body, params: { id } }, res, next) =>
  getDoc(db, id)
  .then(doc => doc ? (
    putDoc(db, update(doc, body))
    .then(result => res.json(result))
  ) : (
    res.status(404).send(`no such client: ${id}`)
  ))
  .catch(next)
