select r.*, si.lat, si.lon
from route r join station_information si on 
r.system_id = si.system_id and r.region_id = si.region_id and r.station_id = si.station_id
where r.system_id in ('BA', 'bluebikes') and r.route_id = 'OK01'
order by system_id, region_id, route_id, station_id

select  system_id, region_id, route_id
from route
where region_id is not null and region_id != '' and system_id in ('BA', 'bluebikes')
group by system_id, region_id, route_id
order by system_id, region_id, route_id
