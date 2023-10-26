var map;
var keywordcolourcode;
var icon;
let count = 0;
var service;
var infowindow;
var radius = 1000;
var request;
var arry;
var markersVisible;
var service;
var circle;

// Arrays for markers
var gmarkers = [];
var gcircle = [];
var pharmMark = [];
var restoMark = [];
var superMark = [];
var fuelMark = [];
var hardwareMark = [];
var groceryMark = [];
var schoolMark = [];
var cafeMark = [];
var panshopMark = [];
var cementMark = [];
var bankMark = [];
var atmMark = [];
var warehouseMark = [];
var chemicalMark = [];
var customMark = [];
var searchedKeyword = new Map();

var markersVisiblePharm = true;
var markersVisibleResto = true;
var markersVisibleCafe = true;
var markersVisibleCement = true;
var markersVisiblefuel = true;
var markersVisiblesuper = true;
var markersVisibleGrocery = true;
var markersVisiblehardware = true;
var markersVisiblePanshop = true;
var markersVisibleSchool = true;
var markerVisibleBank = true;
var markerVisibleAtm = true;
var markerVisibleWarehouse = true;
var markerVisibleChemical = true;
var placecordinatelat = 28.6139;
var placecordinatelng = 77.209;
var markersCustomKeyword = true;
var previouslySearchedValue;
var markerArray = [];

function cleardata() {
  infowindow.close();

  for (var i = 0; i < bankMark.length; i++) {
    bankMark[i].setVisible(false);
  }
  for (var i = 0; i < restoMark.length; i++) {
    restoMark[i].setVisible(false);
  }
  for (var i = 0; i < pharmMark.length; i++) {
    pharmMark[i].setVisible(false);
  }
  for (var i = 0; i < superMark.length; i++) {
    superMark[i].setVisible(false);
  }
  for (var i = 0; i < fuelMark.length; i++) {
    fuelMark[i].setVisible(false);
  }
  for (var i = 0; i < hardwareMark.length; i++) {
    hardwareMark[i].setVisible(false);
  }
  for (var i = 0; i < groceryMark.length; i++) {
    groceryMark[i].setVisible(false);
  }
  for (var i = 0; i < schoolMark.length; i++) {
    schoolMark[i].setVisible(false);
  }
  for (var i = 0; i < cafeMark.length; i++) {
    cafeMark[i].setVisible(false);
  }
  for (var i = 0; i < cementMark.length; i++) {
    cementMark[i].setVisible(false);
  }
  for (var i = 0; i < atmMark.length; i++) {
    atmMark[i].setVisible(false);
  }
  for (var i = 0; i < warehouseMark.length; i++) {
    warehouseMark[i].setVisible(false);
  }
  for (var i = 0; i < chemicalMark.length; i++) {
    chemicalMark[i].setVisible(false);
  }
  for (var i = 0; i < customMark.length; i++) {
    customMark[i].setVisible(false);
  }

  gmarkers = [];
  pharmMark = [];
  restoMark = [];
  superMark = [];
  fuelMark = [];
  hardwareMark = [];
  groceryMark = [];
  schoolMark = [];
  cafeMark = [];
  panshopMark = [];
  cementMark = [];
  bankMark = [];
  atmMark = [];
  warehouseMark = [];
  chemicalMark = [];
  customMark = [];

  markersVisiblePharm = true;
  markersVisibleResto = true;
  markersVisibleCafe = true;
  markersVisibleCement = true;
  markersVisiblefuel = true;
  markersVisiblesuper = true;
  markersVisibleGrocery = true;
  markersVisiblehardware = true;
  markersVisiblePanshop = true;
  markersVisibleSchool = true;
  markerVisibleBank = true;
  markerVisibleAtm = true;
  markerVisibleWarehouse = true;
  markerVisibleChemical = true;
  markersCustomKeyword = true;

  count = 0;

  document.getElementById("mySidebar").innerHTML =
    "<button onclick='w3_close()'>&times;</button>";

  document.getElementById("ATM").style.color = "#FFFFFF";
  document.getElementById("Bank").style.color = "#FFFFFF";
  document.getElementById("Restaurant").style.color = "#FFFFFF";
  document.getElementById("Supermarket").style.color = "#FFFFFF";
  document.getElementById("School").style.color = "#FFFFFF";
  document.getElementById("Pharmacy").style.color = "#FFFFFF";
  document.getElementById("fuel").style.color = "#FFFFFF";
  document.getElementById("Hardware").style.color = "#FFFFFF";
  document.getElementById("Grocery").style.color = "#FFFFFF";
  document.getElementById("Cement_Depo").style.color = "#FFFFFF";
  document.getElementById("Warehouse").style.color = "#FFFFFF";
  document.getElementById("Chemical").style.color = "#FFFFFF";
  document.getElementById("Cafe").style.color = "#FFFFFF";
  searchedKeyword = new Map();
}

