const Client = require('node-rest-client').Client

exports = module.exports = toPromisifiedClient
exports.promisify = toPromisifiedClient

exports.createClient = function (opts) {
  return toPromisifiedClient(new Client(opts))
}

function toPromisifiedClient (client) {
  const api = {}
  ;['get', 'put', 'post'].forEach(method => {
    api[method] = promisifyMethod(client, method)
  })

  return api

  function promisifyMethod (client, method) {
    return function (...args) {
      return new Promise(function (resolve, reject) {
        const req = client[method](...args, function (data, response) {
          if (response.statusCode !== 200) {
            const err = Buffer.isBuffer(data) ? data.toString() : JSON.stringify(data)
            return reject(new Error(err))
          }

          resolve(data)
        })

        req.on('error', reject)
      })
    }
  }
}
