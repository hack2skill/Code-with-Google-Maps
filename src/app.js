import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const apiOptions = {
  apiKey: 'AIzaSyBOj0bxS4PuNwr-dU3BOzeBGllmNj3-a9Y'
};
var map;
let scene
let ambulanceModel;
scene = new THREE.Scene();
const directionsService = new google.maps.DirectionsService();
const mapOptions = {
  "tilt": 67.5,
  "heading": 180,
  "zoom": 18.5,
  "center": { lat: 19.2233, lng: 73.1556 }, // Replace with Ulhasnagar's Camp 3 coordinates
  "mapId": "a",
  "disableDefaultUI": true
}
async function initMap(mapId) {
  const mapDiv = document.getElementById("map");
  mapOptions.mapId = mapId;
  const apiLoader = new Loader(apiOptions);
  const googleMaps = await apiLoader.load();
  map = new google.maps.Map(mapDiv, mapOptions);
  return map;
}
async function initMapOverview() {
  const mapDiv = document.getElementById("overview");
  console.log(mapDiv);
  const apiLoader = new Loader(apiOptions);
  await apiLoader.load();
  return new google.maps.Map(mapDiv, mapOptions2);
}
var num_bees, time
// Initialize the autocomplete for the start and end point input fields
function initializeAutocomplete() {
  const startInput = document.getElementById('start-point');
  const endInput = document.getElementById('end-point');

  const autocompleteStart = new google.maps.places.Autocomplete(startInput);
  const autocompleteEnd = new google.maps.places.Autocomplete(endInput);
}

// Call the initializeAutocomplete function when the page loads
window.addEventListener('load', initializeAutocomplete);

