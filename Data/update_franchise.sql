--select system_id, name, short_name from system_information

update system_information
set short_name = null;

update system_information
set name = 'Austin'
where system_id = 'bcycle_austin';

update system_information
set name = 'Philadelphia'
where system_id = 'bcycle_indego';

update system_information
set name = 'Toronto'
where system_id = 'bike_share_toronto';

update system_information
set name = 'Portland'
where system_id = 'biketownpdx';

update system_information
set name = 'Montreal'
where system_id = 'Bixi_MTL';

update system_information
set name = 'Vancouver'
where system_id = 'Mobibikes_CA_Vancouver';

update system_information
set name = 'United Kingdom'
where system_id = 'nextbike_uk';

update system_information
set name = 'Boston'
where system_id = 'bluebikes';

update system_information
set name = 'New York City'
where system_id = 'NYC';

update system_information
set name = 'San Francisco Bay Area'
where system_id = 'BA';


