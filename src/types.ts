export interface TeamMemberActivity {
  slack: string[];
  github: string[];
  jira: string[];
  notion: string[];
}

export interface TeamActivity {
  [member: string]: TeamMemberActivity;
}

export interface StandupSummary {
  date: string;
  summaries: {
    [member: string]: {
      completed: string[];
      working: string[];
      blockers: string[];
    };
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  isStandupSummary?: boolean;
}