let map;
function initMap(){
    map= new google.maps.Map(document.getElementById("map"),{
        center: { lat: 28.70,lng: 77.10},
        zoom:10,
        mapTypeId: "terrain"
    });
    const features=[
        {
            position: new google.maps.LatLng(30.824905, 75.152947),
            content:"<p>Near Nestle Canal Bridge,Moga Dt</p>"
          },
          {
            position: new google.maps.LatLng(31.532131, 75.257792),
            content:"<p>Umra nangal U Turn,NH 3,Amritsar Dt</p>"
          },
          {
            position: new google.maps.LatLng(30.8535, 76.5641669),
            content:"<p>Near Saini Station,Bannmajra Cut,Rupnagar Dt</p>"
          },{
            position: new google.maps.LatLng(30.12672, 75.92163),
            content:"<p>U turn near Village Mauran Ps Chhajli,Sangrur Dt</p>"
          },{
            position: new google.maps.LatLng(30.912085, 75.878895),
            content:"<p>Gur.guru Arjan Dev ji,Samrala chowk,Ludhaina Dt</p>"
          },{
            position: new google.maps.LatLng(30.419, 76.7098),
            content:"<p>Bapraur-Shambu near Surya world clg,Patiala Dt</p>"
          },
          {
            position: new google.maps.LatLng(30.6608, 76.8274),
            content:"<p>Baltana Light POint,SAS Nagar Dt</p>"
          },
          {
            position: new google.maps.LatLng(30.258913, 74.934983),
            content:"<p>Adarsh Nagar road,Bathinda Dt</p>"
          },
          {
            position: new google.maps.LatLng(31.9088268, 75.291058),
            content:"<p>Near Vill,Socetgarh Intersection,Batala,Gurdaspur Dt</p>"
          },
        ];
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
          position: features[i].position,
          label:"!",
          title:"Danger Zone",
          map : map,
        });
        const infowindow = new google.maps.InfoWindow({
            position:features[i].position,
            content: features[i].content,
        });
        marker.addListener("mouseover", () =>{
          infowindow.open(map, marker);
        })
      }
}