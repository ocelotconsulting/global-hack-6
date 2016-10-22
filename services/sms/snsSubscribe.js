const getSNSTopic = require('./getSNSTopic')
const getSNS = require('../aws/getSNS')
const snsPublish = require('./snsPublish')

const subscribeToTopic = (TopicArn, Endpoint) =>
 getSNS().subscribe({
   TopicArn,
   Endpoint,
   Protocol: 'sms'
 }).promise()

const subscribe = (req, res, next) =>
  getSNSTopic(req.query.shelterId)
  .then((shelter) =>
    subscribeToTopic(shelter['sns-topic'], req.query.phone)
    .then((resp) => snsPublish(undefined, req.query.phone, `Confirmed for bed notifications at ${shelter['name']}.`))
  )
  .then((resp) => res.json(resp))

module.exports = subscribe
