var defaultCenter = [40.818,-73.92];
var defaultZoom = 13.5;


var map = L.map('my-map').setView(defaultCenter, defaultZoom);

var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd'
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

//Add Vacant Land
  var landGeojson = L.geoJSON(land,
    {
      style: function(feature) {
          return {
            color: 'white',
            fillColor: '#e80000',
            fillOpacity: 0.6,
            weight: 1,
          }
          /*onEachFeature: function(feature, layer) {
//+'Owner:'+ +'Lot Area (sqft):'+
                layer.bindPopup(`${feature.properties.Address}<br/>  ${feature.properties.OwnerName}<br/>
                                ${feature.properties.LotArea}`, {
                  closeButton: false,
                  minWidth: 60,
                  offset: [0, -10]
                });
                layer.on('mouseover', function (e) {
                  this.openPopup();

                  e.target.setStyle({
                    weight: 3,
                    color: '#FFF',
                  });

                  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                      layer.bringToFront();
                  }
                });
                layer.on('mouseout', function (e) {
                  this.closePopup();
                  blocksGeojson.resetStyle(e.target);
                });
              }*/
.bindPopup(feature.properties.Address+ ' Owner: ' +  feature.properties.OwnerName+ 'Lot Area (sqft):'+ feature.properties.LotArea, {offset: [0, -6]})
			},
    }).addTo(map);

			//Popup samples
			//.bindPopup(placeObject.description1 + placeObject.placeName +  placeObject.description2);
			// .bindPopup(pizzaObject.name + ' likes to eat at ' +  pizzaObject.pizzaShop, {offset: [0, -6]})

//Add Gardens
  var gardensGeojson = L.geoJSON(gardens,
    {
      style: function(feature) {
          return {
            color: 'white',
            fillColor: '#157a03',
            fillOpacity: 0.6,
            weight: 1,
          }

      },
    }
  ).addTo(map);

//Add Community district boundaries
  var CDsGeojson = L.geoJSON(CDs,
    {
      style: function(feature) {
          return {
            dashArray: '3 5',
            color: 'grey',
            fillColor: 'white',
            fillOpacity: 0.1,
            weight: 1.5,
          }
      },
    }
  ).addTo(map);

/// how to add a marker for each object in the array
/*
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
