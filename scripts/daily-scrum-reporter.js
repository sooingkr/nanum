const axios = require("axios");
const moment = require("moment");

const projectId = encodeURIComponent('nanum/nanum');
const ax = axios.create({
  baseURL: `http://git.baikal.io/api/v4/projects/${projectId}`,
  headers: {"PRIVATE-TOKEN": "ALzpa9eXGm-k_jWJzw5e"}
});
const milestone = "sprint3";

ax.get(`/issues`, {params: {milestone, per_page: 100}}).then(response => {
  const issues = response.data
    .filter(issue => !issue.labels.some(label => ["daily-scrum", "qa-session", "sprint-planning", "sprint-retrospective", "sprint-review"].includes(label)));

  axios.all(issues.map(issue => ax.get(`/issues/${issue.iid}/time_stats`)))
    .then(responses => {
      responses = responses.map((response, i) => ({
        timeTracking: response.data,
        issue: issues[i]
      }));

      // responses = responses.filter(response => response.issue.labels.indexOf('android') !== -1)
      // responses = responses.filter(response => response.issue.labels.indexOf('ios') !== -1)

      const poShouldReviewTime  = responses
          .filter(response => response.issue.labels.some(label => ["needs-review"].includes(label)))
          .map(response => response.timeTracking.time_estimate)
          .reduce((prev, item) => prev + item, 0);
      const doneEstimatedTime = responses
        .filter(response => response.issue.state === "closed")
        .map(response => response.timeTracking.time_estimate)
        .reduce((prev, item) => prev + item, 0);
      // const notDone = responses
      //   .filter(response => response.issue.state !== "closed")
      // const notDoneEstimatedTime = notDone
      //   .map(response => response.timeTracking.time_estimate)
      //   .reduce((prev, item) => prev + item, 0);

      // console.log(moment.duration(doneEstimatedTime, 's').asHours(), moment.duration(notDoneEstimatedTime, 's').asHours())
      // console.log(notDone.map(r => r.issue.state))

      // const remainingIssues = responses.filter(response => response.issue.state !== "closed").map(response => response.issue.iid);
      // const remainingIssues = responses.filter(response => response.issue.state !== "closed");

      // console.log(`Remaining ${remainingIssues.map(r => r.issue.iid)}`, `${remainingIssues.map(r => r.timeTracking.time_estimate)}`)


      const totalEstimatedTime = responses
        .map(response => response.timeTracking.time_estimate)
        .reduce((prev, item) => prev + item, 0);

      console.log(`- The number of the sprint backlog items: ${issues.length}`);
      console.log(`- The estimated time of the finished sprint backlog items: ${moment.duration(doneEstimatedTime, 's').asHours()} hrs (${moment.duration(doneEstimatedTime, 's').asHours() / moment.duration(totalEstimatedTime, 's').asHours() * 100}%)`);
        console.log(`- The estimated time of all the sprint backlog items which PO should review: ${moment.duration(poShouldReviewTime, 's').asHours()} hrs (${moment.duration(poShouldReviewTime, 's').asHours() / moment.duration(totalEstimatedTime, 's').asHours() * 100}%)`);
      console.log(`- The estimated time of all the sprint backlog items: ${moment.duration(totalEstimatedTime, 's').asHours()} hrs`);


    }).catch(console.error);
}).catch(console.error);
