const agent = require('../../src/agent')
const { darklyKey } = require('../config')

const apiUrl = 'https://api.darksky.net/forecast'
const locationForApi = '38.633665,-90.195588'

const getForecast = () =>
  agent.get(`${apiUrl}/${darklyKey}/${locationForApi}`)
  .then(({ body }) => {
    console.log('get forecast', body)
    return body
  })

module.exports = getForecast
