import * as constants from './constants';
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
  private visualize = (window as any).visualize;

  /**
   * Token-Based Authentication Login
   * @param userToken
   * @param jaspersoftServerUrl
   */
  login(userToken: string, jaspersoftServerUrl: string) {
    this.visualize.config({
      server: jaspersoftServerUrl,
      scripts: 'optimized-scripts',
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
    this.visualize((v: any) => {
      return v.logout();
    });
  }

  /**
   * Get report
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getReport(uiContainer: string, resourcePath: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.visualize((v: any) => {
        v.report({
          container: `#${uiContainer}`,
          resource: resourcePath,
          params: params,
          success: () => {
            resolve();
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
   * Get Input control
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getInputControl(uiContainer: string, resourcePath: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.visualize((v: any) => {
        v.inputControls({
          container: `#${uiContainer}`,
          resource: resourcePath,
          params: params,
          success: () => {
            resolve();
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
   * Get list of reports in repo folder
   * @param folderUrl
   * @param reportTypes
   */
  getReportList(folderUrl: string, reportTypes: any) {
    return new Promise((resolve, reject) => {
      this.visualize((v: any) => {
        v.resourcesSearch({
          folderUri: folderUrl,
          recursive: true,
          types: [reportTypes],
          success: function(repo: any) {
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
