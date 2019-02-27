import React from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';
import Filter from '../Filter/Filter';
import { DashboardState } from '../../actions/dashboard.types';
import { toggleFilter } from '../../actions/dashboard.actions';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { Dispatch } from 'redux';

interface DashboardProps {
  dashboard: DashboardState;
  toggleFilter: () => void;
}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.dashboard.isFilterOpen ? <Filter /> : null}
        <div className={'main'}>
          <div className={'main__content dashboard'}>
            <div className={'grid dashboard__header'}>
              <div className={'grid__row'}>
                <div
                  className={'grid__column- grid__column-m-4 dashboard__title'}
                >
                  Trends and Analytics
                </div>
              </div>
              <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div
                    className={'dashboard__region-filter'}
                    onClick={this.props.toggleFilter}
                  >
                    {`All Regions`}{' '}
                    <i className="icon-ic-arrow-down dashboard__down-arrow-icon" />
                  </div>
                  <div
                    className={'dashboard__region-time-frame'}
                    onClick={this.props.toggleFilter}
                  >
                    {`Last Quarter`}{' '}
                    <i className="icon-ic-unfold-more dashboard__unfold-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className={'grid dashboard__body'}>
              <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFilter: () => dispatch(toggleFilter())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
