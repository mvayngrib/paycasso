
const transactionTypes = [
  'DocuSure',
  'VeriSure',
  'InstaSure'
]

exports.transactionType = function (type) {
  return transactionTypes.indexOf(type) !== -1
}

const imageOptions = [
  'allImages'
  'faceImages',
  'docImages',
  'echipImages',
  'suspectingImages',
  'noImages'
]

exports.imageOption = function (type) {
  return imageOptions.indexOf(type) !== -1
}
