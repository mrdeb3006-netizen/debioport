export interface Project {
  id: string;
  number: string;
  title: string;
  tagline?: string;
  category?: string;
  description: string;
  tech: string[];
  fileName?: string;
  githubUrl?: string;
  vscodeUrl?: string;
  isReversed?: boolean;
  theme: 'cyan' | 'purple' | 'magenta' | 'blue';
  titleBar: string;
  overview: string;
  highlights: string[];
  architecture?: string[];
  sourceCode?: string;
}

export interface Milestone {
  number: string;
  tag: string;
  title: string;
  institution?: string;
  period: string;
  score?: string;
  badge?: string;
  description: string;
  highlights?: string[];
}

export interface SkillCategory {
  number: string;
  title: string;
  tags: { label: string; filterKey: string }[];
}

export type ActiveFilter = string | null;
