select details.*, final_min_max.*
 from
	(Select EXTRACT(HOUR FROM tt.start_time) as hour_of_day, Count(*) as trip_count
				   From trip_today tt
					inner join station_information si on tt.start_station_id = si.station_id and tt.system_id = si.system_id
				   where tt.system_id = 'BA' and si.region_id = '3'
					--and date(tt.start_time) between  '2019-05-06'  and  '2019-05-13'
				   Group By EXTRACT(HOUR FROM tt.start_time)
				   Order By "hour_of_day") as details

 join
	(select max(totals.trip_count), min(totals.trip_count), totals.hour_of_day as "max_hour"
		from
			(Select EXTRACT(HOUR FROM tt.start_time) as hour_of_day, Count(*) as trip_count
			   From trip_today "tt"
			   inner join station_information "si" on tt.start_station_id = si.station_id and tt.system_id = si.system_id
			   where tt.system_id = 'BA' and si.region_id = '3'
				and date(tt.start_time) between  '2018-05-13'  and  '2019-05-13'
			   Group By EXTRACT(HOUR FROM tt.start_time)
			   Order By Count(*) DESC LIMIT 1) as totals
	   Group By totals.hour_of_day
	) as final_min_max 
on 1=1


Select max(tt.start_time)
--::date, Count(*) as trip_count
From trip_today tt
inner join station_information si on tt.start_station_id = si.station_id and tt.system_id = si.system_id
where tt.system_id = 'BA' and si.region_id = '3'
and date(tt.start_time) between  '2019-05-01'  and  '2019-05-06'
group by tt.start_time
order by tt.start_time
--Group By EXTRACT(HOUR FROM tt.start_time)
--Order By "hour_of_day"