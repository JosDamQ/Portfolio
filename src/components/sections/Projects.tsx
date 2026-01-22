'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Project, ProjectFilter } from '@/lib/types';
import { Card, Button } from '@/components/ui';

export interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index: number;
}

const ProjectCard = ({ project, onViewDetails, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card
        variant="glass"
        hover
        className="h-full overflow-hidden min-h-[44px] cursor-pointer"
        onClick={() => onViewDetails(project)}
      >
        {/* Project Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-xl">
          {project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl sm:text-2xl font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-full capitalize">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          
          <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 mb-3 sm:mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-md">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
                className="flex-1 text-xs sm:text-sm min-h-[44px]"
              >
                Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Github className="w-3 h-3 sm:w-4 sm:h-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
                className="flex-1 text-xs sm:text-sm min-h-[44px]"
              >
                Code
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export function Projects({ projects, onProjectSelect }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Sort projects to show featured first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const filterOptions: { value: ProjectFilter; label: string }[] = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'web', label: 'Web Apps' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'tool', label: 'Tools' }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 spacing-responsive-md bg-secondary-50 dark:bg-secondary-900/50">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-responsive-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 sm:mb-4">
            Featured Projects
          </h2>
          <p className="text-responsive-base text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            A showcase of my recent work, featuring web applications, mobile apps, and development tools
            built with modern technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={activeFilter === option.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(option.value)}
              leftIcon={<Filter className="w-3 h-3 sm:w-4 sm:h-4" />}
              className="transition-all duration-300 text-xs sm:text-sm min-h-[44px]"
            >
              {option.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-responsive-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={onProjectSelect}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-12"
          >
            <p className="text-secondary-600 dark:text-secondary-400 text-responsive-base">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}

        {/* View All Projects CTA */}
        {activeFilter !== 'all' && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveFilter('all')}
              className="min-h-[48px]"
            >
              View All Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}