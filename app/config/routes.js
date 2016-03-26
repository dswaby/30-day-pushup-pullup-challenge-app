import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Home from '../components/Home'
import Main from '../components/Main'
import Challenge from '../components/Challenge/Challenge'
import Register from '../components/Form/Register'
import Reset from '../components/Form/Reset'
import Settings from '../components/Settings'
import ProgressSummary from '../components/ProgressSummary'


export default (
	  <Route path="/" component={Main}>
	  	<IndexRoute component={Home} />
	  	<Route path="register" component={Register} />
	  	<Route path="challenge/:uid" component={Challenge} />
	  	<Route path="settings" component={Settings} />
	  	<Route path="overview" component={ProgressSummary} />
	  	<Route path="reset" component={Reset} />
	  </Route>
)