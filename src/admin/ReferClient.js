import React from 'react'
import agent from '../agent'
import { Link } from 'react-router'
import Button from 'react-bootstrap/lib/Button'
import Alert from 'react-bootstrap/lib/Alert'
import ReferralTable from './ReferralTable'
import Toolbar from '../Toolbar'
import FadeIn from '../FadeIn'

export default class ReferClient extends React.Component {
  update(params = this.props.params) {
    Promise.all([
      agent.get(`/services/clients/${encodeURIComponent(params.clientId)}`).then(({ body }) => body),
      agent.get('/services/programs').then(({ body }) => body)
    ])
    .then(([client, programs]) => this.setState({ client, programs }))
  }

  componentWillReceiveProps({ params }) {
    this.update(params)
  }

  componentWillMount() {
    this.update()
  }

  render() {
    const { client, programs, selectedId, result } = this.state || {}
    const { clientId, shelterId } = this.props.params
    const clientName = client && `${client.first_name} ${client.last_name}`

    const setResult = (result) => this.setState({ result })

    const onSend = () =>
      agent.patch(`/services/clients/${encodeURIComponent(clientId)}/tags`)
      .send({
        add: [selectedId]
      })
      .then(({ body }) => setResult(body))
      .catch(e => setResult({ error: e.message || e.toString() }))

    const cancelButton = (label = 'Cancel', bsStyle = 'default') => (
      <Link to={`/admin/${encodeURIComponent(shelterId)}`} className={`btn btn-${bsStyle}`}>
        {label}
      </Link>
    )

    const renderResult = () =>
      result.ok ? (
        <FadeIn className='check-in'>
          <Alert bsStyle="success">
            <strong>Success</strong>
            {' Referral was sent successfully for client '}
            {clientName}
            {'.'}
          </Alert>
          <Toolbar>
            {cancelButton('Done', 'primary')}
          </Toolbar>
        </FadeIn>
      ) : (
        <FadeIn className='check-in'>
          <Alert bsStyle="danger">
            <strong>Referral Failed</strong>
            {' '}
            {result.error || 'unknown error'}
          </Alert>
          <Toolbar>
            <Button bsStyle='primary' onClick={() => this.setState({ result: undefined })}>Try Again</Button>
            {cancelButton()}
          </Toolbar>
        </FadeIn>
      )

    if (result) {
      return renderResult()
    } else if (client && programs) {
      return (
        <div className='refer-client'>
          <h2>
            {`${clientName} `}
            <small>
              refer client
            </small>
          </h2>
          <hr/>
          <h4>Select a program below</h4>
          <Toolbar>
            <Button bsStyle='primary' disabled={!selectedId} onClick={onSend}>
              Send Referral
            </Button>
            <Link to={`/admin/${shelterId}`} className='btn btn-default'>
              Cancel
            </Link>
          </Toolbar>
          <hr/>
          <ReferralTable programs={programs} selectedId={selectedId}
                         onSelected={selectedId => this.setState({ selectedId })}/>
        </div>
      )
    } else {
      return (
        <div className='spinner'/>
      )
    }
  }
}
