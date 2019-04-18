
select r.system_id as region_system_id, r.region_id as region_region_id, r.name as region_name,
  r.center_lat as region_center_lat, r.center_lon as region_center_lon, r.id as region_unique_id,
  si.station_id, si.name as station_name, si.short_name as station_short_name, 
  si.lat as station_lat, si.lon as station_lon, si.id as station_unique_id,
  route.driver_id, driver.name as driver_name,
  route_stop.stop_order as route_stop_stop_order, route_stop.last_updated as route_stop_last_updated,
  route_stop.is_completed, route_stop.session_id as route_stop_session_id, route_stop.id as route_stop_unique_id,
  cStat.last_reported as station_status_last_reported, cStat.session_id as station_status_session_id,
  cStat.num_bikes_available,
  cStat.num_bikes_disabled, 
  cStat.num_docks_available,
  cStat.num_docks_disabled
from system_region r
join station_information si on (si.system_id = r.system_id and si.region_id = r.region_id)
join route on (si.system_id = route.system_id and si.region_id = route.region_id)
join 
    (Select rs1.station_id, rs1.route_id, Max(rs1.id) as "maxId" 
         From route_stop "rs1"     
         Where rs1.route_id = route.route_id  and (session_id is null or session_id = 'in_session')
        Group By rs1.route_id, rs1.station_id) as "rs2"
        on rs2.route_id = route_stop.route_id and rs2."maxId" = route_stop.id
WHERE r.system_id = 'BA' and r.region_id = '3'
order by r.system_id, r.region_id, si.station_id, route.route_id, route_stop.stop_order



--  and rs1.route_id = 'OK01'
select r.system_id as region_system_id, r.region_id as region_region_id, r.name as region_name,
  r.center_lat as region_center_lat, r.center_lon as region_center_lon, r.id as region_unique_id,
  si.id as station_id, si.name as station_name, si.lat as station_lat, si.lon as station_lon,
  rs.route_id, rs.station_id, rs.stop_order, rs.last_updated, rs.is_completed, rs.id as route_stop_unique_id,
  rs.session_id as route_stop_session_id,
  ss.num_bikes_available, ss.num_bikes_disabled, 
  ss.num_docks_available, ss.num_docks_disabled, ss.session_id as station_status_session_id
from route_stop rs
join
    station_status ss on ss.station_id = rs.station_id and ss.system_id = rs.system_id
join
    (select rs1.system_id, rs1.region_id, rs1.station_id, rs1.route_id, Max(rs1.id) as max_id 
         From route_stop rs1     
         Where (session_id is null or session_id = 'in_session')
        Group By rs1.system_id, rs1.region_id, rs1.route_id, rs1.station_id) rs2
        on rs2.route_id = rs.route_id and rs2.max_id = rs.Id
join 
    (select ss1.station_id, ss1.system_id, Max(ss1.last_reported) as max_reported
         From station_status ss1
	     Where (session_id is null or session_id = 'in_session')
        Group By ss1.station_id, ss1.system_id) ss2
        on ss2.station_id = rs.station_id and ss2.system_id = rs.system_id and ss.last_reported = ss2.max_reported    
join station_information si on si.station_id = ss.station_id and si.system_id = ss.system_id
join system_region r on (si.system_id = r.system_id and si.region_id = r.region_id)
where rs.system_id = 'BA' and rs.region_id = '3'
Order By rs.route_id, rs.is_completed DESC, rs.stop_order, rs.station_id