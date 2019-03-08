import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilters } from '../../reducers/Reports/reports.actions';
import './ViewReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../NavBar/NavBar';
import ExportModal from '../ExportModal/ExportModal';
import ReportFilter from '../ReportFilter/ReportFilter';
import Dropdown from '../Dropdown/Dropdown';

interface State {
  filterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  reportsOpen: boolean;
  reportOptions: string[];
  selectedReport: string;
  mounted: boolean;
}

class ViewReport extends Component<any, State> {
  state = {
    mounted: false,
    filterOpen: false,
    exportModalOpen: false,
    reportsOpen: false,
    actionsOpen: false,
    reportOptions: [
      'Station Report',
      'Rider Utilization',
      'Driver Efficiency',
      'Bike Inventory',
      'Trip Report'
    ],
    selectedReport: 'Station Report'
  };

  componentDidMount() {
    this.setState({ mounted: true });
    this.props.setFilters([
      {
        name: 'Region',
        altName: 'region',
        selected: '',
        options: ['1', '2', '3']
      },
      {
        name: 'Station',
        altName: 'station',
        selected: '',
        options: ['4', '5', '6']
      },
      {
        name: 'Franchise',
        altName: 'franchise',
        selected: '',
        options: ['7', '8', '9']
      },
      {
        name: 'On Site Kiosk',
        altName: 'osk',
        selected: '',
        options: ['10', '11', '12']
      }
    ]);
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
        <div className={'grid'}>
          <div className={'grid__row'}>
            <div className={'grid__column-12 grid__column-m-4'}>
              <div className={'report-view'}>
                <div className={'report-view__header-wrap'}>
                  {/* HEADER */}
                  <header className={'report-view__header'}>
                    {/* Top Header Row */}
                    <div className={'report-view__header__top'}>
                      <h3>Reports</h3>
                      <div
                        className={'report-view__header__select'}
                        onClick={this.toggleReports}
                      >
                        <h5>{selectedReport}</h5>
                        <div className={'report-view__header__select-arrows'}>
                          <i
                            className={
                              'icon-ic-arrow-down export-modal__custom-select__arrow-flip'
                            }
                          />
                          <i className={'icon-ic-arrow-down'} />
                        </div>
                      </div>
                      <div className={'report-view__header__dropdown'}>
                        {reportsOpen && (
                          <Dropdown
                            setSelected={this.setReport}
                            toggleDropdown={this.toggleReports}
                            options={reportOptions}
                            dropdownWidth="195px"
                          />
                        )}
                      </div>
                    </div>
                    {/* Bottom Header Row */}
                    <div className={'report-view__header__links'}>
                      <div className={'report-view__header__buttons'}>
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
                            className={
                              'report-view__actions icon-ic-arrow-down'
                            }
                          />
                        </a>
                        {actionsOpen && (
                          <div
                            className={'report-view__actions-dropdown'}
                            onClick={this.toggleActions}
                          >
                            <a href="">
                              <div>Modify</div>
                            </a>
                            <div onClick={this.toggleExportModal}>Export</div>
                            <div
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
                        onClick={() =>
                          this.setState({ filterOpen: !filterOpen })
                        }
                      />
                    </div>
                  </header>
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
                </div>
                {/* REPORT */}
                <div className={'report-view__table'}>
                  {/* report to be passed in */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {exportModalOpen && <ExportModal closeModal={this.toggleExportModal} />}
      </>
    );
  }
}

export default connect(
  (state: any) => state.reports,
  { setFilters }
)(ViewReport);
