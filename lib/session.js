const typeforce = require('typeforce')
const extend = require('xtend/mutable')
const pick = require('object.pick')
const co = require('co')
const request = require('superagent')
const types = require('./types')
const Tx = require('./tx')
const TxReqBodyBuilder = require('./builders/tx-req-body')

module.exports = Session

function Session (session={ token, appUserId, consumerReference  }) {
  typeforce({
    token: typeforce.String,
    appUserId: typeforce.String,
    consumerReference: typeforce.String,
    serverName: typeforce.String
  }, session)

  extend(this, session)
}

Session.prototype.createTransaction = function ({
  transactionReference,
  transactionType,
  callback,
  deviceEnvironment,
  geo,
  signatureStepRequired
}) {
  const opts = arguments[0]
  const bodyBuilder = new TxReqBodyBuilder(opts)
  const { token, serverName } = this
  const headers = { token }
  if (deviceEnvironment) {
    // Environment-OS-Version:"4.4.2"
    // Environment-SDK-Version:"4.3.4"
    // Environment-Device-Type:"Samsung GT-I9505"
    // Environment-GeoService-Enabled:true
    // Environment-GeoService-Refused-By-User:false
    // Environment-GeoService-Not-Supported:true
    headers['Environment-OS-Version'] = deviceEnvironment.osVersion
    headers['Environment-SDK-Version'] = deviceEnvironment.sdkVersion
    headers['Environment-Device-Type'] = deviceEnvironment.deviceType
    headers['Environment-GeoService-Enabled'] = deviceEnvironment.geoServiceEnabled
    headers['Environment-GeoService-Refused-By-User'] = deviceEnvironment.geoServiceRefused
    headers['Environment-GeoService-Not-Supported'] = deviceEnvironment.geoServiceNotSupported
  }

  if (geo) {
    headers['Meta-Geolocation-Lat'] = geo.lat
    headers['Meta-Geolocation-Long'] = geo.long
  }

  bodyBuilder.exec = co.wrap(function* () {

  })

  return bodyBuilder
}

Session.prototype.validateDocument = co.wrap(function* (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = yield request
    .post(this._getUrl(`/document/validate`))
    .set({ token: this.token })
    .send({ image })

  return result
})

Session.prototype.validateFace = co.wrap(function* (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = yield request
    .post(this._getUrl(`/face/validate`))
    .set({ token: this.token })
    .send({ image })

  return result
})

Session.prototype._getUrl = function (path) {
  if (path[0] === '/') path = path.slice(1)

  return `https://${this.serverName}.paycasso.com/api/${path}`
}
