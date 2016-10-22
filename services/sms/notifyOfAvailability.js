const getSNSTopic = require('./getSNSTopic')
const snsPublish = require('./snsPublish')

const notify = (shelterId) =>
  getSNSTopic(shelterId)
  .then((shelter) => snsPublish(shelter['sns-topic'], undefined,
    `You requested to receive notifications of available beds at ${shelter['name']}. One may be available. Please contact ${shelter['contact']['phone']} for info.`))

module.exports = notify
