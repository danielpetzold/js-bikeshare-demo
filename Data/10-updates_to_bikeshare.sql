CREATE OR REPLACE VIEW public.trip_today AS
 SELECT t_inner.system_id,
    t_inner.duration_sec,
    t_inner.start_time,
    t_inner.end_time,
    t_inner.start_station_id,
    t_inner.end_station_id,
    t_inner.bike_id,
    t_inner.trip_sequence,
    t_inner.rider_id,
    t_inner.time_adjust,
    t_inner.start_time + t_inner.time_adjust AS start_time_today,
    t_inner.end_time + t_inner.time_adjust AS end_time_today
   FROM ( SELECT t.system_id,
            t.duration_sec,
            t.start_time,
            t.end_time,
            t.start_station_id,
            t.end_station_id,
            t.bike_id,
            t.trip_sequence,
            t.rider_id,
            now()::date::timestamp with time zone - (s.max_data_load_date + '1 day'::interval day * (
                CASE
                    WHEN date_part('dow'::text, now()) > date_part('dow'::text, s.max_data_load_date) THEN '-7'::integer
                    ELSE 0
                END::double precision + date_part('dow'::text, now()) - date_part('dow'::text, s.max_data_load_date)))::timestamp with time zone AS time_adjust
           FROM trip t
             JOIN system_information s ON t.system_id::text = s.system_id::text) t_inner
  WHERE (t_inner.start_time + t_inner.time_adjust) < now();
  