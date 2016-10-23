const getDoc = require('../clients/getDoc')
const putDoc = require('../clients/putDoc')
const db = 'shelters'

module.exports = ({ shelterId, clientId, bedTypes }) => {
  return getDoc(db, shelterId)
  .then(shelterDoc => {
    console.log('getDoc shelter: ', shelterDoc)
    for (bedType in bedTypes) {
      if (bedTypes[bedType] > 0) {
        if (!shelterDoc.reservations[bedType])
          shelterDoc.reservations[bedType] = []
        shelterDoc.reservations[bedType].push({clientId: clientId, created: new Date()})
      }
    }
    return putDoc(db, shelterDoc)
  })
  .then(({ body }) => body)
  .catch(err => console.error(err))
}
