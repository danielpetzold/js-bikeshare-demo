select * from system_region
order by system_id, region_id

select si.* from station_information si
join system_region r on r.system_id = si.system_id and r.region_id = si.region_id
where r.name = '8D' or r.name = 'testzone'


delete from system_region
where name = '8D' or name = 'testzone';