// function to toggle button colour
function toggleColor(isVisible, id) {
  if (isVisible) {
    document.getElementById(id).style.color = "#FFA500 ";
  } else {
    document.getElementById("mySidebar").innerHTML =
      "<button onclick='w3_close()'>&times;</button>";
    document.getElementById("mySidebar").style.backgroundColor = "";
    document.getElementById(id).style.color = "#FFFFFF";
  }
}

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("Custom").value = "";
  document.getElementById("ATM").style.color = "white";
  document.getElementById("Bank").style.color = "white";
  document.getElementById("Restaurant").style.color = "white";
  document.getElementById("Cafe").style.color = "white";
  document.getElementById("Supermarket").style.color = "white";
  document.getElementById("School").style.color = "white";
  document.getElementById("Pharmacy").style.color = "white";
  document.getElementById("fuel").style.color = "white";
  document.getElementById("Hardware").style.color = "white";
  document.getElementById("Grocery").style.color = "white";
  document.getElementById("Cement_Depo").style.color = "white";
  document.getElementById("Warehouse").style.color = "white";
  document.getElementById("Chemical").style.color = "white";
  document.getElementById("mySidebar").style.display = "none";
  arry = customMark;
  for (var i = 0; i < arry.length; i++) {
    arry[i].setVisible(false);
  }
  markersCustomKeyword = !markersCustomKeyword;
  cleardata();
}

var registeredPlaces = [
  //predefined custom places can be added below
  // ["Custom Place", 18.604763651835412, 73.72133750704074],
  // ["Pune MyPlace", 18.490299375355892, 73.88772182291531],
];

if (document.getElementById("placeForm") != null) {
  document
    .getElementById("placeForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var locAdd = [];
      var placeName = document.getElementById("placeName").value;
      var latitude = parseFloat(document.getElementById("latitude").value);
      var longitude = parseFloat(document.getElementById("longitude").value);
      locAdd = [placeName, latitude, longitude];
      registeredPlaces.push(locAdd);
      sessionStorage.setItem(
        "registeredPlaces",
        JSON.stringify(registeredPlaces)
      );
      if (isNaN(latitude) || isNaN(longitude)) {
        alert(
          "Please enter valid numerical values for Latitude and Longitude."
        );
        return;
      }

      var table = document
        .getElementById("placeTable")
        .getElementsByTagName("tbody")[0];
      var newRow = table.insertRow(table.rows.length);

      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);

      cell1.innerHTML = placeName;
      cell2.innerHTML = latitude;
      cell3.innerHTML = longitude;
      cell4.innerHTML = '<button class="edit">Edit</button>';
      cell5.innerHTML = '<button class="delete">Delete</button>';

      document.getElementById("placeForm").reset();

      //  Add event listener for delete and edit buttons
      newRow.querySelector(".delete").addEventListener("click", function () {
        table.deleteRow(newRow.rowIndex);
      });

      newRow.querySelector(".edit").addEventListener("click", function () {
        document.getElementById("placeName").value = placeName;
        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;

        table.deleteRow(newRow.rowIndex);
      });
      document.getElementById("placeForm").reset();
    });
}

