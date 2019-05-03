import React, { Component } from "react";
import './RegionMap.scss';
import {PopupData} from "./RegionMap.types";
import { DRIVER_ROLE, FRANCHISE_MANAGER_ROLE } from "../../helpers/userData";

interface RegionMapProps {
  mapData: any;
  onClick?: (marker: any) => void;
  openModal?: (data: PopupData) => void;
  role: string;
}

// Map tiles using openMapTiles schema from Carto Positron style
const baseMapUrl = 'http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const redMarkerImage: any = require(`../../assets/RedMarker.png`);
const yellowMarkerImage: any = require(`../../assets/YellowMarker.png`);
const grayDotImage: any = require(`../../assets/StationDot.png`);
const grayMarkerImage: any = require('../../assets/GrayMarker.png');
const greenMarkerImage: any = require(`../../assets/GreenMarker.png`);
const greenDotImage: any = require(`../../assets/Green-Dot.png`);
const greenCircleImage: any = require(`../../assets/Green-Circle.png`);
const closeImage: any = require(`../../assets/close.png`);

const itineraryServiceAccount = "demo";
const itineraryServiceKey = '2u7kdn4DnYE=';
const itineraryServiceURL = 'https://geowebservices.maporama.com/';

class RegionMap extends Component<RegionMapProps> {
  geo: any;
  map: any;
  customTilelayer: any;
  navigationControl: any;
  markersLayer: any;
  popupsLayer: any;
  popup: any;
  popupEvent: any;
  itineraryService: any;
  itineraryRenderer: any;

