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
  isMobile: boolean;
  routeId: string;
  franchiseId: string;
  regionId: string;
}

const mobileWidth: number = 1024;

class DriverDashboard extends Component<any, State> {
  state: State = {
    isCheckInOpen: false,
    selectedStationId: null,
    mapData: null,
    notifications: null,
    isMobile: window.innerWidth < mobileWidth,
    routeId: 'SF10',
    franchiseId: 'BA',
    regionId: '3'
  };

  async componentDidMount() {
    await this.getNotifications();
    await this.getReports();
    await this.getMap();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = async () => {

    /*
      Reports do not have responsive support yet (only ad-hoc) so we're switching between a larger and
      smaller width report based on screen width.
    */

    if (window.innerWidth < mobileWidth && !this.state.isMobile) {
      this.setState({isMobile: true});
      await this.getReports();
    } else if (window.innerWidth >= mobileWidth && this.state.isMobile) {
      this.setState({isMobile: false});
      await this.getReports();
    }
  };

  getReports = async () => {
    await visualizeHelper.getReport(
      `/public/Bikeshare_demo/Reports/Dashboard_Reports/Maintenance_Summary`,
      'summary-report',
      { Session_ID: [this.props.sessionId] }
    );

    let report = '/public/Bikeshare_demo/Reports/Dashboard_Reports/Driver_CheckIn_List';
    this.state.isMobile ? report += '_Mobile': '';

    await visualizeHelper.getReport(
      report,
      'check-in-report',
      { Session_ID: [this.props.sessionId] },
      {
        events: {
          click: this.checkInStation
        }
      }
    );
  };

  async getMap() {
    this.setState({mapData: null});
    try {
      let mapData = await JasperReportsService.get('/rest_v2/reports/public/Bikeshare_demo/Reports/Data/RegionStationData.json', {
        params: {
          Franchise: this.state.franchiseId,
          Region: this.state.regionId,
          Route: this.state.routeId,
          session_id: this.props.sessionId
        }
      });
      this.setState({ mapData: mapData.data[0]})
    } catch (e) {
      console.error(e);
    }
  }

  refreshPage = async () => {
    await this.getMap();
    await this.getReports();
  };

  checkInStation = async (e: any, link: any) => {
    this.setState({ isCheckInOpen: true, selectedStationId: link.href });
  };

  getNotifications = async () => {
    let notifications: DriverNotificationData[] = await getDriverNotifications(this.state.routeId);
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
          <div className={'driver-reports'}>
            <div className={'driver-reports__container grid'}>
              <div className='grid__row'>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div className={`driver-reports__schedule-arrow`}>
                    <i className={'icon-ic-arrow-down'} />
                  </div>
                </div>
              </div>
              <div className='grid__row'>
                <div className="grid__column-4 grid__column-m-4">
                  <h3 className={'driver-reports__title'}>Maintenance Schedule</h3>
                  <div className={'driver-reports__report'} id="summary-report" />
                </div>
                <div className="grid__column-8 grid__column-m-4">
                  <div className={'driver-reports__action-icons'}>

                  </div>
                  <div className={'driver-reports__report'} id="check-in-report" />
                </div>
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