// map loading
//Javascript Api for map loading
function initMap() {
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.209 },
    zoom: 13,
    mapTypeControl: false,
    fullscreenControl: false,
    mapId: "2c768f40c9058151",
  });

  var input = document.getElementById("searchTextField");

  // Autocomplete Api
  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  let marker = new google.maps.Marker({
    map: map,
  });

  registeredPlaces = JSON.parse(sessionStorage.getItem("registeredPlaces"));
  var i;
  if (registeredPlaces != null) {
    map.setCenter(
      new google.maps.LatLng(registeredPlaces[0][1], registeredPlaces[0][2])
    );
    placecordinatelat = registeredPlaces[0][1];
    placecordinatelng = registeredPlaces[0][2];

    for (i = 0; i < registeredPlaces.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          registeredPlaces[i][1],
          registeredPlaces[i][2]
        ),
        map: map,
      });

      markerArray.push(marker);
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            cleardata();

            if (circle) {
              circle.setMap(null);
            }

            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent(registeredPlaces[i][0]);
            infowindow.open(map, marker);
            map.setCenter(marker.getPosition());
            placecordinatelat = marker.getPosition().lat();
            placecordinatelng = marker.getPosition().lng();

            circle = new google.maps.Circle({
              map: map,
              center: marker.getPosition(),
              radius: 5000, // in meters
              fillColor: "#AA0000",
              fillOpacity: 0.1,
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            });
          };
        })(marker, i)
      );
    }
  }
  //Autocomplete Api
  google.maps.event.addListener(autocomplete, "place_changed", () => {
    let place = autocomplete.getPlace();
    placecordinatelat = place.geometry.location.lat();
    placecordinatelng = place.geometry.location.lng();

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    infowindow.setContent(place.name);
    infowindow.open(map, marker);

    featureLayer = map.getFeatureLayer("LOCALITY");
    findBoundary(place.place_id);

    center = place.geometry.location;

    circle.setCenter(center);
  });

  circle = new google.maps.Circle({
    map: map,
    center: { lat: 28.6139, lng: 77.209 },
    radius: 5000, // in meters
    fillColor: "#AA0000",
    fillOpacity: 0.1,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });
}

async function findBoundary(placeid) {
  styleBoundary(placeid);
}

function styleBoundary(placeid) {
  // Define a style of transparent purple with opaque stroke.
  const styleFill = /** @type {!google.maps.FeatureStyleOptions} */ ({
    strokeColor: "#810FCB",
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#810FCB",
    fillOpacity: 0.2,
  });

  // Define the feature style function.
  featureLayer.style = (params) => {
    if (params.feature.placeId == placeid) {
      return styleFill;
    }
  };
}

const carouselContainer = document.querySelector(".carousel-container");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const carouselItems = document.querySelectorAll(".carousel-item");

let currentIndex = 0;

function showItem(index) {
  carouselContainer.style.transform = `translateX(-${index * 100}%)`;
}

function handlePrevClick() {
  if (currentIndex === 0) {
    return;
  } else {
    currentIndex--;
  }

  showItem(currentIndex);
}

function handleNextClick() {
  if (currentIndex == 2) {
    return;
  } else {
    currentIndex++;
  }

  showItem(currentIndex);
}

if (prevButton != null || nextButton != null) {
  prevButton.addEventListener("click", handlePrevClick);
  nextButton.addEventListener("click", handleNextClick);
}

function resto() {
  var Iid = "Restaurant";
  var type = "restaurant";
  arry = restoMark;

  toggleColor(markersVisibleResto, Iid);
  searchNearby(type, Iid, arry, markersVisibleResto);
  markersVisibleResto = !markersVisibleResto;
}

function superMarket() {
  var Iid = "Supermarket";
  var type = "supermarket";
  arry = superMark;

  toggleColor(markersVisiblesuper, Iid);
  searchNearby(type, Iid, arry, markersVisiblesuper);
  markersVisiblesuper = !markersVisiblesuper;
}

function fuelPump() {
  var Iid = "fuel";
  var type = "gas_station";
  arry = fuelMark;

  toggleColor(markersVisiblefuel, Iid);
  searchNearby(type, Iid, arry, markersVisiblefuel);
  markersVisiblefuel = !markersVisiblefuel;
}

function hardware() {
  var Iid = "Hardware";
  var type = "hardware_store";
  arry = hardwareMark;

  toggleColor(markersVisiblehardware, Iid);
  searchNearby(type, Iid, arry, markersVisiblehardware);
  markersVisiblehardware = !markersVisiblehardware;
}

function School() {
  var Iid = "School";
  var type = "school";
  arry = schoolMark;

  toggleColor(markersVisibleSchool, Iid);
  searchNearby(type, Iid, arry, markersVisibleSchool);
  markersVisibleSchool = !markersVisibleSchool;
}

