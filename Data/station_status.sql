-- wrong!!! center of regions
select si.system_id, si.region_id, avg(lat) as center_lat, avg(lon) as center_lon
from station_information si
where si.system_id in ('BA', 'bluebikes')
group by si.system_id, si.region_id
order by si.system_id, si.region_id

-- center of regions

select si.system_id, si.region_id,
min(lat) + ((max(lat) - min(lat)) / 2.0)  as center_lat, min(lat) as min_lat, max(lat) as max_lat,
min(lon) + ((max(lon) - min(lon)) / 2.0)  as center_lat, min(lon) as min_lon, max(lon) as max_lon
from station_information si
where si.system_id in ('BA', 'bluebikes')
group by si.system_id, si.region_id
order by si.system_id, si.region_id


-- wrong! update center lat/lon of regions
update system_regions
SET center_lat=subquery.center_lat,
    center_lon=subquery.center_lon
FROM (select si.system_id, si.region_id, avg(lat) as center_lat, avg(lon) as center_lon
	from station_information si
	where si.system_id in ('BA', 'bluebikes')
	group by si.system_id, si.region_id
	order by si.system_id, si.region_id) AS subquery
WHERE system_regions.system_id = subquery.system_id and  system_regions.region_id=subquery.region_id


update system_region
SET center_lat=subquery.center_lat,
    center_lon=subquery.center_lon
FROM (select si.system_id, si.region_id,
min(lat) + ((max(lat) - min(lat)) / 2.0)  as center_lat, min(lat) as min_lat, max(lat) as max_lat,
min(lon) + ((max(lon) - min(lon)) / 2.0)  as center_lon, min(lon) as min_lon, max(lon) as max_lon
from station_information si
where si.system_id in ('BA', 'bluebikes')
group by si.system_id, si.region_id) AS subquery
WHERE system_region.system_id = subquery.system_id and  system_region.region_id=subquery.region_id


-- Wrong! update center lat/lon of systems
update system_information
SET center_lat=subquery.center_lat,
    center_lon=subquery.center_lon
FROM (select r.system_id, avg(center_lat) as center_lat, avg(center_lon) as center_lon
	from system_regions r
	where r.system_id in ('BA', 'bluebikes')
	group by r.system_id
	order by r.system_id) AS subquery
WHERE system_information.system_id = subquery.system_id

update system_information
SET center_lat=subquery.center_lat,
    center_lon=subquery.center_lon
FROM (select r.system_id,
	  min(r.center_lat) + ((max(r.center_lat) - min(r.center_lat)) / 2.0)  as center_lat,
	  min(r.center_lon) + ((max(r.center_lon) - min(r.center_lon)) / 2.0) as center_lon
	from system_region r
	where r.system_id in ('BA', 'bluebikes')
	group by r.system_id
	order by r.system_id) AS subquery
WHERE system_information.system_id = subquery.system_id

-- set zoom factors
update system_information
set map_zoom = 13
where system_id = 'bluebikes'

-- update center of region?
update system_information
set map_zoom = 9
where system_id = 'BA'

update system_regions
set map_zoom = 13




select si.system_id, si.region_id, avg(lat) as center_lat, avg(lon) as center_lon
from station_information si
where si.system_id in ('BA', 'bluebikes')
group by si.system_id, si.region_id
order by si.system_id, si.region_id

-- max station status
select system_id, station_id,
max(last_reported)
from station_status
where system_id in ('BA', 'bluebikes')
group by system_id, station_id
order by system_id, station_id

,
num_bikes_available,
num_bikes_disabled,
num_docks_available,
num_docks_disabled,

