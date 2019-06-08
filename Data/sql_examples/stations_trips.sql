select t.system_id, stat.region_id, start_time::date, count(*)
from trip t
join station_information stat on t.system_id = stat.system_id and t.start_station_id = stat.station_id
where stat.region_id is null
group by t.system_id, stat.region_id, start_time::date
order by t.system_id, stat.region_id, start_time::date

select t.system_id, stat.region_id, start_time::date, count(distinct rider_id)
from trip t
join station_information stat on t.system_id = stat.system_id and t.start_station_id = stat.station_id
group by t.system_id, stat.region_id, start_time::date
order by t.system_id, stat.region_id, start_time::date

select t.system_id, t.start_station_id, count(*)
from trip t
join station_information stat on t.system_id = stat.system_id and t.start_station_id = stat.station_id
where stat.region_id is null
group by t.system_id, t.start_station_id
order by t.system_id, t.start_station_id

select * from region_kpis
where kpi_type = 'total_trips_count'

delete from region_kpis
where kpi_type = 'fixed_bikes_count'

select * from region_kpis
order by system_id, region_id, date desc, kpi_type


select * 
from station_information
where system_id in ('NYC', 'BA', 'bluebikes') and region_id is null
order by system_id

update station_information
set region_id = '71'
where system_id = 'NYC' and region_id is null

update station_information
set region_id = '5'
where system_id = 'BA' and region_id is null and short_name like 'SJ%'
-- region_id = 3 for short_name like 'SF%'

update station_information
set region_id = '10'
where system_id = 'bluebikes' and region_id is null



select s.system_id, r.region_id, r.name
from system_information s left outer join system_regions r on s.system_id = r.system_id
where s.system_id in ('bluebikes')
order by s.system_id, r.region_id


