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
        className="h-full overflow-hidden"
        onClick={() => onViewDetails(project)}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          {project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/50 text-white text-xs font-medium rounded-full capitalize">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
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
                leftIcon={<ExternalLink className="w-4 h-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
                className="flex-1"
              >
                Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Github className="w-4 h-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
                className="flex-1"
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
    <section id="projects" className="py-20 px-6 bg-secondary-50 dark:bg-secondary-900/50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
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
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={activeFilter === option.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(option.value)}
              leftIcon={<Filter className="w-4 h-4" />}
              className="transition-all duration-300"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            className="text-center py-12"
          >
            <p className="text-secondary-600 dark:text-secondary-400 text-lg">
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
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveFilter('all')}
            >
              View All Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}