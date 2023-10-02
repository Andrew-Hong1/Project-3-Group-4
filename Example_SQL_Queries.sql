--Find the Highest VEI Eruption:
SELECT *
FROM eruptions_tbl
WHERE VEI = (SELECT MAX(VEI) FROM eruptions_tbl);

--List Countries with the Most Active Volcanoes:
SELECT Country, ActiveVolcanoes
FROM volcanoes_by_country_tbl
ORDER BY ActiveVolcanoes DESC;

--Find Eruptions with High Death Toll:
SELECT *
FROM eruptions_tbl
WHERE death_toll_max > 1000;

--Calculate Total Population Exposure Index for Each Country:
SELECT Country, SUM(PEI) AS Total_PEI
FROM volcano_data_tbl
GROUP BY Country
ORDER BY Total_PEI DESC;

--Find Volcanoes in a Specific Region:
--To find volcanoes in a specific region (e.g., 'Pacific Ring of Fire'):
SELECT V_Name, Country
FROM volcano_data_tbl
WHERE Region = 'Pacific Ring of Fire';

--List Countries with the Highest Human Development Index (HDI):
SELECT Nation, HDI
FROM human_development_index_tbl
ORDER BY HDI DESC;

--Find Volcanoes with the Most Frequent Eruptions:
SELECT V_Name, COUNT(eruption_id) AS Eruption_Count
FROM volcano_data_tbl
JOIN eruptions_tbl ON volcano_data_tbl.V_Name = eruptions_tbl.volcano_name
GROUP BY V_Name
ORDER BY Eruption_Count DESC;