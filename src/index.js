import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
//noinspection JSFileReferences
import { BedFinder } from './bed-finder'
import Authentication from './Authentication'
import Admin from './admin/Admin'
import CheckInClient from './admin/CheckInClient'
import Shelter from './admin/Shelter'
import AuthService from './auth/AuthService'
//noinspection JSFileReferences
import { Clients, FindClient, RegisterClient } from './clients'

const auth = new AuthService('AkO3gnKJqhHFE6Be6xiWfINFdYbF95qH', 'larry.auth0.com')

const AppWrapper = (props) => <App auth={auth} children={props.children}/>
const AuthenticationWrapper = () => <Authentication auth={auth}/>
const NotFound = (props) => <h1>404 - Not Found</h1>

const requireAuth = (nextState, replace) => {
  auth.parseAuthHash(nextState.location.hash)
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

const Dashboard = React.createClass({
  render () {
    return <div>Welcome to the app!</div>
  }
})

const ShelterContainer = ({children}) => <div>{children}</div>

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
      <Route path='admin' component={Admin} onEnter={requireAuth}>
        <Route path=':shelterId' component={ShelterContainer}>
          <Route path='check-in/:clientId' component={CheckInClient}/>
          <IndexRoute component={Shelter}/>
        </Route>
      </Route>
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>

render(routes, document.getElementById('main'))
