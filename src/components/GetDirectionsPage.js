import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GetDirectionsPage extends Component {
  componentDidMount() {
    // Load Google Maps API and initialize autocomplete (you can keep your existing JavaScript logic here)
  }

  render() {
    return (
      <div>
        <h1>Get Directions</h1>
        <div className="directions">
          <input className="from" type="text" id="from" placeholder="From" />
          <input className="to" type="text" id="to" placeholder="To" />
          <button id="get-directions">
            <Link to="/directions">Get Directions</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default GetDirectionsPage;