import React from 'react'
import Home from '../components/Home'
import Main from '../components/Main'
import Challenge from '../components/Challenge'
import {Route, IndexRoute} from 'react-router'

export default (
  <Route path="/" component={Main}>
  	<Route path="user/:username" component={Challenge} />
    <IndexRoute component={Home} />
  </Route>
)