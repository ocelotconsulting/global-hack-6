import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'

const routes =
  <Router history={browserHistory}>
    <Route path='/' component={App}/>
  </Router>

render(routes, document.getElementById('main'))
