/* eslint camelcase: "off" */

import React from 'react'
import agent from '../agent'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Alert from 'react-bootstrap/lib/Alert'
import FadeIn from '../FadeIn'
import Toolbar from '../Toolbar'
import { Link } from 'react-router'
import _ from 'underscore'

const categories = {
  men: {
    singular: 'Adult Man',
    plural: 'Adult Men'
  },
  women: {
    singular: 'Adult Woman',
    plural: 'Adult Women'
  },
  children: {
    singular: 'Child',
    plural: 'Children'
  },
  infants: {
    singular: 'Infant',
    plural: 'Infants'
  }
}

export default class CheckInClient extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      counts: _(categories).chain().keys().map(k => [k, 0]).object().value()
    }
  }

  update(params = this.props.params) {
    Promise.all([
      agent.get(`/services/shelters/${encodeURIComponent(params.shelterId)}`).then(({ body }) => body),
      agent.get(`/services/clients/${encodeURIComponent(params.clientId)}`).then(({ body }) => body)
    ])
    .then(([shelter, client]) => this.setState({ shelter, client }))
  }

  componentWillReceiveProps({ params }) {
    this.update(params)
  }

  componentWillMount() {
    this.update()
  }

  render() {
    const { shelter, client, result } = this.state || {}
    const { shelterId, clientId } = this.props.params
    const backAddress = `/admin/${encodeURIComponent(shelterId)}`
    const clientName = client && `${client.first_name} ${client.last_name}`
    const { counts, busy } = this.state
    const total = _(counts).chain().values().reduce((a, b) => a + b).value()

    const cancelButton = (label = 'Cancel', bsStyle = 'default') => (
      <Link to={backAddress} className={`btn btn-${bsStyle}`}>
        {label}
      </Link>
    )

    const renderResult = () =>
      result.ok ? (
        <FadeIn className='check-in'>
          <Alert bsStyle="success">
            <strong>Success</strong>
            {' '}
            {clientName}
            {total > 1 ? ` and ${total - 1} other(s) have ` : ' has '}
            {`successfully checked into ${shelter.name}.`}
          </Alert>
          <Toolbar>
            {cancelButton('Done', 'primary')}
          </Toolbar>
        </FadeIn>
      ) : (
        <FadeIn className='check-in'>
          <Alert bsStyle="danger">
            <strong>Check-In Failed</strong>
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
    } else if (client) {
      const onCheckIn = () => {
        const setResult = (result) => this.setState({ result, busy: false })

        this.setState({ busy: true })
        agent.post(`/services/shelters/${encodeURIComponent(shelterId)}/reservations`)
        .send({ clientId, bedTypes: counts })
        .then(({ body }) => setResult(body))
        .catch(e => setResult({ error: e.message || e.toString() }))
      }

      const createChangeCountButton = (property, delta, icon) => {
        const targetValue = counts[property] + delta

        const onClick = () => this.setState({
          counts: Object.assign({}, counts, { [property]: targetValue })
        })

        return (
          <Button onClick={onClick} disabled={targetValue < 0 || targetValue > 9}>
            <i className={`fa fa-${icon}`}/>
          </Button>
        )
      }

      return (
        <FadeIn className='check-in' context={clientId}>
          <h2>
            {shelter.name}
            {' '}
            <small>
              {`${shelter.street}, ${shelter.city} ${shelter.state} ${shelter.zip}`}
            </small>
          </h2>
          <hr/>
          <h4>
            Select beds needed for <span className='client'>{clientName}</span>
          </h4>
          <hr/>
          <div className='select-beds'>
            {_(categories).map(({ singular, plural }, property) => {
              const value = counts[property]
              return (
                <div key={property} className='selection'>
                  <ButtonGroup>
                    {createChangeCountButton(property, -1, 'minus')}
                    {createChangeCountButton(property, 1, 'plus')}
                  </ButtonGroup>
                  <span className='category-label'>
                  <span className='value'>{counts[property]}</span>
                    {' '}
                    {value === 1 ? singular : plural}
                  </span>
                </div>
              )
            })
            }
          </div>
          <hr/>
          {busy ? (
            <div className='spinner'/>
          ) : (
            <Toolbar>
              <Button bsStyle='primary' onClick={onCheckIn} disabled={total === 0}>Check In</Button>
              {cancelButton()}
            </Toolbar>
          )
          }
        </FadeIn>
      )
    } else {
      return (
        <div className='spinner'/>
      )
    }
  }
}
