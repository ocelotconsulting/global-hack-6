/* eslint camelcase: "off" */
import React from 'react'
import moment from 'moment'
import FadeIn from '../FadeIn'
import ShelterSummary from './ShelterSummary'
import ShelterDetails from './ShelterDetails'
import sheltersById from './sheltersById'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { Link } from 'react-router'

const calculateBedSummary = beds => {
  let available = 0
  let total = 0

  beds.forEach(({ total_beds, total_taken }) => {
    total += total_beds
    available += total_beds - total_taken
  })

  return {
    available,
    total,
    pending: 0
  }
}

const Shelter = ({ params: { shelterId } }) => {
  const shelter = sheltersById.valueOf(shelterId)

  const shelterSummaryProps = {
    name: shelter.name,
    date: moment().toISOString(),
    beds: calculateBedSummary(shelter.beds)
  }

  return (
    <FadeIn className='shelter' context={shelter.id}>
      <ShelterSummary {...shelterSummaryProps}/>
      <ShelterDetails {...shelter}/>
      <ButtonToolbar>
        <ButtonGroup>
          <Link to={`/clients?returnTo=/admin/${encodeURIComponent(shelterId)}/check-in`} className='btn btn-primary'>
            Check In Client
          </Link>
        </ButtonGroup>
      </ButtonToolbar>
    </FadeIn>
  )
}

Shelter.displayName = 'Shelter'

export default Shelter
