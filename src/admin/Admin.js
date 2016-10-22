import React from 'react'
import Shelters from './Shelters'
import { browserHistory } from 'react-router'

export default class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    console.log(JSON.stringify(this.props.routeParams))
    const onShelterSelected = shelter => {
      this.setState({ shelter })
      browserHistory.push(`/admin/${shelter._id}`)
    }

    return (
      <div className='admin'>
        <Shelters value={this.state.shelter} onChange={onShelterSelected}/>
        {this.props.children}
      </div>
    )
  }
}
