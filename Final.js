let map;
let autocomplete;
let latitude =37.7793;
let longitude =-122.4192;



const GOOGLE_API_KEY = 'AIzaSyDhhP_Ju3_A6sy2C7BBlh8wuS-WwirfOaY'; // API Key
const TILESET_URL = 'https://tile.googleapis.com/v1/3dtiles/root.json'; //Photorealistic 3D Tiles URL
let polygonHeight = 500;

// Calculate the center of a polygon
function calculatePolygonCenter(coordinates) {
    let latSum = 0;
    let lngSum = 0;
    for (const coord of coordinates) {
      latSum += coord[1];
      lngSum += coord[0];
    }
    const latCenter = latSum / coordinates.length;
    const lngCenter = lngSum / coordinates.length;
    
    return { lat: latCenter, lng: lngCenter };
  }

  const disable3DBuildingsCheckbox = document.getElementById("disable3DBuildings");
  disable3DBuildingsCheckbox.addEventListener("change",function(){
    if(disable3DBuildingsCheckbox.checked){
      const deckoverlay = new deck.GoogleMapsOverlay({
        controller: true,
        effects:[lightingEffect],
        layers: [PhotorealisticLayer],// disabled for testing purpose
      
        
      // Add code to disable lighting after a certain zoom
      
    
      });
      deckoverlay.setMap(map);
    }
  })


  //Photorealistic 3D Layer
  const PhotorealisticLayer=new deck.Tile3DLayer({
    id: 'google-3d-tiles',
    data: TILESET_URL,
    loadOptions: {
     fetch: {
       headers: {
         'X-GOOG-API-KEY': GOOGLE_API_KEY
       }
     }
   },
    onTilesetLoad: tileset3d => {
      tileset3d.options.onTraversalComplete = selectedTiles => {
        const credits = new Set();
        selectedTiles.forEach(tile => {
          const {copyright} = tile.content.gltf.asset;
          copyright.split(';').forEach(credits.add, credits);
          creditsElement.innerHTML = [...credits].join('; ');
        });
        return selectedTiles;
      }
    }
  })

  //AmbientLight for deck
  const ambientLight = new deck.AmbientLight({
    color: [255, 255, 255],
    intensity: 1.5,
  });
  const sunLight = new deck._SunLight({
    // timestamp: 1554927200000,
    timestamp : Date.now(),        
    color: [255, 255, 255],
    intensity: 1,
    _shadow: true,
  });


  const vibranceEffect = new deck.PostProcessEffect(luma.vibrance, {  //vibrance for decl
    amount: 1,
  });
  const brightnessContrastEffect = new deck.PostProcessEffect(  // Brightness for deck
    luma.brightnessContrast,
    {
      contrast: 0.075,
      brightness: 0,
    },
  );  
  const lightingEffect = new deck.LightingEffect({
    ambientLight,
    sunLight,  // disabled sunlight for test purpose
  });
  lightingEffect.shadowColor = [0, 0, 0, 0.5];

  const deckoverlay = new deck.GoogleMapsOverlay({
    controller: true,
    effects:[lightingEffect],
    // layers: [PhotorealisticLayer],// disabled for testing purpose
  
  // Add code to disable lighting after a certain zoom
  

  })

  function initMap(){
    const mapDiv = document.getElementById("map");
    let mapOptions ={
      center: {
        lat: 37.7793, lng: -122.4192
    },
    zoom: 16,
    heading: 320,
    tilt: 47.5,
    mapId: "ab7ba35e5564ec67",};

    map = new google.maps.Map(mapDiv, mapOptions);
    deckoverlay.setMap(map);


    // Get a reference to the checkbox element


  // // Add an event listener to the checkbox
  // disable3DBuildingsCheckbox.addEventListener("change", function () {
  //   if (disable3DBuildingsCheckbox.checked) {
  //     // Disable 3D buildings by changing the mapId
  //     mapOptions ={
  //       center: {
  //         lat: 37.7793, lng: -122.4192
  //     },
  //     zoom: 16,
  //     heading: 320,
  //     tilt: 47.5,
  //     mapId: "8297ccb6ce26c44b",};
  //     map = new google.maps.Map(mapDiv, mapOptions);
  //     deckoverlay.setMap(map);
  //     const drawingManager = new google.maps.drawing.DrawingManager({
  //       drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //       drawingControl: true,
  //       drawingControlOptions: {
  //         position: google.maps.ControlPosition.TOP_CENTER,
  //         drawingModes: [
  //           // google.maps.drawing.OverlayType.MARKER,
  //           // google.maps.drawing.OverlayType.CIRCLE,
  //           google.maps.drawing.OverlayType.POLYGON,
  //           // google.maps.drawing.OverlayType.POLYLINE,
  //           // google.maps.drawing.OverlayType.RECTANGLE,
  //         ],
  //       },
  //       map: map, // associate the drawingManager with the map
  //     });
  //     deckoverlay.setProps({
  //       effects: [lightingEffect],
  //       layers: [PhotorealisticLayer]
  //      });
  //   } else {
  //     // Revert to the default mapId with 3D buildings
  //     mapOptions ={
  //       center: {
  //         lat: 37.7793, lng: -122.4192
  //     },
  //     zoom: 16,
  //     heading: 320,
  //     tilt: 47.5,
  //     mapId: "ab7ba35e5564ec67",};
  //     map = new google.maps.Map(mapDiv, mapOptions);
  //     deckoverlay.setMap(map);
  //     const drawingManager = new google.maps.drawing.DrawingManager({
  //       drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //       drawingControl: true,
  //       drawingControlOptions: {
  //         position: google.maps.ControlPosition.TOP_CENTER,
  //         drawingModes: [
  //           // google.maps.drawing.OverlayType.MARKER,
  //           // google.maps.drawing.OverlayType.CIRCLE,
  //           google.maps.drawing.OverlayType.POLYGON,
  //           // google.maps.drawing.OverlayType.POLYLINE,
  //           // google.maps.drawing.OverlayType.RECTANGLE,
  //         ],
  //       },
  //       map: map, // associate the drawingManager with the map
  //     });
  //     deckoverlay.setProps({
  //       effects: [lightingEffect],
  //       // layers: [PhotorealisticLayer]
  //      });
  //   }
  // });

    

    //Autocomplete
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),
    {
      fields: ['place_id', 'geometry', 'name']
    });
    autocomplete.addListener('place_changed', onPlaceChanged);

    function onPlaceChanged(){
      
      const place = autocomplete.getPlace();
      if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
      }
      
      // Get references to the HTML elements
      const locationInput = document.getElementById('autocomplete');
      
      if (!place.geometry) {
        alert("No location details available.");
        return;
      }
      
      // Obtain coordinates from autocomplete search 

       latitude = place.geometry.location.lat();
       longitude = place.geometry.location.lng();
      console.log('Coordinates:', latitude, longitude);

    //    // Making a request to the Google's Time Zone API
    // fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${Math.floor(Date.now() / 1000)}&key=AIzaSyBVvhGrlSMOQPtEf3j66JFR1UcNdp1Ld6Q`)
    // .then(response => response.json())
    // .then(data => {
    //   // Get the current date in the timezone of the location
    //   const date = new Date((data.dstOffset + data.rawOffset + Math.floor(Date.now() / 1000)) * 1000);
      
    //   // Update the slider value to match the current time in the timezone of the location
    //   slider.value = date.getHours() * 60 + date.getMinutes();
      
    //   // Trigger the input event to update the SunLight timestamp
    //   slider.dispatchEvent(new Event('input'));
    // });

      // Get the selected coordinates
      const destinationLocation = place.geometry.location;
      
      
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
       map.fitBounds(place.geometry.viewport);
      
      // Trigger the animation to the selected location
      // animateMap(map, map.getCenter(), destinationLocation, 4000, 20); // 4 seconds duration
      } else {
      // Trigger the animation to the selected location
      // animateMap(map, map.getCenter(), destinationLocation, 4000, 20); // 4 seconds duration
      map.setCenter(place.geometry.location);
      map.setZoom(16);  
      }
      //



      }


