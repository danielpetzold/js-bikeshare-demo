import React, { Component } from 'react';
import './ViewReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../NavBar/NavBar';

interface State {
  startDate: string;
  endDate: string;
  dataOptions: object;
  stationOptions: object;
  riderOptions: object;
  datesOpen: boolean;
  dataOpen: boolean;
  stationsOpen: boolean;
  ridersOpen: boolean;
}

class ViewReport extends Component<{}, State> {
  state = {
    startDate: '',
    endDate: '',
    dataOptions: { '1': false, '2': false, '3': false, '4': false },
    stationOptions: { '5': false, '6': false, '7': false, '8': false },
    riderOptions: { '9': false, '10': false, '11': false, '12': false },
    datesOpen: true,
    dataOpen: false,
    stationsOpen: false,
    ridersOpen: false
  };

  toggleOpen = (e: any, open: boolean) => {
    const { id }: any = e.target;
    this.setState({
      [id]: open
    } as Pick<State, keyof State>);
  };

  toggleChecked = (name: any, key: any, checked: boolean) => {
    let newState: any = { ...this.state };
    newState[name][key] = checked;

    this.setState(newState);
  };

  clearForm = () => {
    this.setState({
      startDate: '',
      endDate: '',
      dataOptions: { '1': false, '2': false, '3': false, '4': false },
      stationOptions: { '5': false, '6': false, '7': false, '8': false },
      riderOptions: { '9': false, '10': false, '11': false, '12': false }
    });
  };

  render() {
    const {
      datesOpen,
      dataOpen,
      stationsOpen,
      ridersOpen,
      dataOptions,
      stationOptions,
      riderOptions
    } = this.state;

    const displayOptions = (options: any, name: string) => {
      let arr = [];
      let i = 0;
      for (let key in options) {
        i++;
        arr.push(
          <div className={'form-checkbox-row'} key={i}>
            <label htmlFor={key} className={'form-checkbox '}>
              <input
                type="checkbox"
                name={key}
                checked={options[key]}
                id={key}
                onChange={() => this.toggleChecked(name, key, !options[key])}
              />
              <label
                htmlFor={key}
                className={
                  'form-checkbox__check ' +
                  (options[key] ? 'form-checkbox__check--checked' : '')
                }
              />
            </label>
            <p>{key}</p>
          </div>
        );
      }
      return arr;
    };

    return (
      <>
        <NavBar />
        <div className={'grid'}>
          <div className={'grid__row report-view'}>
            <div className={'grid__column-12 grid__column-m-4'}>
              {/* HEADER */}
              <header className={'report-view__header'}>
                <h3>Ops & Costs</h3>
                <p>Quarter 1</p>
                <p>January 1, 2018 - March 31, 2018</p>
                <div className={'report-view__header__links'}>
                  <p>Modify Report</p>
                  <img src={filterIcon} alt="filter" />
                </div>
              </header>
              {/* CHART */}
              <div className={'report-view__table report-view__no-mobile'}>
                <p>Operational Performance</p>
                {/* content */}
              </div>
              {/* FORM */}
              <form className={'report-form'}>
                <h4 onClick={this.clearForm}>Clear All</h4>
                {/* -DATES */}
                <div className={'report-form__option-title'}>
                  <p>Dates</p>
                  <i
                    id="datesOpen"
                    className={
                      'report-form__arrow ' +
                      (datesOpen ? 'icon-ic-arrow-down' : 'icon-ic-arrow-right')
                    }
                    onClick={e => this.toggleOpen(e, !this.state.datesOpen)}
                  />
                </div>
                <hr />
                <div
                  className={
                    'report-form__content report-form__date-wrapper ' +
                    (!datesOpen ? 'report-form__content--hidden' : '')
                  }
                >
                  <p className={'report-form__date-text'}>Start</p>
                  <input
                    type="date"
                    name=""
                    id=""
                    value={this.state.startDate}
                    onChange={e => this.setState({ startDate: e.target.value })}
                  />
                  <p className={'report-form__date-text'}>End</p>
                  <input
                    type="date"
                    name=""
                    id=""
                    value={this.state.endDate}
                    onChange={e => this.setState({ endDate: e.target.value })}
                  />
                </div>
                {/* -DATA */}
                <div className={'report-form__option-title'}>
                  <p>Data</p>
                  <i
                    id="dataOpen"
                    className={
                      'report-form__arrow ' +
                      (dataOpen ? 'icon-ic-arrow-down' : 'icon-ic-arrow-right')
                    }
                    onClick={e => this.toggleOpen(e, !this.state.dataOpen)}
                  />
                </div>
                <hr />
                <div
                  className={
                    'report-form__content ' +
                    (!dataOpen ? 'report-form__content--hidden' : '')
                  }
                >
                  {displayOptions(dataOptions, 'dataOptions')}
                </div>
                {/* -STATIONS */}
                <div className={'report-form__option-title'}>
                  <p>Stations</p>
                  <i
                    id="stationsOpen"
                    className={
                      'report-form__arrow ' +
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
                    'report-form__content ' +
                    (!stationsOpen ? 'report-form__content--hidden' : '')
                  }
                >
                  {displayOptions(stationOptions, 'stationOptions')}
                </div>
                {/* -RIDERS */}
                <div className={'report-form__option-title'}>
                  <p>Riders</p>
                  <i
                    id="ridersOpen"
                    className={
                      'report-form__arrow ' +
                      (ridersOpen
                        ? 'icon-ic-arrow-down'
                        : 'icon-ic-arrow-right')
                    }
                    onClick={e => this.toggleOpen(e, !this.state.ridersOpen)}
                  />
                </div>
                <hr />
                <div
                  className={
                    'report-form__content ' +
                    (!ridersOpen ? 'report-form__content--hidden' : '')
                  }
                >
                  {displayOptions(riderOptions, 'riderOptions')}
                </div>
              </form>
              {/* BUTTONS */}
              <div className={'report-view__btn-wrapper'}>
                <button className={'report-view__btn btn--primary'}>
                  Print Report
                </button>
                <button
                  className={
                    'report-view__btn btn--secondary report-view__no-mobile'
                  }
                >
                  Download Report
                </button>
                <button
                  className={
                    'report-view__btn btn--secondary report-view__mobile-only'
                  }
                >
                  Close
                </button>
                <a href="" className={'report-view__no-mobile'}>
                  Close
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewReport;
