import React from 'react'
import Shelters from './Shelters'
import ShelterSummary from './ShelterSummary'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import { Link } from 'react-router'

const shelterSummaryProps = {
  name: 'Biddle House',
  date: '2016-10-22',
  beds: {
    available: 104,
    pending: 20,
    total: 221
  }
}

export default class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const onChange = (propertyName) => (option) => this.setState({ shelter: option && option.value })

    return (
      <div className='admin container'>
        <Shelters value={this.state.shelter} onChange={onChange('shelter')}/>
        <ShelterSummary {...shelterSummaryProps}/>
        <ButtonToolbar>
          <ButtonGroup>
            <Link to="/admin/check-in" className='btn btn-primary'>Check In</Link>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}
