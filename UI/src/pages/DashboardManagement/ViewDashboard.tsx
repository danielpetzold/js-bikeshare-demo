import React, { Component } from 'react';
import './ViewDashboard.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
import JasperReportsService from "../../services/JasperReportsService";

import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface ViewDashboardState {
  isFilterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportUri: string;
  currentDashboard: any;
  currentFilters: any;
  repositoryResource: any;
  //reportFilters: any[];
  //filters: ReportFilterData[] | null;
  //selectedFilters: any;
}


interface Props {
  location: any;
}

class ViewDashboard extends Component<any, ViewDashboardState> {
  state: ViewDashboardState =  {
		isFilterOpen: false,
		exportModalOpen: false,
		isReportSelectOpen: false,
		actionsOpen: false,
		reportOptions: [],
		selectedReportName: '',
		selectedReportUri: '',
		currentDashboard: null,
		currentFilters: null,
		repositoryResource: null
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
	  // to try and find dashboard input controls
	  // not implemented, since I can't find them in the resource
	  //this.state.repositoryResource = this.getResource(uri);
  }

  async getResource(uri: string | null) {
	  let foundResource: any = null;
  	  if (uri != null) {
		  const restURL = '/rest_v2/resources' + uri + '?expanded=true';
		  //console.log(restURL);
		  foundResource = await JasperReportsService.get(restURL, {});
		  console.log(foundResource);
		  //this.state.repositoryResource = foundResource;
	  }
	  return foundResource;
  }
  
  async componentDidMount() {
    // not used, since can't determine dashboard filters
    //await this.getFilters();

    this.showReport();
  }

  // not used, since can't determine dashboard filters
  changeReport = (params: any, error: any) => {
	if (!error && this.state.currentDashboard != null) {
		this.state.currentDashboard.params(params).run();
	}
  }
  
  // not used, since can't determine dashboard filters
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
		//console.log(success);
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
    })
	.catch((err) => {
		console.log('I get called:', err.message);
	});
  }

  showReport() {
    if (this.state.selectedReportUri) {
      visualizeHelper.getDashboard(this.state.selectedReportUri, 'report')
        .then((success: any) => {
			//console.log('success', success);
			var dashboard: any = success.dashboard;
			var result: any = success.success;
			this.setState({ currentDashboard: dashboard });
        });
    }
  }

  modifyReport = (e: any) => {
    e.preventDefault();
		this.props.history.push({
		  pathname: '/dashboard/edit',
		  search: `?resource=${this.state.selectedReportUri}`
		});
  };

  createReport = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/dashboard/new'
    });
  };

  render() {
    const {
      isReportSelectOpen,
      reportOptions,
      selectedReportName,
	  currentFilters
    } = this.state;

	let dashboardContainer = [];
	
	if (currentFilters != null) {
		dashboardContainer.push(
		  <div key='leftcol' className={'grid__column-10 grid__column-m-4'}>
			<div id="report" className={'jsdashboard-view__table'}/>
		  </div>);
		dashboardContainer.push(
		  <div key='rightcol' className={'grid__column-2 grid__column-m-2'}>
			  <div id="inputControl" />
		  </div>);
	} else {
		dashboardContainer.push(
		  <div key='fullcol' className={'grid__column-12 grid__column-m-4'}>
			<div id="report" className={'jsdashboard-view__table'}/>
		  </div>);
	}

    return (
      <>
        <NavBar />
        <div className={'jsdashboard-container'}>
          <div className={'grid jsdashboard-view'}>
            <div className={'grid__row jsdashboard-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'jsdashboard-header__top'}>
                  <h3 className={'jsdashboard-header__title'}>{selectedReportName}</h3>
                </div>

                {/* Bottom Header Row */}
                <div className={'jsdashboard-header__bottom'}>
                  <div className={'jsdashboard-header__buttons'}>
                    <button className={'jsdashboard-view__btn--create btn--primary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.createReport}>
                      Create
                    </button>
                    <button className={'jsdashboard-view__btn--actions btn--secondary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.modifyReport}>
                      Modify / Export
                    </button>
                  </div>
                  <img src={filterIcon} alt="filter" 
					 style={{display: (this.state.currentFilters && this.state.currentFilters.length) ? 'block' : 'none' }}/>
                </div>
              </div>
            </div>

            {/* REPORT */}
            <div className={'grid__row'}>
			  {dashboardContainer}
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default ViewDashboard;
