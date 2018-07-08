let mymap = L.map('map').setView([43.5588, -72.5778], 7);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    maxZoom: 18,
    minZoom: 1,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(mymap);

let vermont_border = L.geoJSON(border_data);
vermont_border.addTo(mymap);

let boundingBox = {
  maxLon: -73.3654,
  minLon: -71.5489,
  maxLat: 45.0065,
  minLat: 42.7395
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPointWithinVermont () {

}
