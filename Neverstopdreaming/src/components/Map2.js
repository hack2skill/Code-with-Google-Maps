import React, { useEffect } from "react";

export default function Map2(props) {
  let RESPONSE = 0;
  let solarPanels = [];
  let paths = [];
  let center = 0;

  // defininf paths for the boundary polygon
  if (props.isInsight) {
    RESPONSE = props.response;
    solarPanels = RESPONSE.data.solarPotential.solarPanels;
    paths = [
      {
        lat: RESPONSE.data.boundingBox.ne.latitude,
        lng: RESPONSE.data.boundingBox.ne.longitude,
      },
      {
        lat: RESPONSE.data.boundingBox.sw.latitude,
        lng: RESPONSE.data.boundingBox.ne.longitude,
      },
      {
        lat: RESPONSE.data.boundingBox.sw.latitude,
        lng: RESPONSE.data.boundingBox.sw.longitude,
      },
      {
        lat: RESPONSE.data.boundingBox.ne.latitude,
        lng: RESPONSE.data.boundingBox.sw.longitude,
      },
    ];
  }

  useEffect(() => {
    initMap();
  });

  const mapContainerStyle = {
    width: "100%",
    height: "840px",
  };

  if (!props.isInsight) {
    center = {
      lat: props.lat,
      lng: props.lng,
    };
  } else {
    center = {
      lat: RESPONSE.data.center.latitude,
      lng: RESPONSE.data.center.longitude,
    };
  }

  // Initializing the map
  function initMap() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 22,
      mapTypeId: "satellite",
      tilt: 0,
    });

    // creating boundary polygon
    const polygon = new window.google.maps.Polygon({
      paths: paths,
      strokeColor: "#00ffec",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.01,
    });

    polygon.setMap(map);

    // plotting marker on center
    const marker = new window.google.maps.Marker({
      map: map,
      position: {
        lat: center.lat,
        lng: center.lng,
      },
    });
    marker.setMap(map);

    // calling getPanels Function
    if (props.isInsight) {
      getPanels(map);
    }
  }

  //----Get Panels on Map----
  function getPanels(map) {
    const marker = new window.google.maps.Marker({
      map: map,
      position: {
        lat: RESPONSE.data.center.latitude,
        lng: RESPONSE.data.center.longitude,
      },
    });
    marker.setMap(map);

    let count = 0;

    for (let panel in solarPanels) {
      if (count < props.panelCount) {
        const boundingBox = calculateBoundingBox(
          solarPanels[panel].center.latitude,
          solarPanels[panel].center.longitude,
          solarPanels[panel].orientation
        );

        // boundary for each panel
        const paths2 = [
          {
            lat: boundingBox.north,
            lng: boundingBox.east,
          },
          {
            lat: boundingBox.south,
            lng: boundingBox.east,
          },
          {
            lat: boundingBox.south,
            lng: boundingBox.west,
          },
          {
            lat: boundingBox.north,
            lng: boundingBox.west,
          },
        ];

        // drawing polygon along the boundary
        const polygon = new window.google.maps.Polygon({
          paths: paths2,
          strokeColor: "#7ba5f0",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#1651bc",
          fillOpacity: 0.8,
        });

        polygon.setMap(map);

        count++;
      } else {
        break;
      }
    }
  }

  //----Calculating Bounding Box----
  function calculateBoundingBox(centerLat, centerLng, orientation) {
    const earthRadius = 6371; // Earth's radius in kilometers
    let panelWidth = 0;
    let panelHeight = 0;
    if (orientation === "LANDSCAPE") {
      panelHeight = 0.00165;
      panelWidth = 0.000992;
    } else if (orientation === "PORTRAIT") {
      panelWidth = 0.00165;
      panelHeight = 0.000992;
    }
    const latRange = (panelHeight / earthRadius) * (180 / Math.PI); // Calculate the latitude range
    const lngRange =
      ((panelWidth / earthRadius) * (180 / Math.PI)) /
      Math.cos(centerLat * (Math.PI / 180)); // Calculate the longitude range

    // Calculate bounding box coordinates
    const northLat = centerLat + latRange / 2;
    const southLat = centerLat - latRange / 2;
    const eastLng = centerLng + lngRange / 2;
    const westLng = centerLng - lngRange / 2;
    return {
      north: northLat,
      south: southLat,
      east: eastLng,
      west: westLng,
    };
  }

  return (
    <div>
      <div id="map" style={mapContainerStyle}></div>
    </div>
  );
}
