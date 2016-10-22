import _ from 'underscore'
import agent from '../agent'

const mapById = shelters => _(shelters).chain().map(s => [s.id, s]).object().value()

const sheltersById = () =>
  agent.get('/services/shelters')
  .then(({ body }) => mapById(body))

export default sheltersById
