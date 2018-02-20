var defaultCenter = [40.818,-73.92];
var defaultZoom = 13.5;


var map = L.map('my-map').setView(defaultCenter, defaultZoom);

/*var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);*/

var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 17,
}).addTo(map);

//Add Community district boundaries
  var CDsGeojson = L.geoJSON(CDs,
    {
      style: function(feature) {
          return {
            dashArray: '3 6',
            color: '#595959',
            fillColor: 'white',
            fillOpacity: 0.25,
            weight: 1.5,
          }
      },
    }
  ).addTo(map);

  // Use L.geoJSON to load PLUTO parcel data that we clipped in QGIS and change the CRS from 2263 to 4326
  // this was moved inside the getJSON callback so that the parcels will load on top of the study area study_boundary
//Add vacant land
	var landGeojson = L.geoJSON(land, {
	  style: function(feature) {
	      return {
	        color: '#595959',
	        fillColor: '#e80000',
	        fillOpacity: 0.9,
	        weight: 1,
	      }
		},
		onEachFeature: function(feature, layer) {
	    layer.bindPopup(`<h3>Vacant Lot</h3> at ${feature.properties.Address}.<br/><h3>//</h3>Owner: ${feature.properties.OwnerName}.<br/>
	                    Area:    ${feature.properties.LotArea} sqft.<br/> FAR:    ${feature.properties.ResidFAR} residential; ${feature.properties.CommFAR} commercial; ${feature.properties.FacilFAR}; facilities`, {
	      closeButton: false,
	      minWidth: 60,
	      offset: [0, -10]
	    });
	    layer.on('mouseover', function (e) {
	      this.openPopup();

	      e.target.setStyle({
	        weight: 0.5,
	        color: 'grey',
					fillOpacity: 0.7,
	      });

	      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	          layer.bringToFront();
	      }
	    });
	    layer.on('mouseout', function (e) {
	      this.closePopup();
	      blocksGeojson.resetStyle(e.target);
	    });
		}
	}).addTo(map);

			//Popup samples
			//.bindPopup(placeObject.description1 + placeObject.placeName +  placeObject.description2);
			// .bindPopup(pizzaObject.name + ' likes to eat at ' +  pizzaObject.pizzaShop, {offset: [0, -6]})

//Add Gardens
//Garden_dev
  var gardensGeojson = L.geoJSON(gardens,
    {
      style: function(feature) {
          return {
            color: '#595959',
            fillColor: '#157a03',
            fillOpacity: 0.8,
            weight: 1,
          }
      },
			onEachFeature: function(feature, layer) {
				layer.bindPopup(`<h3>${feature.properties.Name}</h3>${feature.properties.Garden_dev} Community Garden at ${feature.properties.Address}.<br/><h3>//</h3>Owner: ${feature.properties.OwnerName}.<br/>
												Area:    ${feature.properties.LotArea} sqft.<br/> FAR:    ${feature.properties.ResidFAR} residential; ${feature.properties.CommFAR} commercial; ${feature.properties.FacilFAR}; facilities`, {
					closeButton: false,
					minWidth: 60,
					offset: [0, -10]
				});
				layer.on('mouseover', function (e) {
					this.openPopup();

					e.target.setStyle({
						weight: 0.5,
						color: 'grey',
						fillOpacity: 0.7,
					});

					if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
							layer.bringToFront();
					}
				});
				layer.on('mouseout', function (e) {
					this.closePopup();
					blocksGeojson.resetStyle(e.target);
				});
    }
  }).addTo(map);


	$('.zoomOut').click(function() {
  map.flyTo(defaultCenter, defaultZoom)
});