  componentDidMount() {
    // Get reference to GeoAnalytics global instance
    this.geo = (window as any).T;

    let mapContainer = this.geo.DomUtil.get('region-map');
    let tibcoLayerStandard = new this.geo.TibcoLayer({name: "TibcoLayer 1"});

    this.map = new this.geo.Map(
      mapContainer,
      {
        zoom: this.props.mapData.map_zoom,
        center: new this.geo.LatLng(this.props.mapData.center_lat, this.props.mapData.center_lon)
      }
    );
    this.map.addLayer(tibcoLayerStandard);

    this.addMapTiles();

    // Draw route only for Driver
    this.props.role === DRIVER_ROLE ? this.drawRoute() : null;

    this.addMapNavigation();
    this.addRegionMapMarkers();
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

  addRegionMapMarkers() {
    //Add the marker layer
    this.markersLayer = new this.geo.MarkersLayer();
    this.map.addLayer(this.markersLayer);

    this.popupsLayer =  new this.geo.PopupsLayer();
    this.map.addLayer(this.popupsLayer);

    let popupContent = `
      <div class='popup' id={{name}}>
        <div class='popup__name'>{{name}}</div>
        <div class="popup__row">
            <div class="popup__item popup__item--first">
                <div class="popup__icon">
                    <i class="icon-ic-bicycle-2"></i>
                </div>
                <div class='popup__value'>{{bikesAvailable}}</div>
            </div>
            <div class="popup__divider"></div>
            <div class="popup__item">
                <div class="popup__icon">
                    <i class="icon-ic-box-download"></i>
                </div>
                <div class='popup__value'>{{docksAvailable}}</div>
            </div>
            <div class="popup__item">
                <div class="popup__icon">
                    <i class="icon-ic-box-upload"></i>
                </div>
                <div class='popup__value'>{{docksDisabled}}</div>
            </div>
            <div class="popup__item">
                <div class="popup__icon">
                    <i class="icon-ic-wrench-screwdriver popup__icon--red"></i>
                </div>
                <div class='popup__value'>{{bikesDisabled}}</div>
            </div>
        </div>
        <div class="popup__interaction-area" style="display: {{showButton}}">
            <a id="popup__button" class="popup__button" href="#">Send Driver to Station</a>
        </div> 
      </div>`;

      this.popup =  new this.geo.Popup(popupContent, {
        closeButtonUrl: closeImage,
        offset: {
          x: 0,
          y: -39
        },
        panMap: false,
        panMapExtraOffset: {
          x: 0,
          y: 0
        }
      });

    this.popupsLayer.addPopup(this.popup);

    this.props.mapData.stations.forEach((station: any) => {
      let marker = this.props.role === FRANCHISE_MANAGER_ROLE ? this.getMarkerImage(station, station.route_stop_is_completed) : this.getDriverMarkerImage(station, station.route_stop_is_completed);
      this.markersLayer.addMarker(new this.geo.ImageMarker( new this.geo.LatLng(station.lat, station.lon),
          marker.image, {
          bikesAvailable: station.num_bikes_available,
          docksAvailable: station.num_docks_available,
          docksDisabled: station.num_docks_disabled,
          bikesDisabled: station.num_bikes_disabled,
          stationId: station.station_id,
          routeId: station.route_id,
          lat: station.lat,
          lon: station.lon,
          name: station.name,
          regionName: this.props.mapData.name,
          driverName: station.route_driver_name,
          showButton: marker.color === 'red' && this.props.role === FRANCHISE_MANAGER_ROLE ? 'flex' : 'none'
        })
      );
      //Add events
      this.markersLayer.events.on("press", (station: any) => {
        this.popup.setHtml(popupContent, {
          bikesAvailable: station.options.bikesAvailable,
          docksAvailable: station.options.docksAvailable,
          docksDisabled: station.options.docksDisabled,
          bikesDisabled: station.options.bikesDisabled,
          name: station.options.name,
          showButton: station.options.showButton
        });
        this.popup.options.data = station.options;
        this.popup.open(new this.geo.LatLng(station.options.lat, station.options.lon));
      });
    });

    /**
     * There is a bug on the popup layer where events are not being properly triggered.
     * Also callback methods can't be passed in as an option to the popup content.
     * Temp solution: Manually adding click event to popup element.
     */
    this.popupEvent = this.popup.$htmlContent.addEventListener('press', (event: any) => {
      this.openSendToStationModal(event);
    });
  }

  openSendToStationModal(e: any) {
    e.preventDefault();
    if (e.target.id === 'popup__button') {
      this.popup.close();
      this.props.openModal ? this.props.openModal(this.popup.options.data) : null;
    }
  }

  async drawRoute() {
    this.itineraryService = new this.geo.ItineraryService(itineraryServiceAccount, itineraryServiceKey, itineraryServiceURL);
    this.itineraryRenderer = new this.geo.ItineraryRenderer(this.map);

    let waypoints = this.props.mapData.stations.map((station: any) => {
      return new this.geo.LatLng(station.lat, station.lon);
    });

    let start = waypoints.shift();
    let end = waypoints.pop();
    let computeOptions = {
      travelMode: 'vehicle',
      avoidHighways: false,
      optimizationType: 'time'
    };

    await this.itineraryService.computeItinerary(start, end, waypoints, computeOptions)
      .then((results: any) => {
        if (results) {
          this.itineraryRenderer.displayItinerary(results, {
            zoomToItinerary: true,
            stroke: true,
            strokeColor: "#69caa4",
            strokeWeight: 4,
            startMarkerPath: greenDotImage,
            endMarkerPath: greenCircleImage
          });
        }
      })
  };

  // TODO: Simplify conditionals
  getMarkerImage(activeStationStatus: any, isCompleted: boolean) {
    let marker = {
      image: null,
      color: ''
    };
    if ((activeStationStatus.num_bikes_available < 3 || activeStationStatus.num_bikes_disabled > 5) && !activeStationStatus.route_stop_session_id) {
      marker.image = redMarkerImage;
      marker.color = 'red';
    } else if ((activeStationStatus.num_bikes_available < 3 || activeStationStatus.num_bikes_disabled > 5) && activeStationStatus.route_stop_session_id && !isCompleted) {
      marker.image = yellowMarkerImage;
      marker.color = 'yellow';
    } else {
      marker.image = grayDotImage;
      marker.color = 'gray';
    }
    return marker;
  }

  getDriverMarkerImage(activeStationStatus: any, isCompleted: boolean) {
    let marker = {
      image: null,
      color: ''
    };
    if ((activeStationStatus.num_bikes_available < 3 || activeStationStatus.num_bikes_disabled > 5) && activeStationStatus.route_stop_session_id && !isCompleted && activeStationStatus.route_stop_order === 0) {
      marker.image = redMarkerImage;
      marker.color = 'red';
    } else if ((activeStationStatus.num_bikes_available < 3 || activeStationStatus.num_bikes_disabled > 5) && activeStationStatus.route_stop_session_id && !isCompleted && activeStationStatus.route_stop_order > 0) {
      marker.image = yellowMarkerImage;
      marker.color = 'yellow';
    } else if (isCompleted) {
      marker.image = greenMarkerImage;
      marker.color = 'green';
    } else {
      marker.image = grayMarkerImage;
      marker.color = 'gray';
    }
    return marker;
  }

  render() {
    return(
      <div id='region-map' className='region-map'></div>
    )
  }
}

export default RegionMap;