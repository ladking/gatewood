var map;
//array to stor all the address object
const cordarray = []

//object to store the address
let cord = {}

//counter variable to keep track of how many times the map was clicked
let counter = 0

//Fetching al the html nodes to render the address in
let allChoices =  document.getElementById('multipleChoices')
let msg = document.getElementById('msg')
let all = document.getElementById('all')
let arrFormat = document.getElementById('array')
let arrhead = document.getElementById('arrhead')

//function to initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
});
    HandleClick(map)
}

//function to handle the click event
function HandleClick(map){
    map.addListener('click', (e) => {
        //Counter helps keep track of how number of points clicked on the map
        counter++
        //convert latlng to json
        const coordinates = JSON.stringify(e.latLng.toJSON(), null, 2)

        //In other to get the human readable address of the coordinates, the latlng needs to be passed 
        //an obj, So converting back to object
        const cordObj = JSON.parse(coordinates)

        //funtion to get human readable address
        let address = getAddr(map, cordObj)
           
        //function to create marker
        createMarker(e.latLng, map)

          //create a new coordinate object and add it to the array
          cordarray.push(cord={
            id: counter,
            lat: cordObj.lat,
            lng: cordObj.lng,
            address: cordObj.address
        })
        //if counter once clicked once display the coordinates else add all the clicked points to an array
        if (counter === 1){ 
            let clicked = JSON.stringify(cord)
            msg.textContent = "Point of interest in json format "
            document.getElementById('address').textContent = clicked
        }else{
        all.textContent = "Subsequent point of interest in json format"

        let p = document.createElement('p')
        let point = JSON.stringify(cord)
        p.textContent = point
        allChoices.append(p)   
        arrhead.textContent = "All POI grouped in an array"
        arrFormat.textContent = JSON.stringify(cordarray)   
        
    }
});
}

//function to get human readable address
function getAddr(map, cord){
    let geocoder = new google.maps.Geocoder();    
    geocoder
    .geocode({ location: cord })
    .then((response) => {
      if (response.results[0]) {
        return response
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
    }
     
//function to create marker on points of interest
function createMarker(latLng, map){
    new google.maps.Marker({
        position: latLng,
        map: map,
      });    
}
      
//initializing the map
window.initMap()