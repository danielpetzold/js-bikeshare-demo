export interface DriverNotificationData {
  driver_id: string;
  id: string;
  is_completed: boolean
  last_updated: string;
  region_id: string;
  route_id: string;
  session_id: string;
  station_id: string;
  stop_order: number
  system_id: string;
  active_station_status: ActiveStationStatus
}

export interface ActiveStationStatus {
  id: string;
  is_installed: boolean
  is_renting: boolean
  is_returning: boolean
  last_reported: string;
  name: string;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  num_ebikes_available: number
  session_id: string;
  station_id: string;
  system_id: string;
}