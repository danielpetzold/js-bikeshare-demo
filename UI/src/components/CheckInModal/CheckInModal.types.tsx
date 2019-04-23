export interface Report {
  id: string;
  is_installed: boolean | null;
  is_renting: boolean | null;
  is_returning: boolean | null;
  last_reported: string;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  num_ebikes_available: number;
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
}

export interface Props {
  closeModal: () => void;
  selectedStationId: number | null;
  refreshPage: () => void;
  sessionId: string;
}

export interface Step {
  icon: string;
  text: string;
  count: number;
  stateName: any;
  max: number;
}
