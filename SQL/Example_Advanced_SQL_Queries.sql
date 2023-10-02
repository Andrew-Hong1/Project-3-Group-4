--Calculate Average VEI for Active Volcanoes:
-- this SQL query retrieves data about active volcanoes, their VEI values, and the associated countries. It calculates the average VEI value for each country, 
-- filters for active volcanoes, and presents the results sorted by the average VEI values in descending order. This helps identify countries with the highest 
-- average VEI values.
SELECT v.Country, AVG(CAST(vt.VEI AS INTEGER)) AS Average_VEI
FROM volcano_data_tbl v
JOIN eruptions_tbl et ON v.V_Name = et.volcano_name
JOIN vei_tbl vt ON et.VEI = vt.VEI
WHERE v.H_active = 1
GROUP BY v.Country
ORDER BY Average_VEI DESC;

-- List Countries with the Highest PEI per Active Volcano:
-- This SQL query retrieves data related to active volcanoes and their population exposure indices (PEI) from two tables, groups the data by country, 
-- filters out countries with no active volcanoes, and then orders the results by the calculated PEI per active volcano in descending order, showing countries with 
-- the highest PEI per active volcano at the top of the result set.
SELECT v.Country, 
       COUNT(v.V_Name) AS Active_Volcanoes, 
       SUM(p.Percentage_of_Total_Weighted_Population) AS Total_PEI
FROM volcano_data_tbl v
JOIN pei_tbl p ON v.PEI = p.Population_Exposure_Index
WHERE v.H_active = 1
GROUP BY v.Country
HAVING COUNT(v.V_Name) > 0
ORDER BY SUM(p.Percentage_of_Total_Weighted_Population) / COUNT(v.V_Name) DESC;

--Find Countries with Active Volcanoes and High HDI:
-- This SQL query retrieves data about countries with active volcanoes and a high Human Development Index (HDI). It calculates the total count of active 
-- volcanoes for each country, filters for countries with an HDI greater than or equal to 0.8, and then presents the results sorted by the total count of active 
-- volcanoes in descending order.
SELECT v.Country, SUM(v.H_active) AS Total_Active_Volcanoes, h.HDI
FROM volcano_data_tbl v
JOIN human_development_index_tbl h ON v.Country = h.Nation
WHERE v.H_active = 1 AND h.HDI >= 0.8
GROUP BY v.Country, h.HDI
ORDER BY Total_Active_Volcanoes DESC;

--Find Most Common VEI Classification:
-- This SQL query retrieves data about volcanic eruptions and their VEI classifications. It calculates the count of eruptions for each VEI classification, 
-- sorts them in descending order by the count, and then limits the result to the VEI classification with the highest count of eruptions.
SELECT vt.Classification, COUNT(et.VEI) AS Count
FROM vei_tbl vt
JOIN eruptions_tbl et ON vt.VEI = et.VEI
GROUP BY vt.Classification
ORDER BY Count DESC
LIMIT 1;


--List Volcanoes with the Highest Risk Level:
-- this SQL query retrieves data about volcanoes, their risk levels, associated countries, and HDI values. It filters out rows with missing or "None" values 
-- in the risk column and then orders the result set first by risk level and then by HDI in descending order.
SELECT vd.V_Name, vd.risk, hdi.Nation AS Country, hdi.HDI
FROM volcano_data_tbl vd
JOIN human_development_index_tbl hdi ON vd.Country = hdi.Nation
WHERE vd.risk IS NOT NULL AND vd.risk <> 'None'
ORDER BY vd.risk DESC, hdi.HDI DESC;



