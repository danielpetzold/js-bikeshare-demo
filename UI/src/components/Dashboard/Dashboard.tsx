import React from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';

interface DashboardProps {}

interface State {
  isFilterOpen: boolean;
  region: FilterData;
  timeframe: FilterData;
}

export interface FilterData {
  name: string;
  id: string;
}

// Stub data. Best guess of data contract until input control is created.
const filterData = {
  testRegions: [
    {
      name: 'San Francisco Bay Area',
      id: 'san_francisco_bay_area'
    },
    {
      name: 'Downtown San Francisco',
      id: 'downtown_san_francisco'
    },
    {
      name: 'South San Mateo County',
      id: 'south_san_mateo_county'
    },
    {
      name: 'Santa Clara County',
      id: 'santa_clara_county'
    }
  ],
  testTimeframe: [
    {
      name: 'Annual',
      id: 'annual'
    },
    {
      name: 'Last Quarter',
      id: 'last_quarter'
    },
    {
      name: 'Last Month',
      id: 'last_month'
    },
    {
      name: 'Last Week',
      id: 'last_week'
    },
    {
      name: 'Last 24 Hours',
      id: 'last_24_hours'
    },
    {
      name: 'Last 6 Hours',
      id: 'last_6_hours'
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
      region: filterData.testRegions[0],
      timeframe: filterData.testTimeframe[0]
    };
  }

  componentWillMount() {
    const jrsUrl =
      'http://jrs-bikes-elasticl-1k5yhf91vrjuo-1806919984.us-east-2.elb.amazonaws.com/jasperserver-pro';

    // @ts-ignore
    visualize.config({
      server: jrsUrl,
      scripts: 'optimized-scripts',
      auth: {
        name: 'COO1',
        password: 'B1keShareDemoPwd*8',
        organization: 'bikeshare'
      }
    });
  }

  componentDidMount() {
    this.renderReport(
      '#report',
      '/public/Bikeshare_demo/Reports/Regions_by_Franchise'
    )
      .then(success => {
        console.log('this is a success', success);
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  renderReport(containerId: string, reportUrl: string) {
    return new Promise(resolve => {
      // @ts-ignore
      visualize(v => {
        const report = v.report({
          container: containerId,
          resource: reportUrl,
          success: () => {
            resolve(report);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      });
    });
  }

  closeFilter = () => {
    this.setState({ isFilterOpen: false });
  };

  setFilter = (region: FilterData, timeframe: FilterData) => {
    this.setState({ region: region, timeframe: timeframe });
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
            timeframe={this.state.timeframe}
            data={filterData}
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
                    {this.state.region.name}
                    <i className="icon-ic-arrow-down dashboard__down-arrow-icon" />
                  </div>
                  <div
                    className={'dashboard__region-time-frame'}
                    onClick={() => this.setState({ isFilterOpen: true })}
                  >
                    {this.state.timeframe.name}
                    <i className="icon-ic-unfold-more dashboard__unfold-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className={'grid dashboard__body'}>
              <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div id={'report'}>Test</div>
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
