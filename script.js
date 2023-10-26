function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 22.5587287, lng: 88.3575847 },
    zoom: 10.49,
    mapId: '151cb39527f254ce'
  });
}

const searchInput = document.getElementById("search");
const searchResult = document.getElementById("search-result");
const markers = [];
const locations = [
  {
    title: "Gold",
    positions: [
      { lat: 22.5587212, lng: 88.3575845 },
      { lat: 22.6587212, lng: 88.3575845 },
      { lat: 22.5587212, lng: 88.2575845 },
      { lat: 22.7587212, lng: 88.5758455 }
    ],
  },
  {
    title: "Carbon Emission",
    positions: [
      { lat: 22.5587283, lng: 88.3575842 },
      { lat: 20.5587283, lng: 88.3575842 },
      { lat: 13.5587283, lng: 80.3575842 }
    ],
  },
  {
    title: "Water Logging",
    positions: [
      { lat: 25.5587220, lng: 85.3575840 },
      { lat: 19.5587220, lng: 83.9575840 },
      { lat: 20.5587220, lng: 81.7575840 },
      { lat: 23.5587220, lng: 85.2575840 }
    ],
  }
];

searchInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const search = searchInput.value.trim();
    if (search === "") {
      searchResult.textContent = "";
      clearMarkers();
      return;
    }
    const foundLocations = findLocations(search);
    if (foundLocations.length > 0) {
      searchResult.textContent = "";
      clearMarkers();
      markLocationsOnMap(foundLocations);
    } else {
      searchResult.textContent = "Search not found";
      clearMarkers();
    }
  }
});

function findLocations(search) {
  return locations.filter((location) => location.title.toLowerCase() === search.toLowerCase());
}

function markLocationsOnMap(locations) {
  locations.forEach((location) => {
    location.positions.forEach((position) => {
      const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.title
      });
      markers.push(marker);
    });
  });
  if (locations.length > 0) {
    map.setCenter(locations[0].positions[0]);
  }
}

function clearMarkers() {
  for (const marker of markers) {
    marker.setMap(null);
  }
  markers.length = 0;
}
