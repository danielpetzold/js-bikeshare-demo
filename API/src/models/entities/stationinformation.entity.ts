import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("station_information", {schema: "public" } )
export class StationInformation {

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "system_id"
        })
    public systemId: string;

    @Column("character varying", {
        nullable: false,
        length: 20,
        name: "stationId"
        })
    public stationId: string;

    @Column("character varying", {
        nullable: true,
        length: 50,
        name: "external_id"
        })
    public externalId: string | null;

    @Column("character varying", {
        nullable: true,
        length: 100,
        name: "name"
        })
    public name: string | null;

    @Column("character varying", {
        nullable: true,
        length: 50,
        name: "short_name"
        })
    public shortName: string | null;

    @Column("double precision", {
        nullable: true,
        precision: 53,
        name: "lat"
        })
    public lat: number | null;

    @Column("double precision", {
        nullable: true,
        precision: 53,
        name: "lon"
        })
    public lon: number | null;

    @Column("character varying", {
        nullable: true,
        length: 10,
        name: "region_id"
        })
    public regionId: string | null;

    @Column("integer", {
        nullable: true,
        name: "capacity"
        })
    public capacity: number | null;

    @Column("character varying", {
        nullable: true,
        length: 100,
        name: "rental_url"
        })
    public rentalUrl: string | null;

    @Column("boolean", {
        nullable: true,
        name: "eightd_has_key_dispenser"
        })
    public eightdHasKeyDispenser: boolean | null;

    @Column("boolean", {
        nullable: true,
        name: "has_kiosk"
        })
    public hasKiosk: boolean | null;

    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "id"
        })
    public id: string;
}
