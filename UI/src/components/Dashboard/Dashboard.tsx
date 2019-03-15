import React from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { connect } from 'react-redux';
import { filterData, jasperServerUrl } from '../../helpers/constants';
import { State } from '../../store';
import { User } from '../../store/Login/login.types';
import { loginUser } from '../../store/Login/login.actions';

interface DashboardProps {
  user: User;
}

interface DashboardState {
  isFilterOpen: boolean;
  region: FilterData;
  timeframe: FilterData;
}

export interface FilterData {
  name: string;
  id: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
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

  componentWillMount = () => {
    console.log('will mount', this.props.user);
    visualizeHelper.login(this.props.user.token, jasperServerUrl);
  };

  componentDidMount() {
    visualizeHelper.getReport(
      'report1',
      '/public/Bikeshare_demo/Reports/AdHoc_Reports/Regions_by_Franchise'
    );
    visualizeHelper.getReport(
      'report2',
      '/public/Bikeshare_demo/Reports/AdHoc_Reports/Regions_by_Franchise'
    );
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
                <div className={'grid__column-6 grid__column-m-4'}>
                  <div id={'report1'} />
                </div>
                <div className={'grid__column-6 grid__column-m-4'}>
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

const mapStateToProps = (state: State) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
