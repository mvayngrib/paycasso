import typeforce from 'typeforce'
import extend from 'xtend/mutable'
import pick from 'object.pick'
import types from './types'

module.exports = Session

function Session (opts={ token, appUserId, consumerReference  }) {
  typeforce({
    token: typeforce.String,
    appUserId: typeforce.String,
    consumerRef: typeforce.String,
    serverName: typeforce.String
  }, session)

  extend(this, opts)
}

Session.prototype.createTransaction = async function (opts) {
  typeforce({
    transactionReference: typeforce.String,
    transactionType: types.transactionType,
    callback: typeforce.maybe(typeforce.String)
    deviceEnvironment: typeforce.maybe(typeforce.Object),
    geo: typeforce.maybe(typeforce.Object),
    signatureStepRequired: typeforce.maybe(typeforce.Boolean)
  }, opts)

  const { token, serverName } = this
  const { deviceEnvironment, meta } = opts
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

  const reqBody = pick(opts, [
    'transactionReference',
    'transactionType',
    'callback',
    'signatureStepRequired'
  ])

  reqBody.consumerReference = this.consumerReference
  const result = await this.client({
    method: 'POST',
    headers: headers,
    path: this._getPath('/api/transactions'),
    entity: reqBody
  })

  const tx = this._txs[result.transactionId] = new Tx({ token, serverName })

  return tx
}

Session.prototype.validateDocument = async function (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/document/validate`),
    entity: { image }
  })

  return result
}

Session.prototype.validateFace = async function (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/face/validate`),
    entity: { image }
  })

  return result
}

Session.prototype._getUrl = function (path) {
  if (path[0] === '/') path = path.slice(1)

  return `https:///${this.serverName}.paycasso.com/api//${path}`
}
