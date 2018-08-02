const axios = require("axios");
const moment = require("moment");

const projectId = encodeURIComponent('nanum/nanum');
const ax = axios.create({
  baseURL: `http://git.baikal.io/api/v4/projects/${projectId}`,
  headers: {"PRIVATE-TOKEN": "ALzpa9eXGm-k_jWJzw5e"}
});
const milestone = "sprint1";

ax.get(`/issues`, {params: {milestone, per_page: 50}}).then(response => {
  const issues = response.data;
  console.log(`Total ${issues.length}`);
  // assignee should be set
  const noAssignees = issues.filter(issue => !issue.assignee);
  if (noAssignees.length) {
    console.log('The following issues have no assignee:');
    console.log();
    noAssignees.forEach(issue => console.log(`- #${issue.iid}`, issue.title, issue.labels));
    console.log();
  }

  // time tracking stats should be set
  axios.all(issues.map(issue => ax.get(`/issues/${issue.iid}/time_stats`)))
    .then(responses => {
      responses = responses.map((response, i) => ({
        timeTracking: response.data,
        issue: issues[i]
      }));

      const opened = responses.filter(response => response.issue.state === "opened");
      const noTimeTracking = opened.filter(data => !data.timeTracking.human_time_estimate);
      if (noTimeTracking.length) {
        console.log('The following issues have no estimation:');
        console.log();
        noTimeTracking.forEach(data => console.log(`- #${data.issue.iid}`, data.issue.title, data.issue.labels));
        console.log();
      }

      const timeTracking = opened.filter(data => data.timeTracking.human_time_estimate);
      console.log('The following issue have time tracking information');
      timeTracking.forEach(data => console.log(`- #${data.issue.iid}`, data.issue.title, data.issue.labels, data.timeTracking.human_time_estimate));
      console.log();

      const doneEstimatedTime = responses.filter(response => response.issue.state === "closed").map(response => response.timeTracking.time_estimate)
        .reduce((prev, item) => prev + item, 0);
      const totalEstimatedTime = responses.map(response => response.timeTracking.time_estimate)
        .reduce((prev, item) => prev + item, 0);

      console.log(`Done: ${moment.duration(doneEstimatedTime, 's').asHours()} hrs, Total: ${moment.duration(totalEstimatedTime, 's').asHours()} hrs`);
    }).catch(console.error);
}).catch(console.error);