function Cafe() {
  var Iid = "Cafe";
  var type = "cafe";
  arry = cafeMark;

  toggleColor(markersVisibleCafe, Iid);
  searchNearby(type, Iid, arry, markersVisibleCafe);
  markersVisibleCafe = !markersVisibleCafe;
}

function ATM() {
  var Iid = "ATM";
  var type = "atm";
  arry = atmMark;

  toggleColor(markerVisibleAtm, Iid);
  searchNearby(type, Iid, arry, markerVisibleAtm);
  markerVisibleAtm = !markerVisibleAtm;
}

function Bank() {
  var Iid = "Bank";
  var type = "bank";
  arry = bankMark;

  toggleColor(markerVisibleBank, Iid);
  searchNearby(type, Iid, arry, markerVisibleBank);
  markerVisibleBank = !markerVisibleBank;
}

function Pharmacy() {
  var Iid = "Pharmacy";
  var type = "pharmacy";
  arry = pharmMark;

  toggleColor(markersVisiblePharm, Iid);
  searchNearby(type, Iid, arry, markersVisiblePharm);
  markersVisiblePharm = !markersVisiblePharm;
}

function Warehouse() {
  var Iid = "Warehouse";
  var keyword = "warehouse";
  arry = warehouseMark;

  toggleColor(markerVisibleWarehouse, Iid);
  searchNearbyKeyword(keyword, Iid, arry, markerVisibleWarehouse);
  markerVisibleWarehouse = !markerVisibleWarehouse;
}

function Chemical() {
  var Iid = "Chemical";
  var keyword = "Chemical Industry";
  arry = chemicalMark;

  toggleColor(markerVisibleChemical, Iid);
  searchNearbyKeyword(keyword, Iid, arry, markerVisibleChemical);
  markerVisibleChemical = !markerVisibleChemical;
}

function Grocery() {
  var Iid = "Grocery";
  var keyword = "grocery";
  arry = groceryMark;

  toggleColor(markersVisibleGrocery, Iid);
  searchNearbyKeyword(keyword, Iid, arry, markersVisibleGrocery);
  markersVisibleGrocery = !markersVisibleGrocery;
}

function CementDepo() {
  var Iid = "Cement_Depo";
  var keyword = "Cement Depo";
  arry = cementMark;

  toggleColor(markersVisibleCement, Iid);
  searchNearbyKeyword(keyword, Iid, arry, markersVisibleCement);
  markersVisibleCement = !markersVisibleCement;
}

//Near By Search Api for (Type Search)
function searchNearby(type, Iid, arry, markersVisible) {
  var searchInput = document.getElementById(Iid).value;
  icon = document.getElementById(Iid).value;
  var loc = new google.maps.LatLng(placecordinatelat, placecordinatelng);

  request = {
    location: loc,
    type: [type],
    radius: 5000,
  };

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i], searchInput);
        for (var i = 0; i < arry.length; i++) {
          arry[i].setVisible(markersVisible);
        }
      }
    }
  });
}

//Near By Search Api for (Keyword Search)
function searchNearbyKeyword(keyword, Iid, arry, markersVisible) {
  var searchInput = document.getElementById(Iid).value;
  icon = document.getElementById(Iid).value;
  var loc = new google.maps.LatLng(placecordinatelat, placecordinatelng);

  request = {
    location: loc,
    keyword: keyword,
    radius: 5000,
  };

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i], searchInput);
        for (var i = 0; i < arry.length; i++) {
          arry[i].setVisible(markersVisible);
        }
      }
    }
  });
}

