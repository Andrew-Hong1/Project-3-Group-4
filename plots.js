// Use the D3 library to read in samples.json from the URL:
const geoData = "https://s3.us-east-1.amazonaws.com/hdx-production-filestore/resources/7234d067-2d74-449a-9c61-22ae6d98d928/volcano.json?AWSAccessKeyId=AKIAXYC32WNAS5V67V55&Signature=lRec%2FgLc6b2rhXnuD9eeOoOFjgI%3D&Expires=1696467823";

d3.json(geoData).then(function(data) {
    console.log(data);
    metaData = data.metadata;
    features = data.features;
    console.log(features);

});
// Fetch the data from the provided URL
fetch(geoData)
    .then(response => response.json())
    .then(data => {
        init(data);
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });

function init(data) {
    // Get a reference to the dropdown element
    const dropdown = document.getElementById('selDataset');
    
    let regions = [...new Set(data.features.map(feature => feature.properties.Region))];
    
    // Populate the dropdown with unique regions
    regions.forEach(region => {
        let option = document.createElement('option');
        option.value = region;
        option.innerText = region;
        dropdown.appendChild(option);
    });

    // Add an event listener to the dropdown to re-draw the graph when the selection changes
    dropdown.addEventListener('change', () => {
        const selectedRegion = dropdown.value;
        plotData(data, selectedRegion);
    });

    // Initial plotting
    plotData(data, dropdown.value);
}

function plotData(data, selectedRegion) {
    const filteredData = data.features.filter(feature => feature.properties.Region === selectedRegion);
    
    const volcanoCount = filteredData.length;
    const riskCount = filteredData.filter(feature => feature.properties.hazard !== "NULL" || feature.properties.risk !== "NULL").length;

    const trace = {
        values: [volcanoCount, riskCount],
        labels: ['Volcanoes', 'Risks/Hazards'],
        type: 'pie',
        marker: {
            colors: ['brown', 'orange', 'red']
        }
    };
    

    const layout = {
        title: 'Volcanoes and Risks/Hazards for ' + selectedRegion,
        titlefont: {
            color: 'white'  // setting title font color to white
        },
        paper_bgcolor: 'rgba(0,0,0,0)',  // transparent background
        plot_bgcolor: 'rgba(0,0,0,0)',   // transparent plot area
        font: {
            color: 'white'
        }
    };
    
    Plotly.newPlot('plot', [trace], layout);

}