import React from 'react'
import Shelters from './Shelters'
import sheltersById from './sheltersById'
import { browserHistory } from 'react-router'

export default class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  maybeGetShelter() {
    const update = (sheltersById) => {
      const { shelterId } = this.props.params
      const newShelterValue = sheltersById[shelterId]
      this.setState({ shelter: newShelterValue })
      if (!newShelterValue && shelterId) browserHistory.push('/admin')
    }

    if (this.props.params.shelterId && !this.state.shelter) sheltersById().then(update)
  }

  componentWillReceiveProps() {
    this.maybeGetShelter()
  }

  componentWillMount() {
    this.maybeGetShelter()
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
        {shelter ? children : null}
      </div>
    )
  }
}
