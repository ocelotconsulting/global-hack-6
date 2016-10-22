/* eslint camelcase: "off" */

import React from 'react'
import agent from '../agent'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import { Link, browserHistory } from 'react-router'
import FadeIn from '../FadeIn'

export default class Checkin extends React.Component {
  updateClient(clientId = this.props.params.clientId) {
    agent.get(`/services/clients/${encodeURIComponent(clientId)}`)
    .then(({ body }) => this.setState({ client: body }))
  }

  componentWillReceiveProps({ params: { clientId } }) {
    this.updateClient(clientId)
  }

  componentWillMount() {
    this.updateClient()
  }

  render() {
    const { client } = this.state || {}
    const { shelterId, clientId } = this.props.params

    const backAddress = `/admin/${encodeURIComponent(shelterId)}`

    const onCheckIn = () =>
      agent.post(`/services/shelters/${encodeURIComponent(shelterId)}/reservations`)
      .send({ clientId })
      .then(() => browserHistory.push(backAddress))

    if (client) {
      return (
        <FadeIn className='check-in' context={this.props.params.clientId}>
          <h2>
            {`${client.first_name} ${client.last_name}`}
          </h2>
          <hr/>
          <ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle='primary' onClick={onCheckIn}>Check In</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Link to={backAddress} className='btn btn-default'>
                Cancel
              </Link>
            </ButtonGroup>
          </ButtonToolbar>
        </FadeIn>
      )
    } else {
      return (<div className='spinner'/>)
    }
  }
}