// // Function to convert slider value to timestamp
// function getTimeFromSliderValue(value) {
//   const hours = Math.floor(value / 60);
//   const minutes = value % 60;
//   const date = new Date();
//   date.setHours(hours, minutes, 0, 0);
//   return date.getTime();
// };

// // Function to get the current time in the selected location
// function getTimezone(lat, lng) {
//   const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API Key
//   const timestamp = Math.floor(Date.now() / 1000);
//   const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${API_KEY}`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { dstOffset, rawOffset } = data;
//       const date = new Date();
//       const utcTime = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
//       const timezoneOffset = dstOffset * 1000 + rawOffset * 1000;
//       const localTime = new Date(utcTime + timezoneOffset);

//       // Calculate the slider value based on the local time
//       const sliderValue = calculateSliderValue(localTime);

//       // Update the slider and display based on the calculated slider value
//       updateSliderAndDisplay(sliderValue);
//     })
//     .catch(error => console.error('Error:', error));
// }

// // Function to calculate the slider value based on the current time
// function calculateSliderValue(localTime) {
//   const hours = localTime.getHours();
//   const minutes = localTime.getMinutes();
//   return hours * 60 + minutes;
// }

// // Function to update the slider and display based on the calculated slider value
// function updateSliderAndDisplay(sliderValue) {
//   // Update the slider value
//   slider.value = sliderValue;

