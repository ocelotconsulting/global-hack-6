import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import {BedFinder, Results} from './bed-finder'

const routes =
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/bed" component={BedFinder}/>
    <Route path="/bed/results" component={Results}/>
  </Router>

render(routes, document.getElementById('main'))
