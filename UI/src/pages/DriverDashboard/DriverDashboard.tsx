import React, { Component } from 'react';
import './DriverDashboard.scss';
import NavBar from '../NavBar/NavBar';

class DriverDashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className={'driverDash-container'}>
          <div className={'grid driver-dash'}>
            <div className="grid__row" />
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDashboard;
