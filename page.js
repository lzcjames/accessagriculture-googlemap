
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "countries" array.
  // The map() method here has nothing to do with the Google Maps API.
  markers = countries.map((country, i) => {
    let marker = new google.maps.Marker({
      position: country, // it detects automatically the values of keys which named "lat" and "lng"
      label: country["country"],
      map: map   
    });
    // Retrieve languages and links
    let info='';
    country["languages"].map((language) =>{
      info+=`<button><a href=${language["link"]}>${language["name"]}</a></button> `;   
    });
    // Create an info window
    const infowindow = new google.maps.InfoWindow({
      content: info
    });
    //Add a click event to each marker
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    infowindows.push(infowindow); 
    return marker;
  });

}

let infowindows=[];
let markers;


document.getElementById("test").addEventListener("click", function() {
  for (var i=0;i<infowindows.length;i++) {
    infowindows[i].open(map, markers[i]);
  }
});


const countries = [
  {
    "country": "Vanuatu",
    "lat": 15.3767,
    "lng": 166.9592,
    "description": "Vanuatu is a South Pacific Ocean nation made up of roughly 80 islands that stretch 1,300 kilometers.",
    "languages": [
      {
        "name": "English",
        "link": "http://example.com/en"
      },
      {
        "name": "French",
        "link": "http://example.com/fr"
      }
    ]
  },
  {
    "country": "Fiji",
    "lat": -16.578193,
    "lng": 179.414413,
    "description": "A country in the South Pacific, is an archipelago of more than 300 islands.",
    "languages": [
      {
        "name": "English",
        "link": "http://example.com/en"
      }
    ]
  },
  {
    "country": "Panama",
    "lat": 8.537981,
    "lng": -80.782127,
    "description": "A country on the isthmus linking Central and South America.",
    "languages": [
      {
        "name": "Spanish",
        "link": "http://example.com/es"
      }
    ]
  }
]