//   // Dispatch an 'input' event to update the slider's visual position
//   const event = new Event('input');
//   slider.dispatchEvent(event);
// }

// slider.addEventListener('input', (e) => {
//   const value = parseInt(e.target.value, 10);
//   const timestamp = getTimeFromSliderValue(value);
  
//   sunLight.timestamp = timestamp;
  
//   // Update the sunLight in lightingEffect
//   lightingEffect.lightSources = {ambientLight, sunLight};
  
//   // Update the effects in deckoverlay
//   deckoverlay.setProps({
//     effects: [lightingEffect],
//     // layers: [PhotorealisticLayer]
//    });
// });

function getTimeFromSliderValue(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
};

let slider= document.getElementById("timeslider");

slider.addEventListener('input', (e) => {
  const value = parseInt(e.target.value, 10);
  const time = getTimeFromSliderValue(value);
  
  // Convert the time in milliseconds to a Date object
  const date = new Date(time);
  const formattedTime = date.getHours().toString().padStart(2, '0') + ':' + 
  date.getMinutes().toString().padStart(2, '0');

  let timeslidervalue = document.getElementById('tslidevalue');
  timeslidervalue.innerHTML="Current Time : "+ formattedTime;




  
  let timestamp = getTimeFromSliderValue(value);
  sunLight.timestamp = timestamp;

  deckoverlay.setProps({
        effects: [lightingEffect], 
        //  layers: [PhotorealisticLayer]
       });

});
slider.dispatchEvent(new Event('input'));

      
      

