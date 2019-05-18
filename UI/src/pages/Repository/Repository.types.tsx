/*
	creationDate: "2018-04-29T14:11:48"
	description: "Ad Hoc Components"
	label: "Ad Hoc Components"
	permissionMask: 1
	resourceType: "folder"
	updateDate: "2018-04-27T12:57:00"
	uri: "/public/adhoc"
	version: 0
*/
export interface JaspersoftRepositoryItem {
  creationDate: string;
  description: string;
  label: string;
  permissionMask: number;
  resourceType: string;
  updateDate: string;
  uri: string;
  version: number;
}

export interface JaspersoftRepositoryItems extends Array<JaspersoftRepositoryItem>{}

export interface JaspersoftRepositoryTreeNode {
	key: string;
	name: string;
	label: string,
	uri: string;
	nodes: JaspersoftRepositoryTreeNodes;
	resourceType: string;
	description: string;
}

export interface JaspersoftRepositoryTreeNodes extends Array<JaspersoftRepositoryTreeNode>{}

export interface JaspesoftFilterData {
  id: string;
  label: string;
  options: JaspersoftFilterOption[];
  isOpen: boolean;
}

export interface JaspersoftFilterOption {
  label: string;
  selected: boolean;
  value: string;
}