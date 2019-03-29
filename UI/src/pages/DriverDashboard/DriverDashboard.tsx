import React, { Component } from 'react';
import './DriverDashboard.scss';
import NavBar from '../../components/NavBar/NavBar';

class DriverDashboard extends Component {
  render() {
    return (
      <div>
        <NavBar altHamburger={true} />
        <div className={'dash-container'}>
          <div className={'grid driver-dash'}>
            {/* HEADER */}
            <div className={'grid__row dash-header hide-mobile'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <p>Trends and Analytics</p>
                <h3>Downtown San Francisco</h3>
              </div>
            </div>
            {/* MAP */}
            <div className={'grid__row map-view'}>
              <div className={'grid__column-12 grid__column-m-4'} />
            </div>
            {/* REPORTS */}
            <div className={`grid__row`}>
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
      </div>
    );
  }
}

export default DriverDashboard;
