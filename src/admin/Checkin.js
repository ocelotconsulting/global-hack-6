/* eslint camelcase: "off" */

import React from 'react'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Select from 'react-select'
import agent from '../agent'

const toItem = ({ uuid, first_name, last_name }) => ({
  value: uuid,
  label: `${first_name} ${last_name}`
})

const getClients = (input, callback) => {
  if (input) {
    agent.get('/services/clients')
    .query({ q: input })
    .then(({ body }) => callback(null, { options: body.map(toItem) }))
    .catch(e => console.error(e))
  } else {
    callback(null, { options: [] })
  }
}

export default class Checkin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const onClientIdSelected = (selection) => this.setState({ clientId: selection && selection.value })
    const { clientId } = this.state
    return (
      <div className='check-in'>
        <Form horizontal>
          <FormGroup controlId="selectShelter">
            <Col componentClass={ControlLabel} sm={2}>
              Search for client
            </Col>
            <Col sm={4}>
              <Select.Async value={this.state.clientId} onChange={onClientIdSelected} loadOptions={getClients}/>
            </Col>
          </FormGroup>
        </Form>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle='primary' disabled={!clientId}>
              Check In
            </Button>
          </Col>
        </FormGroup>
      </div>
    )
  }
}
