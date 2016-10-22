const AWS = require('aws-sdk')

module.exports = () => new AWS.SNS({region: 'us-east-1'})
