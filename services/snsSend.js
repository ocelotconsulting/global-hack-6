const snsGetTopic = require('./snsGetTopic')
const getSNS = require('./aws/getSNS')

const publishToTopic = (TopicArn, Endpoint) =>
 getSNS().subscribe({
   TopicArn,
   Endpoint,
   Protocol: 'sms'
 }).promise()

const send = (req, res, next) =>
  snsGetTopic(req.query.shelterId)
  .then((topic) => publishToTopic(topic))
  .then((resp) => res.json(resp))

module.exports = send
