"use strict";

module.exports = AgileReportsClient;
/**
 * Used to access Jira REST endpoints for reporting
 * @param {JiraClient} jiraClient
 * @constructor AgileEpicClient
 */

function AgileReportsClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Get a list of all issues associated with an agile epic
   *
   * @method getIssuesForEpic
   * @memberOf AgileEpicClient
   * @param opts The request options to send to the Jira API
   * @param [opts.type] Limits returning boards of a specific type: `scrum` or `kanban`.
   * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [callback] Called when the dashboards have been retrieved.
   * @return {Promise} Resolved when the dashboards have been retrieved.
   */
  this.getHistoricalVelocity = function(opts, callback) {
    var options = {

      ///rest/greenhopper/1.0/rapid/charts/velocity?rapidViewId=123
      // uri: this.jiraClient.buildAgileURL('/epic/' + opts.epicId + '/issue'),
      uri: this.jiraClient.buildReportingURL('/rapid/charts/velocity?rapidViewId=' + opts.boardId),
      method: 'GET',
      json: true,
      // followAllRedirects: true,
      // qs: {
      //   startAt: opts.startAt,
      //   maxResults: opts.maxResults
      // }
    };
    return this.jiraClient.makeRequest(options, callback);
  };




}