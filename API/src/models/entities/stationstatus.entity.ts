import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import IStationStatus from "../interfaces/stationstatus.interface";
import {RouteStop} from "./routestop.entity";

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
    public system_id: string;

    @Column("character varying", {
        nullable: false,
        length: 20,
        name: "station_id"
        })
    public station_id: string;

    @Column("integer", {
        nullable: true,
        name: "num_bikes_available"
        })
    public num_bikes_available: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_ebikes_available"
        })
    public num_ebikes_available: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_bikes_disabled"
        })
    public num_bikes_disabled: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_docks_available"
        })
    public num_docks_available: number | null;

    @Column("integer", {
        nullable: true,
        name: "num_docks_disabled"
        })
    public num_docks_disabled: number | null;

    @Column("boolean", {
        nullable: true,
        name: "is_renting"
        })
    public is_renting: boolean | null;

    @Column("boolean", {
        nullable: true,
        name: "is_installed"
        })
    public is_installed: boolean | null;

    @Column("boolean", {
        nullable: true,
        name: "is_returning"
        })
    public is_returning: boolean | null;

    @Column("timestamp with time zone", {
        nullable: false,
        name: "last_reported"
        })
    public last_reported: Date;

    @Column("character", {
        nullable: true,
        length: 32,
        name: "session_id"
        })
    public session_id: string | null;

    // not mapped
    public name: string | null;
    //
    // @ManyToMany((type) => RouteStop)
    // public routeStops: RouteStop[] | null;
}
