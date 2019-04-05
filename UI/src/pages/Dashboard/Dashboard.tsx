import React from 'react';
import './Dashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Filter, { timeFrameFilter } from "../../components/Filter/Filter";
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface DashboardProps {}

interface SelectedFilters {
  [index:string]: FilterData;
}

interface State {
  isFilterOpen: boolean;
  selectedFilters: SelectedFilters;
  isMapOpen: boolean;
  kpiDetailReport: string;
}

interface Report {
  container: string;
  name: string;
  params: any[]
}

export interface FilterData {
  label: string;
  value: string;
}



class Dashboard extends React.Component<DashboardProps, State> {
  filterDataICUri = '/public/Bikeshare_demo/Reports/Lookups';
  visualize: any;
  filters: any = [];
  private detailsRef = React.createRef<HTMLDivElement>();

  constructor(props: DashboardProps) {
    super(props);
    let emptyFilter: FilterData = {
      label: '',
      value: ''
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

  componentDidMount() {
    this.getFilterData();
  }

  getReports() {
    // Create params object from selected filters
    let params: any = this.getParams();
    this.displayReport(
      'kpi-report',
      'FM_Dashboard_KPIS',
      params,
      {
        events: {
          "click": this.changeDetailsReport
        }
      }
    );
    this.displayReport('in-need-report', this.state.kpiDetailReport, params);
  }

  displayReport(containerId: string, reportName: string, params: any, linkOptions: any = {}) {
    visualizeHelper.getReport(
      containerId,
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/${reportName}`,
      params,
      linkOptions
    );
  }

  getParams = () => {
    let params: any = {};
    for (let key in this.state.selectedFilters) {
      params[key] = [this.state.selectedFilters[key].value]
    }
    return params;
  };


  getFilterData = () => {
    visualizeHelper.getInputControl('', this.filterDataICUri)
      .then((success: any) => {
        this.filters = Object.assign({}, ...(success.map((item: any) => {
          return (
            {
              [item.id]: {
                title: item.label,
                id: item.id,
                options: item.state.options
              }
            }
          )}
        )));
        this.setFilter({
          Region: this.filters['Region'].options[0],
          Franchise: this.filters['Franchise'].options[0],
          Timeframe: timeFrameFilter.options[0]
        })
      })
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
    this.setState({isMapOpen: !this.state.isMapOpen});
  };

  changeDetailsReport = (e: any, link: any) => {
    e.preventDefault();
    this.detailsRef.current ? this.detailsRef.current.innerHTML = '': null;
    this.displayReport('in-need-report', link.href, this.getParams());
    this.setState({kpiDetailReport: link.href});
  };

  render() {
    return (
      <>
        <NavBar />
        { this.state.isFilterOpen ? (
          <Filter
            close={this.closeFilter}
            save={this.setFilter}
            selectedFilters={this.state.selectedFilters}
            data={this.filters}
          />
        ) : null }
        <div className={'dashboard'}>

          <header className={'dashboard-header'}>
            <div className={'dashboard-header__content grid'}>
              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'}>
                  <div className='dashboard-header__title'> Trends and Analytics</div>
                  <div className={'dashboard-header__region-filter'} onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Region'] && this.state.selectedFilters['Region'].value !== "~NOTHING~" ?
                      this.state.selectedFilters['Region'].label : this.state.selectedFilters['Franchise'].label }
                    <i className="icon-ic-arrow-down dashboard-header__down-arrow-icon" />
                  </div>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div className={'dashboard-header__region-time-frame'} onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Timeframe'] ? this.state.selectedFilters['Timeframe'].label : "Please select Timeframe"}
                    <i className="icon-ic-unfold-more dashboard-header__unfold-icon" />
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
                  <i className={`dashboard-map__arrow icon-ic-arrow-down ${this.state.isMapOpen ? 'dashboard-map__arrow-up' : ''}`} />
                </div>
              </div>
            </div>
            <div className={`dashboard-map__container ${!this.state.isMapOpen ? 'dashboard-map__container--closed' : ''}`}>
              <div className={'dashboard-map__placeholder-map'}></div>
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
                  <div id={'kpi-report'} />
                </div>
              </div>

              <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'} >
                  <div id={'in-need-report'} ref={this.detailsRef}/>
                </div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div id={'trip-detail-report'} />
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
