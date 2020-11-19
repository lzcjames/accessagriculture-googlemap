
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "countries" array.
  // The map() method here has nothing to do with the Google Maps API.
  markers = countries.map((country, i) => {
    let marker = new google.maps.Marker({
      position: country, // it detects automatically the values of keys which named "lat" and "lng"
      label: labels[i % labels.length],
      map: map   
    });
    // Create an info window
    const infowindow = new google.maps.InfoWindow({
      content: country.info
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

const countries = [
  { lat: -31.56391, lng: 147.154312, info: "marker 1" },
  { lat: -33.718234, lng: 150.363181, info: "marker 2" },
  { lat: -33.727111, lng: 150.371124, info: "marker 3" },
  { lat: -33.848588, lng: 151.209834, info: "marker 4" },
  { lat: -33.851702, lng: 151.216968, info: "marker 5" },
  { lat: -34.671264, lng: 150.863657, info: "marker 6" },
  { lat: -35.304724, lng: 148.662905, info: "marker 7" },
  { lat: -36.817685, lng: 175.699196, info: "marker 8" },
];

document.getElementById("test").addEventListener("click", function() {
  for (var i=0;i<infowindows.length;i++) {
    infowindows[i].open(map, markers[i]);
  }
});