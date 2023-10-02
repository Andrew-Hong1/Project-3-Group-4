-- These tables are designed to store and manage data related to volcanic activity, including VEI, PEI, eruption details, and general information about volcanoes. 
-- The foreign key constraints ensure data integrity and relationships between the tables.


-- This table stores information about volcanic explosivity index (VEI) data.
CREATE TABLE vei_tbl (
    VEI VARCHAR(255) PRIMARY KEY,
    Ejecta_Volume VARCHAR(255),
    Classification VARCHAR(255),
    Description VARCHAR(255),
    Plume VARCHAR(255),
    Periodicity VARCHAR(255),
    Tropospheric_injection VARCHAR(255),
    Stratospheric_injection VARCHAR(255)
);

Select * from vei_tbl;

-- This table stores population exposure index (PEI) data related to volcanic activity.
CREATE TABLE pei_tbl (
    Population_Exposure_Index INT PRIMARY KEY,
    Number_of_Volcanoes INT,
    Percentage_of_Volcanoes DECIMAL(4, 1),
    Percentage_of_Total_Weighted_Population DECIMAL(4, 1)
);

Select * from pei_tbl;

-- This table stores information about volcanoes by country.
CREATE TABLE human_development_index_tbl (
    Nation TEXT PRIMARY KEY,
    HDI FLOAT,
    Rank FLOAT
);

Select * from human_development_index_tbl;

-- This table stores information about volcanoes by country.
CREATE TABLE volcanoes_by_country_tbl (
    Country TEXT PRIMARY KEY,
    TotalVolcanoes INTEGER,
    ActiveVolcanoes REAL,
	FOREIGN KEY (Country) REFERENCES human_development_index_tbl(Nation)
);


Select * from volcanoes_by_country_tbl;


-- This table stores information about volcanic eruptions, with a reference to the VEI from the vei_tbl.
CREATE TABLE eruptions_tbl (
    eruption_id SERIAL PRIMARY KEY,
    death_toll_min REAL,
    death_toll_max REAL,
    volcano_name VARCHAR(255),
    location TEXT,
    year INT,
    VEI VARCHAR(255),
    FOREIGN KEY (VEI) REFERENCES vei_tbl(VEI),
	FOREIGN KEY (location) REFERENCES human_development_index_tbl(Nation)
);

Select * from eruptions_tbl;

-- This table stores general data about volcanoes, with references to PEI and VEI data.
CREATE TABLE volcano_data_tbl (
    VolcanoID INT PRIMARY KEY,
    V_Name VARCHAR(255),
    Country Text,
    Region VARCHAR(255),
    Subregion VARCHAR(255),
    Latitude DECIMAL(18, 15),
    Longitude DECIMAL(18, 15),
    PEI INT,
    H_active INT,
    VEI_Holoce VARCHAR(255),
    hazard VARCHAR(255),
    class VARCHAR(255),
    risk VARCHAR(255),
	FOREIGN KEY (Country) REFERENCES volcanoes_by_country_tbl(Country),
	FOREIGN KEY (PEI) REFERENCES pei_tbl(Population_Exposure_Index),
	FOREIGN KEY (VEI_Holoce) REFERENCES vei_tbl(VEI)
);

Select * from volcano_data_tbl;
