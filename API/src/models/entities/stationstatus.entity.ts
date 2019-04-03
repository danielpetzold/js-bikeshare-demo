import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import IStationStatus from "../interfaces/stationstatus.interface";

@Entity("station_status", {schema: "public" } )
export class StationStatus implements IStationStatus {

    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "id"
    })
    public id: string;

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "system_id"
        })
    public systemId: string;

    @Column("character varying", {
        nullable: false,
        length: 20,
        name: "station_id"
        })
    public stationId: string;

    @Column("integer", {
        nullable: true,
        name: "num_bikes_available"
        })
    public bikesAvailable: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_ebikes_available"
        })
    public eBikesAvailable: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_bikes_disabled"
        })
    public bikesDisabled: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_docks_available"
        })
    public docksAvailable: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_docks_disabled"
        })
    public docksDisabled: number | null;

    @Column("boolean", {
        nullable: true,
        name: "is_renting"
        })
    public isRenting: boolean | null;

    @Column("boolean", {
        nullable: true,
        name: "is_installed"
        })
    public isInstalled: boolean | null;

    @Column("boolean", {
        nullable: true,
        name: "is_returning"
        })
    public isReturning: boolean | null;

    @Column("timestamp with time zone", {
        nullable: false,
        name: "last_reported"
        })
    public lastReported: Date;

    @Column("character", {
        nullable: true,
        length: 32,
        name: "session_id"
        })
    public sessionId: string | null;
}
