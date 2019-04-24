import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../store';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import './DriverDashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import CheckInModal from '../../components/CheckInModal/CheckInModal';

interface State {
  isCheckInOpen: boolean;
  selectedStationId: number | null;
}

class DriverDashboard extends Component<any, State> {
  state: State = {
    isCheckInOpen: false,
    selectedStationId: null
  };

  componentDidMount() {
    this.getReport();
  }

  getReport = () => {
    visualizeHelper.getReport(
      'check-in-report',
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/Driver_CheckIn_List`,
      { Session_ID: [this.props.sessionId] },
      {
        events: {
          click: this.checkInStation
        }
      }
    );

    visualizeHelper.getReport(
      'summary-report',
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/Maintenance_Summary`,
      { Session_ID: [this.props.sessionId] }
    );
  };

  refreshPage = () => {
    this.getReport();
  };

  checkInStation = async (e: any, link: any) => {
    this.setState({ isCheckInOpen: true, selectedStationId: link.href });
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
                <div className={'maintenance__table'} id="summary-report" />
              </div>

              <div className="grid__column-8 grid__column-m-4">
                <div className={'maintenance__option-icons'}>
                  <i className={'icon-ic-server maintenance__icon-left'} />
                  <i className={'icon-ic-printer'} />
                </div>
                <div className={'maintenance__reports'} id="check-in-report" />
              </div>
            </div>
          </div>
        </div>
        {this.state.isCheckInOpen && (
          <CheckInModal
            closeModal={() => this.setState({ isCheckInOpen: false })}
            selectedStationId={this.state.selectedStationId}
            refreshPage={this.refreshPage}
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
