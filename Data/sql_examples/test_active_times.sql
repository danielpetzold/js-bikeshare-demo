select EXTRACT(HOUR FROM now())::integer

Select EXTRACT(HOUR FROM tt.start_time)::integer as orig_hour_of_day, tt.start_time::date orig_date_day, 
		EXTRACT(HOUR FROM tt.start_time_today)::integer as hour_of_day, tt.start_time_today::date date_day, Count(*) as trip_count
				   From trip_today tt
					inner join station_information si on tt.start_station_id = si.station_id and tt.system_id = si.system_id
				   where tt.system_id =  'BA'  and si.region_id =  '3'
					and date(tt.start_time_today) between  '2019-05-15'  and  '2019-05-22'
				   Group By  EXTRACT(HOUR FROM tt.start_time)::integer , tt.start_time::date, EXTRACT(HOUR FROM tt.start_time_today)::integer, tt.start_time_today::date 
				   Order By orig_hour_of_day, orig_date_day, hour_of_day, date_day


Select EXTRACT(HOUR FROM tt.start_time_today)::integer as hour_of_day, Count(*) as trip_count
				   From trip_today tt
					inner join station_information si on tt.start_station_id = si.station_id and tt.system_id = si.system_id
				   where tt.system_id =  'BA'  and si.region_id =  '3'
					and date(tt.start_time_today) between  '2019-05-15'  and  '2019-05-22'
				   Group By  EXTRACT(HOUR FROM tt.start_time_today)::integer
				   Order By hour_of_day


Select tt.start_time_today::date date_day, tt.start_time_today::time time_of_day, count(*) as trip_count
				   From trip_today tt
					inner join station_information si on tt.start_station_id = si.station_id and tt.system_id = si.system_id
				   where tt.system_id =  'BA'  and si.region_id =  '3'
					and date(tt.start_time_today) between  '2019-05-15'  and  '2019-05-22'
				   Group By tt.start_time_today::time
				   Order By date_day, time_of_day