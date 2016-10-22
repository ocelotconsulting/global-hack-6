/* eslint camelcase: "off" */

import React from 'react'
import agent from '../agent'

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

    return (
      <div className='check-in'>
        {client && client.name}
      </div>
    )
  }
}
