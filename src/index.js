import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import BedFinder from './bed-finder'

const routes =
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/bed" component={BedFinder}/>
  </Router>

render(routes, document.getElementById('main'))
