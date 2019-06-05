import React, { Component } from 'react';
import './EmptyPage.scss';
import filterIcon from '../../fonts/icons/filter-icon.svg';
import NavBar from '../../components/NavBar/NavBar';
import JasperReportsService from "../../services/JasperReportsService";
import { DashboardProps, ReportParams } from "../Dashboard/Dashboard.types";

import Dropdown, { Option } from '../../components/Dropdown/Dropdown';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

const dashboard_report_uri_root: string = '/public/Bikeshare_demo/Reports/Dashboard_Reports';
const kpi_report_uri: string = dashboard_report_uri_root + '/FM_Dashboard_KPIS';
const default_detail_report_uri: string = dashboard_report_uri_root + '/Dashboard_Stations_InNeed_Detail';

interface EmptyPageState {
	kpiReport: any;
	detailReport: any;
	selectedFilters: any;
}


class EmptyPage extends Component<DashboardProps, EmptyPageState> {
  state: EmptyPageState =  {
	kpiReport: null,
	detailReport: null,
	selectedFilters: {
		Region: '3',
		Franchise: 'BA',
		Timeframe: 'lastweek'
	}
  };


  constructor(props: DashboardProps) {
    super(props);
  }

  changeDetailsReport = (e: any, link: any) => {
    e.preventDefault();
    visualizeHelper.getReport(dashboard_report_uri_root + '/' + link.href, 'detail-report', this.getParams())
    .then((success: any) => {
				var report: any = success.report;
				var result: any = success.success;
				this.setState({ detailReport: report });
    });
  }

  async componentDidMount() {
      visualizeHelper.getReport(kpi_report_uri, 'kpi-report', this.getParams(), {
        events: {
          click: this.changeDetailsReport
        }
       })
       .then((success: any) => {
					var report: any = success.report;
					var result: any = success.success;
					this.setState({ kpiReport: report });
        });
      visualizeHelper.getReport(default_detail_report_uri, 'detail-report', this.getParams())
        .then((success: any) => {
				var report: any = success.report;
				var result: any = success.success;
				this.setState({ detailReport: report });
      });
  }


  getParams = () => {
    let params: ReportParams = {};
    for (let key in this.state.selectedFilters) {
      params[key] = [this.state.selectedFilters[key]];
    }
    this.props.sessionId
      ? (params = { ...params, Session_ID: [this.props.sessionId] })
      : null;
    console.log(params);
    return params;
  };

  exportAReport = (e: any) => {
    e.preventDefault();

   let report: any = this.state.detailReport;

    report.export({
      //export options here        
      outputFormat: 'pdf'
      //exports all pages if not specified
      //pages: "1-2"
		}, function (link: any) {
			 var url = link.href ? link.href : link;
			 window.location.href = url;
		}, function (error: any) {
				console.log(error);
		});
  }

  render() {
    const {
      detailReport
    } = this.state;


    return (
      <>
        <NavBar />
        <div className={'jspage-container'}>
          <div className={'grid jspage-view'}>
            <div className={'grid__row jspage-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'jspage-header__top'}>
                  <h3 className={'jspage-header__title'}>I am alive!!!!!</h3>
                </div>

                {/* Bottom Header Row */}
                <div className={'jspage-header__bottom'}>
                  <div className={'jspage-header__buttons'}>
                    <button className={'jspage-view__btn--create btn--primary'} onClick={this.exportAReport} >
                      Export Detail
                    </button>
                    <button className={'jspage-view__btn--actions btn--secondary'}>
                      Button 2
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={'grid__row'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div
                    id={'kpi-report'}
                  />
                </div>
            </div>

            <div className={'grid__row'}>
                <div className={'grid__column-8 grid__column-m-4'} >
                  <div id={'detail-report'}></div>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default EmptyPage;
