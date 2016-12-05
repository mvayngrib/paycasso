
const querystring = require('querystring')
const co = require('co')
const extend = require('xtend/mutable')
const typeforce = require('typeforce')
const request = require('superagent')
const types = require('./types')

module.exports = Tx

function Tx (opts={ token, serverName, txId }) {
  typeforce({
    txId: typeforce.String,
    token: typeforce.String,
    serverName: typeforce.String
  }, opts)

  extend(this, opts)
}

Tx.prototype.uploadUSDriverLicense = function ({ data }) {
  return this._uploadDocumentData({ data, type: 'usdl' })
}

Tx.prototype.uploadEPassport = function ({ data }) {
  return this._uploadDocumentData({ data, type: 'epassport' })
}

Tx.prototype.uploadEPassportFace = function ({ data }) {
  return this._uploadDocumentData({ data, type: 'epassport/face' })
}

Tx.prototype._uploadDocumentData = co.wrap(function* ({ data, type }) {
  typeforce({
    data: typeforce.Object,
    type: function (val) {
      return val === 'usdl' || val === 'epassport' || val === 'epassport/face'
    }
  }, opts)

  const { token } = this
  const result = yield request
    .post(this._getUrl(`/document/data/${type}`))
    .set({ token })
    .send(data)

  return result
})

Tx.prototype.enroll = co.wrap(function* (opts={ image, consumerReference }) {
  typeforce({
    consumerReference: typeforce.String,
    image: typeforce.String
  }, opts)

  const { token } = this
  const result = yield request
    .post(this._getUrl(`/document/data/${type}`))
    .set({ token })
    .send({
      image,
      consumerRef: consumerReference,
    })

  return result
})

Tx.prototype.submitFace = co.wrap(function* (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = yield request
    .post(this._getUrl(`/document/face`))
    .set({ token: this.token })
    .send({ image })

  return result
})

Tx.prototype.submitFaceEnd = co.wrap(function* () {
  const result = yield request
    .post(this._getUrl(`/document/face/end`))
    .set({ token: this.token })
    .send({})

  return result
})

Tx.prototype.submitSignature = co.wrap(function* (opts={ image }) {
  typeforce({
    consumerReference: typeforce.String,
    image: typeforce.String
  }, opts)

  const result = yield request
    .post(this._getUrl(`/document/data/${type}`))
    .set({ token: this.token })
    .send({
      image,
      consumerRef: consumerReference,
    })

  return result
})

Tx.prototype.summary = co.wrap(function* (opts={ imageOption }) {
  typeforce({
    imageOption: types.imageOption
  }, opts)

  const qs = querystring.stringify({ imageOption })
  const result = yield request
    .post(this._getUrl(`/summary?${qs}`))
    .set({ token: this.token })
    .send({
      image,
      consumerRef: consumerReference,
    })

  return result
})

Tx.prototype.cancel = co.wrap(function* () {
  const result = yield request
    .post(this._getUrl(`/cancel`))
    .set({ token: this.token })
    .send({})

  return result
})

Tx.prototype._getUrl = function (path) {
  if (path[0] === '/') path = path.slice(1)

  return `https://${this.serverName}.paycasso.com/api/transactions/${this.txId}/${path}`
}
