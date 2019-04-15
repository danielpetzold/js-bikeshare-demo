import React from 'react';
import './Dashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Filter, { timeFrameFilter } from '../../components/Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { DashboardProps, DashboardState, FilterOption, ReportParams } from './Dashboard.types';

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
        // Load Maps
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

  getMap() {
    let geo = (window as any).T;
    let mapContainer = geo.DomUtil.get('dashboard-map');
    let map = new geo.Map(
      mapContainer,
      {
        zoom: 10,
        center: new geo.LatLng(48.875521, 2.302537)
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

    let marker = new geo.ImageMarker( new geo.LatLng(46.87, 2.3356),
      "http://geoanalytics.tibco.com/api/rest/assets/images/pin.png");
    markersLayer.addMarker(marker);
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
