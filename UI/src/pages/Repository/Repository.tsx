import React, { Component } from 'react';
import './Repository.scss';
import NavBar from '../../components/NavBar/NavBar';
import { visualizeHelper } from '../../helpers/VisualizeHelper';
import { JaspersoftRepositoryItem, JaspersoftRepositoryItems,
			JaspersoftRepositoryTreeNode, JaspersoftRepositoryTreeNodes } from "./Repository.types";

import TreeMenu from 'react-simple-tree-menu';

interface RepositoryState {
  exportModalOpen: boolean;
  isSelectOpen: boolean;
  selectedName: string;
  selectedType: string;
  selectedDescription: string;
  selectedUri: string;
  treeData: JaspersoftRepositoryTreeNodes;
}

class Repository extends Component<any, RepositoryState> {

  state: RepositoryState =  {
    exportModalOpen: false,
    isSelectOpen: false,
    selectedName: '',
    selectedType: '',
    selectedDescription: '',
    selectedUri: '',
	treeData: []
  };

  async componentDidMount() {
    await this.getRepositoryTree();
    //await this.getFilters();
    //this.showReport();
  }

  async getRepositoryTree() {
	  // '/public/Samples'
	await visualizeHelper.getResources(`${process.env.REACT_APP_REPOSITORY_START_FOLDER}`,
			['folder', 'reportUnit', 'dashboard', 'adhocDataView'],
			'updateDate')
		.then((resources: any) => {
			
			/*
			
			Format for https://reactjsexample.com/a-simple-react-tree-menu-component/
			
			const treeData = [
			  {
				key: 'first-level-node-1',
				label: 'Node 1 at the first level',
				..., // any other props you need, e.g. url
				nodes: [
				  {
					key: 'second-level-node-1',
					label: 'Node 1 at the second level',
					nodes: [
					  {
						key: 'third-level-node-1',
						label: 'Last node of the branch',
						nodes: [] // you can remove the nodes property or leave it as an empty array
					  },
					],
				  },
				],
			  },
			  {
				key: 'first-level-node-2',
				label: 'Node 2 at the first level',
			  },
			];
			
			*/

			var treeArray: JaspersoftRepositoryTreeNodes = [];
			
			resources.forEach((rawResource: any) => {
				var resource: JaspersoftRepositoryItem = rawResource;

				var pathParts: string[] = resource.uri.split('/');
				var nodeName: string =  pathParts[pathParts.length - 1];	
				
				var parentNodes: JaspersoftRepositoryTreeNodes = treeArray;
				for (var level = 1; level < pathParts.length - 1; level++) {
					let levelId = pathParts[level];
					let currentUri = pathParts.slice(1,level + 1).reduce(function (uri: string, levelStr: string) {
					  return uri + '/' + levelStr;
					}, '');

					var nextNodes: JaspersoftRepositoryTreeNodes = parentNodes.filter((node: JaspersoftRepositoryTreeNode) => {
						return node.name == levelId;
					});

					var nextNodeObj: JaspersoftRepositoryTreeNode;
					if (nextNodes == undefined || nextNodes.length == 0) {
						nextNodeObj = {
							key: currentUri,
							name: levelId,
							label: levelId,
							uri: currentUri,
							nodes: [],
							resourceType: 'folder',
							description: currentUri
						}

						parentNodes.push(nextNodeObj);

					} else {
						nextNodeObj = nextNodes[0];
					}

					parentNodes = nextNodeObj.nodes;
				}
				parentNodes.push({
					key: resource.uri,
					name: nodeName,
					label: resource.label,
					uri: resource.uri,
					nodes: [],
					resourceType: resource.resourceType,
					description: resource.description
				  }
				);
			});
			//console.log(treeArray);
			// OK - finally got the tree. Let's get it up there!
			this.setState({ treeData: treeArray });
			
		});
  }

  showReport() {
    if (this.state.selectedUri) {

/*
      let params: any = {};
      for (let filter in this.state.selectedFilters) {
        params[filter] = [this.state.selectedFilters[filter].value];
      }
      visualizeHelper.getAdHocView('report', this.state.selectedReportValue, params)
        .then((success: any) => {
          console.log('success', success);
        });
*/
    }
  }
  
  showSelected = (e: any) => {
    e.preventDefault();
	if (this.state.selectedType == 'adhocDataView') {
		this.props.history.push({
		  pathname: '/adhoc',
		  search: `?resource=${this.state.selectedUri}&name=${this.state.selectedName}`
		});
	} else if (this.state.selectedType == 'dashboard') {
		this.props.history.push({
		  pathname: '/dashboard',
		  search: `?resource=${this.state.selectedUri}&name=${this.state.selectedName}`
		});
	} else if (this.state.selectedType == 'reportUnit') {
		this.props.history.push({
		  pathname: '/report',
		  search: `?resource=${this.state.selectedUri}&name=${this.state.selectedName}`
		});
	}
  };
  
  modifySelected = (e: any) => {
    e.preventDefault();
	if (this.state.selectedType == 'adhocDataView') {
		this.props.history.push({
		  pathname: '/adhoc/edit',
		  search: `?resource=${this.state.selectedUri}`
		});
	} else if (this.state.selectedType == 'dashboard') {
		this.props.history.push({
		  pathname: '/dashboards/edit',
		  search: `?resource=${this.state.selectedUri}`
		});
	}
  };

  createReport = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/adhoc/new'
    });
  };

  createDashboard = (e: any) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/dashboards/new'
    });
  };

  selectedNode = (e: any) => {
	  //console.log(e);
    this.setState({
		selectedName: e.name,
		selectedType: e.resourceType,
		selectedUri: e.uri
	});
  }
  
  render() {
    const {
      isSelectOpen,
      selectedName,
	  selectedType
    } = this.state;

    return (
      <>
        <NavBar />
        <div className={'repository-container'}>
          <div className={'grid repository-view'}>
            <div className={'grid__row repository-header'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <div className={'repository-header__top'}>
                  <h3 className={'repository-header__title'}>Your Reports and Dashboards</h3>
                  <div className={'header-select'}>
                    <h5>{selectedName} - {selectedType}</h5>
                  </div>
                </div>

                {/* Bottom Header Row */}
                <div className={'repository-header__bottom'}>
                  <div className={'repository-header__buttons'}>
                    <button className={'repository-view__btn--create btn--primary'}
                            onClick={this.showSelected}>
                      Show Selected
                    </button>
                    <button className={'repository-view__btn--actions btn--secondary'}
                            onClick={this.modifySelected}>
                      Modify Selected
                    </button>
                    <button className={'repository-view__btn--create btn--secondary'}
                            onClick={this.createReport}>
                      Create Report
                    </button>
                    <button className={'repository-view__btn--create btn--secondary'}
                            onClick={this.createDashboard}>
                      Create Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* repository */}
            <div className={'grid__row'}>
              <div className={'grid__column-12 grid__column-m-4'}>
                <TreeMenu
					data={this.state.treeData}
					  onClickItem={this.selectedNode}
					  debounceTime={125}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Repository;