//Not In a List Section
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var keyword = document.getElementById("Custom").value.toLowerCase();
  if (searchedKeyword.has(keyword)) {
    return;
  }
  const predefinedTypes = [
    "atm",
    "bank",
    "restaurant",
    "cafe",
    "supermarket",
    "school",
    "pharmacy",
    "fuel pump",
    "hardware",
    "grocery",
    "cement depo",
    "warehouse",
    "chemical industry",
  ];
  if (predefinedTypes.includes(keyword)) {
    switch (keyword.toLowerCase()) {
      case "atm":
        ATM();
        break;
      case "bank":
        Bank();
        break;
      case "restaurant":
        resto();
        break;
      case "cafe":
        Cafe();
        break;
      case "supermarket":
        superMarket();
        break;
      case "school":
        School();
        break;
      case "pharmacy":
        Pharmacy();
        break;
      case "fuel pump":
        fuelPump();
        break;
      case "hardware":
        hardware();
        break;
      case "grocery":
        Grocery();
        break;
      case "cement depo":
        CementDepo();
        break;
      case "warehouse":
        Warehouse();
        break;
      case "chemical industry":
        Chemical();
        break;
    }
    document.getElementById("Custom").value = "";
    // Perform nearby search with type
  } else {
    // Perform nearby search with keyword
    var Iid = "Custom";
    searchedKeyword.set(keyword, customMark);
    arry = customMark;
    searchNearbyKeywordCustomSearch(keyword, Iid, arry, markersCustomKeyword);
    for (var i = 0; i < arry.length; i++) {
      arry[i].setVisible(markersVisible);
    }
    markersCustomKeyword = !markersCustomKeyword;
    previouslySearchedValue = keyword;
    document.getElementById("Custom").value = "";
  }
});

//Near By Search Api for (Keyword Search)
function searchNearbyKeywordCustomSearch(keyword, Iid, arry, markersVisible) {
  icon = "Custom";
  var loc = new google.maps.LatLng(placecordinatelat, placecordinatelng);

  request = {
    location: loc,
    keyword: keyword,
    radius: 5000,
  };

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i], "Custom");
      }
    }
  });
}

// Creation of markers
function createMarker(place, type) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    icon: `./img/${icon}.png`, // custom markers
  });

  //Pushing marker details in respective arrays
  switch (type) {
    case "Pharmacy":
      pharmMark.push(marker);
      break;
    case "Restaurant":
      restoMark.push(marker);
      break;
    case "Supermarket":
      superMark.push(marker);
      break;
    case "Fuel Pump":
      fuelMark.push(marker);
      break;
    case "Hardware":
      hardwareMark.push(marker);
      break;
    case "Grocery":
      groceryMark.push(marker);
      break;
    case "School":
      schoolMark.push(marker);
      break;
    case "Cafe":
      cafeMark.push(marker);
      break;
    case "Pan Shop":
      panshopMark.push(marker);
      break;
    case "Cement Depo":
      cementMark.push(marker);
      break;
    case "Bank":
      bankMark.push(marker);
      break;
    case "ATM":
      atmMark.push(marker);
      break;
    case "Warehouse":
      warehouseMark.push(marker);
      break;
    case "Chemical Industry":
      chemicalMark.push(marker);
      break;
    case "Custom":
      customMark.push(marker);
      break;
    default:
      gmarkers.push(marker);
  }

  gmarkers.push(marker);
  // to show name on sidebar
  var side_bar_html =
    "<a href='javascript:google.maps.event.trigger(gmarkers[" +
    parseInt(gmarkers.length - 1) +
    '],"click");\'>' +
    place.name +
    "</a>";

  document.getElementById("mySidebar").innerHTML +=
    "<ul background: #cce5ff; margin-bottom: 0px; >" + side_bar_html + "</ul>";

  var request = {
    reference: place.reference,
  };
  //to get details of location through info-window
  //Places Details (To get places details)
  google.maps.event.addListener(marker, "click", function () {
    service.getDetails(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var contentStr =
          "<div>" +
          "<h4>" +
          place.name +
          "</h4><p>" +
          "<b>Rating :</b>" +
          " " +
          place.rating;
        if (!!place.formatted_phone_number)
          contentStr +=
            "<br>" + "<b>Phone No. :</b>" + " " + place.formatted_phone_number;
        if (!!place.website)
          contentStr +=
            '<br><a target="_blank" href="' +
            place.website +
            '">' +
            place.website +
            "</a>";
        contentStr +=
          "<br>" +
          "<b>Address :</b>" +
          " " +
          place.formatted_address +
          "</p>" +
          "</div>";
        infowindow.setContent(contentStr);
        infowindow.setOptions({ maxWidth: 250 });
        infowindow.open(map, marker);
      } else {
        var contentStr = "<h5>No Result, status=" + status + "</h5>";
        infowindow.setContent(contentStr);
        infowindow.open(map, marker);
      }
    });
  });
}
dragElement(document.getElementById("myForm"));

//To drag the box
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("header1")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById("header1").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
