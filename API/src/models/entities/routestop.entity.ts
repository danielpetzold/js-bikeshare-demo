import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";
import IRouteStop from "../interfaces/routestop.interface";

@Entity("route_stop",{schema:"public" } )
export class RouteStop implements IRouteStop {

    @PrimaryGeneratedColumn({
        type:"bigint",
        name:"id"
    })
    public id:string;

    @Column("character varying",{
        nullable:false,
        length:20,
        name:"station_id"
        })
    public stationId:string;

    @Column("integer",{
        nullable:true,
        name:"driver_id"
    })
    public driverId:number | null;

    @Column("character",{
        nullable:true,
        length:32,
        name:"session_id"
    })
    public sessionId:string | null;

    @Column("character varying", {
        nullable: false,
        length: 50,
        name: "system_id"
    })
    public systemId: string;

    @Column("character varying",{
        nullable:false,
        length:20,
        name:"route_id"
    })
    public routeId:string | null;

    @Column("character varying",{
        nullable:false,
        length:10,
        name:"region_id"
    })
    public regionId:string | null;

    @Column("real",{ 
        nullable:true,
        precision:24,
        name:"stop_order"
        })
    public stopOrder:number | null;

    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"last_updated"
        })
    public lastUpdated:Date | null;

    @Column("boolean",{ 
        nullable:true,
        name:"is_completed"
        })
    public isCompleted:boolean | null;

    //public latestStationStatus: IStationStatus | null;
}
