import React, { Component } from 'react';
import './Filter.scss';
import { FilterOption, SelectedFilters } from "../../pages/Dashboard/Dashboard.types";

interface FilterProps {
  close: () => void;
  save: (state: any) => void;
  selectedFilters: SelectedFilters;
  data: any;
}

interface FilterData {
  title: string,
  id: string,
  options: FilterOption[]
}

// Timeframe Filter Options.
export const timeFrameFilter: FilterData = {
  title: 'Timeframe',
  id: 'Timeframe',
  options: [
    {
      label: 'Current',
      value: 'current',
      selected: false
    },
    {
      label: 'Last 24 Hours',
      value: 'last24',
      selected: false
    },
    {
      label: 'Last Week',
      value: 'lastweek',
      selected: false
    },
    {
      label: 'Last Month',
      value: 'lastmonth',
      selected: false
    },
    {
      label: 'Last Quarter',
      value: 'lastquarter',
      selected: false
    },
    {
      label: 'Annual',
      value: 'annual',
      selected: false
    }
  ]
};

// Default state with nothing selected
const nothingOption: FilterOption = {
  label: "---",
  selected: true,
  value: "~NOTHING~"
};

interface FilterState {
  Region: FilterOption,
  Franchise: FilterOption,
  Timeframe: FilterOption
}

class Filter extends Component<FilterProps> {
  state: any;
  franchiseFilter: FilterData;
  regionFilter: FilterData;
  timeframeFilter: FilterData;

  constructor(props: FilterProps) {
    super(props);

    //TODO: Refactor
    this.franchiseFilter = this.props.data['Franchise'];
    this.regionFilter = this.props.data['Region'];
    this.timeframeFilter = timeFrameFilter;

    this.state = {
      Region: this.props.selectedFilters['Region'],
      Franchise: this.props.selectedFilters['Franchise'],
      Timeframe: this.props.selectedFilters['Timeframe']
    };
  }

  saveFilter = (e: any) => {
    e.preventDefault();
    this.props.save(this.state);
    this.props.close();
  };

  setFilter = (id: string, option: FilterOption) => {
    this.setState({
      [id]: this.state[id].value === option.value ? nothingOption : option
    });
  };

  closeFilter = (event: any) => {
    event.preventDefault();
    this.props.close();
  };

  createFilterOptions(filterList: any) {
    return  filterList.options.map((item: FilterOption) => {
      if (item.value !== '~NOTHING~') {
        return (
          <React.Fragment key={item.value + '_item'}>
            <div className={'grid__column-2 grid__column-m-2 '}>
              <div className={'filter__option ' + `${item.value === this.state[filterList.id].value ? 'filter__option--selected' : ''}`}
                   onClick={() => this.setFilter(filterList.id, item)}>
                {item.label}
              </div>
            </div>
          </React.Fragment>
        )}
      }
    )
  }

  render() {
    return (
      <>
        <div className={'filter filter__active'}>
          <div className={'filter__container grid'}>

            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <h1>Show data from...</h1>
              </div>
            </div>

            <div className={'grid__row'} >
              <div className={'grid__column-12 grid__column-m-4 filter__title'}>
                <div className={'title'}>Select An Area</div>
              </div>
            </div>

            <div className={'grid__row filter__select'}>
              <div className={'grid__column-2 grid__column-m-2 '}>
                <div className={`filter__option filter__option-divider filter__option--selected`}>
                  {this.franchiseFilter.options[0].label}
                </div>
              </div>
              {this.createFilterOptions(this.regionFilter)}
            </div>

            <div className={'grid__row'} >
              <div className={'grid__column-12 grid__column-m-4 filter__title'}>
                <div className={'title'}>Select A Timeframe</div>
              </div>
            </div>

            <div className={'grid__row filter__select'}>
              {this.createFilterOptions(this.timeframeFilter)}
            </div>

            <div className={'grid__row filter__save'}>
              <div className={'grid__column-2 grid__column-m-2'}>
                <button onClick={(e) => {this.saveFilter(e)}} className={'btn--primary'}>
                  Save and Update
                </button>
              </div>
              <div className={'grid__column-1 grid__column-m-2'}>
                <a className={'filter__close-filter'} href={'#'} onClick={this.closeFilter}>
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
