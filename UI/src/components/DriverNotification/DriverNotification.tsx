import React, { Component } from "react";
import { DriverNotificationData } from "../../pages/DriverDashboard/DriverDashboard.types";
import './DriverNotification.scss';

interface Props {
  data: DriverNotificationData;
  closeNotification: (index: number) => void;
  index: number;
}

class DriverNotification extends Component<Props> {

  closeNotification = () => {
    this.props.closeNotification(this.props.index);
  };

  render() {
    return (
      <div className="driver-notification">
        <div className="driver-notification__close" onClick={this.closeNotification}>
          <i className="icon-ic-close driver-notification__close-icon" />
        </div>
        <div className="driver-notification__title">{this.props.data.active_station_status.name}</div>
        <div className="driver-notification__info">
          <div className="driver-notification__data">
            <i className="icon-ic-bicycle-2 driver-notification__bike-icon" />
            {this.props.data.active_station_status.num_bikes_available}
          </div>
          <div className="driver-notification__data">
            <i className="icon-ic-wrench-screwdriver driver-notification__wrench-icon" />
            {this.props.data.active_station_status.num_bikes_disabled}
          </div>
        </div>
        <div className="driver-notification__route-info">Added to Route {this.props.data.route_id}</div>
      </div>
    );
  }
}

export default DriverNotification;