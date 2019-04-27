import React from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { State } from '../../store';
import NavBar from '../../components/NavBar/NavBar';
import Filter, { timeFrameFilter } from '../../components/Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { DashboardProps, DashboardState, FilterOption, ReportParams } from "./Dashboard.types";
import FranchiseMap from "../../components/FranchiseMap/FranchiseMap";
import JasperReportsService from "../../services/JasperReportsService";
import RegionMap from "../../components/RegionMap/RegionMap";
import SendToStationModal from "../../components/SendToStationModal/SendToStationModal";
import { SendToStationData } from "../../components/SendToStationModal/SendToStationModal.types";
import { PopupData } from "../../components/RegionMap/RegionMap.types";

const filterDataICUri = '/public/Bikeshare_demo/Reports/Lookups';
const mapDataLocations: any = {
  Region: '/rest_v2/reports/public/Bikeshare_demo/Reports/Data/RegionStationData.json',
  Franchise: '/rest_v2/reports/public/Bikeshare_demo/Reports/Data/FranchiseRegionStatusData.json'
};

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  filters: any = [];

  constructor(props: DashboardProps) {
    super(props);
    let emptyFilter: FilterOption = {
      label: '',
      value: '',
      selected: false
    };

    this.state = {
      isFilterOpen: false,
      selectedFilters: {
        Region: emptyFilter,
        Franchise: emptyFilter,
        Timeframe: emptyFilter
      },
      isMapOpen: true,
      kpiDetailReport: 'Dashboard_Stations_InNeed_Detail',
      franchiseMapData: [],
      regionMapData: null,
      displayedMap: '',
      popupData: null
    };
  }

  componentDidMount() {
    // Load Filters, Reports, and Maps in order
    this.getFilterData()
      .then((success: any) => {
        this.setFilters(success);
        return this.getReports();
      })
      .then(() => {
        this.getMap();
      });
  }

  setFilters(success: any) {
    let filterList = Object.assign({}, ...(success.map((item: any) => {
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

    filterList['Timeframe'] = {
      id: 'Timeframe',
      options: timeFrameFilter.options,
      title: 'Timeframe'
    };
    this.filters = filterList;

    // Set initial filters
    this.setState({
      selectedFilters: {
        Region: this.filters['Region'].options[0],
        Franchise: this.filters['Franchise'].options[0],
        Timeframe: this.filters['Timeframe'].options[0]
      }
    });
  }

  async getMap() {
    // Clear Map
    this.setState({displayedMap: ''});

    let displayMap = this.state.selectedFilters.Region.value === '~NOTHING~' ? 'Franchise' : 'Region';
    try {
      let mapData = await JasperReportsService.get(mapDataLocations[displayMap], {
        params: {
          Franchise: this.state.selectedFilters.Franchise.value,
          Region: this.state.selectedFilters.Region.value
        }
      });
      if (displayMap === 'Franchise') {
        this.setState({ franchiseMapData: mapData.data, displayedMap: displayMap })
      } else {
        this.setState({ regionMapData: mapData.data, displayedMap: displayMap })
      }
    } catch (e) {
      console.error(e);
    }
  }

  getReports() {
    let promiseArray = [];

    // Create params object from selected filters
    let params: any = this.getParams();
    // KPI Report
    promiseArray.push(
      this.displayReport('kpi-report', 'FM_Dashboard_KPIS', params, {
        events: {
          click: this.changeDetailsReport
        }
      })
    );

    // KPI Details Report
    promiseArray.push(
      this.displayReport('in-need-report', this.state.kpiDetailReport, params)
    );

    return Promise.all(promiseArray);
  }

  displayReport(
    containerId: string,
    reportName: string,
    params: any,
    linkOptions: any = {}
  ) {
    return visualizeHelper.getReport(
      containerId,
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/${reportName}`,
      params,
      linkOptions
    );
  }

  getParams = () => {
    let params: ReportParams = {};
    for (let key in this.state.selectedFilters) {
      params[key] = [this.state.selectedFilters[key].value];
    }
    this.props.sessionId
      ? (params = { ...params, Session_ID: [this.props.sessionId] })
      : null;
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
      this.getMap();
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

  onClickMapMarker = (marker: any) => {
    let selectedRegion = this.filters.Region.options.find((option: any) => {
      return option.value === marker.options.regionId;
    });
    this.setFilter(Object.assign({}, {...this.state.selectedFilters, Region: selectedRegion} ));
  };

  openSendToStationModal = (data: PopupData) => {
    let popupData: SendToStationData = {
      driverName: data.driverName,
      regionName: data.regionName,
      routeId: data.routeId,
      numBikesDisabled: data.bikesDisabled,
      numDocksAvailable: data.docksAvailable,
      stationId: data.stationId
    };
    this.setState({popupData: popupData});
  };

  closeModal = (refresh: boolean) => {
    this.setState({popupData: null});
    if (refresh) {
      this.getReports();
      this.getMap();
    }
  };

  render() {
    let map = null;
    if (this.state.displayedMap === 'Franchise' && this.state.franchiseMapData.length) {
      map = <FranchiseMap mapData={this.state.franchiseMapData} onClick={this.onClickMapMarker} />;
    } else if (this.state.displayedMap === 'Region' && this.state.regionMapData){
      map =  <RegionMap mapData={this.state.regionMapData} onClick={this.onClickMapMarker} openModal={this.openSendToStationModal}/>
    }

    return (
      <>
        <NavBar />
        {this.state.isFilterOpen ? (
          <Filter
            close={this.closeFilter}
            save={this.setFilter}
            selectedFilters={this.state.selectedFilters}
            data={this.filters}
          />
        ) : null}
        <div className={'dashboard'}>
          {this.state.popupData && (
            <SendToStationModal data={this.state.popupData} closeModal={this.closeModal}/>
          )}

          <header className={'dashboard-header'}>
            <div className={'dashboard-header__content grid'}>
              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'}>
                  <div className="dashboard-header__title">
                    Trends and Analytics
                  </div>
                  <div
                    className={'dashboard-header__region-filter'}
                    onClick={() => this.setState({ isFilterOpen: true })}
                  >
                    {this.state.selectedFilters['Region'] &&
                    this.state.selectedFilters['Region'].value !== '~NOTHING~'
                      ? this.state.selectedFilters['Region'].label
                      : this.state.selectedFilters['Franchise'].label}
                    <i className="icon-ic-arrow-down dashboard-header__down-arrow-icon" />
                  </div>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div
                    className={'dashboard-header__region-time-frame'}
                    onClick={() => this.setState({ isFilterOpen: true })}
                  >
                    {this.state.selectedFilters['Timeframe']
                      ? this.state.selectedFilters['Timeframe'].label
                      : 'Please select Timeframe'}
                    <i className="icon-ic-unfold-more dashboard-header__unfold-icon" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className={`dashboard-map dashboard-map--mobile`}>
            <div className={'dashboard-map__controls'}>
              <div className={'dashboard-map__control-content'}>
                <div
                  className={'dashboard-map__toggle'}
                  onClick={this.toggleMap}
                >
                  {this.state.isMapOpen ? 'Close' : 'Open'} Map
                  <i
                    className={`dashboard-map__arrow icon-ic-arrow-down ${
                      this.state.isMapOpen ? 'dashboard-map__arrow-up' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className={`dashboard-map__container ${!this.state.isMapOpen ? 'dashboard-map__container--closed' : ''}`}>
              {map}
            </div>
          </div>

          <div className={'dashboard-body'}>
            <div className={'dashboard-body__content grid'}>
              <div className={'dashboard-body__report-select grid__row'}>
                <div className={'grid__column-12'}>
                  <div className={'dashboard-body__report-title'}>
                    Operational Performance Metrics
                  </div>
                </div>
              </div>

              <div className={'grid__row dashboard__KPI'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div
                    id={'kpi-report'}
                    className={'dashboard__report-container'}
                  />
                </div>
              </div>

              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'} >
                  <div id={'in-need-report'} className={'dashboard__report-container'}></div>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div
                    id={'trip-detail-report'}
                    className={'dashboard__report-container'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    sessionId: state.general.sessionId
  };
};

export default connect(mapStateToProps)(Dashboard);
