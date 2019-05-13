insert into route (system_id, region_id, route_id)
select system_id, region_id, route_id
from route_stop
where system_id in ('BA', 'bluebikes') and region_id is not null and region_id != ''
group by system_id, region_id, route_id

delete from route_stop
where system_id not in ('BA', 'bluebikes') or region_id is null or region_id = ''

SELECT
 rs.system_id,
 rs.region_id,
 rs.route_id,
 rs.station_id,
 ROW_NUMBER () OVER (
 PARTITION BY rs.system_id,
 rs.region_id,
 rs.route_id
 ORDER BY
 si.lat + si.lon
 ) as route_order
FROM
 route_stop rs join station_information si on rs.system_id = si.system_id
    and rs.station_id = si.station_id
where rs.system_id = 'BA' and rs.region_id = '3'
order by rs.system_id,
 rs.region_id,
 rs.route_id,
 route_order
limit 50

update route_stop ru set ("order") = (
    select row_number from (
	SELECT
	 rs.system_id,
	 rs.region_id,
	 rs.route_id,
	 rs.station_id,
	 ROW_NUMBER () OVER (
		 PARTITION BY rs.system_id,
		 rs.region_id,
		 rs.route_id
		 ORDER BY
		 si.lat + si.lon
	 )
	FROM
	 route_stop rs join station_information si on rs.system_id = si.system_id
		and rs.station_id = si.station_id ) as ranked
where  ranked.system_id = ru.system_id and 
 ranked.region_id = ru.region_id and
 ranked.route_id = ru.route_id and
 ranked.station_id = ru.station_id
)