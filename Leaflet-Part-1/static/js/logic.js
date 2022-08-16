  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street]
  });

  // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };

    let allEarthquakes = new L.LayerGroup();
    let largeEarthquakes = new L.LayerGroup();
    let tectonicplates = new L.LayerGroup();


    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      "All Earthquakes": allEarthquakes,
      "Large Earthquakes": largeEarthquakes,
      "Tectonic Plates" : tectonicplates
    };

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  

  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
console.log("data")
console.log(data)


 function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng);
  },

  style: styleInfo,

  onEachFeature: function (feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
  }).addTo(allEarthquakes);


allEarthquakes.addTo(myMap);

})


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
console.log("data")
console.log(data)


 function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng);
  },

  style: styleInfo,

  onEachFeature: function (feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
  }).addTo(largeEarthquakes);

})



var queryUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
console.log("data")
console.log(data)


//  function styleInfo(feature) {
//   return {
//     opacity: 1,
//     fillOpacity: 1,
//     fillColor: getColor(feature.properties.mag),
//     color: "#000000",
//     radius: getRadius(feature.properties.mag),
//     stroke: true,
//     weight: 0.5
//   };
// }

// function getColor(magnitude) {
//   if (magnitude > 5) {
//     return "#ea2c2c";
//   }
//   if (magnitude > 4) {
//     return "#ea822c";
//   }
//   if (magnitude > 3) {
//     return "#ee9c00";
//   }
//   if (magnitude > 2) {
//     return "#eecc00";
//   }
//   if (magnitude > 1) {
//     return "#d4ee00";
//   }
//   return "#98ee00";
// }

// function getRadius(magnitude) {
//   if (magnitude === 0) {
//     return 1;
//   }
//   return magnitude * 4;
// }

L.geoJson(data, {
  pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng);
  },

  // style: styleInfo,

  onEachFeature: function (feature, layer) 
  }).addTo(tectonicplates);

})




let legend = L.control({
  position: "bottomright"
});


legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];


  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};


legend.addTo(myMap);



//     function onEachFeature(feature, layer) {
//       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }
  
//   function createFeatures(earthquakeData) {
  
//     // Define a function that we want to run once for each feature in the features array.
//     // Give each feature a popup that describes the place and time of the earthquake.

  
//     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//     // Run the onEachFeature function once for each piece of data in the array.
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
  
//     // Send our earthquakes layer to the createMap function/
//     createMap(earthquakes);
//   }
//     // Create our map, giving it the streetmap and earthquakes layers to display on load.
//     var myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 5,
//       layers: [street, earthquakes]
//     });
  

//   }

