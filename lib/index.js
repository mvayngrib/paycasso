const typeforce = require('typeforce')
// const low = require('lowdb')
const pick = require('object.pick')
const clone = require('xtend')
const stringify = require('json-stable-stringify')
const co = require('co')
const request = require('superagent')
const Session = require('./session')

const AUTH_HOST = 'https://auth.paycasso.com/api/v1/session'

exports = module.exports = Paycasso
exports.AUTH_HOST = AUTH_HOST

function Paycasso ({ accountNumber, password, serverName }) {
  if (!(this instanceof Paycasso)) {
    return new Paycasso(opts)
  }

  const opts = arguments[0]
  typeforce({
    accountNumber: typeforce.String,
    password: typeforce.String,
    serverName: typeforce.String
    // db: typeforce.String
  }, opts)

  this.serverName = opts.serverName
  this.accountNumber = opts.accountNumber
  this.password = opts.password

  this._sessions = {}

  // this.db = low(opts.db, { storage: require('lowdb/lib/file-async') })
  // this.db.defaults({
  //     // credentials: {},
  //     // applications: {}
  //   })
  //   .value()
}

Paycasso.prototype.createSession = co.wrap(function* ({ appUserId, deviceId, consumerReference }) {
  const opts = arguments[0]
  typeforce({
    appUserId: typeforce.String,
    deviceId: typeforce.String,
    consumerReference: typeforce.String
  }, opts)

  const cached = this._getCachedSession(opts)
  if (cached) return cached

  // {
  //   "accountNumber": "Client Account Number supplied by Paycasso",
  //   "appUserId": "Reference for the application user",
  //   "transactionType": "Registration",
  //   "deviceId": "Device identifier passed through from the client",
  //   "consumerRef": "A reference for this transaction or consumer"
  // }

  const reqBody = {
    appUserId: appUserId,
    deviceId: deviceId,
    consumerRef: consumerReference,
    accountNumber: this.accountNumber,
    transactionType: 'Registration'
  }

  // sample response
  // {
  //     "accountNumber": "AccountName",                     // this will have been supplied to the client as credentials
  //     "appUserId": "A User Name",                         // as passed in in the request
  //     "deviceId": "DaveMac001",                           // the deviceID as passed in in the request
  //     "documentationUrl": "https://qa-api.paycasso.com",  // this locates which paycasso server will be used for document processing
  //     "biometricsUrl": "https://qa-api2.paycasso.com",    // this locates which paycasso server to connect to for face processing
  //     "notificationUrl": "https://qa.paycasso.com",       // this tells the application where documentation will be placed
  //     "sessionToken": "OuhDYTML18kqXW6xdbfmQ3G1r+DwOtNB67Or3c0DFMX=", // an example of a hash token built from the content of this json object
  //     "consumerRef": "mck-test-001",                      // the reference for the initial request, note that a separate reference may be passed for each transaction wihin a session
  //     "timestamp": "2013-09-26T16:13:04.231Z",            // this is a timestamp when the session was requested and is used as part of session validity
  //     "transactionType": "Registration",                  // this is reflected from the request.
  //     "docuSure": true,                                   // whether the client may execture DocSure transactions (document check)
  //     "veriSure": true,                                   // whether the client may execute VeriSure transactions (registration)
  //     "instaSure": false,                                 // whether the client may execute InstaSure transactions (authentication)
  //     "identiSure": false,                                // whether the client may execute IdentiSure transactions
  //     "matchThreshold": 0.87,                             // this is the configured match threshold for the client
  //     "notificationEmail": "user.name@exampe.com"         // this is the notification address which has been configured for an account.
  // }

  const sessionInfo = yield request
    .post(AUTH_HOST)
    .send(reqBody)
    .auth(this.accountNumber, this.password)

  this._cacheSession(sessionInfo)
  const loginInfo = yield this._authorisedlogin(sessionInfo)
  const { token } = loginInfo
  return new Session({ token, appUserId, deviceId, consumerReference, serverName: this.serverName })
})

Paycasso.prototype._authorisedlogin = function (sessionResponse) {
  const reqBody = { details: sessionResponse }
  if (process.browser) {
    reqBody.origin = window.location.href.split('/')[0]
  }

  // see fixtures.json "authorisedlogin" for sample response
  return request
    .post(this._getUrl('/authorisedlogin'))
    .send(reqBody)
}

Paycasso.prototype._getCachedSession = function (opts) {
  // find existing sessions based on user
  const id = getSessionId(opts)
  const sessions = this._sessions[id]
  if (!sessions) return

  // TODO: find existing session based on allowed transaction types
}

Paycasso.prototype._cacheSession = function (session) {
  const id = getSessionId(session)
  if (!this._sessions[id]) this._sessions[id] = []

  // TODO: cache by capabilities
}

Paycasso.prototype._getUrl = function (path) {
  if (path[0] === '/') path = path.slice(1)

  return `https://${this.serverName}.paycasso.com/api/${path}`
}

function getSessionId (opts) {
  return stringify(pick(opts, ['appUserId', 'deviceId', 'consumerRef']))
}
