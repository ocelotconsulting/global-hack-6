// noinspection JSUnusedLocalSymbols
import React, {PropTypes as T} from 'react'
import AuthService from './auth/AuthService'
import Navigation from './Navigation'

export default class App extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    children: T.object,
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
