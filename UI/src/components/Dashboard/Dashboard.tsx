import React, { Component } from 'react';
import './Dashboard.scss';
import NavBar from '../NavBar/NavBar';

type State = {
  isOpen: boolean;
};

class Dashboard extends React.Component<any, any> {
  render() {
    return (
      <div>
        <NavBar />
        <div className={'main'}>
          <div className={'main__content grid'}>
            <div className={'grid__row'}>
              <div className={`grid__column-4 grid__column-m-1`} />
              <div className={'grid__column-5 grid__column-m-2'}>
                <h1>Hello, World!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
