const snsGetTopic = require('./snsGetTopic')
const getSNS = require('./aws/getSNS')

const subscribeToTopic = (TopicArn, Endpoint) =>
 getSNS().subscribe({
   TopicArn,
   Endpoint,
   Protocol: 'sms'
 }).promise()

const subscribe = (req, res, next) =>
  snsGetTopic(req.query.shelterId)
  .then((topic) => subscribeToTopic(topic, req.query.phone))
  .then((resp) => res.json(resp))

module.exports = subscribe
