/* eslint camelcase: "off" */

import React from 'react'
import agent from '../agent'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import { Link } from 'react-router'

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

    if (client) {
      return (
        <div className='check-in'>
          <h2>
            {`${client.first_name} ${client.last_name}`}
          </h2>
          <hr/>
          <ButtonToolbar>
            <ButtonGroup>
              <Button bsStyle='primary'>Check In</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Link to={`/admin/${encodeURIComponent(this.props.params.shelterId)}`} className='btn btn-default'>
                Cancel
              </Link>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      )
    } else {
      return (<div className='spinner'/>)
    }
  }
}
