import React from 'react'
import Shelters from './Shelters'
import ShelterSummary from './ShelterSummary'

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
    const onChange = (propertyName) => (option) => this.setState({shelter: option && option.value})

    return (
      <div className='admin container'>
        <Shelters value={this.state.shelter} onChange={onChange('shelter')}/>
        <ShelterSummary {...shelterSummaryProps}/>
      </div>
    )
  }
}
