import React, { Component } from "react";
import "./DriverDashboard.scss";
import NavBar from "../../components/NavBar/NavBar";

class DriverDashboard extends Component {
  render() {
    return (
      <div>
        <NavBar altHamburger={true} />
        <div className={"driverDash-container"}>
          <div className={"grid driver-dash"}>
            {/* HEADER */}
            <div className={"grid__row dash-header hide-mobile"}>
              <div className={"grid__column-12 grid__column-m-4"}>
                <p>Trends and Analytics</p>
                <h3>Downtown San Francisco</h3>
              </div>
            </div>
            {/* MAP */}
            <div className={"grid__row map-view"}>
              <div className={"grid__column-12 grid__column-m-4"} />
            </div>
            {/* REPORTS */}
            <div className={`grid__row schedule`}>
              <div className={"grid__column-12 grid__column-m-4"}>
                <div className={`schedule__arrow`}>
                  <i className={"icon-ic-arrow-down"} />
                </div>

                <div className={"schedule__content"}>
                  <div className={"maintenance-schedule"}>
                    <h3 className={"maintenance-schedule__title"}>
                      Maintenance Schedule
                    </h3>
                    <div className={"maintenance-schedule__table"}>{""}</div>
                  </div>
                  <div className={"stations-panel"}>
                    <div className={"stations-panel__option-icons"}>
                      <i className={"icon-ic-server options__icon-left"} />
                      <i className={"icon-ic-printer"} />
                    </div>
                    <div className={"stations-panel__station-reports"}>
                      {""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DriverDashboard;
