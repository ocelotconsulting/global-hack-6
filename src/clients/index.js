// noinspection JSUnusedLocalSymbols
import React, {PropTypes} from 'react'
import FindClient from './FindClient'
import RegisterClient from './RegisterClient'
import FindOrRegister from './FindOrRegister'
import RegisterWithoutFind from './RegisterWithoutFind'

class Clients extends React.Component {
  render () {
    console.log(this.props)
    const {query: {returnTo}} = this.props.location
    const Component = (returnTo) ? FindOrRegister : RegisterWithoutFind
    return (
      <div id='clients' className='container-fluid'>
        { this.props.children ? <div>{this.props.children}</div> : <Component returnTo={returnTo}/> }
      </div>
    )
  }
}

Clients.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object
}

export default Clients
export {Clients, FindClient, RegisterClient}
