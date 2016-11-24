
import querystring from 'querystring'
import extend from 'xtend/mutable'
import typeforce from 'typeforce'
import types from './types'

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

Tx.prototype._uploadDocumentData = async function ({ data, type }) {
  typeforce({
    data: typeforce.Object,
    type: function (val) {
      return val === 'usdl' || val === 'epassport' || val === 'epassport/face'
    }
  }, opts)

  const { token } = this
  const result = await this.client({
    headers: { token },
    method: 'POST',
    path: this._getUrl(`/document/data/${type}`)
    entity: data
  })

  return result
}

Tx.prototype.enroll = async function (opts={ image, consumerReference }) {
  typeforce({
    consumerReference: typeforce.String,
    image: typeforce.String
  }, opts)

  const { token } = this
  const result = await this.client({
    method: 'POST',
    headers: { token },
    path: this._getUrl(`/document/data/${type}`)
    entity: {
      image,
      consumerRef: consumerReference,
    }
  })

  return result
}

Tx.prototype.submitFace = async function (opts={ image }) {
  typeforce({
    image: typeforce.String
  }, opts)

  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/document/face`)
    entity: { image }
  })

  return result
}

Tx.prototype.submitFaceEnd = async function () {
  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/document/face/end`),
    entity: {}
  })

  return result
}

Tx.prototype.submitSignature = async function (opts={ image }) {
  typeforce({
    consumerReference: typeforce.String,
    image: typeforce.String
  }, opts)

  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/document/data/${type}`)
    entity: {
      image,
      consumerRef: consumerReference,
    }
  })

  return result
}

Tx.prototype.summary = async function (opts={ imageOption }) {
  typeforce({
    imageOption: types.imageOption
  }, opts)

  const qs = querystring.stringify({ imageOption })
  const result = await this.client({
    method: 'GET',
    headers: { token: this.token },
    path: this._getUrl(`/summary?${qs}`),
    entity: {
      image,
      consumerRef: consumerReference,
    }
  })

  return result
}

Tx.prototype.cancel = async function () {
  const result = await this.client({
    method: 'POST',
    headers: { token: this.token },
    path: this._getUrl(`/cancel`),
    entity: {}
  })

  return result
}

Tx.prototype._getUrl = function (path) {
  if (path[0] === '/') path = path.slice(1)

  return `https:///${this.serverName}.paycasso.com/api/transactions/${this.txId}/${path}`
}
