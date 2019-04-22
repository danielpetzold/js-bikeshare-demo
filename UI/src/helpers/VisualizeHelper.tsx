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
        v.report({
          container: `#${uiContainer}`,
          resource: resourcePath,
          params: params,
          linkOptions: linkOptions,
          success: (success: any) => {
            resolve(success);
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
  getAdHocView(uiContainer: string, resourcePath: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        v.adhocView({
          container: `#${uiContainer}`,
          resource: resourcePath,
          params: params,
          success: (success: any) => {
            resolve(success);
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
   * Get Input control
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getInputControl(
    uiContainer: string | null,
    resourcePath: string,
    params: any = {}
  ) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        v.inputControls({
          resource: resourcePath,
          params: params,
          success: (success: any) => {
            resolve(success);
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
      this.viz((v: any) => {
        v.resourcesSearch({
          folderUri: folderUrl,
          recursive: true,
          // types: [reportTypes],
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
