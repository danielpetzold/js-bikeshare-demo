import React, { Component } from 'react';
import './ViewJasperReport.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
//import ReportFilter from '../../components/ReportFilter/ReportFilter';
//import { ReportFilterData, ReportFilterOption } from '../../components/ReportFilter/ReportFilter.types';
import JasperReportsService from "../../services/JasperReportsService";

import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface ViewJasperReportState {
  loading: boolean;
  filtersAttached: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportUri: string;
  currentJasperReport: any;
  currentFilters: any;
  repositoryResource: any;
  //reportFilters: any[];
  //filters: ReportFilterData[] | null;
  //selectedFilters: any;
}


interface Props {
  location: any;
}

class ViewJasperReport extends Component<any, ViewJasperReportState> {
  state: ViewJasperReportState =  {
	    loading: true,
		filtersAttached: false,
		exportModalOpen: false,
		isReportSelectOpen: false,
		actionsOpen: false,
		reportOptions: [],
		selectedReportName: '',
		selectedReportUri: '',
		currentJasperReport: null,
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
	  console.log('constructor uri ' + uri);
  }

  async getResource(uri: string | null) {
	  let foundResource: any = null;
  	  if (uri != null) {
		  foundResource = await JasperReportsService.get('/rest_v2/resources' + uri + '?expanded=true', {});
		  console.log(foundResource);
		  //this.state.repositoryResource = foundResource;
	  }
	  return foundResource;
  }
  
  async componentDidMount() {
	let foundResource: any = await this.getResource(this.state.selectedReportUri);

	let inputControlsArray: any = foundResource.data.inputControls;
	let filtersAttached = inputControlsArray != null && inputControlsArray.length > 0;
	console.log('filtersAttached: ' + filtersAttached);

	this.setState({
		repositoryResource: foundResource,
		filtersAttached: filtersAttached,
		loading: false
	});
	
	await this.getFilters();
    this.showReport();
  }

  changeReport = (params: any, error: any) => {
	if (!error && this.state.currentJasperReport != null) {
		this.state.currentJasperReport.params(params).run();
	}
  }
  
  async getFilters() {
	if (!this.state.filtersAttached) {
		console.log('no filters');
	}
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
		console.log('input control success');
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
		console.log('inputControls error:', err.message);
	});
  }

  showReport() {
    if (this.state.selectedReportUri) {
      visualizeHelper.getReport('report', this.state.selectedReportUri)
        .then((success: any) => {
          console.log('report success', success);
			var report: any = success.report;
			var result: any = success.success;
			this.setState({ currentJasperReport: report });
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
	  currentFilters,
	  filtersAttached,
	  loading
    } = this.state;
	
	let reportContainer = [];
	
	console.log('rendering filtersAttached ' + filtersAttached);
	
	if (loading || filtersAttached) {
		reportContainer.push(
		  <div key='leftcol' className={'grid__column-10 grid__column-m-4'}>
			<div id="report" className={'jsreport-view__table'}/>
		  </div>);
		reportContainer.push(
		  <div key='rightcol' className={'grid__column-2 grid__column-m-2'}>
			  <div id="inputControl" />
		  </div>);
	} else {
		reportContainer.push(
		  <div key='fullcol' className={'grid__column-12 grid__column-m-4'}>
			<div id="report" className={'jsreport-view__table'}/>
		  </div>);
	}

    return (
      <>
        <NavBar />
        <div className={'jsreport-container'}>
          <div className={'grid jsreport-view'}>
            <div className={'grid__row jsreport-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'jsreport-header__top'}>
                  <h3 className={'jsreport-header__title'}>{selectedReportName}</h3>
                </div>

                {/* Bottom Header Row */}
                <div className={'jsreport-header__bottom'}>
                  <div className={'jsreport-header__buttons'}>
                    <button className={'jsreport-view__btn--create btn--primary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.createReport}>
                      Create
                    </button>
                    <button className={'jsreport-view__btn--actions btn--secondary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.modifyReport}>
                      Modify / Export
                    </button>
                  </div>
                  <img src={filterIcon} alt="filter"/>
                </div>
              </div>
            </div>

            {/* REPORT */}
            <div className={'grid__row'}>
			  {reportContainer}
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default ViewJasperReport;
