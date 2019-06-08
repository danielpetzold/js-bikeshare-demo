
-- go to dow(max_load) before data_date
-- dow(max_load) = 4
-- dow(data_date) = 0, 4, 6

--
-- zero day = max_load - IF(WEEKDAY(today)>WEEKDAY(max_load),7,0) + WEEKDAY(today) - WEEKDAY(max_load)
-- adjusted_date = data_date +(today - zero_day)
--select now() - interval '1' day * 10
--select now() - '2019-03-15'

select k.*,
k.date + (now()::date - (
s.max_data_load_date::date + interval '1' day *
(
	CASE WHEN extract(dow from now()) > extract(dow from s.max_data_load_date)
		 THEN -7
         ELSE 0
	END
	+ extract(dow from now()) 
	- extract(dow from s.max_data_load_date)
))) as adj_max_date,
extract(dow from now()) as today_dow, 
extract(dow from s.max_data_load_date) as max_dow,
now() - k.date as days_ahead, k.date - s.max_data_load_date as days_behind_max,
extract(dow from k.date) as data_dow, s.max_data_load_date
from region_kpis k join system_information s on k.system_id = s.system_id
where k.kpi_type = 'driven_routes_count' and k.region_id = '3'
limit 10

-- region_kpis_today view definition
select k.*,
k.date + (now()::date - (
s.max_data_load_date::date + interval '1' day *
(
	CASE WHEN extract(dow from now()) > extract(dow from s.max_data_load_date)
		 THEN -7
         ELSE 0
	END
	+ extract(dow from now()) 
	- extract(dow from s.max_data_load_date)
))) as today_adj_date
from region_kpis k join system_information s on k.system_id = s.system_id
where today_adj_date < now()

			  
select * from region_kpis_today
where kpi_type = 'driven_routes_count' and region_id = '3' and today_adj_date > now() - interval '2' day
limit 10

-- trip_today view definition
select t_inner.*,
t_inner.start_time - t_inner.time_adjust as start_time_today,
t_inner.end_time - t_inner.time_adjust as end_time_today
from
(
select t.*,
now() - (
s.max_data_load_date + interval '1' day *
(
	CASE WHEN extract(dow from now()) > extract(dow from s.max_data_load_date)
		 THEN -7
         ELSE 0
	END
	+ extract(dow from now()) 
	- extract(dow from s.max_data_load_date)
)) as time_adjust		  
from trip t join system_information s on t.system_id = s.system_id) as t_inner
where (t_inner.start_time + t_inner.time_adjust) < now()

select * from trip_today
where system_id = 'BA' and start_time_today > now()
limit 50
					  