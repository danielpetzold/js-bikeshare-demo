

select system_id, region_id, max(value) as max_driven_routes, (max(value) / 4) + 2 as drivers_needed
from region_kpis
where kpi_type = 'driven_routes_count'
group by system_id, region_id
order by system_id, region_id

select system_id, region_id, p.name
from region_drivers d join people p on d.driver_id = p.person_id
order by system_id, region_id


