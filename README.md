# Project-3-Group-4  : The Impact of Explosive Volcanoes
Project 3 repository for the UT Austin Data Analysis Bootcamp.

![Presentation: The Impact of Explosive Volcanoes](https://docs.google.com/presentation/d/1qQRJh5pbADaoJGD35U6Mx57K7QUhPZ-IfFz2ky2Aczk/edit?usp=sharing)

## Background
Volcanoes, as natural wonders, have fascinated scientists and the public alike for centuries. In order to better understand these geological features and assess their potential impact on human populations, we created an interactive map using volcano data from the Global Volcano Model (GVM) and The International Association of Volcanology and Chemistry of the Earth’s Interior (IAVCEI) geojson dataset to provide a comprehensive visualization of volcanoes worldwide, highlighting their activity levels and population exposure.

## Getting Started
### Prerequistes
You must have Python, Anaconda, and Pip installed
Important: To view the data in the HTML file, complete the following steps each day:
1. Click on this link: https://data.humdata.org/dataset/volcano-population-exposure-index-gvm
2. Scroll down to where you see volcano.json and click download
3. Copy the URL in the provided link
4. Open the logic.js file, and replace the geoData URL path.

To view the Geojson_flask file, complete the following steps each day:
1. Click on this link: https://data.humdata.org/dataset/volcano-population-exposure-index-gvm
2. Scroll down to where you see volcano.json and click download
3. Copy the URL in the provided link
4. Open the Geojson_flask.py file using visual studio code and replace the geojson_url with the copied link.
5. Using bash or command prompt, run Geojson_flask.py
6. Open your browser and type in localhost:5000/fetch_geojson

### Volcano Exposure Index (VEI) Definition: 
VEI is a relative measure of the explosiveness of volcanic eruptions. It was devised by Chris Newhall of the United States Geological Survey and Stephen Self at the University of Hawaii in 1982. Newhall and Self, 1982

### Population Exposure Index (PEI) Definition): 
Population exposure is defined as the number of people determined to be exposed to a hazard according to a hazard-specific methodology.

### U-NHHR/U-HHR Definition: 
Table 1 Identity of Italy’s volcanoes in each Hazard-PEI group. Those volcanoes with a sufficient record for determining a hazard score are deemed ‘classified’ (top). Those without sufficient data are ‘Unclassified’ (bottom). The unclassified volcanoes are divided into groups: U-NHHR is Unclassified No Historic or Holocene Record: that is there are no confirmed eruptions recorded in the Holocene. UHR is Unclassified with Holocene Record: that is there are confirmed eruptions recorded during the Holocene, but no historical (post-1500) events. U-HHR is Unclassified with Historic and Holocene record. The unclassified volcanoes in bold have experienced unrest or eruptions since 1900 AD, and those in red have records of at least one Holocene VEI ≥4 eruption.
https://kipdf.com/country-and-regional-profiles-of-volcanic-hazard-and-risk_5ad5dcbd7f8b9a44528b45c5.html

### Holocene Definition:
The Holocene is the current geological epoch. It began approximately 9,700 years before the Common Era (BCE).
https://en.wikipedia.org/wiki/Holocene

### Hazard Definition:
A long-term volcano hazard assessment report is a publication that summarizes the types and likelihood of future hazardous phenomena expected to occur at a specific volcano or volcanic region. The report typically includes a summary of the specific hazards, their impact areas, and a map showing ground-hazard zones. The assessments are also critical for planning long-term land-use, and effective emergency-response measures, especially when a volcano begins to show signs of unrest.
https://www.usgs.gov/programs/VHP/volcano-hazard-assessments-are-based-geologic-record

## Data
The data we pulled was from a GeoJson_flask file. We were able to srape the data in Jupyter lab to export as CSV files to make our visualizations. 

![vei_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/7f1a4f33-b0ba-4b6e-b22e-cc9f68515150)
![pei_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/9b090cf0-a2f8-48ed-acaf-bd0e962e23c0)
![volcanic_eruptions_by_death_toll_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/2d0ec77f-974e-4412-911c-6652d1c69d88)
![plotly](https://github.com/Andrew-Hong1/Project-3-Group-4/blob/main/Images/plotly.png)
![volcano_data_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/80b36faa-c0e7-4dd1-8399-c82a9711a830)
![volcanoes_by_country_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/746b3753-e979-4580-86f0-5b76d2462d5a)
![human_devlopment_index_df](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/6059bed6-fe20-4525-bd76-460010ed19df)
![volcano_db_erd pgerd](https://github.com/Andrew-Hong1/Project-3-Group-4/assets/134234019/70628dc8-3d49-4642-87f8-71b0b8aa0a16)

## Conclusions
* Human Development Index impacts how countries handle the aftermath of volcnoes
  * Countries with a lower HDI have impacted human death toll compred to countries with higher HDI
* Countries with some of the most active volcanoes are located in the higher HDI (ex. Japan, US) and are able to support more through Humanitarian Aid and healthcare
* US has the most volcanoes
* Indonesia has the most active volcanoes

## Supporting Articles
* [Tambora 1815: Just How Big Was The Eruption? Erik Klemetti](https://www.wired.com/2015/04/tambora-1815-just-big-eruption/)
* [Populations around Holocene volcanoes and development of a Population Exposure Index](https://www.researchgate.net/publication/280714829_Populations_around_Holocene_volcanoes_and_development_of_a_Population_Exposure_Index)
* [Volcano Explosivity Index](https://en.wikipedia.org/wiki/Volcanic_explosivity_index)
* [Volcanic Eruptions by Death Toll ](https://en.wikipedia.org/wiki/List_of_volcanic_eruptions_by_death_toll)
* [List of countries by Human Development Index](https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index)
* [Population Exposure Index(GVM) JSON from United Nations Office for Disaster Risk Reduction (UNDRR)](https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json)
  
## Built With
* Python - Programming Language
* Pandas - Data Analysis library
* Conda - Package Manager
* Leaflet
* Flask 
* HTML
* JavaScript
* Plotly
* js.chart
* SQL

## Authors
* Andrew Hong - ![LinkedIn](https://www.linkedin.com/in/andrew-hong-ah/) | ![GitHub](https://github.com/Andrew-Hong1)
* Christina Esqiuvel - ![LinkedIn](https://www.linkedin.com/in/christinaequivel/) | ![GitHub](https://github.com/VivaLaTeena)
* Christopher Hornung - ![LinkedIn](insertlink) | ![GitHub](https://github.com/cjhornung)
* Hannah Varghese - ![LinkedIn](https://www.linkedin.com/in/hannahvarghese/) | ![GitHub](https://github.com/hannahvarghese)
* Latrice Moore - ![LinkedIn](https://www.linkedin.com/in/latrice-moore-4a3241248/)| ![GitHub](https://github.com/lmoore5460)
