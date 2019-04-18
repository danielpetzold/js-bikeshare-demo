import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../store';
import './DriverDashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import CheckInModal from '../../components/CheckInModal/CheckInModal';

interface State {
  isCheckInOpen: boolean;
}

class DriverDashboard extends Component<any, State> {
  state: State = {
    isCheckInOpen: false
  };

  render() {
    return (
      <>
        <NavBar altHamburger={true} />
        <div className={'dash-container'}>
          <div className={'grid driver-header-grid'}>
            {/* HEADER */}
            <div className={'grid__row dash-header hide-mobile'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <p>Trends and Analytics</p>
                <h3>Downtown San Francisco</h3>
              </div>
            </div>
          </div>
          {/* MAP */}
          <div className={'grid driver-map-grid'}>
            <div className={'grid__row map-view'}>
              <div className={'grid__column-12 grid__column-m-4'} />
            </div>
          </div>
          {/* Remove this once reports are in. */}
          <button
            onClick={() => this.setState({ isCheckInOpen: true })}
            className={'btn--primary'}
          >
            Check In
          </button>
          {/* REPORTS */}
          <div className={'grid driver-reports-grid'}>
            <div className={`grid__row arrow`}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={`schedule-arrow`}>
                  <i className={'icon-ic-arrow-down'} />
                </div>
              </div>
            </div>
            <div className="grid__row maintenance">
              <div className="grid__column-4 grid__column-m-4">
                <h3 className={'maintenance__title'}>Maintenance Schedule</h3>
                <div className={'maintenance__table'}>{''}</div>
              </div>

              <div className="grid__column-8 grid__column-m-4">
                <div className={'maintenance__option-icons'}>
                  <i className={'icon-ic-server maintenance__icon-left'} />
                  <i className={'icon-ic-printer'} />
                </div>
                <div className={'maintenance__reports'}>{''}</div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isCheckInOpen && (
          <CheckInModal
            closeModal={() => this.setState({ isCheckInOpen: false })}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    sessionId: state.general.sessionId
  };
};

export default connect(mapStateToProps)(DriverDashboard);
