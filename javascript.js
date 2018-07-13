"use strict";


let startButton = document.getElementById("start")
let guessButton = document.getElementById("guess")
let quitButton = document.getElementById("quit")
let randomLatPoint
let randomLonPoint
let randomPoint
let apiUrl
let countyAddress

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
    
    findCountyName()
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


map.dragging.disable();
map.doubleClickZoom.disable();
map.zoomControl.disable();
map.scrollWheelZoom.disable();

function startTheGame() {
    randomLonPoint = Math.random() * lonPoint + boundingBox.minLon
    randomLatPoint = Math.random() * latPoint + boundingBox.minLat
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

let loops = 0;

function isPointInPolygon(lon, lat) {
    console.log({loops})
    console.log("checking ", [lon, lat])
    let results = leafletPip.pointInLayer([lon, lat], border);
    loops += 1;
    return results.length;
}



function iGiveUp() {
    document.getElementById('quit').innerHTML = "This was your location: " + ([randomLonPoint, randomLatPoint])
    findCountyName()
}


let countyNameList = ["Addison County", "Bennington County", "Caledonia County", "Chittenden County", "Essex County", "Franklin County", "Grand Isle County", "Lamoille County", "Orange County", "Orleans County", "Rutland County", "Washington County", "Windham County", "Windsor County"]


function findCountyName(){
    startTheGame()
randomPoint = (randomLatPoint + "," + randomLonPoint)
apiUrl = "https://nominatim.openstreetmap.org/search?q=" + randomPoint + "&format=json"

        fetch(apiUrl).then(function(response){
          return response.json()
        
        }).then(function(myJSON){
            countyAddress = myJSON[0].display_name
            for (var i=0; i < countyNameList.length; i++) { 
                if (countyAddress.includes(countyNameList[i])){
                    document.getElementById ('county').innerHTML = countyNameList[i]
                }else{
                    console.log(countyNameList[i])
                }

              }


        })
        
    }
  