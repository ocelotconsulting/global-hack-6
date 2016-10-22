const getSNS = require('../aws/getSNS')

const params = (TopicArn, PhoneNumber, Message) =>
  Object.assign({}, {TopicArn}, {PhoneNumber}, {Message})

const snsPublish = (TopicArn, PhoneNumber, Message) =>
  getSNS().publish(params(TopicArn, PhoneNumber, Message)).promise()

module.exports = snsPublish
