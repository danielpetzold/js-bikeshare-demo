import React, { Component } from 'react';
import './ViewReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { Report, ReportFilterData, ReportFilterOption } from "./ViewReport.types";

interface ReportsState {
  isFilterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportValue: string;
  selectedReportId: string;
  reportFilters: any[];
  filters: ReportFilterData[] | null;
  selectedFilters: any;
}

class ViewReport extends Component<any, ReportsState> {

  state: ReportsState =  {
    isFilterOpen: false,
    exportModalOpen: false,
    isReportSelectOpen: false,
    actionsOpen: false,
    reportOptions: [],
    selectedReportName: '',
    selectedReportValue: '',
    selectedReportId: '',
    reportFilters: [],
    filters: [],
    selectedFilters: {}
  };

  async componentDidMount() {
    await this.getReports();
    await this.getFilters();
    this.showReport();
  }

  async getReports() {
    await visualizeHelper.getReportList('/public/Bikeshare_demo/Ad_hoc/App_Report_List', {})
      .then((reports: any) => {

        let reportMap = reports.map((report: Report) => {
          return {
            name: report.label,
            value: report.uri,
            id: report.uri.split('/').pop()
          };
        });

        this.setState({ reportOptions: reportMap });

        // If no report is selected, load the first report in the list
        if (!this.state.selectedReportValue) {
          this.setReport(this.state.reportOptions[0]);
        }
      });
  }

  async getFilters() {
    this.setState({selectedFilters: {}});
    await visualizeHelper.getInputControl('inputControl', this.state.selectedReportValue)
      .then((inputControl: any) => {
        let reportFilters = inputControl.map((control: any) => {
          return {
            id: control.id,
            label: control.label,
            options: control.state.options,
            isOpen: false
          };
        });

        // Set filters
        this.setState({filters: reportFilters});

        // Set initial filter
        let filters: any = {};
        reportFilters.forEach((filter: ReportFilterData) => {
          filters[filter.id] = filter.options[1];
        });
        this.setState({selectedFilters: filters});
      });
  }

  showReport() {
    if (this.state.selectedReportValue) {

      let params: any = {};
      for (let filter in this.state.selectedFilters) {
        params[filter] = [this.state.selectedFilters[filter].value];
      }
      visualizeHelper.getAdHocView('report', this.state.selectedReportValue, params)
        .then((success: any) => {
          console.log('success', success);
        });
    }
  }

  toggleReportsDropdown = () => {
    this.setState({
      isReportSelectOpen: !this.state.isReportSelectOpen
    });
  };

  setReport = (option: Option) => {
    this.setState({
        selectedReportName: option.name,
        selectedReportValue: option.value,
        selectedReportId: option.id
      },
      async () => {
        await this.getFilters();
        await this.showReport();
      }
    );
  };

  modifyReport = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/reports/edit/${this.state.selectedReportId}`
    });
  };

  toggleFilter = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };

  setFilter = (filterId: string, option: ReportFilterOption) => {
    let newFilters: any = Object.assign({}, this.state.selectedFilters);
    newFilters[filterId] = option;
    this.setState({selectedFilters: newFilters}, () => this.showReport());

  };

  resetFilters = () => {
    if (this.state.filters) {
      let newState = Object.assign({}, this.state.selectedFilters);
      this.state.filters.forEach((filter: any) => {
        newState[filter.id] = filter.options[1];
      });
      this.setState({selectedFilters: newState}, () => this.showReport());
    }
  };

  render() {
    const {
      isReportSelectOpen,
      reportOptions,
      selectedReportName
    } = this.state;

    return (
      <>
        <NavBar />
        <div className={'report-container'}>
          <div className={'grid report-view'}>
            <div className={'grid__row report-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'report-header__top'}>
                  <h3 className={'report-header__title'}>Reports</h3>
                  <div className={'header-select'} onClick={this.toggleReportsDropdown}>
                    <h5>{selectedReportName}</h5>
                    <i className={'icon-ic-unfold-more'} />
                  </div>
                  <div className={'header-select__dropdown'}>
                    {isReportSelectOpen && (
                      <Dropdown
                        setSelected={this.setReport}
                        toggleDropdown={this.toggleReportsDropdown}
                        options={reportOptions}
                        dropdownWidth="100%"
                      />
                    )}
                  </div>
                </div>

                {/* Bottom Header Row */}
                <div className={'report-header__bottom'}>
                  <div className={'report-header__buttons'}>
                    <button className={'report-view__btn--create btn--primary'} onClick={this.modifyReport}>
                      Create New
                    </button>
                    <button className={'report-view__btn--actions btn--secondary'} onClick={this.modifyReport}>
                      Modify / Export
                    </button>
                  </div>
                  <img src={filterIcon} alt="filter" onClick={this.toggleFilter}/>
                </div>
                {(
                    this.state.filters && this.state.filters.length && this.state.isFilterOpen ?
                    <ReportFilter
                                  data={this.state.filters}
                                  selectedFilters={this.state.selectedFilters}
                                  toggleFilter={this.toggleFilter}
                                  reset={this.resetFilters}
                                  setFilter={this.setFilter}/> : null
                )}
              </div>
            </div>

            {/* REPORT */}
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div id="inputControl" />
                <div id="report" className={'report-view__table'}>
                  {/* report to be passed in */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewReport;