let userCreatedPolygon;
const drawingManager = new google.maps.drawing.DrawingManager({
  drawingMode: google.maps.drawing.OverlayType.POLYGON,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [
      // google.maps.drawing.OverlayType.MARKER,
      // google.maps.drawing.OverlayType.CIRCLE,
      google.maps.drawing.OverlayType.POLYGON,
      // google.maps.drawing.OverlayType.POLYLINE,
      // google.maps.drawing.OverlayType.RECTANGLE,
    ],
  },
  map: map, // associate the drawingManager with the map
});
drawingManager.setDrawingMode(null);
google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
  if (userCreatedPolygon) {
    userCreatedPolygon.setMap(null);
  }
  userCreatedPolygon = polygon;
  let coordinates = polygon.getPath().getArray(); // for dragable
  let coordinatesgl = polygon.getPath().getArray().map(latlng => [latlng.lng(), latlng.lat()]);
 
  let fillColor = '#ffac6f';
  const newPolygon = new google.maps.Polygon({   // for dragable polygon 
    paths: coordinates, 
    fillColor: fillColor,
    fillOpacity: 0.8,
    draggable: true,
    // editable: true, //disabled for testing purposes
    strokeColor: '#5b2c83',
    map: map
  });

  userCreatedPolygon.setMap(null);
  userCreatedPolygon = newPolygon;
  google.maps.event.addListener(newPolygon, 'click', function() {
    // Show a confirmation dialog to the user
    if (confirm('Do you want to delete this polygon?')) {
      // If the user confirms, remove the polygon from the map
      newPolygon.setMap(null);
      userCreatedPolygon = null;
    }
  });
  console.log("Location of user created  ",coordinatesgl)
  const center = calculatePolygonCenter(coordinatesgl);
  console.log(center.lat, center.lng);
  
  overlay.anchor =  { lat: latitude, lng: longitude, altitude:  0};
 
  fetchSolarData(center.lat, center.lng);
  drawingManager.setDrawingMode(null);
  // let userHeight = parseFloat(prompt("Please enter height for the 3D model"));
  const nebulaPolygon = new deck.SolidPolygonLayer({
  id: 'polygon-layer',
  data: [
    { 
      polygon: [coordinatesgl],
      color: [211, 211, 211],
      height: 500  // Height in meters
    }
  ],
  pickable: true,
  stroked: true,
  filled: true,
  extruded: true,  // Enable extrusion
  wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: d => d.polygon,
  getFillColor: d => d.color,
  getElevation: d => d.height,  // Use height property for extrusion
});
deckoverlay.setProps({
  //layers:[nebulaPolygon], //disabled for testing purpose
  effects:[lightingEffect]
})
google.maps.event.addListener(newPolygon, 'dragend', function() {
  // Update the coordinates when the polygon is dragged
  let coordinates = newPolygon.getPath().getArray(); // for draggable
  let coordinatesgl = coordinates.map(latlng => [latlng.lng(), latlng.lat()]);
  console.log(coordinatesgl);

  const center = calculatePolygonCenter(coordinatesgl);
  console.log(center.lat, center.lng);
  
  fetchSolarData(center.lat, center.lng);


  // Update the nebula.gl polygon with the new coordinates
  const nebulaPolygon = new deck.SolidPolygonLayer({
    id: 'polygon-layer',
    data: [
      { 
        polygon: [coordinatesgl],
        color: [211, 211, 211],
        height: 500  // Height in meters
      }
    ],
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,  // Enable extrusion
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.polygon,
    getFillColor: d => d.color,
    getElevation: d => d.height,  // Use height property for extrusion
  });

  // Force a redraw of the deck.gl layers
  deckoverlay.setProps({
     //layers: [nebulaPolygon], // disabled for testing
    effescts: [lightingEffect]
  });
});

});

// Function to update the height of the 3D polygon
function updatePolygonHeight(height) {
  polygonHeight = height;
  const coordinatesgl = userCreatedPolygon.getPath().getArray().map(latlng => [latlng.lng(), latlng.lat()]);


  // Update the nebula.gl polygon with the new height
  const nebulaPolygon = new deck.SolidPolygonLayer({
    id: 'polygon-layer',
    data: [
      {
        polygon: [coordinatesgl],
        color: [211, 211, 211],
        height: polygonHeight,  // Use the updated height
      }
    ],
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: d => d.polygon,
    getFillColor: d => d.color,
    getElevation: d => d.height,
  });




  // Force a redraw of the deck.gl layers
  deckoverlay.setProps({
    effects:[lightingEffect],
    //layers: [nebulaPolygon]// PhotorealisticLayer]
  });
}

