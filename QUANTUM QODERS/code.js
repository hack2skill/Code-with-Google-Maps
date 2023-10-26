function getLocation() {
   
    //THESE COORDINATES WILL BE GIVEN BY THE DRONE. DUE TO TIME CONSTRATINTS, FIED COORDINATES HAVE BEEN CONSIDERED.
    var latitude = "12.996536254882812";  
    var longitude = "77.66828155517578";
    var locationElement = document.getElementById('location');

    var apiKey = 'abcd';

    var apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=12.97194,77.59369&key=abcd`;

    
    // GEOCODING API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK' && data.results.length > 0) {
                var formattedAddress = data.results[0].formatted_address;
                locationElement.textContent = formattedAddress;
            } else {
                locationElement.textContent = 'Location not found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            locationElement.textContent = 'An error occurred';
        });
}