-- current station status
select cStat.system_id, si.region_id, cStat.station_id, cStat.last_reported, cStat.session_id,
cStat.num_bikes_available,
cStat.num_bikes_disabled,
cStat.num_docks_available,
cStat.num_docks_disabled,
si.name, si.short_name, si.lat, si.lon,
cStat.num_bikes_available = 0 or cStat.num_bikes_disabled > 5 as in_need
from station_status cStat
join (
select system_id, station_id,
max(last_reported) as maxStatusTime
from station_status
where system_id in ('BA', 'bluebikes') and (session_id is null or session_id = 'in_session')
group by system_id, station_id) as  mStat
on mStat.system_id = cStat.system_id and mStat.station_id = cStat.station_id and
mStat.maxStatusTime = cStat.last_reported
join station_information si on (si.system_id = cStat.system_id and si.station_id = cStat.station_id)
-- where cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5
order by cStat.system_id, si.region_id, cStat.station_id

-- num_bikes_disabled > 5: pick up disabled bikes
-- num_bikes_available = 0: drop off to have at least 5 available

--  count in need
--  franchise
select cStat.system_id, count(*)
from station_status cStat
join (
select system_id, station_id,
max(last_reported) as maxStatusTime
from station_status
where system_id in ('BA', 'bluebikes')  
and (session_id is null or session_id = 'in_session')
group by system_id, station_id) as  mStat
on mStat.system_id = cStat.system_id and mStat.station_id = cStat.station_id and
mStat.maxStatusTime = cStat.last_reported
where cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5
group by cStat.system_id
order by cStat.system_id

--  region level
select cStat.system_id, si.region_id, count(*)
from station_status cStat
join (
select system_id, station_id,
max(last_reported) as maxStatusTime
from station_status
where (session_id is null or session_id = 'out_session')
group by system_id, station_id) as  mStat
on mStat.system_id = cStat.system_id and mStat.station_id = cStat.station_id and
mStat.maxStatusTime = cStat.last_reported
join station_information si on (si.system_id = cStat.system_id and si.station_id = cStat.station_id)
where cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5
group by cStat.system_id, si.region_id
order by cStat.system_id, si.region_id



delete from station_status where session_id = 'in_session'

select i.region_id, 
s.num_bikes_available = 0  or s.num_bikes_disabled > 5 as in_need, s.*
from station_status s join station_information i on s.system_id = i.system_id and s.station_id = i.station_id
where s.system_id = 'BA' and i.region_id = '3'
and (s.session_id = 'in_session' or s.session_id is null)
--and s.num_bikes_available = 0  or s.num_bikes_disabled > 5
order by s.system_id, i.region_id, s.station_id, s.last_reported desc

insert into station_status
values ('BA', '100', 5, 0, 0, 14, 0, true, null, true, localtimestamp, 'in_session')

insert into station_status
values ('BA', '101', 5, 0, 0, 17, 0, true, null, true, localtimestamp, 'in_session')

insert into station_status
values ('BA', '11', 5, 0, 0, 30, 0, true, null, true, localtimestamp, 'in_session')


select cStat.system_id, si.region_id, cStat.station_id, cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5 as in_need
from station_status cStat
join (
select system_id, station_id,
max(last_reported) as maxStatusTime
from station_status
where system_id = 'BA'
	and (session_id is null or session_id = 'in_session')
group by system_id, station_id) as  mStat
on mStat.system_id = cStat.system_id and mStat.station_id = cStat.station_id and
mStat.maxStatusTime = cStat.last_reported
join station_information si on (si.system_id = cStat.system_id and si.station_id = cStat.station_id)
where cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5
order by cStat.system_id, si.region_id, cStat.station_id


group by cStat.system_id, si.region_id


select cStat.system_id, si.region_id, si.station_id, cStat.session_id,
cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5 as in_need, cStat.num_bikes_available, cStat.num_bikes_disabled
from station_status cStat
join (
select system_id, station_id,
max(last_reported) as maxStatusTime
from station_status
where system_id = 'BA' and station_id = '8' and (session_id is null or session_id = 'in_session')
group by system_id, station_id) as  mStat
on mStat.system_id = cStat.system_id and mStat.station_id = cStat.station_id and
mStat.maxStatusTime = cStat.last_reported
join station_information si on (si.system_id = cStat.system_id and si.station_id = cStat.station_id)
--where cStat.num_bikes_available = 0  or cStat.num_bikes_disabled > 5
order by cStat.system_id, si.region_id, si.station_id
