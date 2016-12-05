'use strict'

// if (process.env.NODE_ENV === 'debug') {
//   require("babel-core/register")({
//     sourceMaps: true
//   })

//   require("babel-polyfill")
// }

const crypto = require('crypto')
const test = require('tape-co').default
const clone = require('xtend')
const request = require('superagent')
const mock = require('superagent-mocker')(request)
const fixtures = require('./fixtures')
const Paycasso = require('../')

const ACCOUNT_NUMBER = 'abc'
const PASSWORD = '123'
const serverName = 'test'

function fixturesInterceptor (request) {
  return extend({
    request
  }, fixtures[request.path])
}

// function createClient () {
//   return createInterceptor(fixturesInterceptor).wrap(rest())
// }

function createPaycasso (opts) {
  return new Paycasso(clone({
    serverName: serverName,
    accountNumber: ACCOUNT_NUMBER,
    password: PASSWORD,
  }, opts || {}))
}

test('basic', function* (t) {
  const client = createPaycasso()

  const sess = fixtures.session
  const sreq = sess.request
  mock.post('https://auth.paycasso.com/api/v1/session', req => {
    t.equal(req.url, sreq.url)
    t.same(req.headers, sreq.headers)
    t.same(req.body, sreq.body)
    return sess.response
  })

  const login = fixtures.authorisedlogin
  const loginReq = login.request
  mock.post('https://test.paycasso.com/api/authorisedlogin', req => {
    delete req.body.details.status // status = 200 due to mocking
    t.same(req.url, loginReq.url)
    t.same(req.headers, loginReq.headers)
    t.same(req.body, loginReq.body)
    return login.response
  })

  const session = yield client.createSession(normalizeOpts(sreq.body))

  const txRef = randomString()
  const txFixture = fixtures.transactions
  const txReq = txFixture.request
  mock.post('https://test.paycasso.com/api/transactions', req => {
    t.same(req.url, txReq.url)
    t.same(req.headers, txReq.headers)
    t.same(req.body, txReq.body)
    return txFixture.response
  })

  const tx = yield session.createTransaction({
    transactionReference: txRef,
    transactionType: 'DocuSure'
  })

  t.end()
})

function normalizeOpts (opts) {
  opts = clone(opts)
  if (opts.consumerRef) {
    opts.consumerReference = opts.consumerRef
    delete opts.consumerRef
  }

  return opts
}

// function equalCaseInsensitive (t, a, b) {
//   const args = [].slice.call(arguments)
//   args[1] = args[1].toLowerCase()
//   args[2] = args[2].toLowerCase()
//   t.equal.apply(t, args)
// }

function randomString () {
  return crypto.randomBytes(32).toString('hex')
}
