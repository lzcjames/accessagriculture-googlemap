
async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });

  // Create an info window
  const infowindow = new google.maps.InfoWindow();
  
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "countries" array.
  // The map() method here has nothing to do with the Google Maps API.
  let countries = await readFile('countries.csv');  

  markers = countries.map((country, i) => {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseInt(country["lat"]), parseInt(country["lng"])),
      label: {text: country["code"], color: "white"},
      map: map   
    });

    // Retrieve languages, links and icons
    let info = `<div id="infowindow-title">
                  <h4>${country["name"]}</h4>
                  <img src=${country["icon"]}></img>
                </div>`;

    country["languages"].map((language) =>{ 
      info += `<button class="btn-link"><a href=${language["link"]}>${language["name"]}</a></button> `; 
      if(!Array.isArray(countrylist[language["name"]])){
        countrylist[language["name"]] = [];
      }
      countrylist[language["name"]].push(i);  
    });

    // Add a click event to each marker
    marker.addListener("click", () => {
      infowindow.setContent(info);
      infowindow.open(map, marker);
    });

    return marker;
  });
  showList();
}

function showList(){
  for (let k of Object.keys(countrylist).sort()) {
    li += `<li id=${k} class=listItem><a href="#" onclick="return false" style="text-decoration:none;">${k}</a></li>`;
  }

  ul.innerHTML = li;
  let elems = document.getElementsByClassName("listItem");

  for(i = 0; i<elems.length; i++) {
    elems[i].addEventListener("click", function() {
      setAllMarkersByDefault();
      countrylist[this.id].forEach(countryid => markers[countryid].setIcon("http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png")); 
    });
  }
}

function searchList() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchLanguage");
    filter = input.value.toUpperCase();
    ul = document.getElementById("listlanguages");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

/**
  Consider a CSV file with the following format:
  1. Line break is a linefeed character (\n)

  2. Column separator is a comma (,)

  3. Headers languages_name and languages_link 
      1) "languages" is an array of objects (language)
      2) "name" and "link" are two keys of an object (language)

  4. Each country object must have an array (languages) and at least one object (language) in the array; 
     when it has two or more objects in the array, except for the first object, start a new line for everything else, 
     then leave the EMPTY values of country, lat, lng. 
     An example here: https://imgur.com/4eJYDjt.png
**/
function csvToJson(csv){

  let json = [];
  let lines;
  let headers;

  // Remove all single, double quotes and white spaces, and the last line break at the end of string.
  // "/": begin
  //"['"]": find singe and double quotes
  // "+|": combine a regex rule
  // " ": find white spaces
  // "\s+$": find the last line break at the end of string
  // "/g": global search
  csv = csv.replace(/['"]+| +|\s+$/g, '');

  lines = csv.split("\n");

  headers = lines[0].split(",");

  // Handle lines
  for(let i = 1; i<lines.length; i++){

    let country = {};
    let currentline = lines[i].split(",");
    let language = new Object();
    country["languages"] = [];
    
    // Handle columns
    for(let j = 0; j<headers.length; j++){
      //Split and push key,value into a languge object
      if(headers[j].includes("_")){
        let key = headers[j].split("_")[1].trim();
        language[key] = currentline[j];
      }
      else country[headers[j]] = currentline[j];
    }
    
    if(currentline[0]!="" && currentline[1]!="" && currentline[2]!=""){
      country["languages"].push(language);
      json.push(country);
    }
    else {
      // The language object is added in the array of last country,
      // because values of country, lat, lng are empty.
      let lastcountry = json[json.length-1];
      lastcountry["languages"].push(language); 
    }
  }
  return json;
}

async function readFile(path) {
    let csv = await fetch(path);
    //Awaits for csv.text() prop and then sends it to csvToJson()
    let countriesJson = csvToJson(await csv.text());
    return countriesJson;
}

function setAllMarkersByDefault() {
  for(let marker of markers) {
    marker.setIcon();
  }
}

let countrylist = new Object();
let markers;
let ul = document.createElement('ul');
let li = '';

ul.id = "listlanguages";
document.getElementById("listlanguages-container").appendChild(ul);

