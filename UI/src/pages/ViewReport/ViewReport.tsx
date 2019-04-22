import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFilters, setFilters } from '../../store/Reports/reports.actions';
import './ViewReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
import ExportModal from '../../components/ExportModal/ExportModal';
import ReportFilter from '../../components/ReportFilter/ReportFilter';
import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface ReportsState {
  filterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportValue: string;
  selectedReportId: string;
  mounted: boolean;
  reportFilters: any[];
}

interface Report {
  creationDate: string;
  description: string;
  label: string;
  permissionMask: number;
  resourceType: string;
  updateDate: string;
  uri: string;
  version: string;
}

class ViewReport extends Component<any, ReportsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mounted: false,
      filterOpen: false,
      exportModalOpen: false,
      isReportSelectOpen: false,
      actionsOpen: false,
      reportOptions: [],
      selectedReportName: '',
      selectedReportValue: '',
      selectedReportId: '',
      reportFilters: []
    };
  }

  componentDidMount() {
    this.getReports();
    this.getFilters();
    this.setState({ mounted: true });
  }

  getReports() {
    visualizeHelper
      .getReportList('/public/Bikeshare_demo/Ad_hoc/App_Report_List', {})
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

  getFilters() {
    if (this.state.selectedReportValue) {
      visualizeHelper
        .getInputControl('inputControl', this.state.selectedReportValue)
        .then((inputControl: any) => {
          let reportFilters = inputControl.map((control: any) => {
            return {
              altName: control.id,
              name: control.label,
              selected: '',
              options: control.state.options
            };
          });
          this.props.setFilters(reportFilters);
        });
    }
  }

  showReport() {
    if (this.state.selectedReportValue) {
      let params: any = {};
      this.props.filters.forEach((filter: any) => {
        params[filter.altName] = [filter.selected.value];
      });
      visualizeHelper
        .getAdHocView('report', this.state.selectedReportValue, params)
        .then((success: any) => {
          console.log('success', success);
        });
    }
  }

  toggleExportModal = () => {
    this.setState({
      exportModalOpen: !this.state.exportModalOpen
    });
  };

  toggleActions = () => {
    this.setState({
      actionsOpen: !this.state.actionsOpen
    });
  };

  toggleReports = () => {
    this.setState({
      isReportSelectOpen: !this.state.isReportSelectOpen
    });
  };

  setReport = (option: Option) => {
    this.setState(
      {
        selectedReportName: option.name,
        selectedReportValue: option.value,
        selectedReportId: option.id
      },
      () => {
        this.showReport();
        this.getFilters();
        this.props.clearFilters(this.props.filters);
      }
    );
  };

  reportUpdated = () => {
    this.showReport();
  };

  modifyReport = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/reports/edit/${this.state.selectedReportId}`
    });
  };

  render() {
    const {
      filterOpen,
      exportModalOpen,
      actionsOpen,
      isReportSelectOpen,
      mounted,
      reportOptions,
      selectedReportName,
      selectedReportValue
    } = this.state;

    return (
      <>
        <NavBar />
        {/* <button onClick={this.testFunc}>test</button> */}
        <div className={'report-container'}>
          <div className={'grid report-view'}>
            <div className={'grid__row report-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'report-header__top'}>
                  <h3 className={'report-header__title'}>Reports</h3>
                  <div className={'header-select'} onClick={this.toggleReports}>
                    <h5>{selectedReportName}</h5>
                    <i className={'icon-ic-unfold-more'} />
                  </div>
                  <div className={'header-select__dropdown'}>
                    {isReportSelectOpen && (
                      <Dropdown
                        setSelected={this.setReport}
                        toggleDropdown={this.toggleReports}
                        options={reportOptions}
                        dropdownWidth="100%"
                      />
                    )}
                  </div>
                </div>

                {/* Bottom Header Row */}
                <div className={'report-header__bottom'}>
                  <div className={'report-header__buttons'}>
                    <button
                      className={'report-view__btn--create btn--primary'}
                      onClick={this.modifyReport}
                    >
                      Create Report
                    </button>
                    <a
                      className={'report-view__btn--actions btn--secondary'}
                      onClick={this.toggleActions}
                    >
                      <p>Modify</p>
                      <i
                        className={'report-view__actions icon-ic-arrow-down'}
                      />
                    </a>
                    {actionsOpen && (
                      <div
                        className={'report-view__actions-dropdown'}
                        onClick={this.toggleActions}
                      >
                        {/* replace empty string with the report url */}
                        <a href="#" onClick={this.modifyReport}>
                          <div className={'report-view__action-options'}>
                            Modify
                          </div>
                        </a>

                        <div
                          className={'report-view__action-options'}
                          onClick={this.toggleExportModal}
                        >
                          Export
                        </div>
                        <div
                          className={'report-view__action-options'}
                          onClick={() => setTimeout(() => window.print(), 100)}
                        >
                          Print
                        </div>
                      </div>
                    )}
                  </div>
                  <img
                    src={filterIcon}
                    alt="filter"
                    onClick={() => this.setState({ filterOpen: !filterOpen })}
                  />
                </div>

                {mounted && (
                  <div
                    className={
                      filterOpen
                        ? 'report-view__show-filter'
                        : 'report-view__hide-filter'
                    }
                  >
                    <ReportFilter filterUpdated={this.reportUpdated} />
                  </div>
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
          {exportModalOpen && (
            <ExportModal closeModal={this.toggleExportModal} />
          )}
        </div>
      </>
    );
  }
}

export default connect(
  (state: any) => state.reports,
  { setFilters, clearFilters }
)(ViewReport);
