// Create Map object
let myMap = L.map("map").setView([15.5994, -28.6731],3)
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  // maxZoom: 18,
  // zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY}).addTo(myMap)
  


//  Create earthquakes 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
d3.json(url).then(function (data) {


  data.features.map((value, index) => {

    let geometry = value.geometry;
    // console.log("coordinates =" + JSON.stringify(geometry.coordinates));
    let coordinates = geometry.coordinates;
    let longitude = coordinates[0];
    let latitude = coordinates[1];
    let altitude = coordinates[2];
    let coord = [longitude, latitude];
    let magnitude = value.properties.mag;
    let location = value.properties.place;
    let scale = 10000

    // console.log("longitude = " + longitude);

//  Get the depth color
    function calculateColor(altitude) {
      if (altitude > 90)
        return "#f25c64"
      else if (altitude > 70)
        return "#f9a25d"
      else if (altitude > 50)
        return "#fdb733"
      else if (altitude > 30)
        return "#f6db38"
      else if (altitude > 10)
        return "#daed39"
      else if (altitude >= -10)
        return "#9eea33"
    }


    // Add circles to the map.
    L.circle(coord, {
      opacity: 1,
      fillOpacity: 1,
      color: "black",
      fillColor: calculateColor(altitude),
      // Adjust the radius.
      radius: scale + scale * magnitude,
      stroke: true,
      weight:0.5
    }).bindPopup("<b>Location: </b>" + location + "<br/><b>Magnitude:</b> " + magnitude).addTo(myMap);
    

 });

//   Create Legend for the map
 let legend = L.control({position: "bottomright"});
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  
  let grades =[-10, 10, 30, 50, 70, 90];
  let colors = ["#9eea33","#daed39", "#f6db38", "#fdb733","#f9a25d","#f25c64"];
 
  for (let i = 0; i < grades.length; i++) {
   div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
 }
 return div;
};
//  Add legend to map
legend.addTo(myMap);

});

// Create Tectonic plates
let tectonicPlates = []
let tectonic;
let tectonicUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
d3.json(tectonicUrl).then(function (data) {
  data.features.map((value, index) => {
    tectonic = value.geometry.coordinates[0];
    tectonicPlates.push(tectonic);
    L.polyline(tectonic, {
      color: "orange"
      // fillColor: "orange",
      // fillOpacity: 0.75
  }).addTo(myMap);
})

  });

// Add a tile layer.
// let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// Create baseMaps
let grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  // maxZoom: 18,
  // zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});
let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  // maxZoom: 18,
  // zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});

let outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  // maxZoom: 18,
  // zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

// Create a baseMaps object.
let baseMaps = {
  "Grayscale" : grayscale,
  "Satellite": satellite,
  "Outdoors": outdoors
};


// Create an overlay object to hold our overlay.
// let overlayMaps = { 
//   "Tectonic": tectonicList
//    "Earthquakes": Earthquakes
// };


// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps)
.addTo(myMap);
