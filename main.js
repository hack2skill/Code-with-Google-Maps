// Initialize and add the map
let map;

async function initMap() {
  // Create an array of Indian Coffee House locations
  const indianCoffeeHouses = [
    { lat: 10.152691403374137, lng: 76.73782588446456, name: "Indian Coffee House 1" },
    { lat: 10.18062367564776, lng: 76.4350655114152, name: "Indian Coffee House 2" },
    { lat: 9.950490304914442, lng: 76.63755310505263, name: "Indian Coffee House 3" },
    { lat: 10.032395545432703, lng: 76.36337757752591, name: "Indian Coffee House 4" },
  ];
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  // Define a map style for dark mode
  const darkModeStyle = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    // Add more style configurations as needed.
  ];


  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
    styles: darkModeStyle,
  });


  // Add markers for Indian Coffee Houses
  indianCoffeeHouses.forEach(place => {
    new AdvancedMarkerElement({
      map: map,
      position: place,
      title: place.name,
    });
  });
}

initMap();

