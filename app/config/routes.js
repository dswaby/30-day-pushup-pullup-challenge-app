import React from 'react'
import Home from '../components/Home'
import Main from '../components/Main'
import Challenge from '../components/Challenge'
import Register from '../components/Register'
import {Route, IndexRoute, hashHistory} from 'react-router'

export default (
	  <Route path="/" component={Main}>
	  	<IndexRoute component={Home} />
	  	<Route path="register" component={Register} />
	  	<Route path="user/:username" component={Challenge} />
	  </Route>
)