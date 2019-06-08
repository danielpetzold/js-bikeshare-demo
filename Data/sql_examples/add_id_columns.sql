ALTER TABLE public.region_kpi
    ADD COLUMN id bigserial;

ALTER TABLE public.rider
    ADD COLUMN id bigserial;
	
ALTER TABLE public.route
    ADD COLUMN id bigserial;

ALTER TABLE public.route_stop
    ADD COLUMN id bigserial;

ALTER TABLE public.station_information
    ADD COLUMN id bigserial;

ALTER TABLE public.station_status
    ADD COLUMN id bigserial;

ALTER TABLE public.system_information
    ADD COLUMN id bigserial;

ALTER TABLE public.system_region
    ADD COLUMN id bigserial;

ALTER TABLE public.trip
    ADD COLUMN id bigserial;

