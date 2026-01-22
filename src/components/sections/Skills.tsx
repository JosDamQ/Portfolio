'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Database, 
  Wrench, 
  Plus,
  Star,
  Code,
  Zap
} from 'lucide-react';

// React Icons for specific technologies
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiJest
} from 'react-icons/si';

import { Card, CardContent, Button } from '@/components/ui';
import { Skill, SkillCategory, SkillsSectionProps } from '@/lib/types';

// Icon mapping for categories
const categoryIcons = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench,
  other: Plus
};

// Icon mapping for individual skills using real technology icons
const skillIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'react': SiReact,
  'nextjs': SiNextdotjs,
  'typescript': SiTypescript,
  'javascript': SiJavascript,
  'vue': SiVuedotjs,
  'html5': SiHtml5,
  'css3': SiCss3,
  'tailwind': SiTailwindcss,
  'sass': SiSass,
  'nodejs': SiNodedotjs,
  'express': SiExpress,
  'python': SiPython,
  'graphql': SiGraphql,
  'mongodb': SiMongodb,
  'postgresql': SiPostgresql,
  'mysql': SiMysql,
  'redis': SiRedis,
  'prisma': SiPrisma,
  'mongoose': SiMongodb,
  'git': SiGit,
  'github': SiGithub,
  'docker': SiDocker,
  'vercel': SiVercel,
  'netlify': SiNetlify,
  'figma': SiFigma,
  'jest': SiJest,
  'fastapi': Server,
  'api': Server,
  'socketio': Server,
  'vscode': Code,
  'aws': Server,
  'postman': Code,
  'cypress': Code,
  'agile': Wrench,
  'design': Monitor,
  'seo': Code,
  'performance': Zap,
  'responsive': Monitor
};

// Color mapping for technology icons
const skillColors: Record<string, string> = {
  'react': '#61DAFB',
  'nextjs': '#000000',
  'typescript': '#3178C6',
  'javascript': '#F7DF1E',
  'vue': '#4FC08D',
  'html5': '#E34F26',
  'css3': '#1572B6',
  'tailwind': '#06B6D4',
  'sass': '#CC6699',
  'nodejs': '#339933',
  'express': '#000000',
  'python': '#3776AB',
  'graphql': '#E10098',
  'mongodb': '#47A248',
  'postgresql': '#336791',
  'mysql': '#4479A1',
  'redis': '#DC382D',
  'prisma': '#2D3748',
  'git': '#F05032',
  'github': '#181717',
  'docker': '#2496ED',
  'vercel': '#000000',
  'netlify': '#00C7B7',
  'figma': '#F24E1E',
  'jest': '#C21325'
};

// Web development technologies for highlighting
const webDevelopmentTechs = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 
  'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'
];

interface SkillItemProps {
  skill: Skill;
  isHighlighted: boolean;
  index: number;
}

