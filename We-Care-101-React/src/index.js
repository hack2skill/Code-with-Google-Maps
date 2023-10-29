import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Page1 from './views/page1'
import IPhone1415ProMax1 from './views/i-phone1415-pro-max1'
import IPhone1415ProMax11 from './views/i-phone1415-pro-max11'
import IPhone1415ProMax22 from './views/i-phone1415-pro-max22'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Page1} exact path="/" />
        <Route
          component={IPhone1415ProMax1}
          exact
          path="/i-phone1415-pro-max1"
        />
        <Route
          component={IPhone1415ProMax11}
          exact
          path="/i-phone1415-pro-max11"
        />
        <Route
          component={IPhone1415ProMax22}
          exact
          path="/i-phone1415-pro-max22"
        />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
