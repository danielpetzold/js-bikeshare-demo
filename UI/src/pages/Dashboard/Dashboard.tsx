import React from 'react';
import './Dashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Filter from '../../components/Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface DashboardProps {}

interface State {
  isFilterOpen: boolean;
  filters: any[]
  timeFrame: FilterData;
  franchise: FilterData;
  region: FilterData;
}

export interface FilterData {
  name: string;
  id: string;
}

// Stub data. Best guess of data contract until input control is created.
const timeFrameFilter = {
  label: 'Timeframe',
  id: 'timeframe',
  options: [
    {
      name: 'Current',
      id: 'current'
    },
    {
      name: 'Last 24 Hours',
      id: 'last24'
    },
    {
      name: 'Last Week',
      id: 'lastweek'
    },
    {
      name: 'Last Month',
      id: 'lastmonth'
    },
    {
      name: 'Last Quarter',
      id: 'lastquarter'
    },
    {
      name: 'Annual',
      id: 'annual'
    }
  ]
};

class Dashboard extends React.Component<DashboardProps, State> {
  visualize: any;

  constructor(props: DashboardProps) {
    super(props);
    // Set initial state for filter to first two options in data
    this.state = {
      isFilterOpen: false,
      filters: [],
      franchise: {
        id: '',
        name: ''
      },
      timeFrame: {
        id: '',
        name: ''
      },
      region: {
        id: '',
        name: ''
      }
    };
  }

  componentDidMount() {
    this.getFilterData();
    visualizeHelper.getReport(
      'report1',
      '/public/Bikeshare_demo/Reports/Dashboard_Reports/FM_Dashboard_KPIS'
    );
  }

  getFilterData = () => {
    visualizeHelper.getInputControl('', '/public/Bikeshare_demo/Reports/Lookups')
      .then((success: any) => {
        let reportFilters = success.map((filter: any) => {
          return {
            label: filter.label,
            id: filter.id,
            options: filter.state.options
          };
        });
        this.setState({filters: [...reportFilters, timeFrameFilter] })
      })
  };

  closeFilter = () => {
    this.setState({ isFilterOpen: false });
  };

  setFilter = (region: FilterData, timeFrame: FilterData) => {
    //this.setState({ region: region, timeFrame: timeFrame });
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.state.isFilterOpen ? (
          <Filter
            close={this.closeFilter}
            save={this.setFilter}
            region={this.state.region}
            timeframe={this.state.timeFrame}
            data={this.state.filters}
          />
        ) : null}
        <div className={'main'}>
          <div className={'main__content dashboard'}>
            <div className={'grid dashboard__header'}>
              <div className={'grid__row'}>
                <div
                  className={
                    'grid__column-12 grid__column-m-4 dashboard__title'
                  }
                >
                  Trends and Analytics
                </div>
              </div>
              <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div
                    className={'dashboard__region-filter'}
                    onClick={() => this.setState({ isFilterOpen: true })}
                  >
                    {/*{this.state.region.name}*/}
                    <i className="icon-ic-arrow-down dashboard__down-arrow-icon" />
                  </div>
                  <div
                    className={'dashboard__region-time-frame'}
                    onClick={() => this.setState({ isFilterOpen: true })}
                  >
                    {/*{this.state.timeframe.name}*/}
                    <i className="icon-ic-unfold-more dashboard__unfold-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className={'grid dashboard__body'}>
              <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div id={'report1'} />
                </div>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div id={'report2'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
