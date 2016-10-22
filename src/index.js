import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import {BedFinder} from './bed-finder'
import Authentication from './Authentication'
import Admin from './admin/Admin'
import AuthService from './auth/AuthService'
import {Clients, FindClient, RegisterClient} from './clients'

const auth = new AuthService('AkO3gnKJqhHFE6Be6xiWfINFdYbF95qH', 'larry.auth0.com')

const AppWrapper = (props) => <App auth={auth} children={props.children}/>
const AuthenticationWrapper = () => <Authentication auth={auth}/>

const requireAuth = (nextState, replace) => {
  auth.parseAuthHash(nextState.location.hash)
  if (!auth.loggedIn()) {
    replace({pathname: '/'})
  }
}

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const routes =
  <Router history={browserHistory}>
    <Route path='/' component={AppWrapper}>
      <IndexRoute component={Dashboard}/>
      <Route path='clients' component={Clients} onEnter={requireAuth}>
        <Route path='locate' component={FindClient}/>
        <Route path='register' component={RegisterClient}/>
      </Route>
      <Route path='bed' component={BedFinder} onEnter={requireAuth}/>
      <Route path='auth' component={AuthenticationWrapper} onEnter={requireAuth}/>
      <Route path='admin' component={Admin} onEnter={requireAuth}/>
    </Route>
  </Router>

render(routes, document.getElementById('main'))
