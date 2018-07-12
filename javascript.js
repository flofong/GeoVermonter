"use strict";


    let startButton = document.getElementById("start")
    let guessButton = document.getElementById("guess")
    let quitButton = document.getElementById("quit")
    function setup() {
        startButton.disabled = true
        guessButton.enabled = true
        quitButton.enabled = true
    }

    // Makes map world imagery view
    var map = L.map('map').setView([43.77109, -72.77417], 7);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
    

    // Adds border around Vermont
    let border = L.geoJSON(border_data)
    border.addTo(map);

    // Finds a random location within the borderBox
    let boundingBox = {
        maxLon: -73.3654,
        minLon: -71.5489,
        maxLat: 45.0065,
        minLat: 42.7395
    };
    function startTheGame() {
    let lonPoint = (boundingBox.maxLon - boundingBox.minLon)
    let latPoint = (boundingBox.maxLat - boundingBox.minLat)

    let randomLonPoint = Math.random() * lonPoint + boundingBox.minLon
    let randomLatPoint = Math.random() * latPoint + boundingBox.minLat
    L.marker([randomLatPoint, randomLonPoint]).addTo(map)
    map.setView([randomLatPoint,randomLonPoint], 18)
    map.setMinZoom(18);
    map.setMaxZoom(18);

}


