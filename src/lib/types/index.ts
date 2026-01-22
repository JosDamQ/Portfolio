export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  avatar: string;
  resumeUrl: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  images: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'tool';
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience: number;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
  technologies: string[];
  current: boolean;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter?: string;
  website?: string;
}

// Component Props Interfaces
export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index: number;
}

export interface SkillCategoryProps {
  category: string;
  skills: Skill[];
  isVisible: boolean;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
