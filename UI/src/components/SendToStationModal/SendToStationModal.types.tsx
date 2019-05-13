export interface SendToStationData {
  driverName: string;
  regionName: string;
  routeId: string
  numBikesDisabled: number;
  numDocksAvailable: number;
  stationId: string;
}

export interface SendToStationPayload {
  stationId: string,
  routeId: string
  highPri: number
}