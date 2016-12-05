
const EventEmitter = require('events').EventEmitter
const typeforce = require('typeforce')
const clone = require('xtend')
const types = require('../types')

module.exports = DocumentConfigBuilder

function DocumentConfigBuilder () {
  EventEmitter.call(this)

  const props = {}

  ;[
    'acceptedDocuments',
    'docCheck',
    'face',
    'ocr',
    'preflight',
    'preprocess'
  ].forEach(prop => {
    this[prop] = kind => {
      props[prop] = { kind }
    })
  })

  this.bothSides = val => props[bothSides] = val

  this.build = () => {
    typeforce(types.documentConfiguration, props)
    const build = clone(props)
    this.emit('build', build)
    return build
  }
}
