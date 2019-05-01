import React, { Component } from 'react';
import './ReportFilter.scss';
import { ReportFilterData, ReportFilterOption } from "../../pages/ViewReport/ViewReport.types";

interface FilterCategoryState {
  isOpen: boolean;
}

interface ReportFilterCategoryProps {
  data: ReportFilterData;
  setFilter: (filterId: string, option: ReportFilterOption) => void;
  filterId: string;
  selectedFilter: ReportFilterOption;
}

class ReportFilterCategory extends Component<ReportFilterCategoryProps, FilterCategoryState>{
  state: FilterCategoryState = {
    isOpen: false,
  };

  toggleCategory = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  setFilter(filterId: string, option: any) {
    this.props.setFilter(filterId, option);
  }

  render() {
    const categoryStyle = ['filter-category__container'];
    const arrowStyle = ['filter-category__arrow icon-ic-arrow-down'];
    if (this.state.isOpen) {
      categoryStyle.push('filter-category__container--open');
      arrowStyle.push('filter-category__arrow--active');
    }

    return (
      <div className='filter-category'>
        <div className={'filter-category__label'} onClick={this.toggleCategory}>
          {this.props.data.label}
          <i className={arrowStyle.join(' ')}/>
        </div>
        <div className={categoryStyle.join(' ')} >
          <ul className='filter-category__list'>
            {
              this.props.data.options.map((option: ReportFilterOption, i: number) => {
                const optionStyle = ['filter-category__option'];
                this.props.selectedFilter && (option.value === this.props.selectedFilter.value) ? optionStyle.push('filter-category__option--active') : '';
                return (
                  <li key={i} className={optionStyle.join(' ')} onClick={() => this.setFilter(this.props.filterId, option)}>
                    {option.label}
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ReportFilterCategory;