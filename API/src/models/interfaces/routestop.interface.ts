 // import IStationStatus from "./stationstatus.interface";
import {StationStatus} from "../entities/stationstatus.entity";

interface IRouteStop {
    id: string;
    station_id: string;
    system_id: string;
    region_id: string;
    route_id: string;
    stop_order: number | null;
    driver_id: number | null;
    is_completed: boolean | null;
    last_updated: Date;
    session_id: string | null;
    station_statuses: StationStatus[] | null;
    active_station_status: StationStatus | null;
}

export default IRouteStop;
