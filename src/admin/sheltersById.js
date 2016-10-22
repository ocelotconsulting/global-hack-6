import _ from 'underscore'
import agent from '../agent'

let promise = null
let result = null

const set = (aResult) => {
  result = aResult
  return result
}

const mapById = shelters => _(shelters).chain().map(s => [s.id, s]).object().value()

fetch = () =>
  agent.get('/services/shelters')
  .then(({ body }) => set(mapById(body)))

const sheltersById = () =>
  promise = promise || fetch()

sheltersById.valueOf = (id) => {
  if (!result) throw new Error('no results')
  return result[id]
}

export default sheltersById
