import React, { Component } from 'react';
import './ViewReport.scss';

interface State {
  startDate: string;
  endDate: string;
  dataOptions: string[];
  stationOptions: string[];
  riderOptions: string[];
  datesOpen: boolean;
  dataOpen: boolean;
  stationsOpen: boolean;
  ridersOpen: boolean;
}

class ViewReport extends Component<{}, State> {
  state = {
    startDate: '',
    endDate: '',
    dataOptions: ['1', '2', '3', '4'],
    stationOptions: [],
    riderOptions: [],
    datesOpen: false,
    dataOpen: false,
    stationsOpen: false,
    ridersOpen: false
  };

  toggleOpen = (e: any, open: boolean) => {
    const { id }: any = e.target;
    console.log('id: ', id);
    this.setState({
      [id]: open
    } as Pick<State, keyof State>);
  };

  render() {
    const { datesOpen, dataOpen, stationsOpen, ridersOpen } = this.state;
    return (
      <div className={'grid report-view'}>
        <div className={'grid__row'}>
          <div className={'grid__column-12 grid__column-m-4'}>
            <h3>Ops & Costs</h3>
            <p>Quarter 1</p>
            <p>January 1, 2018 - March 31, 2018</p>
            <div>
              <p>Modify Report</p>
              <p>Filter</p>
            </div>
            <form className={'report-view__form'}>
              <h4>Clear All</h4>
              <div className={'report-view__option-title'}>
                <p>Dates</p>
                <i
                  id="datesOpen"
                  className={
                    'report-view__arrow ' +
                    (datesOpen ? 'icon-ic-arrow-down' : 'icon-ic-arrow-right')
                  }
                  onClick={e => this.toggleOpen(e, !this.state.datesOpen)}
                />
              </div>
              <hr />
              <div
                className={
                  'report-view__form__content ' +
                  (!datesOpen ? 'report-view__form__content--hidden' : '')
                }
              >
                <p>Start</p>
                <input type="date" name="" id="" />
                <p>End</p>
                <input type="date" name="" id="" />
              </div>
              <div className={'report-view__option-title'}>
                <p>Data</p>
                <i
                  id="dataOpen"
                  className={
                    'report-view__arrow ' +
                    (dataOpen ? 'icon-ic-arrow-down' : 'icon-ic-arrow-right')
                  }
                  onClick={e => this.toggleOpen(e, !this.state.dataOpen)}
                />
              </div>
              <hr />
              <div
                className={
                  'report-view__form__content ' +
                  (!dataOpen ? 'report-view__form__content--hidden' : '')
                }
              >
                Data content
              </div>
              <div className={'report-view__option-title'}>
                <p>Stations</p>
                <i
                  id="stationsOpen"
                  className={
                    'report-view__arrow ' +
                    (stationsOpen
                      ? 'icon-ic-arrow-down'
                      : 'icon-ic-arrow-right')
                  }
                  onClick={e => this.toggleOpen(e, !this.state.stationsOpen)}
                />
              </div>
              <hr />
              <div
                className={
                  'report-view__form__content ' +
                  (!stationsOpen ? 'report-view__form__content--hidden' : '')
                }
              >
                Stations content
              </div>
              <div className={'report-view__option-title'}>
                <p>Riders</p>
                <i
                  id="ridersOpen"
                  className={
                    'report-view__arrow ' +
                    (ridersOpen ? 'icon-ic-arrow-down' : 'icon-ic-arrow-right')
                  }
                  onClick={e => this.toggleOpen(e, !this.state.ridersOpen)}
                />
              </div>
              <hr />
              <div
                className={
                  'report-view__form__content ' +
                  (!ridersOpen ? 'report-view__form__content--hidden' : '')
                }
              >
                Riders content
              </div>
            </form>
            <div className={'report-view__btn-wrapper'}>
              <button className={'report-view__btn btn--primary'}>
                Print Report
              </button>
              <button className={'report-view__btn btn--secondary'}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewReport;
