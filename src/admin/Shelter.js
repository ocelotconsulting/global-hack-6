/* eslint camelcase: "off" */
import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { Link, browserHistory } from 'react-router'
import moment from 'moment'
import FadeIn from '../FadeIn'
import ShelterSummary from './ShelterSummary'
import ShelterDetails from './ShelterDetails'
import agent from '../agent'

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

export default class Shelter extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillReceiveProps({ params: { shelterId } }) {
    if (this.props.params.shelterId !== shelterId) this.getShelter(shelterId)
  }

  componentWillMount() {
    this.getShelter()
  }

  getShelter(shelterId = this.props.params.shelterId) {
    agent.get(`/services/shelters/${encodeURIComponent(shelterId)}`)
    .then(({ body }) => this.setState({ shelter: body }))
    .catch(error => {
      if (error.status === 404) {
        browserHistory.push('/admin')
      } else {
        throw error
      }
    })
  }

  render() {
    const { shelter } = this.state

    if (shelter) {
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
              <Link to={`/clients?returnTo=/admin/${encodeURIComponent(shelter.id)}/check-in`}
                    className='btn btn-primary'>
                Check In Client
              </Link>
            </ButtonGroup>
          </ButtonToolbar>
        </FadeIn>
      )
    } else {
      return (
        <div className='spinner'/>
      )
    }
  }
}
