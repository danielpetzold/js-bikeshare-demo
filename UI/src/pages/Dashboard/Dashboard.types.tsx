export interface DashboardProps {}

export interface DashboardState {
  isFilterOpen: boolean;
  selectedFilters: SelectedFilters;
  isMapOpen: boolean;
  kpiDetailReport: string;
}

export interface SelectedFilters {
  [index:string]: FilterOption;
}

export interface FilterOption {
  label: string;
  value: string;
  selected: boolean;
}

export interface ReportParams {
  [index:string]: string[];
}