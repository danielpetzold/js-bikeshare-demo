//import IStationStatus from "./stationstatus.interface";

interface IRouteStop {
    id: string;
    stationId: string;
    systemId: string;
    regionId: string;
    routeId: string;
    stopOrder: number | null;
    driverId: number | null;
    isCompleted: boolean | null;
    lastUpdated: Date;
    sessionId: string | null;
   // latestStationStatus: IStationStatus | null;
}

export default IRouteStop;
