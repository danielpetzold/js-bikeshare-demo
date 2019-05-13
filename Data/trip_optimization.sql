 select count(trip."rider_id") as "CountAll_trip_rider_id", 
    si."region_id" as "region_id", 
    date_trunc('day', trip."start_time") as "trip_date"
    from "station_information" si
    inner join "trip_today" trip on ((trip."start_station_id" = si."station_id") and (trip."system_id" = si."system_id"))
    where (trip."system_id" = 'BA')
 --   group by date_trunc('day', trip."start_time"), si."region_id"
	group by date_trunc('day', trip."start_time"), si."region_id"
    order by "trip_date", "region_id"
																					  
																					  
																					 