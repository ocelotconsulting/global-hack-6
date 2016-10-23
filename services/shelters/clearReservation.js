const getDoc = require('../clients/getDoc')
const getById = require('./getById')
const putDoc = require('../clients/putDoc')
const db = 'shelters'
const sendEmail = require('./sendEmail')
const notify = require('../sms/notifyOfAvailability')
module.exports = ({ shelterId, clientName, checkedIn }) => {
  console.log('user checked in? or was the reservation canceled?', checkedIn)
  // todo email the person who made the reservation (found in shelterDoc.reservations2.requestor.email (and .name)
  return getDoc(db, shelterId)
  .then(shelterDoc => {
    const existingReservation = shelterDoc.reservations2.find(r => r.clientName !== clientName)
    if (existingReservation && existingReservation.requestor && existingReservation.requestor.email) {
      sendEmail(existingReservation)
    }
    shelterDoc.reservations2 = shelterDoc.reservations2.filter((reservation) => reservation.clientName !== clientName)
    return putDoc(db, shelterDoc)
      .then((res) => notify(shelterId))
  })
  .then(() => getById(shelterId))
  // todo free up the beds that were reserved
  // .then(shelterSummary => {
  //     const totalBedsAvailable = shelterSummary.beds
  //         .map((bed) => bed.total_beds - bed.total_taken)
  //         .reduce(((currValue, nextValue) => currValue + nextValue), 1)
  //
  //     let bedRequestCount = 0
  //     for (bedType in bedTypes) {
  //         bedRequestCount += bedTypes[bedType]
  //     }
  //     if (bedRequestCount > totalBedsAvailable)
  //         throw `Requested ${bedRequestCount} when there are only ${totalBedsAvailable}.`
  // })
  .then(({ body }) => body)
  .catch(err => console.error(err))
}
