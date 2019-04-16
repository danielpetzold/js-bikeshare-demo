import React from 'react';
import './Dashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Filter, { timeFrameFilter } from '../../components/Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { DashboardProps, DashboardState, FilterOption, ReportParams } from './Dashboard.types';
import VisualizeAPI from "../../helpers/VisualizeAPI";
import axios from "axios";

const filterDataICUri = '/public/Bikeshare_demo/Reports/Lookups';

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  filters: any = [];

  constructor(props: DashboardProps) {
    super(props);
    let emptyFilter: FilterOption = {
      label: '',
      value: '',
      selected: false
    };

    // Set initial state for filter to first two options in data
    this.state = {
      isFilterOpen: false,
      selectedFilters: {
        Region: emptyFilter,
        Franchise: emptyFilter,
        Timeframe: emptyFilter
      },
      isMapOpen: true,
      kpiDetailReport: 'Dashboard_Stations_InNeed_Detail'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // Load Filters, Reports, and Maps in order
    this.getFilterData()
      .then((success: any) => {
        // Set Filters
        this.setFilters(success);
        // Load Reports
        return this.getReports();
      })
      .then((success: any) => {
        // Get Map
        this.getMap();
      });
  }

  setFilters(success: any) {
    this.filters = Object.assign({}, ...(success.map((item: any) => {
        return (
          {
            [item.id]: {
              title: item.label,
              id: item.id,
              options: item.state.options
            }
          }
        );
      }
    )));

    this.setState({
      selectedFilters: {
        Region: this.filters['Region'].options[0],
        Franchise: this.filters['Franchise'].options[0],
        Timeframe: timeFrameFilter.options[0]
      }
    });
  }

  async getMap() {

    // let mapData = await VisualizeAPI.get('rest_v2/reports/public/Bikeshare_demo/Reports/Data/FranchiseRegionStatusData.json?franchise=BA', {
    //   // params: {
    //   //   franchise: 'BA'
    //   // }
    // });

    let data = [{"system_id": "BA",
      "region_id":"12",
      "center_lat":37.8147072895131,
      "center_lon":-122.26228890574002,
      "name":"Oakland",
      "percent_stations_in_need":7.5},
      {"system_id":"BA",
        "region_id":"13",
        "center_lat":37.83726890715349,
        "center_lon":-122.28727158004729,
        "name":"Emeryville",
        "percent_stations_in_need":60.0},
      {"system_id":"BA",
        "region_id":"14",
        "center_lat":37.86432163072242,
        "center_lon":-122.27095734993485,
        "name":"Berkeley",
        "percent_stations_in_need":21.6},
      {"system_id":"BA",
        "region_id":"3",
        "center_lat":37.7721947747514,
        "center_lon":-122.41162373324305,
        "name":"San Francisco",
        "percent_stations_in_need":26.4},
      {"system_id":"BA",
        "region_id":"5",
        "center_lat":37.3345015942644,
        "center_lon":-121.89065863197565,
        "name":"San Jose",
        "percent_stations_in_need":95.7}]

    let geo = (window as any).T;
    let mapContainer = geo.DomUtil.get('dashboard-map');
    let map = new geo.Map(
      mapContainer,
      {
        zoom: 12,
        center: new geo.LatLng(37.773972, -122.431297)
      }
    );

    //Add the navigation control
    let tibcoLayerStandard = new geo.TibcoLayer({name: "TibcoLayer 1"});

    map.addLayer(tibcoLayerStandard);
    //Add the navigation control

    let navigationControl = new geo.NavigationControl({
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
    map.addControl(navigationControl);

    //Add the marker
    let markersLayer = new geo.MarkersLayer();
    map.addLayer(markersLayer);

    data.forEach((marker) => {
      markersLayer.addMarker(new geo.ImageMarker( new geo.LatLng(marker.center_lat, marker.center_lon),
        "https://geoanalytics.tibco.com/documentation/assets/img/marker.png"));
    })
  }

  getReports() {
    let promiseArray = [];

    // Create params object from selected filters
    let params: any = this.getParams();

    // KPI Report
    promiseArray.push(this.displayReport(
      'kpi-report',
      'FM_Dashboard_KPIS',
      params,
      {
        events: {
          'click': this.changeDetailsReport
        }
      }
    ));

    // KPI Details Report
    promiseArray.push(this.displayReport('in-need-report', this.state.kpiDetailReport, params));

    return Promise.all(promiseArray);
  }

  displayReport(containerId: string, reportName: string, params: any, linkOptions: any = {}) {
    return visualizeHelper.getReport(
      containerId,
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/${reportName}`,
      params,
      linkOptions
    );
    this.getMap();
  }

  getParams = () => {
    let params: ReportParams = {};
    for (let key in this.state.selectedFilters) {
      params[key] = [this.state.selectedFilters[key].value];
    }
    return params;
  };

  getFilterData = () => {
    return visualizeHelper.getInputControl('', filterDataICUri);
  };

  closeFilter = () => {
    this.setState({ isFilterOpen: false });
  };

  setFilter = (state: any) => {
    this.setState({ selectedFilters: state }, () => {
      this.getReports();
    });
  };

  toggleMap = () => {
    this.setState({ isMapOpen: !this.state.isMapOpen });
  };

  changeDetailsReport = (e: any, link: any) => {
    e.preventDefault();
    this.displayReport('in-need-report', link.href, this.getParams());
    this.setState({ kpiDetailReport: link.href });
  };

  render() {
    return (
      <>
        <NavBar/>
        {this.state.isFilterOpen ? (
          <Filter
            close={this.closeFilter}
            save={this.setFilter}
            selectedFilters={this.state.selectedFilters}
            data={this.filters}
          />
        ) : null}
        <div className={'dashboard'}>
          <header className={'dashboard-header'}>
            <div className={'dashboard-header__content grid'}>
              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'}>
                  <div className='dashboard-header__title'> Trends and Analytics</div>
                  <div className={'dashboard-header__region-filter'}
                       onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Region'] && this.state.selectedFilters['Region'].value !== '~NOTHING~' ?
                      this.state.selectedFilters['Region'].label : this.state.selectedFilters['Franchise'].label}
                    <i className='icon-ic-arrow-down dashboard-header__down-arrow-icon'/>
                  </div>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div className={'dashboard-header__region-time-frame'}
                       onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Timeframe'] ? this.state.selectedFilters['Timeframe'].label : 'Please select Timeframe'}
                    <i className='icon-ic-unfold-more dashboard-header__unfold-icon'/>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className={`dashboard-map dashboard-map--mobile`}>
            <div className={'dashboard-map__controls'}>
              <div className={'dashboard-map__control-content'}>
                <div className={'dashboard-map__toggle'} onClick={this.toggleMap}>
                  {this.state.isMapOpen ? 'Close' : 'Open'} Map
                  <i
                    className={`dashboard-map__arrow icon-ic-arrow-down ${this.state.isMapOpen ? 'dashboard-map__arrow-up' : ''}`}/>
                </div>
              </div>
            </div>
            <div className={`dashboard-map__container ${!this.state.isMapOpen ? 'dashboard-map__container--closed' : ''}`}>
              <div id='dashboard-map' className={'dashboard-map__map'}></div>
            </div>
          </div>

          <div className={'dashboard-body'}>
            <div className={'dashboard-body__content grid'}>

              <div className={'dashboard-body__report-select grid__row'}>
                <div className={'grid__column-12'}>
                  <div className={'dashboard-body__report-title'}>Operational Performance Metrics</div>
                </div>
              </div>

              <div className={'grid__row dashboard__KPI'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div id={'kpi-report'} className={'dashboard__report-container'}></div>
                </div>
              </div>

              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'} >
                  <div id={'in-need-report'} className={'dashboard__report-container'}></div>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div id={'trip-detail-report'} className={'dashboard__report-container'}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
