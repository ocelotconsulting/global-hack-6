import React from 'react'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Select from 'react-select'

const loadOptions = (input, callback) => {
  setTimeout(() => {
    callback(null, {
      options: [
        { value: 'shelter1', label: 'Larry Rice' },
        { value: 'shelter2', label: 'Biddle House' }
      ]
    })
  }, 500)
}

export default class Shelters extends React.Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="selectShelter">
          <Col componentClass={ControlLabel} sm={2}>
            Find Location
          </Col>
          <Col sm={4}>
            <Select.Async value={this.props.value} onChange={this.props.onChange}
                          loadOptions={loadOptions}/>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
