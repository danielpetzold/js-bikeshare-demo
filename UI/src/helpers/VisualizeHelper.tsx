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
  private theme = (window as any).themeHref;

  /**
   * Token-Based Authentication Login
   * @param userToken
   * @param jaspersoftServerUrl
   */
  login(userToken: string, jaspersoftServerUrl: string) {

    if (typeof this.theme !== 'undefined') {
      // JRS runs on a URL like http[s]://my.server.com[:8080]/jasperserver-pro
      // The JRS URL points to http[s]://another.server.com[:9999]/jasperserver-pro
      // or a relative /jasperserver-pro
      var jrsPathToFind = "/jasperserver-pro";
      var posOfRelative = this.theme.indexOf(jrsPathToFind);
      if (posOfRelative > 0) {
        this.theme = '/jasperserver-pro' + this.theme.substring(posOfRelative + jrsPathToFind.length);
      }
    } else {
      // app served visualize.js script
      // point to themes installed in web app
      this.theme = "css/jasper/default";
      // if you want to use the JRS served themes, remove theme part of the object below.
    }

    this.viz.config({
      server: jaspersoftServerUrl,
      scripts: 'optimized-scripts',
      // theme: {
      //   href: this.theme
      // },
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
   */
  getReport(uiContainer: string, resourcePath: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      this.viz((v: any) => {
        v.report({
          container: `#${uiContainer}`,
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
      })
    })
  }

  /**
   * Get Input control
   * @param uiContainer
   * @param resourcePath
   * @param params
   */
  getInputControl(uiContainer: string | null, resourcePath: string, params: any = {}) {
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
