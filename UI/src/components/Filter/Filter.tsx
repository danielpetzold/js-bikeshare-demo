import React, { Component } from 'react';
import './Filter.scss';
import { Dispatch } from 'redux';
import { toggleFilter } from '../../actions/dashboard.actions';
import { connect } from 'react-redux';

interface FilterProps {
  toggleFilter: () => void;
}

class Filter extends Component<FilterProps> {
  handleClick = (event: any) => {
    event.preventDefault();
    this.props.toggleFilter();
  };

  render() {
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
            <div className={'grid__row filter__select'}>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option filter__option--selected '}>
                  San Francisco Bay Area
                </div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>San Francisco Bay Area</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>San Francisco Bay Area</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>San Francisco Bay Area</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>San Francisco Bay Area</div>
              </div>
            </div>
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4 filter__title'}>
                <div className={'title'}>Select a Timeframe</div>
              </div>
            </div>
            <div className={'grid__row'}>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option filter__option--selected '}>
                  Annual
                </div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>Last Quarter</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>Last Month</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>Last Week</div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                <div className={'filter__option'}>Last 24 hours</div>
              </div>
            </div>
            <div className={'grid__row filter__save'}>
              <div className={'grid__column-2 grid__column-m-2'}>
                <button className={'btn--primary'}>Save and Update</button>
              </div>
              <div className={'grid__column-1 grid__column-m-2'}>
                <a href={'#'} onClick={this.handleClick}>
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
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFilter: () => dispatch(toggleFilter())
});

export default connect(
  null,
  mapDispatchToProps
)(Filter);