function initWebGLOverlayView(map) {
  console.log('In InitWebGLOverlayView function')
  console.log(map);
  let renderer, camera, loader, spaceneedle, bee = [], vx = [], vy = [], changetime = [], avx = 0, avy = 0, avz = 0, initx = 11, inity = 11, initz = 11;
  const webGLOverlayView = new google.maps.WebGLOverlayView();
  num_bees = 20;
  time = 0;

  webGLOverlayView.onAdd = () => {
    // set up the scene
    time = 0
    camera = new THREE.PerspectiveCamera();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    // load the model    

    const source = "bee-gltf/source/bee_gltf.gltf";
    const source2 = "scene.gltf"

    loader = new GLTFLoader();
    let startPoint = null;
    let endPoint = null;
    // Load the ambulance model
    const ambulanceLoader = new GLTFLoader();
    ambulanceLoader.load(
      './ambulance_model.gltf',
      (gltf) => {
        ambulanceModel = gltf.scene;
        ambulanceModel.scale.set(3, 3, 3); // Scale the model as needed

        // Check if startPoint is defined before using it
        if (startPoint) {
          const startLatLng = new google.maps.LatLng(startPoint.lat, startPoint.lng);
          ambulanceModel.position.set(startLatLng.lat(), startLatLng.lng(), 0);

          // Calculate the rotation as needed based on the user's location
          const rotation = calculateRotation(startLatLng, endPoint);
          ambulanceModel.rotation.set(0, rotation, 0);

          scene.add(ambulanceModel);

          // Now that ambulanceModel is defined, you can use it in other functions
          animateAmbulanceOnRoute();
        }
      },
      undefined,
      (error) => {
        console.error('Error loading ambulance model', error);
      }
    );
    let carModel;
    const carLoader = new GLTFLoader();
    carLoader.load(
      './car_model.gltf', // Replace with the path to your car model file
      (gltf) => {
        carModel = gltf.scene;
        carModel.scale.set(0.04, 0.04, 0.04); // Adjust the scale as needed
        carModel.position.set(-55, 170, -121); // Set the initial position off-screen
        carModel.rotation.set(1.5, -4, 0); // Set the initial rotation
        scene.add(carModel);
      },
      undefined,
      (error) => {
        console.error('Error loading car model', error);
      }
    );
    let carModel2;
    const carLoader2 = new GLTFLoader();
    carLoader.load(
      './car_model.gltf', // Replace with the path to your car model file
      (gltf) => {
        carModel2 = gltf.scene;
        carModel2.scale.set(0.04, 0.04, 0.04); // Adjust the scale as needed
        carModel2.position.set(150, 410, -131); // Set the initial position off-screen
        carModel2.rotation.set(1.5, -4, 0); // Set the initial rotation
        scene.add(carModel2);
      },
      undefined,
      (error) => {
        console.error('Error loading car model', error);
      }
    );
    let carModel22;
    const carLoader22 = new GLTFLoader();
    carLoader.load(
      './car_model.gltf', // Replace with the path to your car model file
      (gltf) => {
        carModel22 = gltf.scene;
        carModel22.scale.set(0.04, 0.04, 0.04); // Adjust the scale as needed
        carModel22.position.set(30, 310, -131); // Set the initial position off-screen
        carModel22.rotation.set(1.5, -4, 0); // Set the initial rotation
        scene.add(carModel22);
      },
      undefined,
      (error) => {
        console.error('Error loading car model', error);
      }
    );
    let carModel3;
    const carLoader3 = new GLTFLoader();
    carLoader.load(
      './car_model.gltf', // Replace with the path to your car model file
      (gltf) => {
        carModel3 = gltf.scene;
        carModel3.scale.set(0.04, 0.04, 0.04); // Adjust the scale as needed
        carModel3.position.set(-145, 30, -131); // Set the initial position off-screen
        carModel3.rotation.set(1.5, -6, 0); // Set the initial rotation
        scene.add(carModel3);
      },
      undefined,
      (error) => {
        console.error('Error loading car model', error);
      }
    );  
    let carModel4;
    const carLoader4 = new GLTFLoader();
    carLoader.load(
      './car_model.gltf', // Replace with the path to your car model file
      (gltf) => {
        carModel4 = gltf.scene;
        carModel4.scale.set(0.04, 0.04, 0.04); // Adjust the scale as needed
        carModel4.position.set(-145, 70, -131); // Set the initial position off-screen
        carModel4.rotation.set(1.5, -6, 0); // Set the initial rotation
        scene.add(carModel4);
      },
      undefined,
      (error) => {
        console.error('Error loading car model', error);
      }
    );
    
    
 
  }

  webGLOverlayView.onContextRestored = ({ gl }) => {
    // create the three.js renderer, using the
    // maps's WebGL rendering context.
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;

    // wait to move the camera until the 3D model loads    
    loader.manager.onLoad = () => {
      x
      renderer.setAnimationLoop(() => {
        // ...
        // Set the heading to a fixed value (e.g., 0) to stop rotation
        mapOptions.heading = 0;
        if (mapOptions.zoom > 17) {
          mapOptions.zoom -= 0.0005;
        }
        time += 1;
        if (time > 700 && time < 3000) {
          // Logic for bees' movement 
        } else if (time > 3000) {
          // Logic for going back home
        }
        avx = 0, avy = 0, avz = 0;
        for (let i = 0; i < num_bees; i++) {
          // Logic for bee positions and rotations
        }
      });

    }
  }

  webGLOverlayView.onDraw = ({ gl, transformer }) => {
    // update camera matrix to ensure the model is georeferenced correctly on the map   

    const latLngAltitudeLiteral = {
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120
    }

    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

    webGLOverlayView.requestRedraw();
    renderer.render(scene, camera);

    // always reset the GL state
    renderer.resetState();
  }
  webGLOverlayView.setMap(map);
}
let carModel;
function setCarOnRoute(route) {
  if (carModel) {
    // Get the first segment of the route's path
    const firstSegment = route.routes[0].legs[0].steps[0].path[0];
    const carPosition = new google.maps.LatLng(firstSegment.lat(), firstSegment.lng());
    carModel.position.set(carPosition.lat(), carPosition.lng(), 0);
  }
}
function displayMap(mapId = "4755751e6697c394") {
  mapOptions.mapId = mapId;
  map.setOptions(mapOptions);
};
let route=null;
let car
(async () => {
  map = await initMap('d55af81411f34bc4');
  document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    const startInput = document.getElementById('start-point');
    const endInput = document.getElementById('end-point');
    let ambulanceModel; // Define ambulanceModel outside the callback function

    // Load the ambulance model
    const ambulanceLoader = new GLTFLoader();
    ambulanceLoader.load(
      './ambulance_model.gltf',
      (gltf) => {
        ambulanceModel = gltf.scene;
        ambulanceModel.scale.set(3, 3, 3);
        ambulanceModel.position.set(1.1532, 0.2233, -121);
        ambulanceModel.rotation.set(1.5, -2, 0);
        scene.add(ambulanceModel);

        // Now that ambulanceModel is defined, you can use it in other functions
        animateAmbulanceOnRoute();
      },
      undefined,
      (error) => {
        console.error('Error loading ambulance model', error);
      }
    );
    
    document.getElementById('calculate-route').addEventListener('click', () => {
      const startAddress = startInput.value;
      const endAddress = endInput.value;

      if (startAddress && endAddress) {
        geocodeAddress(startAddress, (startLocation) => {
          geocodeAddress(endAddress, (endLocation) => {
            calculateRoute(startLocation, endLocation);
          });
        });
      } else {
        alert('Please enter both start and end addresses.');
      }
      const notificationMessage = document.getElementById('notification-message');
      // notificationMessage.textContent = 'Calculating route...';
      // notificationMessage.style.display = 'block';
      setTimeout(() => {
        alert('Notifications sent. Clearer road. Estd. time: Less than 8 mins');
      }, 8000); // Adjust the delay time in milliseconds (5 seconds in this example)
    
      
    });
  });

  function geocodeAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        const coordinates = { lat: location.lat(), lng: location.lng() };
        callback(coordinates);
      } else {
        alert('Geocoding failed: ' + status);
      }
    });
  }
  function calculateRoute(startPoint, endPoint) {
    const request = {
      origin: startPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        if (result && result.routes && result.routes.length > 0) {
          route = result.routes[0];

          // Highlight the route on the map
          const routePath = new google.maps.Polyline({
            path: route.overview_path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 5,
          });
          routePath.setMap(map);

          // Display the travel time
          const travelTime = route.legs[0].duration.text;
          alert('Estimated Travel Time: ' + travelTime);

          // Start the animation
          animateAmbulanceOnRoute(route);
        } else {
          console.error('No valid route found in the result:', result);
          alert('No valid route found');
        }
      } else {
        console.error('Route calculation failed with status:', status);
        alert('Route calculation failed: ' + status);
      }
    });
  }
  function animateAmbulanceOnRoute(route) {
    let step = 0;

    function moveAmbulance() {
      if (route && route.routes && route.routes.length > 0) {
        const firstRoute = route.routes[0];
        if (firstRoute.legs && firstRoute.legs.length > 0) {
          const firstLeg = firstRoute.legs[0];

          if (firstLeg.steps && step < firstLeg.steps.length) {
            const nextSegment = firstLeg.steps[step].path[0];
            const nextPosition = new google.maps.LatLng(nextSegment.lat(), nextSegment.lng());
            const heading = google.maps.geometry.spherical.computeHeading(
              ambulanceModel.position,
              nextPosition
            );
            setCarOnRoute(route);
            ambulanceModel.position.set(nextSegment.lat(), nextSegment.lng(), 0);
            ambulanceModel.rotation.set(0, heading, 0);
            step++;
            setTimeout(moveAmbulance, 1000); // Delay between steps
          }
        }
      }
    }

    // Start the animation
    moveAmbulance();
  }
  const styles = {
    default: ['concrete_jungle'],
    concrete_jungle: 'd55af81411f34bc4',
    mad_max: '4755751e6697c394',
  };
  // const map2 = await initMapOverview();
  initWebGLOverlayView(map);
  // window.initMap = map2; 
  const styleControl = document.getElementById(
    "style-selector-control"
  );

  const dashmenu = document.getElementById(
    "sideBar"
  );

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);


  map.controls[google.maps.ControlPosition.LEFT].push(dashmenu);

  // Set the map's style to the initial value of the selector.
  const styleSelector = document.getElementById(
    "style-selector"
  );
})();

const placesService = new google.maps.places.PlacesService(map);

// Define the search request
const request = {
  location: { lat: 19.2233, lng: 73.1556 }, // Center of the map
  radius: 10000, // Search radius (in meters) around the center
  types: ['hospital'], // Search for hospitals
};

// Perform a nearby search for hospitals
placesService.nearbySearch(request, (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (const place of results) {
      // Create a marker for each hospital
      new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name, // Set the hospital name as the title
      });
    }
  }
});

// Continue with your existing code
initWebGLOverlayView(map);
const styles = {
  default: ['concrete_jungle'],
  concrete_jungle: "d55af81411f34bc4",
  mad_max: "4755751e6697c394"
};