var Slider =document.getElementById("height-slider");
var output1 = document.getElementById("slidervalue");
output1.innerHTML=Slider.value;
Slider.oninput=function(){
  output1.innerHTML="Current Height : "+this.value;
}

// Listen for changes in the height slider
const heightSlider = document.getElementById('height-slider');
heightSlider.addEventListener('input', (e) => {
  const newHeight = parseInt(e.target.value, 10);
  updatePolygonHeight(newHeight);
  // updateSolarPanelAltitude(newHeight);
});
const overlay = new google.maps.plugins.three.ThreeJSOverlayView({
  map: map,
  // anchor: { lat: 37.7793, lng: -122.4192, altitude:  0},
  anchor: { lat: latitude, lng: longitude, altitude:  0},
}); 
const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
    

// const geometry = new THREE.BoxGeometry(10, 10, 10);
// const geometry = new THREE.BoxGeometry(1.65, 0.992, 0.1); //OG
const geometry = new THREE.BoxGeometry(1.50, 0.842, 0.1);

// Create a material
// const material = new THREE.MeshBasicMaterial({ color: 0x000080 });
const material = new THREE.MeshPhongMaterial({ color: 0x0000080, shininess: 100 });

// Create a mesh using the geometry and material
const cube = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(cube.geometry);

// Create a line segments material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x808080 }); // grey color

// Create a line segments mesh using the edges geometry and line material
const lines = new THREE.LineSegments(edges, lineMaterial);

// Add the lines to the cube
cube.add(lines);
cube.castShadow = true;




// Set the position of the cube
overlay.latLngAltitudeToVector3({ lat: 37.7793, lng: -122.4192, altitude: 0 }, cube.position);
// Create a directional light
const light = new THREE.DirectionalLight(0xFFFFFF, 1);

light.castShadow = true;
overlay.latLngAltitudeToVector3({ lat: 37.7793, lng: -122.4192, altitude: 80 }, light.position);
// light.position.set(0, 0, 1);

// Add the light to the scene
overlay.scene.add(light);
// Add the cube to the overlay's scene
// cube.rotation.z = 1.57;
overlay.scene.add(cube);
const ambientLight3 = new THREE.AmbientLight(0x404040); // Soft white light
overlay.scene.add(ambientLight3);



