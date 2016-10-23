import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, withRouter } from 'react-router'
import App from './App'
import { BedFinder } from './bed-finder'
import Authentication from './Authentication'
import Admin from './admin/Admin'
import CheckInClient from './admin/CheckInClient'
import ReferClient from './admin/ReferClient'
import Shelter from './admin/Shelter'
import AuthService from './auth/AuthService'
import { Clients, FindClient, RegisterClient, ClientDetails } from './clients'
import HomePage from './HomePage'

const auth = new AuthService('AkO3gnKJqhHFE6Be6xiWfINFdYbF95qH', 'larry.auth0.com')

const AppWrapper = (props) => <App auth={auth} children={props.children}/>
const AuthenticationWrapper = () => <Authentication auth={auth}/>
const NotFound = (props) => <h1>404 - Not Found</h1>
const BedWrapper = () => <BedFinder auth={auth} />

const requireAuth = (nextState, replace) => {
  auth.parseAuthHash(nextState.location.hash)
}

const ShelterContainer = ({ children }) => <div>{children}</div>

const routes =
  <Router history={browserHistory}>
    <Route path='/' component={AppWrapper} onEnter={requireAuth}>
      <IndexRoute component={HomePage}/>
      <Route path='clients' component={Clients} onEnter={requireAuth}>
        <Route path='locate' component={FindClient}/>
        <Route path='register' component={withRouter(RegisterClient)}/>
        <Route path='view/:id' component={withRouter(ClientDetails)}/>
      </Route>
      <Route path='bed' component={BedWrapper} />
      <Route path='auth' component={AuthenticationWrapper} />
      <Route path='admin' component={Admin} onEnter={requireAuth}>
        <Route path=':shelterId' component={ShelterContainer}>
          <Route path='check-in/:clientId' component={CheckInClient}/>
          <Route path='refer/:clientId' component={ReferClient}/>
          <IndexRoute component={Shelter}/>
        </Route>
      </Route>
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>

render(routes, document.getElementById('main'))
