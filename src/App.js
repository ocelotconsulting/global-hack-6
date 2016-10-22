// noinspection JSUnusedLocalSymbols
import React, {PropTypes as T} from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'
import AuthService from './auth/AuthService'

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
    const {auth, children} = this.props
    return (
      <div className='root'>
        <h1>Hello, Global Hack</h1>
        <h2>Login</h2>
        <ButtonToolbar className='toolbar'>
            <Button bsStyle="primary" onClick={() => auth.login()}>Login</Button>
        </ButtonToolbar>
        {children}
      </div>
    )
  }
}
