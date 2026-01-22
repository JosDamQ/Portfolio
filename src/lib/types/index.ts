// =============================================================================
// CORE DATA MODEL INTERFACES
// =============================================================================

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

// =============================================================================
// COMPONENT PROP INTERFACES
// =============================================================================

// Layout Components
export interface HeaderProps {
  personalInfo: PersonalInfo;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  sections: NavigationSection[];
}

export interface FooterProps {
  contactInfo: ContactInfo;
  personalInfo: PersonalInfo;
}

// Section Components
export interface HeroSectionProps {
  personalInfo: PersonalInfo;
  onScrollToSection: (section: string) => void;
}

export interface AboutSectionProps {
  personalInfo: PersonalInfo;
  totalExperience: number;
}

export interface SkillsSectionProps {
  skills: Skill[];
  categories: SkillCategory[];
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}

export interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export interface ContactSectionProps {
  contactInfo: ContactInfo;
  onFormSubmit: (data: ContactFormData) => Promise<void>;
}

// UI Components
export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index: number;
}

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SkillCategoryProps {
  category: string;
  skills: Skill[];
  isVisible: boolean;
  onToggle?: () => void;
}

export interface SkillItemProps {
  skill: Skill;
  showExperience?: boolean;
}

export interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface AnimatedTextProps {
  text: string;
  animation?: 'typewriter' | 'fadeIn' | 'slideUp';
  delay?: number;
  className?: string;
}

// =============================================================================
// FORM AND UTILITY TYPES
// =============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

// Navigation Types
export interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  icon?: string;
}

// Theme and Animation Types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AnimationVariants {
  hidden: object;
  visible: object;
  exit?: object;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

// Generic utility types for form handling
export type FormState<T> = {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
};

export type ValidationRule<T> = {
  field: keyof T;
  validator: (value: unknown) => string | null;
};

// Navigation utility types
export type SectionId = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

export type ScrollDirection = 'up' | 'down';

// Project filtering types
export type ProjectFilter = 'all' | Project['category'];

// Skill filtering and sorting types
export type SkillSortBy = 'name' | 'proficiency' | 'experience';
export type SortOrder = 'asc' | 'desc';

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Component state types
export interface ComponentState {
  isLoading: boolean;
  error: string | null;
  data: unknown;
}

// Event handler types
export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T> = (data: T) => void | Promise<void>;

// Responsive breakpoint types
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

// Animation timing types
export interface AnimationTiming {
  duration: number;
  delay?: number;
  easing?: string;
}
