select system_id, region_id, route_id, driver_id from route
order by system_id, region_id, route_id;

select system_id, region_id, driver_id from region_driver
order by system_id, region_id;

select system_id, region_id, floor(random() * max(driver_id) + min(driver_id))::int as selected_driver_id
from region_driver
group by system_id, region_id
order by system_id, region_id;


select r.system_id, r.region_id, r.route_id, rd.driver_id,
  ROW_NUMBER() OVER(PARTITION BY r.system_id, r.region_id, r.route_id) AS row_number
from route r join region_driver rd on r.system_id = rd.system_id and r.region_id = rd.region_id
order by system_id, region_id, route_id;

select r.system_id, r.region_id, r.route_id, rd.driver_id,
  ROW_NUMBER() OVER(PARTITION BY r.system_id, r.region_id, r.route_id) AS row_number
from route r join region_driver rd on r.system_id = rd.system_id and r.region_id = rd.region_id
order by system_id, region_id, route_id;

