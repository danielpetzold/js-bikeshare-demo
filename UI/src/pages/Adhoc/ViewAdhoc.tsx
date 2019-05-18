import React, { Component } from 'react';
import './ViewAdhoc.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
//import ReportFilter from '../../components/ReportFilter/ReportFilter';
//import { ReportFilterData, ReportFilterOption } from '../../components/ReportFilter/ReportFilter.types';
import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface ViewAdhocState {
  isFilterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportUri: string;
  currentAdhocView: any;
  currentFilters: any;
  //reportFilters: any[];
  //filters: ReportFilterData[] | null;
  //selectedFilters: any;
}


interface Props {
  location: any;
}

class ViewAdhoc extends Component<any, ViewAdhocState> {
  state: ViewAdhocState =  {
		isFilterOpen: false,
		exportModalOpen: false,
		isReportSelectOpen: false,
		actionsOpen: false,
		reportOptions: [],
		selectedReportName: '',
		selectedReportUri: '',
		currentAdhocView: null,
		currentFilters: null
		//reportFilters: [],
		//filters: [],
		//selectedFilters: {}
  };
  
  constructor(props: Props) {
	  super(props);
	  const search = props.location.search; // should be '?resource=/public/path'
	  const params: URLSearchParams = new URLSearchParams(search);
	  const uri: string | null = params.get('resource'); 
	  const name: string | null = params.get('name'); 
	  
	  this.state.selectedReportUri =  uri != null ? uri : '';
	  this.state.selectedReportName = name != null ? name : '';
  }

  async componentDidMount() {
    await this.getFilters();
    this.showReport();
  }

  changeReport = (params: any, error: any) => {
	if (!error && this.state.currentAdhocView != null) {
		this.state.currentAdhocView.params(params).run();
	}
  }
  
  async getFilters() {
    //this.setState({selectedFilters: {}});
    await visualizeHelper.getInputControl(
		this.state.selectedReportUri,
		'inputControl',
		{},
		{
			change: this.changeReport
		}
	)
      .then((success: any) => {
		console.log(success);
		var inputControls: any = success.inputControls;
		var filters: any = success.success;
        let reportFilters = filters.map((control: any) => {
          return {
            id: control.id,
            label: control.label,
            options: control.state.options,
            isOpen: false
          };
        });

		this.setState({ currentFilters: inputControls });
        // Set filters
        //this.setState({filters: reportFilters});

		/*
        // Set initial filter
        let filters: any = {};
        reportFilters.forEach((filter: ReportFilterData) => {
          filters[filter.id] = filter.options[1];
        });
        this.setState({selectedFilters: filters});
		*/
      });
  }

  showReport() {
    if (this.state.selectedReportUri) {

		/*
      let params: any = {};
      for (let filter in this.state.selectedFilters) {
        params[filter] = [this.state.selectedFilters[filter].value];
      }
	  */
      visualizeHelper.getAdHocView('report', this.state.selectedReportUri)
        .then((success: any) => {
          console.log('success', success);
			var adhocView: any = success.adhocView;
			var result: any = success.success;
			this.setState({ currentAdhocView: adhocView });
        });
    }
  }

  modifyReport = (e: any) => {
    e.preventDefault();
		this.props.history.push({
		  pathname: '/adhoc/edit',
		  search: `?resource=${this.state.selectedReportUri}`
		});
  };

  createReport = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/adhoc/new'
    });
  };

  toggleFilter = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };

/*
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
*/
  render() {
    const {
      isReportSelectOpen,
      reportOptions,
      selectedReportName
    } = this.state;

    return (
      <>
        <NavBar />
        <div className={'adhoc-container'}>
          <div className={'grid adhoc-view'}>
            <div className={'grid__row adhoc-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'adhoc-header__top'}>
                  <h3 className={'adhoc-header__title'}>{selectedReportName}</h3>
                </div>

                {/* Bottom Header Row */}
                <div className={'adhoc-header__bottom'}>
                  <div className={'adhoc-header__buttons'}>
                    <button className={'adhoc-view__btn--create btn--primary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.createReport}>
                      Create
                    </button>
                    <button className={'adhoc-view__btn--actions btn--secondary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.modifyReport}>
                      Modify / Export
                    </button>
                  </div>
                  <img src={filterIcon} alt="filter" onClick={this.toggleFilter}/>
                </div>
              </div>
            </div>

            {/* REPORT */}
            <div className={'grid__row'}>
              <div className={'grid__column-10 grid__column-m-4'}>
                <div id="report" className={'adhoc-view__table'}>
                  {/* report to be passed in */}
                </div>
              </div>
              <div className={'grid__column-2 grid__column-m-2'}>
                  <div id="inputControl" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ViewAdhoc;
