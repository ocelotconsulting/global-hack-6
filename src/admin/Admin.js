import React from 'react'
import Shelters from './Shelters'
import { browserHistory } from 'react-router'

export default class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { children, params } = this.props
    const { shelter } = this.state
    const shelterId = (shelter && shelter.id) || params.shelterId

    const onShelterSelected = (shelter) => {
      this.setState({ shelter })
      browserHistory.push(`/admin/${encodeURIComponent(shelter.id)}`)
    }

    return (
      <div className='admin'>
        <Shelters value={shelterId} onSelection={onShelterSelected}/>
        {shelter && children ? React.cloneElement(children, { shelter }) : null}
      </div>
    )
  }
}
