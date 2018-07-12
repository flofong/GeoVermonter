"use strict";


let startButton = document.getElementById("start")
let guessButton = document.getElementById("guess")
let quitButton = document.getElementById("quit")

//on page load, start is enabled and quit and guess are disabled
$(document).ready(function () {
    $("#quit").prop("disabled", true);
});
$(document).ready(function () {
    $("#guess").prop("disabled", true);
});


//when start is clicked, this function is called and guess and quit buttons are enabled
function setup() {
    $(document).ready(function () {
        $("#start").prop("disabled", true);
    });
    $(document).ready(function () {
        $("#guess").prop("disabled", false);
    });
    $(document).ready(function () {
        $("#quit").prop("disabled", false);
    });
    
}

// Makes map world imagery view
var map = L.map('map').setView([43.77109, -72.77417], 7);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);




// Adds border around Vermont
let border = L.geoJSON(border_data)
border.addTo(map);
border.setStyle({ fillColor: "none" })

let vermontCounties = L.geoJson(county_polygons)
vermontCounties.addTo(map);
vermontCounties.setStyle({ fillColor: "none" })



// Finds a random location within the borderBox
let boundingBox = {
    maxLon: -73.3654,
    minLon: -71.5489,
    maxLat: 45.0065,
    minLat: 42.7395
};
let lonPoint = (boundingBox.maxLon - boundingBox.minLon)
let latPoint = (boundingBox.maxLat - boundingBox.minLat)
let randomLonPoint = Math.random() * lonPoint + boundingBox.minLon
let randomLatPoint = Math.random() * latPoint + boundingBox.minLat

map.dragging.disable();
map.doubleClickZoom.disable();
map.zoomControl.disable();
map.scrollWheelZoom.disable();

function startTheGame() {
    // looks for a random marker in the polygon and sets the zoom view
    if (isPointInPolygon(randomLonPoint, randomLatPoint) === 1) {
        L.marker([randomLatPoint, randomLonPoint]).addTo(map)
        map.setView([randomLatPoint, randomLonPoint], 18)
        map.setMinZoom(18);
        map.setMaxZoom(18);
    } else {
        startTheGame()
    }
    

}


function isPointInPolygon(lon, lat) {
    // console.log("checking ", [lon, lat])
    let layer = L.geoJson(border_data);
    let results = leafletPip.pointInLayer([lon, lat], layer);
    return results.length;
}



function iGiveUp() {
    document.getElementById('quit').innerHTML = "This was your location " + ([randomLonPoint, randomLatPoint])
}
//disable Zoom on page load
// function disableZoom(){
//     map.setMinZoom(7);
//     map.setMaxZoom(7);
// }