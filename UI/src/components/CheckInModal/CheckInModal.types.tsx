export interface Report {
  id: string;
  is_installed: boolean | null;
  is_renting: boolean | null;
  is_returning: boolean | null;
  last_reported: string;
  num_bikes_available: number | null;
  num_bikes_disabled: number | null;
  num_docks_available: number | null;
  num_docks_disabled: number | null;
  num_ebikes_available: number | null;
  session_id: null | string;
  station_id: string;
  system_id: string;
}

export interface State {
  step: number;
  report: Report;
  bikesSeen: number;
  bikesPickedUp: number;
  bikesDroppedOff: number;
  bikesRepaired: number;
  notes: string;
}

export interface Props {
  closeModal: () => void;
  selectedStationId: number | null;
}

export interface Step {
  icon: string;
  text: string;
  count: number;
  stateName: any;
}
