export interface PopupData {
  anchor: string;
  bikesAvailable: number;
  bikesDisabled: number;
  docksAvailable: number;
  docksDisabled: number;
  draggable: boolean;
  draggableUsingOffset: boolean;
  driverName: string;
  lat: number;
  lon: number;
  name: string;
  offset: any   // Geo Point type
  popOnClick: boolean;
  regionName: string;
  routeId: string;
  showButton: string;
  stationId: string;
}