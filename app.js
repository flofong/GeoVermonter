let boundingBox = {
  maxLon: -73.3654,
  minLon: -71.5489,
  maxLat: 45.0065,
  minLat: 42.7395
};

let marker;

let getRandomArbitrary = (min, max) => {
  let number = Math.random() * (max - min) + min;
  return Number(number.toFixed(4));
}

let pickPoint = () => {
  let bb = boundingBox;
  let lat = getRandomArbitrary(bb.minLat, bb.maxLat);
  let lon = getRandomArbitrary(bb.minLon, bb.maxLon);

  return {lat,lon};
};

let withinVermont = (point) => {
  return leafletPip.pointInLayer(point, vermontBorder, true).length;
};

let randomPointWithinVermont = () => {
  let point = {lat: 0, lon: 0};
  let loop = 0;

  while (!withinVermont([point.lon, point.lat])) {
    point = pickPoint();
  }
  return point;
};

let startNewGame = () => {
  if (marker) {
    marker.remove();
  }
  let point = randomPointWithinVermont();
  marker = L.marker([point.lat, point.lon]).addTo(mymap);
  mymap.setMaxZoom(16);
  mymap.setMinZoom(16);
  mymap.setView([point.lat, point.lon], 16);
};

let mymap = L.map('map').setView([43.5588, -72.5778], 7);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(mymap);

let vermontBorder = L.geoJSON(border_data);
vermontBorder.addTo(mymap);

let newGame = document.querySelector('#new-game');
newGame.addEventListener('click', startNewGame);
