// Creating the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Use the D3 library to read in samples.json from the URL:
const geoData = "https://s3.us-east-1.amazonaws.com/hdx-production-filestore/resources/7234d067-2d74-449a-9c61-22ae6d98d928/volcano.json?AWSAccessKeyId=AKIAXYC32WNAS5V67V55&Signature=y8CG%2BqOTIlaXEOtqPhHgg5yHXdY%3D&Expires=1696291670";


// Fetch the JSON data and console log it
let metaData;
let features;
let fillColorVar;

d3.json(geoData).then(function(data) {
    console.log(data)
    metaData = data.metadata;
    features = data.features;
    console.log(features)
    // Loop through the features array, and create one marker for each features object.
    for (let i = 0; i < features.length; i++) 
    {
        let coordinates= [features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]
        // Set marker color based off Volcanic explosivity index (VEI)
        if (features[i].properties.VEI_Holoce==7)
        {
            fillColorVar="#ff0000";
        } else if(features[i].properties.VEI_Holoce==6)
        {
            fillColorVar="#fd4900";
        } else if(features[i].properties.VEI_Holoce==5)
        {
            fillColorVar="#f66d00";
        } else if(features[i].properties.VEI_Holoce==4)
        {
            fillColorVar="#e98b00";
        } else if(features[i].properties.VEI_Holoce==3)
        {
            fillColorVar="#d7a700";
        } else if(features[i].properties.VEI_Holoce==2)
        {
            fillColorVar="#bfbf00";
        } else if(features[i].properties.VEI_Holoce==1)
        {
            fillColorVar="#a0d600";
        } else if(features[i].properties.VEI_Holoce==0)
        {
            fillColorVar="#76eb00";
        } else if(features[i].properties.VEI_Holoce=='No confirmed eruptions')
        {
            fillColorVar="#00ff00";
        } else 
        {
            fillColorVar="#ffffff";
        }
        L.circle(coordinates, {
        fillOpacity: 0.75,
        color:"white",
        fillColor: fillColorVar,
        // This will make our marker's size proportionate to Population Exposure Index (PEI)
       
        radius: features[i].properties.PEI*7500
        
        }).bindPopup(`<h1>${features[i].properties.V_Name} (ID: ${features[i].properties.VolcanoID})</h1> 
        <hr><h3>PEI: ${features[i].properties.PEI}</h3> <h3>VEI_Holoce: ${features[i].properties.VEI_Holoce}</h3> 
        <h3>Region: ${features[i].properties.Region}</h3> <h3>Class: ${features[i].properties.class}</h3> 
        <h3>Hazard: ${features[i].properties.hazard}</h3> <h3>Risk: ${features[i].properties.risk}</h3> 
        `).addTo(myMap);
     }
   

     

    // Define a legend control
function createLegend() {
        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function () {
            var div = L.DomUtil.create('div', 'info legend');
            var colors = ["#FF0000", "#FD4900", "#F66D00", "#E98B00", "#D7A700", "#BFBF00", "#A0D600", "#76EB00", "#FFFFFF"];
            var labels = ["VEI 6", "VEI 5", "VEI 4", "VEI 3", "VEI 2", "VEI 1", "VEI 0", "No Confirmed Eruptions", "Unknown"]
            // title
            div.innerHTML += '<h4>Volcano VEI Holoce</h4>';
            for (var i = 0; i < colors.length; i++) {
                div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                labels[i] + '<br>';
            }
            return div;
        };
        legend.addTo(myMap);
    }
    createLegend();
});

// Plotly Chart for Top 10 Volcanic Eruptions with the Highest Human Death Toll
// Load the CSV file using Plotly.d3.csv
Plotly.d3.csv('volcanic_eruptions_by_death_toll_df.csv', function(data) {

    // Take the first 10 rows
    var topTen = data.slice(0, 10);
    
    // Extract Volcanic Eruptions with Human Death Toll (Min) and Human Death Toll (Max) data for double horizontal bar graph
    var deathtollMin = topTen.map(function(row) {
        return row.Minimum;
      });
    
      var deathtollMax = topTen.map(function(row) {
        return row.Maximum;
      });
    
      var volcanicEruption = topTen.map(function(row) {
        return row.Volcano;
      });
    
    // Create a horizontal bar graph using Plotly.newPlot
    var graphData = [
        {
          x: volcanicEruption,
          y: deathtollMin,
          type: 'bar',
          orientation: 'h',
          name: 'Human Death Toll (Min)'
        },
        {
          x: volcanicEruption,
          y: deathtollMax,
          type: 'bar',
          orientation: 'h',
          name: 'Human Death Toll (Max)'
        }
      ];
    
      var layout = {
        title: 'Top 10 Volcanic Eruptions with the Highest Human Death Toll',
        xaxis:  {title: 'Volcanic Eruption'},
        yaxis: {title: 'Human Death Toll'},
        // Min and Max Death Tolls displayed next to each other
        barmode: 'group'
      };
    
      Plotly.newPlot('bar-graph', graphData, layout);
    });
    