import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "72vw",
  height: "75vh",
  borderRadius: "16px",
  position: "relative",
  zIndex: 0,
};

const defaultCenter = {
  lat: 22.5449,
  lng: 88.3425,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBqZczuziqKJ_4b_nlis5yNL663clZIveU",
  });

  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(defaultCenter.lat);
  const [longitude, setLongitude] = useState(defaultCenter.lng);
  const [blastRadius, setBlastRadius] = useState(null);
  const [weight, setWeight] = useState(1000);
  const [substance, setSubstance] = useState("Hydrogen");

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const calculateBlastRadius = () => {
    const latRad = (latitude * Math.PI) / 180;
    const lngRad = (longitude * Math.PI) / 180;
    const substanceData = {
      Hydrogen: { heatOfCombustion: 141800, density: 0.0899 },
      Methane: { heatOfCombustion: 55600, density: 0.657 },
      Ethane: { heatOfCombustion: 50900, density: 1.261 },
      Propane: { heatOfCombustion: 50200, density: 2.009 },
      Butane: { heatOfCombustion: 49900, density: 2.493 },
      Gasoline: { heatOfCombustion: 47000, density: 0.7195 },
      Kerosene: { heatOfCombustion: 46000, density: 0.8171 },
      Diesel: { heatOfCombustion: 45000, density: 0.8328 },
      NaturalGas: { heatOfCombustion: 50000, density: 0.668 },
    };

    const heatOfCombustion = substanceData[substance].heatOfCombustion;
    const density = substanceData[substance].density;

    const energy = weight * heatOfCombustion;

    const blastRadius = Math.pow((3 * energy) / (4 * Math.PI * density), 1 / 3);

    setBlastRadius(blastRadius);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {blastRadius && (
          <>
            <Circle
              center={{ lat: latitude, lng: longitude }}
              radius={blastRadius}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: "#FF5959",
                fillOpacity: 0.5,
              }}
            />
            <Circle
              center={{ lat: latitude, lng: longitude }}
              radius={blastRadius * 1.6}
              options={{
                strokeColor: "yellow",
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: "yellow",
                fillOpacity: 0.2,
              }}
            />
          </>
        )}
      </GoogleMap>
      <div className="z-10 -mt-48" style={{ zIndex: 4, position: "absolute" }}>
        <div className="flex flex-col ml-5">
          <label className="white-box mb-4 p-1 pl-3 w-52">
            <a className="mr-1">Substance :</a>
            <select
              value={substance}
              onChange={(e) => setSubstance(e.target.value)}
            >
              <option value="Hydrogen">Hydrogen</option>
              <option value="Methane">Methane</option>
              <option value="Ethane">Ethane</option>
              <option value="Propane">Propane</option>
              <option value="Butane">Butane</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Diesel">Diesel</option>
              <option value="NaturalGas">Natural Gas</option>
            </select>
          </label>
          <label className="white-box mb-4 p-1 pl-3 flex w-36">
            <a className="mr-1">Weight :</a>
            <input
              className="w-16"
              type="number"
              step="100"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              placeholder="Substance"
            />
          </label>
          <div className="flex">
            <label className="white-box mr-2 mb-4 p-1 pl-3 flex w-36">
              <a className="mr-1">Lati :</a>
              <input
                className="w-20"
                type="number"
                step="0.001"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
              />
            </label>
            <label className="white-box ml-2 mb-4 p-1 pl-3 flex w-36">
              <a className="mr-1">Long :</a>
              <input
                className="w-20"
                type="number"
                step="0.001"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <button
            onClick={calculateBlastRadius}
            className="red-box p-2 text-white font-semibold "
          >
            Run Simulation
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
