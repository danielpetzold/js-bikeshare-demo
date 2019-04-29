import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../store';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import './DriverDashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import CheckInModal from '../../components/CheckInModal/CheckInModal';
import JasperReportsService from "../../services/JasperReportsService";
import RegionMap from "../../components/RegionMap/RegionMap";
import { getDriverNotifications } from "../../services/apiCalls";
import DriverNotification from "../../components/DriverNotification/DriverNotification";
import { DriverNotificationData } from "./DriverDashboard.types";

interface State {
  isCheckInOpen: boolean;
  selectedStationId: number | null;
  mapData: any | null;
  notifications: DriverNotificationData[] | null;
}

class DriverDashboard extends Component<any, State> {
  state: State = {
    isCheckInOpen: false,
    selectedStationId: null,
    mapData: null,
    notifications: null
  };

  componentDidMount() {
    this.getNotifications();
    this.getReport();
    this.getMap();
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

  async getMap() {
    try {
      let mapData = await JasperReportsService.get('/rest_v2/reports/public/Bikeshare_demo/Reports/Data/RegionStationData.json', {
        params: {
          Franchise: 'BA',
          Region: '3',
          Route: 'SF10',
          session_id: this.props.sessionId
        }
      });
      this.setState({ mapData: mapData.data[0]})
    } catch (e) {
      console.error(e);
    }
  }

  refreshPage = () => {
    this.getReport();
    this.getMap();
  };

  checkInStation = async (e: any, link: any) => {
    this.setState({ isCheckInOpen: true, selectedStationId: link.href });
  };

  getNotifications = async () => {
    let notifications: DriverNotificationData[] = await getDriverNotifications();
    this.setState({notifications: notifications});
  };

  closeNotification = (index: number) => {
    const newNotifications = this.state.notifications;
    newNotifications ? newNotifications.splice(index, 1) : null;
    this.setState({notifications: newNotifications})
  };

  render() {

    const notifications = this.state.notifications ? this.state.notifications.map((item, key) => {
      return <DriverNotification data={item} index={key} closeNotification={this.closeNotification} key={key}/>
    }) : null;

    return (
      <>
        <NavBar altHamburger={true} />
        <div className={'dash-container'}>
          <div className="notification-container">
            {notifications}
          </div>
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
              <div className={'grid__column-12 grid__column-m-4'} >
                {this.state.mapData && (
                  <RegionMap role={this.props.role} mapData={this.state.mapData}/>
                )}
              </div>
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
    sessionId: state.general.sessionId,
    role: state.login.user.role
  };
};

export default connect(mapStateToProps)(DriverDashboard);
