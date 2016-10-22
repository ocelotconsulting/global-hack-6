const getSNSTopic = require('./getSNSTopic')
const snsPublish = require('./snsPublish')

const subscribe = (req, res, next) =>
  getSNSTopic(req.query.shelterId)
  .then((shelter) => snsPublish(shelter['sns-topic'], undefined,
    `You requested to receive notifications of available beds at ${shelter['name']}. One may be available. Please contact ${shelter['contact']['phone']} for info.`))
  .then((resp) => res.json(resp))

module.exports = subscribe
