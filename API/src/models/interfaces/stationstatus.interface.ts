// import {RouteStop} from "../entities/routestop.entity";

interface IStationStatus {
    id: string;
    system_id: string;
    station_id: string;
    num_bikes_available: number | null;
    num_ebikes_available: number | null;
    num_bikes_disabled: number | null;
    num_docks_available: number | null;
    num_docks_disabled: number | null;
    is_renting: boolean | null;
    is_installed: boolean | null;
    is_returning: boolean | null;
    last_reported: Date;
    session_id: string | null;
    name: string | null;
   // routeStops: RouteStop[] | null;
}

export default IStationStatus;
