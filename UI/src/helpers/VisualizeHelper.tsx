import { JaspersoftRepositoryTreeNodes } from "../pages/Repository/Repository.types";

/**
 * Helper functions for interfacing with Visualizer.js global instance.
 */


class VisualizeHelper {
  /**
   * Type definitions do not yet exist for Visualize.js. Casting as any, for now.
   */
  private viz = (window as any).visualize;
  private vizObj: any = null;
  
  constructor() {
	  //console.log('new VisualizeHelper');
  }

  /**
   * Token-Based Authentication Login
   * @param userToken
   * @param jaspersoftServerUrl
   */
  login(userToken: string, jaspersoftServerUrl: string) {
    this.viz.config({
      server: jaspersoftServerUrl,
      scripts: 'optimized-scripts',
      theme: {
        href: 'css/jasper/default'
      },
      auth: {
        loginFn: (properties: any, request: any) => {
          return request({
            url: jaspersoftServerUrl,
            headers: {
              pp: userToken
            }
          });
        }
      }
    });
  }

	initializeVisualizeObject(): Promise<any> {
		return new Promise<any>( resolve => {
			//console.log('initializeVisualizeObject. vizObj null: ' + (this.vizObj == null).toString());
			this.viz((v: any) => {
			  this.vizObj = v;
			  //console.log('got new initializeVisualizeObject');
			  resolve(this.vizObj);
			});
		});
	}

  async getVisualizeObject() {
	  //console.log('getVisualizeObject. vizObj null: ' + (this.vizObj == null).toString());
	  if (this.vizObj == null) {
		    await this.initializeVisualizeObject();
			return this.vizObj;
	  } else {
		//console.log('not null vizObj');
		return this.vizObj;
	  }
  }
  /**
   * Authentication Logout
   */
  async logOut(): Promise<any> {
	  return new Promise<any>( resolve => {
		//console.log('logout called');
		this.getVisualizeObject()
			.then(vizObj => {
				vizObj.logout();
				this.vizObj = null;
				//console.log('logout done');
				resolve(true);
		});
	  });
  }
  /**
   * Get report
   * @param uiContainer
   * @param resourcePath
   * @param params
   * @param linkOptions
  */
  getReport(
    resourcePath: string,
    uiContainer: string,
    params: any = {},
    linkOptions: any = {}
  ) {
    return new Promise((resolve, reject) => {
	  this.getVisualizeObject()
		.then(vizObj => {
			let aReport: any = vizObj.report({
			  container: `#${uiContainer}`,
			  resource: resourcePath,
			  params: params,
			  linkOptions: linkOptions,
			  scrollToTop: false,
			  loadingOverlay: true,
			  success: (success: any) => {
				resolve({ success: success, report: aReport });
			  },
			  error: (err: any) => {
				console.log('getReport', err);
				reject(err);
			  }
			});
		});
    });
  }

  /**
   *
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getAdHocView(
	resourcePath: string,
	uiContainer: string,
	params: any = {}
  ) {
    return new Promise((resolve, reject) => {
	  this.getVisualizeObject()
		.then(vizObj => {
			let aView: any = vizObj.adhocView({
			  container: `#${uiContainer}`,
			  resource: resourcePath,
			  params: params,
			  success: (success: any) => {
				resolve({ success: success, adhocView: aView });
			  },
			  error: (err: any) => {
				console.log('getAdHocView', err);
				reject(err);
			  }
			});
		});
    });
  }

  /**
   *
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getDashboard(
	resourcePath: string,
	uiContainer: string,
	params: any = {}
  ) {
    return new Promise((resolve, reject) => {
	  this.getVisualizeObject()
		.then(vizObj => {
			let aDashboard: any = vizObj.dashboard({
			  container: `#${uiContainer}`,
			  resource: resourcePath,
			  params: params,
			  success: (success: any) => {
				resolve({ success: success, dashboard: aDashboard });
			  },
			  error: (err: any) => {
				console.log('getDashboard', err);
				reject(err);
			  }
			});
		})
    });
  }

  /**
   * Get Input control
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getInputControl(
    resourcePath: string,
    uiContainer: string | null,
    params: any = {},
	events: any = {}
  ) {
    return new Promise((resolve, reject) => {
	  let controls: any;
	  let icVizProperties: any = {
          resource: resourcePath,
          params: params,
          success: (success: any) => {
            resolve({ success: success, inputControls: controls });
          },
          error: (err: any) => {
            console.log('getInputControl', err);
            reject(err);
          },
		  events: events
        };
	  if (uiContainer && uiContainer.length > 0) {
		  icVizProperties["container"] = `#${uiContainer}`;
	  }
	  this.getVisualizeObject()
		.then(vizObj => {
			//console.log('ic vizObj', vizObj);
			controls = vizObj.inputControls(icVizProperties);
		});
    });
  }

  /**
   * Get list of resources in below the given folder
   * @param folderUrl starting folder
   * @param types resource types. see visualize.js doc. Default to repo browsing types
   */
  getResources(folderUri: string, types: any, sortBy: string) {
	if (types == null) {
		types = ['folder', 'reportUnit', 'dashboard', 'adhocDataView'];
	}
	if (sortBy == null) {
		sortBy = 'uri';
	}
    return new Promise((resolve, reject) => {
   	  this.getVisualizeObject()
		.then(vizObj => {
			vizObj.resourcesSearch({
			  folderUri: folderUri,
			  recursive: true,
			  types: types,
			  sortBy: sortBy,
			  success: function(repo: JaspersoftRepositoryTreeNodes) {
				resolve(repo);
			  },
			  error: function(err: any) {
				reject(err);
			  }
			});
		});
    });
  }
  
}

export const visualizeHelper = new VisualizeHelper();
