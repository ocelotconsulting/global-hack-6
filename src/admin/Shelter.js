import React from 'react'
import moment from 'moment'
import ShelterSummary from './ShelterSummary'
import ShelterDetails from './ShelterDetails'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { Link } from 'react-router'

export default class Shelter extends React.Component {
  render() {
    const { shelter, routeParams: {shelterId} } = this.props

    if (shelter) {
      const shelterSummaryProps = {
        name: shelter.name,
        date: moment().toISOString(),
        beds: {
          available: 104,
          pending: 20,
          total: 221
        }
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
    } else {
      return (
        <div className='spinner'/>
      )
    }
  }
}
