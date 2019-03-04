import React, { Component } from 'react';
import './ViewReport.scss';

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
    datesOpen: false,
    dataOpen: true,
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
    // console.log(this.initialState);
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
            <div
              id={key}
              className={'form-checkbox '}
              onClick={() => this.toggleChecked(name, key, !options[key])}
            >
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
            </div>
            <label htmlFor={key}>{key}</label>
          </div>
        );
      }
      return arr;
    };

    return (
      <div className={'grid report-view'}>
        <div className={'grid__row'}>
          <div className={'grid__column-12 grid__column-m-4'}>
            <header>
              <h3>Ops & Costs</h3>
              <p>Quarter 1</p>
              <p>January 1, 2018 - March 31, 2018</p>
              <div>
                <p>Modify Report</p>
                <p>Filter</p>
              </div>
            </header>
            <form className={'report-view__form'}>
              {/* <input type="reset" value="Clear All" /> */}
              <h4 onClick={this.clearForm}>Clear All</h4>
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
                {displayOptions(dataOptions, 'dataOptions')}
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
                {displayOptions(stationOptions, 'stationOptions')}
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
                {displayOptions(riderOptions, 'riderOptions')}
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
