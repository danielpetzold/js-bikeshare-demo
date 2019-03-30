interface IStationStatus {
    systemId: string;
    stationId: string;
    bikesAvailable: number | null;
    eBikesAvailable: number | null;
    bikesDisabled: number | null;
    docksAvailable: number | null;
    docksDisabled: number | null;
    isRenting: boolean | null;
    isInstalled: boolean | null;
    isReturning: boolean | null;
    lastReported: Date;
    sessionId: string | null;
}

export default IStationStatus;
