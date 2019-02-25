import React from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';

class Dashboard extends React.Component<any, any> {
  openFilter() {
    console.log('test');
  }

  render() {
    return (
      <div>
        <NavBar />
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
                    onClick={this.openFilter}
                  >
                    {`All Regions`}{' '}
                    <i className="icon-ic-arrow-down dashboard__down-arrow-icon" />
                  </div>
                  <div
                    className={'dashboard__region-time-frame'}
                    onClick={this.openFilter}
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

export default Dashboard;