function SkillItem({ skill, isHighlighted, index }: SkillItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get icon and color for skill
  const skillKey = skill.icon || skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const IconComponent = skillIcons[skillKey] || Code;
  const skillColor = skillColors[skillKey] || '#6B7280';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          p-6 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden
          ${isHighlighted 
            ? 'border-primary-400 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 dark:border-primary-500' 
            : 'border-secondary-200 bg-white dark:bg-secondary-800 dark:border-secondary-700'
          }
          ${isHovered ? 'shadow-xl transform -translate-y-2 scale-105' : 'shadow-md'}
        `}
        role="article"
        aria-label={`${skill.name} skill with ${skill.yearsOfExperience} years of experience${isHighlighted ? ' - highlighted for web development' : ''}`}
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Skill Icon with technology-specific color */}
            <div 
              className={`
                p-3 rounded-lg transition-all duration-300 shadow-sm
                ${isHovered ? 'scale-110 rotate-3 shadow-lg' : ''}
              `}
              style={{ 
                backgroundColor: skillColor + '20',
                color: skillColor,
                border: `2px solid ${skillColor}40`
              }}
              role="img"
              aria-label={`${skill.name} technology icon`}
            >
              <IconComponent className="w-8 h-8" aria-hidden="true" />
            </div>
            
            <div>
              <h4 className={`font-semibold text-xl ${
                isHighlighted 
                  ? 'text-primary-700 dark:text-primary-300' 
                  : 'text-secondary-900 dark:text-secondary-100'
              }`}>
                {skill.name}
              </h4>
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'año' : 'años'} de experiencia
              </p>
            </div>
          </div>
          
          {isHighlighted && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30, delay: index * 0.1 }}
              className="flex items-center gap-1"
              role="status"
              aria-label="Highlighted for web development"
            >
              <Star className="w-6 h-6 text-yellow-500 fill-current" aria-hidden="true" />
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                Web Dev
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface SkillCategoryTabProps {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  skillCount: number;
}

function SkillCategoryTab({ category, isActive, onClick, skillCount }: SkillCategoryTabProps) {
  const IconComponent = categoryIcons[category.skills[0]?.category as keyof typeof categoryIcons] || Plus;
  
  return (
    <Button
      variant={isActive ? 'primary' : 'ghost'}
      size="md"
      onClick={onClick}
      className={`
        flex items-center gap-6 px-6 py-3 rounded-lg transition-all duration-300
        ${isActive 
          ? 'shadow-lg' 
          : 'hover:bg-secondary-100 dark:hover:bg-secondary-800'
        }
      `}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${category.name.toLowerCase()}`}
      id={`tab-${category.name.toLowerCase()}`}
      tabIndex={isActive ? 0 : -1}
      aria-label={`${category.name} skills category - ${skillCount} skills`}
    >
      <IconComponent className="w-5 h-5" aria-hidden="true" />
      <span className="font-medium">{category.name}</span>
      <span 
        className={`
          text-xs px-3 py-1.5 rounded-full min-w-[24px] text-center font-semibold ml-2
          ${isActive 
            ? 'bg-white/20 text-white' 
            : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
          }
        `}
        aria-label={`${skillCount} skills in this category`}
      >
        {skillCount}
      </span>
    </Button>
  );
}

export function Skills({ skills, categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || 'Frontend');
  
  const currentCategorySkills = categories.find(cat => cat.name === activeCategory)?.skills || [];
  
  // Get web development skills for highlighting
  const highlightedSkills = new Set(
    skills
      .filter(skill => webDevelopmentTechs.includes(skill.name))
      .map(skill => skill.name)
  );
  
  return (
    <section 
      id="skills" 
      className="py-20 bg-secondary-50/50 dark:bg-secondary-900/50"
      aria-label="Technical skills and expertise"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="w-6 h-6 text-primary-500" aria-hidden="true" />
            <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
              Habilidades Técnicas
            </span>
          </div>
          <h2 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Tecnologías y Experiencia
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Una visión completa de mis habilidades técnicas, 
            con énfasis en tecnologías de desarrollo web.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((category) => (
            <SkillCategoryTab
              key={category.name}
              category={category}
              isActive={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
              skillCount={category.skills.length}
            />
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="tabpanel"
              aria-labelledby={`tab-${activeCategory.toLowerCase()}`}
              aria-label={`${activeCategory} skills`}
            >
              {currentCategorySkills.map((skill, index) => (
                <SkillItem
                  key={skill.name}
                  skill={skill}
                  isHighlighted={highlightedSkills.has(skill.name)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Web Development Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card variant="glass" className="p-8">
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="p-3 bg-primary-500 rounded-lg"
                  role="img"
                  aria-label="Web development focus icon"
                >
                  <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100">
                    Enfoque en Desarrollo Web
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Tecnologías principales para desarrollo web moderno
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-wrap gap-3"
                role="list"
                aria-label="Primary web development technologies"
              >
                {skills
                  .filter(skill => webDevelopmentTechs.includes(skill.name))
                  .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
                  .map((skill) => {
                    const skillKey = skill.icon || skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const IconComponent = skillIcons[skillKey] || Star;
                    const skillColor = skillColors[skillKey] || '#6B7280';
                    
                    return (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-700"
                        role="listitem"
                        aria-label={`${skill.name} - ${skill.yearsOfExperience} years of experience`}
                      >
                        <IconComponent 
                          className="w-4 h-4" 
                          style={{ color: skillColor }}
                          aria-hidden="true"
                        />
                        {skill.name}
                        <span className="text-xs opacity-75">
                          {skill.yearsOfExperience}a
                        </span>
                      </motion.span>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}