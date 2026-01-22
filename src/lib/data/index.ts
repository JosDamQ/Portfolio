// Export all data modules for easy importing
export * from './personal';
export * from './projects';
export * from './skills';
export * from './experience';

// Re-export types for convenience
export type {
  PersonalInfo,
  ContactInfo,
  Project,
  Skill,
  SkillCategory,
  Experience
} from '../types';