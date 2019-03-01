import React, { Component } from 'react';
import './Filter.scss';
import { FilterData } from '../Dashboard/Dashboard';

interface FilterProps {
  close: () => void;
  save: (region: FilterData, timeframe: FilterData) => void;
  data: {
    testRegions: FilterData[];
    testTimeframe: FilterData[];
  };
  region: {
    name: string;
    id: string;
  };
  timeframe: {
    name: string;
    id: string;
  };
}

interface State {
  regionFilter: FilterData;
  timeframeFilter: FilterData;
}

class Filter extends Component<FilterProps, State> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      regionFilter: props.region,
      timeframeFilter: props.timeframe
    };
  }

  saveFilter = () => {
    this.props.save(this.state.regionFilter, this.state.timeframeFilter);
    this.props.close();
  };

  closeFilter = (event: any) => {
    event.preventDefault();
    this.props.close();
  };

  render() {
    const regionList = this.props.data.testRegions.map(item => {
      return (
        <div className={'grid__column-2 grid__column-m-2 '} key={item.id}>
          <div
            className={
              'filter__option ' +
              `${
                item.id === this.state.regionFilter.id
                  ? 'filter__option--selected'
                  : ''
              }`
            }
            onClick={() => this.setState({ regionFilter: item })}
          >
            {item.name}
          </div>
        </div>
      );
    });

    const timeFrameList = this.props.data.testTimeframe.map(item => {
      return (
        <div className={'grid__column-2 grid__column-m-2 '} key={item.id}>
          <div
            className={
              'filter__option ' +
              `${
                item.id === this.state.timeframeFilter.id
                  ? 'filter__option--selected'
                  : ''
              }`
            }
            onClick={() => this.setState({ timeframeFilter: item })}
          >
            {item.name}
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className={'filter filter__active'}>
          <div className={'filter__container grid'}>
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <h1>Show data from...</h1>
              </div>
            </div>
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4 filter__title'}>
                <div className={'title'}>Select a region</div>
              </div>
            </div>
            <div className={'grid__row filter__select'}>{regionList}</div>
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4 filter__title'}>
                <div className={'title'}>Select a Timeframe</div>
              </div>
            </div>
            <div className={'grid__row'}>{timeFrameList}</div>
            <div className={'grid__row filter__save'}>
              <div className={'grid__column-2 grid__column-m-2'}>
                <button onClick={this.saveFilter} className={'btn--primary'}>
                  Save and Update
                </button>
              </div>
              <div className={'grid__column-1 grid__column-m-2'}>
                <a href={'#'} onClick={this.closeFilter}>
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={'filter__shadow filter__active'} />
      </div>
    );
  }
}

export default Filter;
