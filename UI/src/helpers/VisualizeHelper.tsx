import { JaspersoftRepositoryItem, JaspersoftRepositoryItems,
JaspersoftRepositoryTreeNode, JaspersoftRepositoryTreeNodes } from "../pages/Repository/Repository.types";

/**
 * Helper functions for interfacing with Visualizer.js global instance.
 */

export interface Report {
  container: string;
  resource: string;
}

class VisualizeHelper {
  /**
   * Type definitions do not yet exist for Visualize.js. Casting as any, for now.
   */
  private viz = (window as any).visualize;

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

  /**
   * Token-Based Authentication Logout
   */
  logOut() {
    this.viz((v: any) => {
      return async () => {
        await v.logout();
      };
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
    uiContainer: string,
    resourcePath: string,
    params: any = {},
    linkOptions: any = {}
  ) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        let aReport: any = v.report({
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
	uiContainer: string,
	resourcePath: string,
	params: any = {}
  ) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        let aView: any = v.adhocView({
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
	uiContainer: string,
	resourcePath: string,
	params: any = {}
  ) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        let aDashboard: any = v.dashboard({
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
      });
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
      this.viz((v: any) => {
        let controls: any = v.inputControls({
          resource: resourcePath,
		  container: `#${uiContainer}`,
          params: params,
          success: (success: any) => {
            resolve({ success: success, inputControls: controls });
          },
          error: (err: any) => {
            console.log('getInputControl', err);
            reject(err);
          },
		  events: events
        });
      });
    });
  }

  /**
   * Get list of resources in below the given folder
   * @param folderUrl starting folder
   * @param types resource types. see visualize.js doc. Default to repo browsing types
   */
  getResources(folderUrl: string, types: any) {
	if (types == null) {
		types = ['folder', 'reportUnit', 'dashboard', 'adhocDataView'];
	}
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        v.resourcesSearch({
          folderUri: folderUrl,
          recursive: true,
          types: types,
		  sortBy: "uri",
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
