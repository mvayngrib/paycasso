
const typeforce = require('typeforce')

const transactionTypes = [
  'DocuSure',
  'VeriSure',
  'InstaSure'
]

exports.transactionType = function (type) {
  return transactionTypes.indexOf(type) !== -1
}

const imageOptions = [
  'allImages',
  'faceImages',
  'docImages',
  'echipImages',
  'suspectingImages',
  'noImages'
]

exports.imageOption = function (type) {
  return imageOptions.indexOf(type) !== -1
}

exports.documentClassifier = typeforce.compile({
  document: typeforce.oneOf('*', 'DrivingLicense', 'Passport', 'IdentityCard', 'ResidencePermit', 'UtilityBill'),
  countryCode: typeforce.String,
  description: typeforce.String,
  acceptance: typeforce.oneOf('yes', 'no')
})

exports.allOrNo = typeforce.oneOf('all', 'no')

// e.g.
// {
//   "acceptedDocuments": {
//     "kind": "any"
//   },
//   "bothSides": false,
//   "docCheck": {
//     "kind": "all"
//   },
//   "face": {
//     "kind": "all"
//   },
//   "ocr": {
//     "kind": "all"
//   },
//   "preflight":{
//     "kind":"no"
//   },
//   "preprocess": {
//       "kind": "no"
//   }
// }
exports.documentConfiguration = typeforce.compile({
  acceptedDocuments: typeforce.compile({
    kind: typeforce.oneOf('any', 'listed'),
    classifiers: typeforce.maybe(typeforce.arrayOf(exports.documentClassifier)),
  })
  bothSides: typeforce.Boolean,
  docCheck: exports.allOrNo,
  face: exports.allOrNo,
  ocr: exports.allOrNo,
  preflight: exports.allOrNo,
  preprocess: exports.allOrNo
})
