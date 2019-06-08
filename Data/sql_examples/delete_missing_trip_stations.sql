select distinct t.system_id, t.start_station_id
from trip t left outer join station_information si on t.system_id = si.system_id and t.start_station_id = si.station_id
where si.station_id is null


with bad_stations as (select distinct trip.system_id, trip.end_station_id
	from trip left outer join station_information si on trip.system_id = si.system_id and trip.end_station_id = si.station_id
	where si.station_id is null)  
delete
from trip t
using bad_stations
where t.system_id = bad_stations.system_id and t.end_station_id = bad_stations.end_station_id


