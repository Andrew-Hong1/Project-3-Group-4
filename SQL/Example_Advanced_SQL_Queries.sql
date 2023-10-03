
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
SELECT vd.V_Name, vd.risk, hdi.Nation AS Country, hdi.HDI, eruptions_tbl.VEI, vei_tbl.Ejecta_Volume
FROM volcano_data_tbl vd
JOIN human_development_index_tbl hdi ON vd.Country = hdi.Nation
JOIN eruptions_tbl ON vd.V_Name = eruptions_tbl.volcano_name
JOIN vei_tbl ON eruptions_tbl.VEI = vei_tbl.VEI
WHERE vd.risk IS NOT NULL AND vd.risk <> 'None'
ORDER BY vd.risk DESC, hdi.HDI DESC;

--Find Countries with Active Volcanoes and Low HDI:
--This query retrieves data about countries with active volcanoes and a low Human Development Index (HDI) below 0.6.
--It calculates the total count of active volcanoes for each country and presents the results sorted by the total count of active volcanoes in descending order.
SELECT v.Country, SUM(v.H_active) AS Total_Active_Volcanoes, h.HDI
FROM volcano_data_tbl v
JOIN human_development_index_tbl h ON v.Country = h.Nation
WHERE v.H_active = 1 AND h.HDI < 0.6
GROUP BY v.Country, h.HDI
ORDER BY Total_Active_Volcanoes DESC;



