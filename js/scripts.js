var defaultCenter = [40.821016,-73.915280];
var defaultZoom = 14;


var map = L.map('my-map').setView(defaultCenter, defaultZoom);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//not working
// add geojson using jquery's $.getJSON()
/*$.getJSON('data/Vacant_Land_not_garden.geojson', function(lots) {
  L.geoJSON(lots, {
    style: {
      color: 'red',
      fillOpacity: 1,
    }
  }).addTo(map);
*/



  // Use L.geoJSON to load PLUTO parcel data that we clipped in QGIS and change the CRS from 2263 to 4326
  // this was moved inside the getJSON callback so that the parcels will load on top of the study area study_boundary
  var blocksGeojson = L.geoJSON(land,
    {
      style: function(feature) {
          return {
            color: 'white',
            fillColor: 'red',
            fillOpacity: 1,
            weight: 1,
          }
      },
    }
  ).addTo(map);


/*// how to add a marker for each object in the array

places.forEach(function(placeObject) {
  var latLon = [placeObject.lat, placeObject.lon];

  var hourColor = 'grey';

  if (placeObject.hours === 'Night') hourColor = 'blue';
  if (placeObject.hours === 'Evening') hourColor = 'purple';
  if (placeObject.hours === 'Morning/Afternoon') hourColor = 'yellow';

  var options = {
    radius: 6,
    opacity: 1,
    fillColor: hourColor,
    fillOpacity: 0.9,
    color: 'grey',
    weight: 2,
  };

  var marker = L.circleMarker(latLon, options).addTo(map)
      .bindPopup(placeObject.description1 + placeObject.placeName +  placeObject.description2);
      //circleMarker.dblclick(function() {
      //map.flyTo(placeObject.latLon, closeZoom)
      //});


});
*/
