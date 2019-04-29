ALTER TABLE public.route
    ADD COLUMN center_lat double precision;

ALTER TABLE public.route
    ADD COLUMN center_lon double precision;

ALTER TABLE public.route
    ADD COLUMN map_zoom integer;

-- center of routes

select rs.system_id, rs.region_id, rs.route_id,
min(lat) + ((max(lat) - min(lat)) / 2.0)  as center_lat, min(lat) as min_lat, max(lat) as max_lat,
min(lon) + ((max(lon) - min(lon)) / 2.0)  as center_lat, min(lon) as min_lon, max(lon) as max_lon
from route_stop rs join station_information si 
on si.system_id = rs.system_id and si.region_id = rs.region_id and 
si.station_id = rs.station_id
where rs.system_id in ('BA', 'bluebikes')
group by rs.system_id, rs.region_id, rs.route_id
order by rs.system_id, rs.region_id, rs.route_id

-- update center of routes

update route
SET center_lat=subquery.center_lat,
    center_lon=subquery.center_lon
FROM (select rs.system_id, rs.region_id, rs.route_id,
min(lat) + ((max(lat) - min(lat)) / 2.0)  as center_lat, min(lat) as min_lat, max(lat) as max_lat,
min(lon) + ((max(lon) - min(lon)) / 2.0)  as center_lon, min(lon) as min_lon, max(lon) as max_lon
from route_stop rs join station_information si 
on si.system_id = rs.system_id and si.region_id = rs.region_id and 
si.station_id = rs.station_id
where rs.system_id in ('BA', 'bluebikes')
group by rs.system_id, rs.region_id, rs.route_id) AS subquery
WHERE route.system_id = subquery.system_id and route.region_id=subquery.region_id and route.route_id = subquery.route_id

