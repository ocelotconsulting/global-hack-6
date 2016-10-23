import moment from 'moment'
import _ from 'underscore'
import uuid from 'uuid'
import randomDate from 'random-date'

const programs = [
  {center: "St Patrick's Center", name: 'City Seeds', bsStyle: 'success'},
  {center: "St Patrick's Center", name: "McMurphy's Cafe", bsStyle: 'success'},
  {center: "St Patrick's Center", name: 'Homeless Employment', bsStyle: 'success'},
  {center: "St Patrick's Center", name: 'Building Employment Skills for Tomorrow', bsStyle: 'success'},
  {center: 'Peter & Paul', name: 'Labre Center', bsStyle: 'info'},
  {center: 'Peter & Paul', name: 'Community CollabARTive', bsStyle: 'info'},
  {center: 'Gateway 180', name: 'Skills 4 Success', bsStyle: 'warning'},
  {center: "Our Lady's Inn", name: 'Twice Blessed', bsStyle: 'danger'}
]

export default function () {
  let [program] = JSON.parse(JSON.stringify(_(programs).sample(1)))
  program.attendanceDate = moment(randomDate('-90d'))
  program.uuid = uuid.v4()

  return program
}
