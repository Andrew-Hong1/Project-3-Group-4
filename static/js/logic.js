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
const geoData = "https://s3.us-east-1.amazonaws.com/hdx-production-filestore/resources/7234d067-2d74-449a-9c61-22ae6d98d928/volcano.json?AWSAccessKeyId=AKIAXYC32WNAS5V67V55&Signature=thjhJRyZwDpL439047EMoy22SQ8%3D&Expires=1695860125";


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
        // Set marker color based off Population Exposure Index (PEI)
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
        // This will make our marker's size proportionate to its magnitude.
       
        radius: features[i].properties.PEI*7500
        
        }).bindPopup(`<h1>${features[i].properties.V_Name} (ID: ${features[i].properties.VolcanoID})</h1> 
        <hr><h3>PEI: ${features[i].properties.PEI}</h3> <h3>VEI_Holoce: ${features[i].properties.VEI_Holoce}</h3> 
        <h3>Region: ${features[i].properties.Region}</h3> <h3>Class: ${features[i].properties.class}</h3> 
        <h3>Hazard: ${features[i].properties.hazard}</h3> <h3>Risk: ${features[i].properties.risk}</h3> 
        `).addTo(myMap);
     }
     .legend {
        background-color: white; /* Set the background color of the legend */
        padding: 5px; /* Add padding for spacing */
        border: 1px solid #ccc; /* Add a border for better visibility */
    }
    
    .legend i {
        width: 20px; /* Adjust the width of the color boxes */
        height: 20px; /* Adjust the height of the color boxes */
        display: inline-block;
        margin-right: 5px; /* Add spacing between color boxes and labels */
    }
    
// Define an array with legend colors and labels
var legendData = [
    { color: "#ff0000", label: "VEI 7" },
    { color: "#fd4900", label: "VEI 6" },
    { color: "#f66d00", label: "VEI 5" },
    { color: "#e98b00", label: "VEI 4" },
    { color: "#d7a700", label: "VEI 3" },
    { color: "#bfbf00", label: "VEI 2" },
    { color: "#a0d600", label: "VEI 1" },
    { color: "#76eb00", label: "VEI 0" },
    { color: "#00ff00", label: "No confirmed eruptions" }
];

// Define a legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend'); // Add the 'legend' class here

    var labels = [];
    for (var i = 0; i < legendData.length; i++) {
        labels.push(
            '<i style="background-color:' + legendData[i].color + '"></i> ' +
            legendData[i].label
        );
    }
    div.innerHTML = labels.join('<br>');
    return div;
};

// Add the legend to the map
legend.addTo(myMap);
});
