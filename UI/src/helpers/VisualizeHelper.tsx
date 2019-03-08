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
   * SSO Login
   * @param userToken
   * @param url
   */
  login(userToken: string, url: string) {
    this.visualize.config({
      server: constants.jasperServerUrl,
      scripts: 'optimized-scripts',
      auth: {
        loginFn: (properties: any, request: any) => {
          return request({
            url: url,
            headers: {
              pp: userToken
            }
          });
        }
      }
    });
  }

  /**
   * SSO Logout
   */
  logOut() {
    this.visualize((v: any) => {
      return v.logout();
    });
  }

  /**
   * Add report to page
   * @param reportId
   * @param reportUrl
   * @param params
   */
  getReport(reportId: string, reportUrl: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.visualize((v: any) => {
        v.report({
          container: `#${reportId}`,
          resource: reportUrl,
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
   * Add Input control
   * @param reportId
   * @param reportUrl
   * @param params
   */
  getInputControl(reportId: string, reportUrl: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.visualize((v: any) => {
        v.inputControls({
          container: `#${reportId}`,
          resource: reportUrl,
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
