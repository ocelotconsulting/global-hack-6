import React, {PropTypes as T} from 'react'
import AuthService from './auth/AuthService'
import Navigation from './Navigation'

export default class App extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    children: T.node,
    auth: T.instanceOf(AuthService)
  }

  render () {
    return (
      <div>
        <Navigation auth={this.props.auth}/>
        {this.props.children}
      </div>
    )
  }
}
