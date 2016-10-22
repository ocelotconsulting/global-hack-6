import React from 'react'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Select from 'react-select'
import _ from 'underscore'
import sheltersById from './sheltersById'

export default class Shelters extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    sheltersById().then(data => this.setState({data}))
  }

  render() {
    const { value, onSelection } = this.props
    const { data } = this.state

    if (data) {
      const options = _(data).values().map(s => ({ value: s.id, label: `${s.name} (${s.street} ${s.zip})` }))

      return (
        <Form horizontal>
          <FormGroup controlId='selectShelter'>
            <Col componentClass={ControlLabel} sm={2} md={2} lg={2}>
              Select shelter
            </Col>
            <Col sm={5} md={6} lg={8}>
              <Select value={value} options={options} onChange={({value}) => onSelection(data[value])} clearable={false}/>
            </Col>
          </FormGroup>
        </Form>
      )
    } else {
      return (<div className='spinner'/>)
    }
  }
}
