-- Region station count and total capacity
select s.system_id, si.region_id,
count(distinct si.station_id) as total_stations,
sum(si.capacity) as total_capacity
from system_information s
join station_information si on s.system_id = si.system_id 
group by s.system_id, si.region_id
order by s.system_id, si.region_id

-- Stations and avg slots
select s.system_id, si.region_id,
count(distinct si.station_id) as total_stations,
sum(si.capacity) as total_capacity,
avg(stat.num_bikes_available + stat.num_docks_available) as avg_slots_per_station
from system_information s
join station_information si on s.system_id = si.system_id 
join station_status stat on si.system_id = stat.system_id and si.station_id = stat.station_id
and si.station_id = stat.station_id
group by s.system_id, si.region_id
order by s.system_id, si.region_id

-- Station capacity
select s.system_id, si.region_id, si.station_id,
si.capacity
from system_information s
join station_information si on s.system_id = si.system_id 
order by s.system_id, si.region_id, si.station_id

