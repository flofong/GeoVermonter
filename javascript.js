"use strict";

//global variables
// let startButton = document.getElementById("start")
// let guessButton = document.getElementById("guess")
// let quitButton = document.getElementById("quit")

let randomLatPoint
let randomLonPoint
let randomPoint

let currentLatPoint
let currentLonPoint

let countyAddress
let correctCounty
const countyNameList = ["Addison County", "Bennington County", "Caledonia County", "Chittenden County", "Essex County", "Franklin County", "Grand Isle County", "Lamoille County", "Orange County", "Orleans County", "Rutland County", "Washington County", "Windham County", "Windsor County"]


//make this into a function-initialize??
//on page load, start is enabled and quit and guess are disabled
$(document).ready(function () {
    $("#quit").prop("disabled", true);
});
$(document).ready(function () {
    $("#guess").prop("disabled", true);
});

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



// when start is clicked, this function is called and guess and quit buttons are enabled and it looks for a random marker in the polygon and sets the zoom view
function startTheGame() {
    $(document).ready(function () {
        $("#start").prop("disabled", true);
    });
    $(document).ready(function () {
        $("#guess").prop("disabled", false);
    });
    $(document).ready(function () {
        $("#quit").prop("disabled", false);
    });

    randomLonPoint = Math.random() * lonPoint + boundingBox.minLon
    randomLatPoint = Math.random() * latPoint + boundingBox.minLat
    currentLatPoint = randomLatPoint
    currentLonPoint = randomLonPoint


    if (isPointInPolygon(randomLonPoint, randomLatPoint) === 1) {
        L.marker([randomLatPoint, randomLonPoint]).addTo(map)
        map.setView([randomLatPoint, randomLonPoint], 18)
        map.setMinZoom(18);
        map.setMaxZoom(18);
    } else {
        startTheGame()
    }

    findCountyName()
}


let loops = 0;
function isPointInPolygon(lon, lat) {
    let results = leafletPip.pointInLayer([lon, lat], border);
    loops += 1;
    return results.length;
}



function findCountyName() {
    randomPoint = (randomLatPoint + "," + randomLonPoint)
    //console.log({randomPoint})
    let apiUrl = "https://nominatim.openstreetmap.org/search?q=" + randomPoint + "&format=json"
    //console.log({apiUrl})
    fetch(apiUrl).then(function (response) {
        return response.json()
    }).then(function (myJSON) {
        countyAddress = myJSON[0].display_name
        console.log(countyAddress)
        return countyAddress;

    })
}



//checks if the user's guess is the same as the randompoint 
function checkGuess(event) {
    let guess = event.target.text
    console.log(guess)
    replaceDropdownName(guess)
    console.log({ countyAddress })
    if (countyAddress.includes(guess)) {
        document.getElementById('guessModalLabel').innerHTML = 'You Win!!'
        console.log("YOU WIN")
      
       
    } else {
        console.log("try again. you lose 10 points.")
    }
    console.log("DONE")
}

//WIP replaces the guessmodaldropdown text (choose county) with the user's chosen county from the dropdown.
function replaceDropdownName(county){
    document.getElementById('dropdownMenuButton').innerHTML = county
    
    
}
    //TO DO: IF, ENTER WIN STATE. SAVE NAME AND SCORE TO HIGH SCORE LIST. ELSE, KEEP TRYING STATE. UPDATE SCORE.

    //This function prints the county name in the info panel upon pressing RageQuit button
    function printCountyName() {
        for (let county of countyNameList) {
            if (countyAddress.includes(county)) {
                document.getElementById('county').innerHTML = "This is your county " + county

            } else {
                console.log("NOPE")
            }

        }
    }

    //upon pressing Ragequit, prints latitude and longitude in info panel
    function iGiveUp() {
        document.getElementById('latitude').innerHTML = "This is your latitude " + ([randomLatPoint])
        document.getElementById('longitude').innerHTML = "This is your longitude " + ([randomLonPoint])
        findCountyName()
    }

    //moves the map North
    function moveNorth() {
        currentLatPoint += 0.00050
        console.log(currentLatPoint)
        map.setView([currentLatPoint, currentLonPoint], 18)

    }

    //moves the map South
    function moveSouth() {
        currentLatPoint -= 0.00050
        console.log(currentLatPoint)
        map.setView([currentLatPoint, currentLonPoint], 18)

    }

    //moves the map West
    function moveWest() {
        currentLonPoint -= 0.00050
        console.log(currentLonPoint)
        map.setView([currentLatPoint, currentLonPoint], 18)

    }

    //moves the map East
    function moveEast() {
        currentLonPoint += 0.00050
        console.log(currentLonPoint)
        map.setView([currentLatPoint, currentLonPoint], 18)

    }


    //populates County List
    function populateCountyList() {
        let guessList = document.getElementById("countyList")
        for (let i = 0; i < countyNameList.length; i++) {
            // guessList.innerHTML += "<a class='dropdown-item' href='#' onClick='checkGuess(countyAddress,'" + countyNameList[i] + "')'>" + countyNameList[i] + "</a>"

            guessList.innerHTML += `<a class='dropdown-item' href='#'>${countyNameList[i]}</a>`
            console.log(countyNameList[i])
        }
        document.querySelectorAll('#countyList > .dropdown-item').forEach(function (elem) {
            elem.addEventListener('click', checkGuess)

     
        
        })
    }

populateCountyList()

