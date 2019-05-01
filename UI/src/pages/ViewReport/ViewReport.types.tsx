export interface Report {
  creationDate: string;
  description: string;
  label: string;
  permissionMask: number;
  resourceType: string;
  updateDate: string;
  uri: string;
  version: string;
}

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