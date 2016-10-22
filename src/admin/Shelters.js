import React from 'react'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Select from 'react-select'
import agent from '../agent'

const withLabel = (shelter) => {
  shelter.label = `${shelter.name} (${shelter.street} ${shelter.zip})`
  return shelter
}
const loadOptions = (input, callback) => {
  if (input.length) {
    agent.get('/services/shelters')
    .then(({ body }) => callback(null, { options: body.map(withLabel) }))
  } else {
    callback(null, { options: [] })
  }
}

export default class Shelters extends React.Component {
  render() {
    const { value } = this.props
    return (
      <Form horizontal>
        <FormGroup controlId='selectShelter'>
          <Col componentClass={ControlLabel} sm={2} md={2} lg={2}>
            Find shelter
          </Col>
          <Col sm={5} md={6} lg={8}>
            <Select.Async value={value && value._id} onChange={this.props.onChange} valueKey='_id'
                          loadOptions={loadOptions}/>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
