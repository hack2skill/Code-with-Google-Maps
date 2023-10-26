// <PrivateRoute exact path="/locked" component={LockedMaterial} />
// <Route exact path="/" component={Landing} />

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Map from './mapbox/Map';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Map} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
