import React from 'react';
import './Dashboard.scss';
import NavBar from '../../components/NavBar/NavBar';
import Filter from '../../components/Filter/Filter';
import { visualizeHelper } from '../../helpers/VisualizeHelper';

interface DashboardProps {}

interface SelectedFilters {
  [index:string]: FilterData;
}

interface State {
  isFilterOpen: boolean;
  selectedFilters: SelectedFilters;
}

export interface FilterData {
  label: string;
  value: string;
}

// Timeframe Filter Options.
const timeFrameFilter = {
  title: 'Timeframe',
  id: 'Timeframe',
  options: [
    {
      label: 'Current',
      value: 'current'
    },
    {
      label: 'Last 24 Hours',
      value: 'last24'
    },
    {
      label: 'Last Week',
      value: 'lastweek'
    },
    {
      label: 'Last Month',
      value: 'lastmonth'
    },
    {
      label: 'Last Quarter',
      value: 'lastquarter'
    },
    {
      label: 'Annual',
      value: 'annual'
    }
  ]
};

class Dashboard extends React.Component<DashboardProps, State> {
  filterDataICUri = '/public/Bikeshare_demo/Reports/Lookups';
  visualize: any;
  filters: any = [];

  constructor(props: DashboardProps) {
    super(props);

    let emptyFilter: FilterData = {
      label: '',
      value: ''
    };

    // Set initial state for filter to first two options in data
    this.state = {
      isFilterOpen: false,
      selectedFilters: {
        Region: emptyFilter,
        Franchise: emptyFilter,
        Timeframe: emptyFilter
      }
    };
  }

  componentDidMount() {
    this.getFilterData();
  }

  getReports() {
    // Create params object from selected filters
    let params: any = {};
    for (let key in this.state.selectedFilters) {
      params[key] = [this.state.selectedFilters[key].value]
    }
    // visualizeHelper.getReport(
    //   'kpi-report',
    //   '/public/Bikeshare_demo/Reports/Dashboard_Reports/FM_Dashboard_KPIS',
    //   params
    // );
  }


  getFilterData = () => {
    visualizeHelper.getInputControl('', this.filterDataICUri)
      .then((success: any) => {
        this.filters = Object.assign({}, ...(success.map((item: any) => {
          return (
            {
              [item.id]: {
                title: item.label,
                id: item.id,
                options: item.state.options
              }
            }
          )}
        )));
        this.filters['Timeframe'] = timeFrameFilter;
        this.setFilter({
          Region: this.filters['Region'].options[1],
          Franchise: this.filters['Franchise'].options[0],
          Timeframe: this.filters['Timeframe'].options[0]
        })
      })
  };

  closeFilter = () => {
    this.setState({ isFilterOpen: false });
  };

  setFilter = (state: any) => {
    this.setState({ selectedFilters: state }, () => {
      this.getReports();
    });
  };

  render() {
    return (
      <>
        <NavBar />
        { this.state.isFilterOpen ? (
          <Filter
            close={this.closeFilter}
            save={this.setFilter}
            selectedFilters={this.state.selectedFilters}
            data={this.filters}
          />
        ) : null }
        <div className={'dashboard'}>

          <header className={'page-header'}>
            <div className={'page-header__content grid'}>
              <div className={'grid__row'}>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div className='page-header__title'> Trends and Analytics</div>
                  <div className={'page-header__region-filter'} onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Region'] ? this.state.selectedFilters['Region'].label : "Please select Region"}
                    <i className="icon-ic-arrow-down page-header__down-arrow-icon" />
                  </div>
                </div>
                <div className={'grid__column-4 page-header__spacer'}></div>
                <div className={'grid__column-4 grid__column-m-4'}>
                  <div className={'page-header__region-time-frame'} onClick={() => this.setState({ isFilterOpen: true })}>
                    {this.state.selectedFilters['Timeframe'] ? this.state.selectedFilters['Timeframe'].label : "Please select Timeframe"}
                    <i className="icon-ic-unfold-more page-header__unfold-icon" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className={'dashboard__body'}>

            <div className={'dashboard__map'}>
              <div className={'dashboard__map-controls'}>
                <div className={'dashboard__toggle-map'}>

                </div>
              </div>
              <div className={'dashboard__placeholder-map'}></div>
            </div>

            <div className={'dashboard__centered grid'}>
              <div className={'grid__row dashboard__KPI'}>
                <div className={'grid__column-12 grid__column-m-4'}>
                  <div id={'kpi-report'} />
                </div>
              </div>
            </div>
            <div className={'grid__row'}>
              <div className={'grid__column-8 grid__column-m-4'}>
                <div id={'in-need-report'} />
              </div>
              <div className={'grid__column-4 grid__column-m-4'}>
                <div id={'active-times-report'} />
              </div>
            </div>
            <div className={'grid__row'}>
              <div className={'grid__column-4 grid__column-m-4'}>
                <div id={'active-times-report'} />
              </div>
              <div className={'grid__column-4 grid__column-m-4'}>
                <div id={'active-times-report'} />
              </div>
              <div className={'grid__column-4 grid__column-m-4'}>
                <div id={'active-times-report'} />
              </div>
            </div>
          </div>

        </div>
        {/*<div className={'main'}>*/}
          {/*<div className={'main__content'}>*/}
            {/*<div className={'grid dashboard__header '}>*/}
              {/*<div className={'grid__row'}>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div className='dashboard__title'> Trends and Analytics</div>*/}
                  {/*<div className={'dashboard__region-filter'} onClick={() => this.setState({ isFilterOpen: true })}>*/}
                    {/*{this.state.selectedFilters['Region'] ? this.state.selectedFilters['Region'].label : "Please select Region"}*/}
                    {/*<i className="icon-ic-arrow-down dashboard__down-arrow-icon" />*/}
                  {/*</div>*/}
                {/*</div>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}></div>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div className={'dashboard__region-time-frame'} onClick={() => this.setState({ isFilterOpen: true })}>*/}
                      {/*{this.state.selectedFilters['Timeframe'] ? this.state.selectedFilters['Timeframe'].label : "Please select Timeframe"}*/}
                      {/*<i className="icon-ic-unfold-more dashboard__unfold-icon" />*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className={'dashboard__map'}>*/}
              {/*<div className={'dashboard__map-toggle'}>*/}
              {/*</div>*/}
              {/*<div className={'dashboard__map-container'}>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className={'grid dashboard__body'}>*/}
              {/*<div className={'grid__row dashboard__KPI'}>*/}
                {/*<div className={'grid__column-12 grid__column-m-4'}>*/}
                  {/*<div id={'kpi-report'} />*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*<div className={'grid__row'}>*/}
                {/*<div className={'grid__column-8 grid__column-m-4'}>*/}
                  {/*<div id={'in-need-report'} />*/}
                {/*</div>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div id={'active-times-report'} />*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*<div className={'grid__row'}>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div id={'active-times-report'} />*/}
                {/*</div>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div id={'active-times-report'} />*/}
                {/*</div>*/}
                {/*<div className={'grid__column-4 grid__column-m-4'}>*/}
                  {/*<div id={'active-times-report'} />*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}
      </>
    );
  }
}

export default Dashboard;
