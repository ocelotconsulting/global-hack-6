import React from 'react'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Select from 'react-select'
import agent from '../agent'
import _ from 'underscore'
import { browserHistory } from 'react-router'

const mapById = shelters => _(shelters).chain().map(s => [s.id, s]).object().value()

export default class Shelters extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    agent.get('/services/shelters')
    .then(({ body }) => {
      const data = mapById(body)
      this.setState({ data })
      const { value } = this.props
      if (value && data[value]) {
        this.props.onSelection(data[value])
      } else if (value) {
        browserHistory.push('/admin')
      }
    })
  }

  render() {
    const { value, onSelection } = this.props
    const { data } = this.state

    if (data) {
      const options = _(data).values().map(s => ({ value: s.id, label: `${s.name} (${s.street} ${s.zip})` }))

      const handleSelection = ({ value }) => onSelection(data[value])

      return (
        <Form horizontal>
          <FormGroup controlId='selectShelter'>
            <Col componentClass={ControlLabel} sm={2} md={2} lg={2}>
              Find shelter
            </Col>
            <Col sm={5} md={6} lg={8}>
              <Select value={value} options={options} onChange={handleSelection}/>
            </Col>
          </FormGroup>
        </Form>
      )
    } else {
      return (<div className='spinner'/>)
    }
  }
}
