import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GetDirectionsPage extends Component {
  componentDidMount() {
    // Load Google Maps script and initialize Autocomplete when the component mounts
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.onload = this.initializeAutocomplete;
    document.body.appendChild(script);
  }

  initializeAutocomplete = () => {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');

    new google.maps.places.Autocomplete(fromInput);
    new google.maps.places.Autocomplete(toInput);
  }

  handleGetDirections = () => {
    const fromValue = document.getElementById('from').value;
    const toValue = document.getElementById('to').value;

    window.location.href = `directions?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue)}`;
  }

  render() {
    return (
      <div>
        <h1>Get Directions</h1>
        <div id="directions">
          <input className="from" type="text" id="from" placeholder="From" />
          <input className="to" type="text" id="to" placeholder="To" />
          <button id="get-directions" onClick={this.handleGetDirections}>
            Get Directions
          </button>
        </div>
      </div>
    );
  }
}

export default GetDirectionsPage;
