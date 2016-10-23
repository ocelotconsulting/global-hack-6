const mango = require('./mango')
const _ = require('underscore')

const clientMango = () => ({
  selector: {
    _id: {
      $gt: null
    }
  },
  limit: 600
})

const metadata = ['_id', '_rev', 'coc', 'name', 'year']

const getClients = (req, res) =>
  mango('coc_estimates_in_time', clientMango())
  .then((data) => {
    const labels = _(Object.keys(data[0])).difference(metadata)
    const series = data.map((coc_time) => labels.map((label) => coc_time[label]))
    res.send({labels, series})
  })

module.exports = getClients
