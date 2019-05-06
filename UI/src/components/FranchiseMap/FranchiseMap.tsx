import React, { Component } from "react";
import './FranchiseMap.scss';

interface FranchiseMapProps {
  mapData: any;
  onClick: (marker: any) => void;
}

// Map tiles using openMapTiles schema from Carto Positron style
const baseMapUrl = 'http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const markerImage: any = require(`../../assets/GrayMarker.png`);
const colors = {
  green: '#1c9d6c',
  yellow: '#f19b19',
  red: '#ef473f'
};

class FranchiseMap extends Component<FranchiseMapProps> {
  geo: any;
  map: any;
  customTilelayer: any;
  navigationControl: any;
  markersLayer: any;
  franchiseMarkerLayer: any;
  vectorLayer: any;


  componentDidMount() {
    // Get reference to GeoAnalytics global instance
    this.geo = (window as any).T;

    let mapContainer = this.geo.DomUtil.get('franchise-map');
    this.map = new this.geo.Map(
      mapContainer,
      {
        zoom: 9, // Hardcoded for now until provided by API
        center: new this.geo.LatLng(37.5988531222099, -122.156530953733)
      }
    );

    this.addMapTiles();
    this.addMapNavigation();
    this.addFranchiseMapMarkers();
  }

  addMapTiles() {
    this.customTilelayer = new this.geo.TileLayer(baseMapUrl, {
      name: "Openstreetmap"
    });
    this.map.addLayer(this.customTilelayer);
  }

  addMapNavigation() {
    //Add the navigation control
    this.navigationControl = new this.geo.NavigationControl({
      offset: [10, 10],
      panControl: true,
      zoomControl: true,
      zoomRailHeight: 120,
      titles: {
        panUp: "Pan up",
        panDown: "Pan down",
        panLeft: "Pan left",
        panRight: "Pan right",
        reset: "Reset map",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out"
      }
    });
    this.map.addControl(this.navigationControl);
  }

  addFranchiseMapMarkers() {
    // Create a Vector layer
    let vectorLayer = new this.geo.VectorLayer({
      useCanvas: true
    });
    this.map.addLayer(vectorLayer);

    //Add the marker
    this.franchiseMarkerLayer = new this.geo.MarkersLayer();
    this.map.addLayer(this.franchiseMarkerLayer);


    this.props.mapData.forEach((marker: any) => {
      // Add Marker
      this.franchiseMarkerLayer.addMarker(new this.geo.ImageMarker( new this.geo.LatLng(marker.center_lat, marker.center_lon),
        markerImage, {
          systemId: marker.system_id,
          regionId: marker.region_id,
          name: marker.name
        }));

      // Create a circle
      let circle = new this.geo.Circle([marker.center_lat, marker.center_lon], 50, {});
      circle.setStyle({
        color: this.inNeedStatusColor(marker.percent_stations_in_need),
        stroke: true,
        weight: 1,
        name: "Circle"
      });
      // Add circle to vector layer
      vectorLayer.addGeometry(circle);
    });

    this.franchiseMarkerLayer.events.on("press", (marker: any) => {
      this.props.onClick(marker);
    });
  }

  inNeedStatusColor(percent: number) {
    return percent < 4
      ? colors.green
      : percent >= 4 && percent < 12
      ? colors.yellow
      : colors.red;
  }

  render() {
    return(
      <div id='franchise-map' className='franchise-map'></div>
    )
  }
}

export default FranchiseMap;