const getDoc = require('../clients/getDoc')
const getById = require('./getById')
const putDoc = require('../clients/putDoc')
const db = 'shelters'

module.exports = ({ shelterId, clientId, bedTypes }) => {
  return getById(shelterId)
  .then(shelterSummary => {
    const totalBedsAvailable = shelterSummary.beds
    .map((bed) => bed.total_beds - bed.total_taken)
    .reduce(((currValue, nextValue) => currValue + nextValue), 1)

    let bedRequestCount = 0
    for (bedType in bedTypes) {
      bedRequestCount += bedTypes[bedType]
    }
    if (bedRequestCount > totalBedsAvailable)
      throw `Requested ${bedRequestCount} when there are only ${totalBedsAvailable}.`
  })
  .then(() => getDoc(db, shelterId))
  .then(shelterDoc => {
    for (bedType in bedTypes) {
      if (bedTypes[bedType] > 0) {
        if (!shelterDoc.reservations)
          shelterDoc.reservations = {}
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
