import React, { Component } from 'react';
import './EmptyPage.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
import JasperReportsService from "../../services/JasperReportsService";

import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface EmptyPageState {
  isFilterOpen: boolean;
  exportModalOpen: boolean;
  actionsOpen: boolean;
  isReportSelectOpen: boolean;
  reportOptions: Option[];
  selectedReportName: string;
  selectedReportUri: string;
  currentVObject: any;
  currentFilters: any;
  repositoryResource: any;
}


interface Props {
  location: any;
}

class EmptyPage extends Component<any, EmptyPageState> {
  state: EmptyPageState =  {
		isFilterOpen: false,
		exportModalOpen: false,
		isReportSelectOpen: false,
		actionsOpen: false,
		reportOptions: [],
		selectedReportName: '',
		selectedReportUri: '',
		currentVObject: null,
		currentFilters: null,
		repositoryResource: null
  };
  
  constructor(props: Props) {
	  super(props);
	  /*
	  const search = props.location.search; // should be '?resource=/public/path'
	  const params: URLSearchParams = new URLSearchParams(search);
	  const uri: string | null = params.get('resource'); 
	  const name: string | null = params.get('name'); 
	  
	  this.state.selectedReportUri =  uri != null ? uri : '';
	  this.state.selectedReportName = name != null ? name : '';
	  */
  }

  async getResource(uri: string | null) {
	  let foundResource: any = null;
  	  if (uri != null) {
		  const restURL = '/rest_v2/resources' + uri + '?expanded=true';
		  //console.log(restURL);
		  foundResource = await JasperReportsService.get(restURL, {});
		  console.log(foundResource);
		  this.state.repositoryResource = foundResource;
	  }
	  return foundResource;
  }
  
  async componentDidMount() {
    await this.getFilters();
    this.showReport();
  }

  changeReport = (params: any, error: any) => {
	if (!error && this.state.currentVObject != null) {
		this.state.currentVObject.params(params).run();
	}
  }
  
  async getFilters() {
    await visualizeHelper.getInputControl(
		this.state.selectedReportUri,
		'inputControl',
		{},
		{
			change: this.changeReport
		}
	)
    .then((success: any) => {
		var inputControls: any = success.inputControls;

		this.setState({ currentFilters: inputControls });
    })
	.catch((err) => {
		console.log('error getFilters:', err.message);
	});
  }

  showReport() {
    if (this.state.selectedReportUri) {
      visualizeHelper.getDashboard(this.state.selectedReportUri, 'report')
        .then((success: any) => {
			//console.log('success', success);
			var dashboard: any = success.dashboard;
			var result: any = success.success;
			this.setState({ currentVObject: dashboard });
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

	let vObjectContainer = [];
	
	if (currentFilters != null) {
		vObjectContainer.push(
		  <div key='leftcol' className={'grid__column-10 grid__column-m-4'}>
			<div id="report" className={'jspage-view__table'}/>
		  </div>);
		vObjectContainer.push(
		  <div key='rightcol' className={'grid__column-2 grid__column-m-2'}>
			  <div id="inputControl" />
		  </div>);
	} else {
		vObjectContainer.push(
		  <div key='fullcol' className={'grid__column-12 grid__column-m-4'}>
			<div id="report" className={'jspage-view__table'}/>
		  </div>);
	}

    return (
      <>
        <NavBar />
        <div className={'jspage-container'}>
          <div className={'grid jspage-view'}>
            <div className={'grid__row jspage-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'jspage-header__top'}>
                  <h3 className={'jspage-header__title'}>I am empty!</h3>
                </div>

                {/* Bottom Header Row */}
                <div className={'jspage-header__bottom'}>
                  <div className={'jspage-header__buttons'}>
                    <button className={'jspage-view__btn--create btn--primary'}
                            //disabled={!(this.state.filters && this.state.filters.length)}
                            onClick={this.createReport}>
                      Create
                    </button>
                    <button className={'jspage-view__btn--actions btn--secondary'}
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
			  {vObjectContainer}
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default EmptyPage;
