const _ = require('underscore')
const aws4 = require('aws4')
const https = require('https')

module.exports = ({ host, credentials }) => {
  return ({ path, method, body, headers = {}, json = true }) => {
    const options = {
      host,
      path,
      method: method || (body ? 'POST' : 'GET'),
      headers
    }
    if (_(body).isObject()) {
      options.body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json; charset=utf-8'
    } else if (_(body).isString()) {
      options.body = body
    }

    const signed = aws4.sign(options, credentials)

    return new Promise((resolve, reject) => {
      const request = https.request(signed, (res) => {
        let responseBody = ''
        res.on('data', chunk => responseBody += chunk)

        const result = () => json && responseBody ? JSON.parse(responseBody) : responseBody

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result())
          } else {
            reject({ status: res.statusCode, body: responseBody })
          }
        })
      })
      request.on('error', reject)
      request.end(signed.body || '')
    })
  }
}
