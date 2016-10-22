/* eslint camelcase: "off" */
import React from 'react'
import moment from 'moment'
import ShelterSummary from './ShelterSummary'
import ShelterDetails from './ShelterDetails'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { Link } from 'react-router'

const calculateBedSummary = beds => {
  let available = 0
  let total = 0

  beds.forEach(({total_beds, total_taken}) => {
    total += total_beds
    available += total_beds - total_taken
  })

  return {
    available,
    total,
    pending: 0
  }
}

export default class Shelter extends React.Component {
  render() {
    const { shelter } = this.props

    const shelterSummaryProps = {
      name: shelter.name,
      date: moment().toISOString(),
      beds: calculateBedSummary(shelter.beds)
    }

    return (
      <div className='shelter'>
        <ShelterSummary {...shelterSummaryProps}/>
        <ShelterDetails {...shelter}/>
        <ButtonToolbar>
          <ButtonGroup>
            <Link to="/admin/check-in" className='btn btn-primary'>Check In Client</Link>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}