let maxArrayPanelsCount, maxSunshinehoursPerYear, MaxRoofSpace, mesh, dummy, sollat, sollng, panori;
function fetchSolarData(latitude, longitude) {
  // Replace 'YOUR_API_KEY' with your actual Google Solar API key
  const API_KEY = 'AIzaSyBVvhGrlSMOQPtEf3j66JFR1UcNdp1Ld6Q';
  
  const apiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${API_KEY}`;

  // Make the API request
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Display the solar data in your HTML or log it to the console
      console.log(data);
      console.log('Max Panels for Roof is',data.solarPotential.maxArrayPanelsCount);
      maxArrayPanelsCount = data.solarPotential.maxArrayPanelsCount;
      maxSunshinehoursPerYear =Math.round(data.solarPotential.maxSunshineHoursPerYear);
      MaxRoofSpace = Math.round(data.solarPotential.maxArrayAreaMeters2);
      console.log('max sunshine hours per year, max roof space in metre square',maxSunshinehoursPerYear, MaxRoofSpace);

      const financialAnalyses = data.solarPotential.financialAnalyses;
        let sum = 0;
        let count = 0;

        for (let i = 0; i < financialAnalyses.length; i++) {
          const analysis = financialAnalyses[i];
          if (analysis.cashPurchaseSavings) {
            sum += analysis.cashPurchaseSavings.paybackYears;
            count++;
          }
        }

        const average = count > 0 ? sum / count : 0;
        const roundedAverage = Math.round(average);
        console.log('Average Payback Years:', roundedAverage); //if max supported panels installed


      let annualEnergyProd = 0
      dummy = new THREE.Object3D();
      mesh = new THREE.InstancedMesh(geometry,material,  maxArrayPanelsCount );

    

      for(let i=0 ; i< maxArrayPanelsCount; i++){
        let sollocation = data.solarPotential.solarPanels[i];
        
        sollat = sollocation.center.latitude  ; 
        sollng = sollocation.center.longitude  ; 
        let panseg = sollocation.segmentIndex;
        panori = sollocation.orientation;

        let roofseg = data.solarPotential.roofSegmentStats[panseg];

        let segcen=roofseg.center;
        let seglat=segcen.latitude;
        let seglng = segcen.longitude;

    

        let neLat = roofseg.boundingBox.ne.latitude;
        let neLng = roofseg.boundingBox.ne.longitude;
        let swLat = roofseg.boundingBox.sw.latitude;
        let swLng = roofseg.boundingBox.sw.longitude;
        
        let pitch = roofseg.pitchDegrees*0.01745329251;  // convert to radians
        let azimuth = roofseg.azimuthDegrees*0.01745329251 ;
        let height = roofseg.planeHeightAtCenterMeters;

        var centerLat = (neLat + swLat) / 2;
        var centerLng = (neLng + swLng) / 2;

        var vectorLat = neLat - swLat;
        var vectorLng = neLng - swLng;
    
        // rotate the vector by 90 degrees counterclockwise
        var rotatedVectorLat = -vectorLng;
        var rotatedVectorLng = vectorLat;
    
        // calculate the edge center latitude and longitude based on azimuth
        var edgeCenterLat = centerLat + Math.cos(azimuth) * rotatedVectorLat;
        var edgeCenterLng = centerLng + Math.cos(azimuth) * rotatedVectorLng;


        ///////////////////////////////////////////
        

        function haversine(lat1, lon1, lat2, lon2) {
          // Radius of the Earth in kilometers
          const R = 6371*1000;
      
          // Convert latitude and longitude from degrees to radians
          const radLat1 = (Math.PI * lat1) / 180;
          const radLon1 = (Math.PI * lon1) / 180;
          const radLat2 = (Math.PI * lat2) / 180;
          const radLon2 = (Math.PI * lon2) / 180;
      
          // Haversine formula
          const dLon = radLon2 - radLon1;
          const dLat = radLat2 - radLat1;
          const a = Math.sin(dLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
          // Calculate the distance
          const distance = R * c;
      
          return distance;
      }
      
      let g;
      g= haversine(sollat,sollng,edgeCenterLat,edgeCenterLng);
      


        annualEnergyProd = Math.round(annualEnergyProd+sollocation.yearlyEnergyDcKwh)
      

      let eh = g*Math.tan(roofseg.pitchDegrees*0.01745329251);


        overlay.latLngAltitudeToVector3({ lat: sollat, lng: sollng, altitude: height - 15 }, dummy.position);
        
        //dummy.rotation.x = pitch;
        if(panori==="LANDSCAPE"){
          dummy.rotation.z= 3.14-azimuth;
          dummy.rotation.x= pitch * Math.cos(dummy.rotation.z); // Pitch (rotation about x-axis in the direction of azimuth)
          dummy.rotation.y= pitch * Math.sin(dummy.rotation.z);
          
          
        }
        else{
          dummy.rotation.z=1.57-azimuth;
          dummy.rotation.x= pitch * Math.cos(3.14-azimuth); // Pitch (rotation about x-axis in the direction of azimuth)
          dummy.rotation.y= pitch * Math.sin(3.14-azimuth);
        }
      
        dummy.updateMatrix();
        mesh.setMatrixAt(i,dummy.matrix);
        dummy.castShadow = true;

        heightSlider.addEventListener('input', (e) => {
          let newHeight = parseInt(e.target.value, 10);
          newHeight -=40;
          
            mesh.getMatrixAt(i, matrix);
            matrix.decompose(dummy.position, dummy.rotation, dummy.scale);
            
            sollocation = data.solarPotential.solarPanels[i];
                
            sollat = sollocation.center.latitude  ; 
            sollng = sollocation.center.longitude  ;
        
        
            // Update the altitude based on the slider value
            overlay.latLngAltitudeToVector3({ lat: sollat, lng: sollng, altitude: height + newHeight }, dummy.position);
            
            dummy.updateMatrix();
            mesh.setMatrixAt(i,dummy.matrix);
            dummy.castShadow = true;
        
            // Update the matrix for the solar panel
            // let matrix = new THREE.Matrix4();
            // matrix.compose(currentPosition, new THREE.Quaternion(), new THREE.Vector3());
            // mesh.setMatrixAt(i, matrix);
          
          mesh.instanceMatrix.needsUpdate = true;
        });
        



        autocomplete.addListener('place_changed', onPlaceChanged);
        function onPlaceChanged(){
  
         mesh.geometry.dispose();
        mesh.material.dispose();
        overlay.scene.remove(mesh);
  
              }

        
      }
 


            

      overlay.scene.add(mesh)
        
      
      
      console.log('Net Energy Production(DC) per year in kwh',annualEnergyProd); //if max supported panels installed
      // You can parse and display specific data from the API response here
      
      // Input values
const netEnergyProductionDC = annualEnergyProd; // Net Energy Production (DC) per year in kWh
const dcToAcDerateFactor = 0.85; // DC to AC derate factor (typically less than 1)
const expectedLifespanYears = 20; // Expected lifespan of the solar installation

// Initialize variables
let initialACProduction = netEnergyProductionDC * dcToAcDerateFactor;
let totalACProduction = 0;
let yearlyACProduction;
// Calculate yearly AC production for each year over the expected lifespan
for (let year = 1; year <= expectedLifespanYears; year++) {
  // Calculate yearly AC production for the current year
  yearlyACProduction = Math.round(initialACProduction * Math.pow(0.995, year - 1)); // Assuming 0.995 as efficiency depreciation factor
  
  // Add yearly AC production to the total
  totalACProduction += yearlyACProduction;
}
console.log('Net Energy Production(AC) per year in kwh', yearlyACProduction); //if max supported panels installed
// Display the total AC production over the life of the installation
console.log("Total AC production over", expectedLifespanYears, "years:", totalACProduction, "kWh");
let savings1yr = Math.round(yearlyACProduction*0.17) ; //per kwh $0.17 US average taken from official website
console.log("Approx Electricity Bill Savings Per Year(USD) : ",savings1yr);
let savings20yrs = Math.round(totalACProduction*0.17);
console.log("Approx Electricity Bill Savings in 20 Years(USD) : ",savings20yrs);
document.getElementById("netEnergyProductionDC").innerHTML =  netEnergyProductionDC;
document.getElementById("yearlyACProduction").innerHTML=yearlyACProduction;
document.getElementById("totalACProduction").innerHTML = totalACProduction;
document.getElementById("roundedAverage").innerHTML=roundedAverage;
document.getElementById("savings1yr").innerHTML = savings1yr;
document.getElementById("savings20yrs").innerHTML = savings20yrs;
document.getElementById("maxArrayPanelsCount").innerHTML = maxArrayPanelsCount;
document.getElementById("maxSunshinehoursPerYear").innerHTML = maxSunshinehoursPerYear;
document.getElementById("MaxRoofSpace").innerHTML= MaxRoofSpace;
    })
    .catch((error) => {
      console.error('Error fetching solar data:', error);
    });
   
    
    
}
const matrix = new THREE.Matrix4();
function animate() {


    
  


  
  requestAnimationFrame(animate);
  renderer.render(overlay.scene,overlay.camera);
  renderer.ColorSpace = THREE.sRGBEncoding;

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 


  
  overlay.requestRedraw();
}
animate();

  }
  window.initMap=initMap;