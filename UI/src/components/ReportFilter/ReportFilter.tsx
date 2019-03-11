import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectOption,
  clearFilters
} from '../../reducers/Reports/reports.actions';
import './ReportFilter.scss';

interface State {}

class ReportFilter extends Component<any, State> {
  state: any = {};

  componentDidMount() {
    // Creates an open state for each filter.
    let catState: any = {};
    this.props.filters.forEach((cat: any) => {
      catState[`${cat.altName}Open`] = false;
    });
    this.setState(catState);
  }

  toggleOpen = (e: any, open: boolean) => {
    // Toggles an individual filter.
    const { id }: any = e.target;
    this.setState({
      [id]: open
    } as Pick<State, keyof State>);
  };

  clearFilter = () => {
    this.props.clearFilters(this.props.filters);
    this.forceUpdate();
  };

  render() {
    const { filters, selectOption } = this.props;

    // Creates a select option for each filter option passed in from displayCategories.
    const displayOptions = (
      options: any,
      selected: string,
      index: number,
      open: string
    ) => {
      let optionsList = options.map((option: string, i: number) => {
        return (
          <div
            className={
              'report-filter__options ' +
              (selected === option && 'report-filter__option--active')
            }
            key={i}
            onClick={() => {
              selectOption({ option, index });
              this.setState({
                [open]: false
              });
            }}
          >
            {option}
          </div>
        );
      });
      return optionsList;
    };

    // Created a select for each filter type from props.
    const displayCategories = filters.map((cat: any, i: number) => {
      return (
        <div key={i}>
          <div
            className={'report-filter__option-title'}
            id={`${cat.altName}Open`}
            onClick={e => this.toggleOpen(e, !this.state[`${cat.altName}Open`])}
          >
            <div>
              <p className={'report-filter__option-title--filter'}>
                {cat.name}
              </p>
              <p>{cat.selected || `Select an option`}</p>
            </div>
            <i className={'report-filter__arrow icon-ic-arrow-down'} />
          </div>
          <hr />
          <div
            className={
              'report-filter__content ' +
              (!this.state[`${cat.altName}Open`]
                ? 'report-filter__content--hidden'
                : '')
            }
          >
            {displayOptions(cat.options, cat.selected, i, `${cat.altName}Open`)}
          </div>
        </div>
      );
    });

    return (
      <form className={'report-filter'}>
        <div className={'report-filter__title'}>
          <p>Filter</p>
          <h4 onClick={this.clearFilter}>Clear All</h4>
        </div>
        {displayCategories}
      </form>
    );
  }
}

export default connect(
  (state: any) => state.reports,
  { selectOption, clearFilters }
)(ReportFilter);
