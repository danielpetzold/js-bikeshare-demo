import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import IRouteStop from "../interfaces/routestop.interface";
import IStationStatus from "../interfaces/stationstatus.interface";
import {StationStatus} from "./stationstatus.entity";

@Entity("route_stop", {schema: "public" } )
export class RouteStop implements IRouteStop {

    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "id"
    })
    public id: string;

    @Column("character varying", {
        nullable: false,
        length: 20,
        name: "station_id"
        })
    public station_id: string;

    @Column("integer", {
        nullable: true,
        name: "driver_id"
    })
    public driver_id: number | null;

    @Column("character", {
        nullable: true,
        length: 32,
        name: "session_id"
    })
    public session_id: string | null;

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "system_id"
    })
    public system_id: string;

    @Column("character varying", {
        nullable: false,
        length: 20,
        name: "route_id"
    })
    public route_id: string | null;

    @Column("character varying", {
        nullable: false,
        length: 10,
        name: "region_id"
    })
    public region_id: string | null;

    @Column("real", {
        nullable: true,
        precision: 24,
        name: "stop_order"
        })
    public stop_order: number | null;

    @Column("timestamp without time zone", {
        nullable: true,
        name: "last_updated"
        })
    public last_updated: Date | null;

    @Column("boolean", {
        nullable: true,
        name: "is_completed"
        })
    public is_completed: boolean | null;

    // @ManyToMany((type) => StationStatus)
    // @JoinTable({
    //     name : "station_status",
    //     joinColumns: [ { name: "station_id"}, { name: "system_id"}]
    // } )
     public station_statuses: StationStatus[] | null;

    public active_station_status: StationStatus | null;
}
