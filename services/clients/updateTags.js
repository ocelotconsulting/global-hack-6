const getDoc = require('./getDoc')
const putDoc = require('./putDoc')
const _ = require('underscore')

const db = 'clients'

module.exports = ({ params: { id }, body }, res, next) => {
  const { add, remove } = body
  getDoc(db, id)
  .then(doc => {
    if (doc) {
      doc.tags = _(doc.tags || []).chain().union(add || []).without(remove || []).value()
      putDoc(db, doc)
      .then(({ body }) => res.json(body))
    } else {
      res.status(404).send(`client ${id} not found`)
    }
  })
  .catch(next)
}
