import './Map.css'
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import axios from 'axios';
import moment from 'moment';

import { FormThemeProvider } from 'react-form-component'
import Form, {
  Input,
  Select,
  FormButton,
} from 'react-form-component'

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2NjaGF0MTIzIiwiYSI6ImNraGwydGZpYzAzOWUzMm14bXlndmlhbXoifQ.8o9h0nZe8uJ9YDltuRcF2A';


const Map = () => {

  const mapContainer = useRef();
  const [lng, setLng] = useState(-0.1878277598563);
  const [lat, setLat] = useState(51.51198245486377);
  const [zoom, setZoom] = useState(12);
  const [larr, setLarr] = useState([
  {
    name: "Home",
    lat: 51.51198245486377,
    lng: -0.1278277598563,
    start: 0,
    end: 1000,
    z: 0
  },
  {
    name: "Office",
    lat: 51.503120589264064,
    lng: -0.15282095066100,
    start: 0,
    end: 1000,
    z: 0
  },
  {
    name: "Shop",
    lat: 51.503341807681544,
    lng: -0.11952824596429,
    start: 0,
    end: 1000,
    z: 0
  }
  ]);
  const [show_tsp, setShow_tsp] = useState(false);
  const [ans, setAns] = useState();
  const [vec, setVec] = useState([]);

  const Tsp = () => {

    let arr_to_send = []

    larr.forEach((element)=>{
      arr_to_send.push({
        "id": element.name,
        "coords": {
          "lat": element.lat,
          "lng": element.lng,
        },
        "start": element.start,
        "end": element.end,
        "z": element.z
      })
    })

    if(!ans){
      console.log('sending ', arr_to_send);
      axios.post('http://localhost:5000/', arr_to_send).then((res)=>{
        console.log(res.data)
        setAns(res.data.ans)
        setVec(res.data.vec)

        window.open("http://localhost:5000/calendar");
      });
    }

    return(
      <div>
      <h5>Total Time Taken-</h5>
      <h2>{ans}</h2>
      <h6>seconds </h6>
      {vec.map((element,index)=>{
         return <li key={index}>{element.name}<br/>Start at- {moment(element.start).format("dddd, MMMM Do YYYY, h:mm:ss a")}<br/>End at- {moment(element.end).format("dddd, MMMM Do YYYY, h:mm:ss a")}</li>
      })}
      </div>
      )
  }

  const BasicExampleForm = () =>
  <Form fields={['name', 'lat', 'lng', 'start', 'end', 'z']}>
    <Input style={{color: 'white'}}
      name='name'
      label='name'
      value="john"
      initialValue="place3"
    />
    <Input style={{color: 'white'}}
      name='lat'
      label='lat'
      type='number'
      value='12.989427'
    />
    <Input style={{color: 'white'}}
      name='lng'
      label='lng'
      type='number'
      value='80.235381'
    />
    <Input style={{color: 'white'}}
      name='start'
      label='start'
      type='number'
      value='0'
    />
    <Input style={{color: 'white'}}
      name='end'
      label='end'
      type='number'
      value='1'
    />
    <Input style={{color: 'white'}}
      name='z'
      label='z'
      type='number'
      value='1'
    />
    <FormButton
      onClick={(fields) => {
        fields.end = parseFloat(fields.end)
        fields.lat = parseFloat(fields.lat)
        fields.lng = parseFloat(fields.lng)
        fields.start = parseFloat(fields.start)
        fields.z = parseFloat(fields.z)
        setLarr([...larr, fields]);
      }}
    >Save</FormButton>
    <FormButton
      onClick={() => {
        setShow_tsp(true);
      }}
    >Show Schedule</FormButton>
  </Form>

  const Based = () => {
    if(show_tsp === true) return <Tsp />
    return (
      <>
      <FormThemeProvider>
      <BasicExampleForm />
      </FormThemeProvider>
      </>
      )
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      // maxBounds: bounds,
        attributionControl: false,
        pitch: 60,
    bearing: 40
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

  larr.forEach(function(element) {
    console.log(element)
  var popup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
    .setLngLat([element.lng, element.lat])
    .setHTML(`<div style="color: black">${element.name}</div>`)
    .addTo(map);
  });

    return () => map.remove();
  }, [larr]);

  return (
    <div>
      <div className="sidebar">
        <h4>🛵B.R.A.S.R.✅</h4>
        Bitmasking Recursive Appointment Scheduling and Routing
        <Based />
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}<p/>
        Save- Add Marker on Map
        <br/>
        Show TSP- Show Schedule
      </div>
      <div className="map-container" ref={mapContainer} />
      <div className="footer">
      <span className="hh">Made with <span style={{color: "#e25555"}}>&#9829;</span> by <a href="https://www.linkedin.com/in/sayashraaj/">Sayash</a></span>
      </div>
    </div>
  );
};

export default Map;
