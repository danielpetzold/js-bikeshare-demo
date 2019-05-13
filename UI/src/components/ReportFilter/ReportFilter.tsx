import React, { Component, createRef } from "react";
import './ReportFilter.scss';
import ReportFilterCategory from "./ReportFilterCategory";
import { ReportFilterData, ReportFilterOption } from "../../pages/ViewReport/ViewReport.types";

interface ReportFilterState {
  selectedFilters: any[];
}

interface ReportFilterProps {
  data: ReportFilterData[] | null;
  toggleFilter: (e: any) => void
  setFilter: (filterId: string, option: ReportFilterOption) => void;
  reset: () => void;
  selectedFilters: any;
}

interface SelectedFilters {
  filterId: string;
  selectedOption: ReportFilterOption;
}

class ReportFilter extends Component<ReportFilterProps, ReportFilterState> {
  private myRef: any = createRef();

  state: ReportFilterState = {
    selectedFilters: []
  };

  componentDidMount() {
    const selectedFilters: SelectedFilters[] = this.props.data ? this.props.data.map((filter) => {
      return {
        filterId: filter.id,
        selectedOption: filter.options[0],
        toggled: false
      }
    }): [];
    this.setState({selectedFilters: selectedFilters});

    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  clearFilter = () => {
    this.props.reset();
  };

  // Closes dropdown if clicked outside of element
  handleClick = (e: any) => {
    if (this.myRef.contains(e.target)) {
      return;
    }
    this.props.toggleFilter(e);
  };

  render() {
    return (
      <div className={'report-filter'} ref={node => this.myRef = node}>
        <div className={'report-filter__title'}>
          <p>Filter</p>
          <h4 onClick={this.clearFilter}>Clear All</h4>
        </div>
        {
          this.props.data ? this.props.data.map((filter: ReportFilterData, i: number) => {
            return (
              <div className="report-filter__container" key={i}>
                <ReportFilterCategory data={filter}
                                      setFilter={this.props.setFilter}
                                      filterId={filter.id}
                                      selectedFilter={this.props.selectedFilters[filter.id]}/>
              </div>
            )
        }) : null}
      </div>
    );
  }
}

export default ReportFilter;
