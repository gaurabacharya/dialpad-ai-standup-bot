import { TeamActivity, TeamMemberActivity } from '../types';
import { mockSlackData, mockGithubData, mockJiraData, mockNotionData } from './mockData';

export const processData = (): TeamActivity => {
  const activity: TeamActivity = {};

  // Process Slack data
  mockSlackData.split('\n').forEach(line => {
    const match = line.match(/\[(.*?)\] (.*)/);
    if (match) {
      const [, member, message] = match;
      if (!activity[member]) {
        activity[member] = { slack: [], github: [], jira: [], notion: [] };
      }
      activity[member].slack.push(message);
    }
  });

  // Process GitHub data
  mockGithubData.split('\n').forEach(line => {
    const member = line.split(' ')[0];
    if (member && line) {
      if (!activity[member]) {
        activity[member] = { slack: [], github: [], jira: [], notion: [] };
      }
      activity[member].github.push(line);
    }
  });

  // Process Jira data
  mockJiraData.split('\n').forEach(line => {
    const member = line.split(' ')[0];
    if (member && line) {
      if (!activity[member]) {
        activity[member] = { slack: [], github: [], jira: [], notion: [] };
      }
      activity[member].jira.push(line);
    }
  });

  // Process Notion data
  const notionLines = mockNotionData.split('\n');
  notionLines.forEach(line => {
    if (line.includes('Alice')) {
      if (!activity['Alice']) {
        activity['Alice'] = { slack: [], github: [], jira: [], notion: [] };
      }
      activity['Alice'].notion.push(line);
    }
    if (line.includes('Bob')) {
      if (!activity['Bob']) {
        activity['Bob'] = { slack: [], github: [], jira: [], notion: [] };
      }
      activity['Bob'].notion.push(line);
    }
  });

  return activity;
};

export const formatActivityForLLM = (activity: TeamActivity): string => {
  let prompt = '';
  
  Object.entries(activity).forEach(([member, data]) => {
    prompt += `\n--- ${member} ---\n`;
    if (data.slack.length) prompt += `Slack: ${data.slack.join(', ')}\n`;
    if (data.github.length) prompt += `GitHub: ${data.github.join(', ')}\n`;
    if (data.jira.length) prompt += `Jira: ${data.jira.join(', ')}\n`;
    if (data.notion.length) prompt += `Notion: ${data.notion.join(', ')}\n`;
  });

  return prompt;
};