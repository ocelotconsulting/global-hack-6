const AWS = require('aws-sdk')

const getBody = (reservation) => {
  const text = `Give yourself a pat on the back. Thanks to your intervention, ${reservation.clientName} has a place to sleep tonight.  You've  earned your community's thanks.`.trim()
  const html = `  <h4>Give yourself a pat on the back</h4> Thanks to your intervention, ${reservation.clientName} has a place to sleep tonight.  You've earned your community's thanks.`

  return {
    Html: { Data: html, Charset: 'UTF-8' },
    Text: { Data: text, Charset: 'UTF-8' }
  }
}

module.exports = (reservation) => {
  const { requestor: { email, name } } = reservation

  const ses = new AWS.SES({region: 'us-east-1'})
  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: getBody(reservation),
      Subject: { Data: `${name || email}, thanks for making a difference`, Charset: 'UTF-8' }
    },
    Source: 'no-reply@johnomalley.net'
  }
  ses.sendEmail(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log(data)
    }
  })
}

