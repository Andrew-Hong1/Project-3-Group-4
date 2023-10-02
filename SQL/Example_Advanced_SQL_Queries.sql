--Find the Deadliest Eruptions by Country:
SELECT Country, volcano_name, MAX(death_toll_max) AS Max_Death_Toll
FROM eruptions_tbl
GROUP BY Country, volcano_name
ORDER BY Max_Death_Toll DESC;

--Calculate Average VEI for Active Volcanoes:
SELECT v.Country, AVG(vt.VEI) AS Average_VEI
FROM volcano_data_tbl v
JOIN eruptions_tbl et ON v.V_Name = et.volcano_name
JOIN vei_tbl vt ON et.VEI = vt.VEI
WHERE v.H_active = 1
GROUP BY v.Country;

--List Countries with the Highest PEI per Active Volcano:
SELECT v.Country, COUNT(v.V_Name) AS Active_Volcanoes, SUM(p.Percentage_of_Total_Weighted_Population) AS Total_PEI
FROM volcano_data_tbl v
JOIN pei_tbl p ON v.PEI = p.Population_Exposure_Index
WHERE v.H_active = 1
GROUP BY v.Country
HAVING Active_Volcanoes > 0
ORDER BY Total_PEI / Active_Volcanoes DESC;

--Find Countries with Active Volcanoes and High HDI:
SELECT v.Country, v.H_active, h.HDI
FROM volcano_data_tbl v
JOIN human_development_index_tbl h ON v.Country = h.Nation
WHERE v.H_active = 1 AND h.HDI >= 0.8;

--Find Most Common VEI Classification:
SELECT vt.Classification, COUNT(et.VEI) AS Count
FROM vei_tbl vt
JOIN eruptions_tbl et ON vt.VEI = et.VEI
GROUP BY vt.Classification
ORDER BY Count DESC
LIMIT 1;