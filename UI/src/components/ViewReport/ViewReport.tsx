import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilters } from '../../store/Reports/reports.actions';
import './ViewReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../NavBar/NavBar';
import ExportModal from '../ExportModal/ExportModal';
import ReportFilter from '../ReportFilter/ReportFilter';
import Dropdown from '../Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface ReportsState {
  filterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  reportsOpen: boolean;
  reportOptions: ReportOption[] | void;
  selectedReport: string;
  mounted: boolean;
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

interface ReportOption {
  name: string;
  value: string;
}

class ViewReport extends Component<any, ReportsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mounted: false,
      filterOpen: false,
      exportModalOpen: false,
      reportsOpen: false,
      actionsOpen: false,
      reportOptions: [],
      selectedReport: 'Test Value'
    };
  }

  componentWillMount() {
    this.getReports();
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.props.setFilters([
      {
        name: 'Region',
        altName: 'region',
        selected: '',
        options: [
          'Alameda County',
          'Contra Costa County',
          'Downtown San Francisco',
          'San Francisco Bay Area',
          'Santa Clara County'
        ]
      },
      {
        name: 'Station',
        altName: 'station',
        selected: '',
        options: [
          'Brooklyn Bridge',
          '1028 Garfield Ave',
          '83 Barbara St',
          '405 Anchor St'
        ]
      },
      {
        name: 'Franchise',
        altName: 'franchise',
        selected: '',
        options: [
          'Van Ness',
          'Geary',
          'Hyde',
          'Haight and Ashbury',
          'Polk Street'
        ]
      },
      {
        name: 'On Site Kiosk',
        altName: 'osk',
        selected: '',
        options: ['true', 'false']
      }
    ]);
  }

  getReports() {
    visualizeHelper
      .getReportList('/public/Bikeshare_demo/Reports/AdHoc_Reports', {})
      .then((reports: any) => {
        let reportMap = reports.map((report: Report) => {
          return {
            name: report.label,
            value: report.uri
          };
        });
        this.setState({ reportOptions: reportMap });
      });
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
      reportsOpen: !this.state.reportsOpen
    });
  };

  setReport = (option: string) => {
    this.setState({
      selectedReport: option
    });
  };

  render() {
    const {
      filterOpen,
      exportModalOpen,
      actionsOpen,
      reportsOpen,
      mounted,
      reportOptions,
      selectedReport
    } = this.state;
    return (
      <>
        <NavBar />
        <div className={'report-container'}>
          <div className={'grid report-view'}>
            {/* HEADER */}
            <div className={'grid__row '}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <header className={'report-header'}>
                  {/* Top Header Row */}
                  <div className={'report-header__top'}>
                    <h3 className={'report-header__title'}>Reports</h3>
                    <div
                      className={'header-select'}
                      onClick={this.toggleReports}
                    >
                      <h5>{selectedReport}</h5>
                      <i className={'icon-ic-unfold-more'} />
                    </div>
                    {/*<div className={'header-select__dropdown'}>*/}
                    {/*{reportsOpen && (*/}
                    {/*<Dropdown*/}
                    {/*setSelected={this.setReport}*/}
                    {/*toggleDropdown={this.toggleReports}*/}
                    {/*options={reportOptions}*/}
                    {/*dropdownWidth="195px"*/}
                    {/*/>*/}
                    {/*)}*/}
                    {/*</div>*/}
                  </div>
                  {/* Bottom Header Row */}
                  <div className={'report-header__bottom'}>
                    <div className={'report-header__buttons'}>
                      <button
                        className={'report-view__btn--create btn--primary'}
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
                          {/* replace selected report with the report url */}
                          <Link to={`/editReport/${selectedReport}`}>
                            <div className={'report-view__action-options'}>
                              Modify
                            </div>
                          </Link>
                          <div
                            className={'report-view__action-options'}
                            onClick={this.toggleExportModal}
                          >
                            Export
                          </div>
                          <div
                            className={'report-view__action-options'}
                            onClick={() =>
                              setTimeout(() => window.print(), 100)
                            }
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
                  {/* FILTER */}
                  {mounted && (
                    <div
                      className={
                        filterOpen
                          ? 'report-view__show-filter'
                          : 'report-view__hide-filter'
                      }
                    >
                      <ReportFilter />
                    </div>
                  )}
                </header>
              </div>
            </div>

            {/* REPORT */}
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'report-view__table'}>
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
  { setFilters }
)(ViewReport);
