import React, { Component } from 'react';
import './Filter.scss';
import { FilterData } from '../../pages/Dashboard/Dashboard';

interface FilterProps {
  close: () => void;
  save: (region: FilterData, timeframe: FilterData) => void;
  data: any[];
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

  getFilterOptions = (item: any) => {
    return (
      <div className={'grid__column-2 grid__column-m-2 '} key={item.value}>
        <div
          className={
            'filter__option ' +
            `${
              item.value === this.state.regionFilter.id
                ? 'filter__option--selected'
                : ''
              }`
          }
          onClick={() => this.setState({ regionFilter: item })}
        >
          {item.label}
        </div>
      </div>
    )
  };

  render() {
    const filterLists = this.props.data.forEach((filterList: any) => {
      return (
        <>
          <div className={'grid__row'}>
            <div className={'grid__column-12 grid__column-m-4 filter__title'}>
              <div className={'title'}>Select a ${filterList.label}</div>
            </div>
          </div>
          <div className={'grid__row filter__select'}>{this.getFilterOptions(filterList.options)}</div>
        </>
      )
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
            {this.props.data.map((filterList: any) => {
              return (
                <div>
                  {filterList.label}
                </div>
              )
            }
          )}
            {/*{this.props.data ? this.props.data.forEach((filterList: any) =>*/}
              {/*<>*/}
                {/*<div className={'grid__row'}>*/}
                  {/*<div className={'grid__column-12 grid__column-m-4 filter__title'}>*/}
                    {/*<div className={'title'}>Select a ${filterList.label}</div>*/}
                    {/*{console.log(filterList)};*/}
                  {/*</div>*/}
                {/*</div>*/}
                {/*<div className={'grid__row filter__select'}>*/}
                  {/*{filterList.options.forEach((item: any) =>*/}
                    {/*<div className={'grid__column-2 grid__column-m-2 '} key={item.value}>*/}
                      {/*<div className={'filter__option ' + `${item.value === this.state.regionFilter.id ? 'filter__option--selected' : ''}`}*/}
                        {/*onClick={() => this.setState({ regionFilter: item })}>*/}
                        {/*{item.label}*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*)}*/}
                {/*</div>*/}
              {/*</>*/}
            {/*) : ''}*/}
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
