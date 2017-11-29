"use strict";

module.exports = AgileEpicClient;
/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/epic'
 * @param {JiraClient} jiraClient
 * @constructor AgileEpicClient
 */

function AgileEpicClient(jiraClient) {
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
  this.getIssuesForEpic = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/epic/' + opts.epicId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a list of all issues NOT associated with an agile epic
   *
   * @method getIssuesForEpic
   * @memberOf AgileEpicClient
   * @param opts The request options to send to the Jira API
   * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [opts.jql] TFilters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues.
   * @param [opts.validateQuery] Specifies whether to validate the JQL query or not. Default: true.
   * @param [opts.fields] The list of fields to return for each issue. By default, all navigable and Agile fields are returned.
   * @param [opts.expand] A comma-separated list of the parameters to expand.

   * @param [callback] Called when the dashboards have been retrieved.
   * @return {Promise} Resolved when the dashboards have been retrieved.
   */
  this.getIssuesWithoutEpic = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/epic/none/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };




}