select * from route_stop rs
where system_id = 'BA' and route_id = 'OK01'
order by region_id, route_id, stop_order, last_updated

select system_id, station_id, stop_order,
max(last_updated) as maxStatusTime
from route_stop
where system_id = 'BA' and route_id = 'OK01' and (session_id is null or session_id = 'in_session')
group by system_id, station_id, stop_order
order by stop_order

select rs.*
From route_stop as rs
Join
    (select system_id, route_id, station_id, max(id) as max_id
		from route_stop
		where system_id = 'BA' and route_id = 'OK01' and (session_id is null or session_id = 'in_session')
		group by system_id, route_id, station_id) as rs2
on rs2.system_id = rs.system_id and rs2.route_id = rs.route_id and rs2.station_id = rs.station_id
	and rs2.max_id = rs.id
where rs.system_id = 'BA' and rs.route_id = 'OK01'
order by rs.is_completed, rs.stop_order 

--	API creates a NEW route_stop record with the following:
--	  last_updated = now
--	  Set session_id to current user session id 
--	  Set is_complete = false 
--	  stop_order is set to 0 if highPri is true, else stop_order will be the same as the original route_stop record
--	  All other fields are set to same as previous route_stop record 

-- low priority
insert into route_stop
values ('BA', '12', 'OK01', '225', 5, localtimestamp, null, 'in_session', false)

-- complete a low priority route stop
insert into route_stop
values ('BA', '12', 'OK01', '225', 5, localtimestamp, null, 'in_session', true)

-- high priority
insert into route_stop
values ('BA', '12', 'OK01', '225', 0, localtimestamp, null, 'in_session', false)

-- complete a hi priority route stop
insert into route_stop
values ('BA', '12', 'OK01', '225', 0, localtimestamp, null, 'in_session', true)

-- clear session
delete from route_stop where system_id = 'BA' and route_id = 'OK01' and last_updated is not null

update route_stop
set is_completed = true
where stop_order <= 2;


update route_stop
set is_completed = false
where is_completed is null;


Select si.name as "stationName", si.lat, si.lon, rs.system_id as "systemId", rs.region_id as "regionId",
rs.route_id, rs.station_id, rs.stop_order, rs.last_updated, rs.is_completed, rs.id as "routeId",
rs.session_id as "rStopSessionId", ss.id as "stationId", ss.num_bikes_available, ss.num_bikes_disabled, 
ss.num_docks_available,    ss.num_docks_disabled, ss.session_id as "sStatSessionId"
From route_stop "rs"
Inner Join
    (Select rs1.station_id, rs1.route_id, Max(rs1.id) as "maxId" 
         From route_stop "rs1"     
         Where rs1.route_id = 'OK01' 
        Group By rs1.route_id, rs1.station_id) "rs2"
        on rs2.route_id = rs.route_id and rs2."maxId" = rs.Id
Inner Join
    station_status "ss" on ss.station_id = rs.station_id and ss.system_id = rs.system_id
Inner Join 
    (Select ss1.station_id, ss1.system_id, Max(ss1.last_reported) "max_reported" 
         From station_status "ss1"     
        Group By ss1.station_id, ss1.system_id) "ss1" 
        on ss1.station_id = rs.station_id and ss1.system_id = rs.system_id and ss.last_reported = ss1.max_reported    
Inner Join station_information "si" on si.station_id = ss.station_id and si.system_id = ss.system_id
Order By rs.is_completed DESC, rs.stop_order
-- rs.last_updated DESC, 