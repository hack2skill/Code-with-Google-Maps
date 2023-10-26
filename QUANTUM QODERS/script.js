function initMap() {
    const apiKey = 'abcd';

    //CHECK FOR AN API
    if (!apiKey) {
        console.error('Google Maps API key is missing. Please provide your API key.');
        return;
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 12.9951, lng: 77.6553 }, //BANGLORE
        zoom: 14,
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // DRONE STATIONS AND DRONE MARKERS
    const markerIcons =[
        {   url: '/drone_station.png', 
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
        },
        
        {   url: '/main_drone.png', //DRONE
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
        },

        {   url: '/drone_station.png',
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
        },
        
        {   url: '/drone_station.png',
            size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
        },
    ];

    // CONSTANT LOCATIONS OF THE DRONE STATIONS
    const markerCoordinates = [
        { lat: 12.9806974, lng: 77.6405653 },
        { lat: 12.9928929, lng: 77.6613161 }, //These coordinates of the drone will be recieved by the Roads API. Due to time constratint, fixed coordinates have been taken.
        { lat: 13.0002234, lng: 77.6768837 },
        { lat: 12.996409, lng: 77.6289225 },
    ];

    markerCoordinates.forEach((coordinates, index) => {
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: 'Marker ' + (index + 1),
            icon: markerIcons[index],
        });
    });

    // CLICKING ON DRONE SENDS US TO THE ADMIN PANEL
    if (index === 1){
        marker.addListener('click', () => {
            window.location.href = 'main.html';
        });
    }

}

// MAPS JAVASCRIPT API
function loadScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=abcdk&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

window.onload = loadScript;
