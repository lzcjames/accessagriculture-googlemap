
function initMap() {
  const map=new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "countries" array.
  // The map() method here has nothing to do with the Google Maps API.
  markers=countries.map((country, i) => {
    let marker=new google.maps.Marker({
      position: country, // It detects automatically the values of keys which named "lat" and "lng"
      label: country["country"].charAt(0),
      map: map   
    });

    // Retrieve languages and links
    let info=`<h4>${country["country"]}</h4>`;

    country["languages"].map((language) =>{ 
      info+=`<button class="btn-link"><a href=${language["link"]}>${language["name"]}</a></button> `; 
      if(!Array.isArray(countrylist[language["name"]])){
        countrylist[language["name"]]=[];
      }
      countrylist[language["name"]].push(i);  
    });

    // Create an info window
    const infowindow=new google.maps.InfoWindow({
      content: info
    });

    // Add a click event to each marker
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    infowindows.push(infowindow); 
    return marker;
  });

  showList();
}

function showList(){
  for (let k of Object.keys(countrylist)) {
    li+=`<li id=${k} class=listItem>${k}</li>`;
  }

  ul.innerHTML=li;
  let elems=document.getElementsByClassName("listItem");

  for(i=0; i<elems.length; i++) {
    elems[i].addEventListener("click", function() {
      closeAllInfoWindows();
      countrylist[this.id].forEach(countryid => infowindows[countryid].open(map, markers[countryid]));
    });
  }
}

function closeAllInfoWindows() {
  for(let win of infowindows) {
    win.close();
  }
}

let countrylist=new Object();
let infowindows=[];
let markers;
let ul=document.createElement('ul');
let li='';

ul.id="listlanguages";
document.getElementById("map-listlanguages").appendChild(ul);

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