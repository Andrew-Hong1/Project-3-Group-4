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
const geoData = "https://s3.us-east-1.amazonaws.com/hdx-production-filestore/resources/7234d067-2d74-449a-9c61-22ae6d98d928/volcano.json?AWSAccessKeyId=AKIAXYC32WNAS5V67V55&Signature=KBId3AoE7ESVk%2BWiHkR2f%2BnieNc%3D&Expires=1695692707";


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
       
        radius: features[i].properties.PEI*10000
        
        }).bindPopup(`<h1>${features[i].properties.V_Name} (ID: ${features[i].properties.VolcanoID})</h1> 
        <hr><h3>PEI: ${features[i].properties.PEI}</h3> <h3>VEI_Holoce: ${features[i].properties.VEI_Holoce}</h3> 
        <h3>Region: ${features[i].properties.Region}</h3> <h3>Class: ${features[i].properties.class}</h3> 
        <h3>Hazard: ${features[i].properties.hazard}</h3> <h3>Risk: ${features[i].properties.risk}</h3> 
        `).addTo(myMap);
     }
    // Define an array with legend colors and labels
    
    var legendData = [
        { color: "#A3F600", label: "0-10 km" },
        { color: "#DCF400", label: "10-30 km" },
        { color: "#F7DB11", label: "30-50 km" },
        { color: "#FDB72A", label: "50-70 km" },
        { color: "#FCA35D", label: "70-90 km" },
        { color: "#FF5F65", label: "90+ km" }
    ]; 
     // Define a legend control
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [];
        for (var i = 0; i < legendData.length; i++) {
            labels.push(
                '<i style="background-color:' + legendData[i].color + '">' + legendData[i].label+'</i> '
            );
        }
        console.log(labels)
        div.innerHTML = labels.join('<br>');
        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);



     


});
