
export interface ReportFilterData {
  id: string;
  label: string;
  options: ReportFilterOption[];
  isOpen: boolean;
}

export interface ReportFilterOption {
  label: string;
  selected: boolean;
  value: string;
}