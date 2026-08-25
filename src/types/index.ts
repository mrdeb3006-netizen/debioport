export interface Project {
  id: string;
  number: string;
  title: string;
  tagline?: string;
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
}

export interface Milestone {
  number: string;
  tag: string;
  title: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  number: string;
  title: string;
  tags: { label: string; filterKey: string }[];
}

export type ActiveFilter = string | null;
