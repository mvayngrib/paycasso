const clone = require('xtend')
const typeforce = require('typeforce')
const types = require('../types')
const DocConfigBuilder = require('./doc-config')

module.exports = function bodybuilder ({
  transactionReference: typeforce.String,
  transactionType: types.transactionType,
  callback: typeforce.maybe(typeforce.String),
  deviceEnvironment: typeforce.maybe(typeforce.Object),
  geo: typeforce.maybe(typeforce.Object),
  signatureStepRequired: typeforce.maybe(typeforce.Boolean)
}) {
  const opts = arguments[0]
  typeforce({
    transactionReference: typeforce.String,
    transactionType: types.transactionType,
    callback: typeforce.maybe(typeforce.String),
    deviceEnvironment: typeforce.maybe(typeforce.Object),
    geo: typeforce.maybe(typeforce.Object),
    signatureStepRequired: typeforce.maybe(typeforce.Boolean)
  }, opts)

  const body = pick(opts, [
    'transactionReference',
    'transactionType',
    'callback',
    'signatureStepRequired'
  ])

  body.documents = []

  const builder = new EventEmitter()
  builder.addDocConfig = () => {
    const dBuilder = new DocConfigBuilder()
    dBuilder.on('build', build => body.documents.push(build))
    return dBuilder
  }

  builder.build = () => {
    const copy = clone(body)
    this.emit('build', body)
    return copy
  }

  return builder
}
