/* eslint camelcase: "off" */
import React from "react";
import {Link, browserHistory} from "react-router";
import moment from "moment";
import FadeIn from "../FadeIn";
import Toolbar from "../Toolbar";
import ShelterSummary from "./ShelterSummary";
import ShelterDetails from "./ShelterDetails";
import agent from "../agent";
import _ from "underscore";

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

class Reservation extends React.Component {
  render() {
    const {reservation, shelter, close} = this.props
    const {bedTypes, clientName} = reservation
    const beds = _(bedTypes).pairs()
        .filter(([group, count]) => count > 0)
        .map(([group, count]) => `${count} ${group}`)
        .join(', ')
    return (
        <div className="reservation">
          <div className="client-name">{clientName}</div>
          <div className="beds">{beds}</div>
          <div className="actions">
            <a href="" onClick={(e) => {e.preventDefault(); close(false)}}>cancel</a> / <a href="" onClick={(e) => {e.preventDefault(); close(true)}}>check in</a>
          </div>
        </div>
    )
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

  closeReservation(clientName, checkin) {
    console.log('todo delete reservation for', clientName, checkin)
    const originalReservations = this.state.shelter.reservations
    const newReservations = originalReservations.filter((res) => res.clientName != clientName)
    this.state.shelter.reservations = newReservations // leave me a lone, it's 4am
    this.setState({shelter: this.state.shelter})
    if (checkin) {
      browserHistory.push(`/clients?returnTo=/admin/${encodeURIComponent(this.state.shelter.id)}/check-in`)
    }
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
          <div className="reservations">
            <div className="title">Reservations</div>
            {
                shelter.reservations && shelter.reservations.length > 0 ? (
                    <div>{shelter.reservations.map((reservation) => <Reservation shelter={shelter.id} reservation={reservation} key={reservation.clientName} close={(checkin) => this.closeReservation(reservation.clientName, checkin)}/>)}
                    </div>
                ) : (
                    <div>currently no reservations</div>
                )
            }
          </div>
          <Toolbar>
            <Link to={`/clients?returnTo=/admin/${encodeURIComponent(shelter.id)}/check-in`}
                  className='btn btn-primary'>
              Check In Client
            </Link>
            <Link to={`/clients?returnTo=/admin/${encodeURIComponent(shelter.id)}/refer`}
                  className='btn btn-default'>
              Refer Client
            </Link>
          </Toolbar>
        </FadeIn>
      )
    } else {
      return (
        <div className='spinner'/>
      )
    }
  }
}
