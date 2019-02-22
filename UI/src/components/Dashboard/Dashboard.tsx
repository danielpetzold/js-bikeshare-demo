import React from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';

class Dashboard extends React.Component<any, any> {
  render() {
    return (
      <div>
        <NavBar />
        <div className={'main'}>
          <div className={'main__content dashboard'}>
            <div className={'grid dashboard__header'}>
              <div className={'grid__row'}>
                <div
                  className={'grid__column-3 grid__column-m-4 dashboard__title'}
                >
                  Trends and Analytics
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
