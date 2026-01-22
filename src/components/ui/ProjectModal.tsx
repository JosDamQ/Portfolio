'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { Modal, Button } from '@/components/ui';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => setCurrentImageIndex(0), 0);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev > 0 ? prev - 1 : (project.images.length - 1)
        );
      } else if (event.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev < project.images.length - 1 ? prev + 1 : 0
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < project.images.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev > 0 ? prev - 1 : (project.images.length - 1)
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
    >
      <div className="relative">
        {/* Custom Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus-ring"
          aria-label={`Close ${project.title} project details`}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Image Gallery */}
        {project.images.length > 0 && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Screenshot ${currentImageIndex + 1} of ${project.images.length}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus-ring"
                  aria-label={`Previous image (${currentImageIndex} of ${project.images.length})`}
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus-ring"
                  aria-label={`Next image (${currentImageIndex + 2} of ${project.images.length})`}
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Image Indicators */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                  role="tablist"
                  aria-label="Project images"
                >
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors focus-ring ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      role="tab"
                      aria-selected={index === currentImageIndex}
                      aria-label={`View image ${index + 1} of ${project.images.length}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span 
                  className="px-3 py-1 bg-accent-500 text-white text-sm font-medium rounded-full"
                  role="status"
                  aria-label="This is a featured project"
                >
                  Featured Project
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  {project.title}
                </h2>
                <span 
                  className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full capitalize"
                  role="status"
                  aria-label={`Project category: ${project.category}`}
                >
                  {project.category}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2" role="group" aria-label="Project actions">
                {project.demoUrl && (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    aria-label={`View live demo of ${project.title} (opens in new tab)`}
                  >
                    Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Github className="w-4 h-4" aria-hidden="true" />}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                  >
                    View Code
                  </Button>
                )}
              </div>
            </div>

            <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used in this project">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-sm rounded-md border border-secondary-200 dark:border-secondary-700"
                  role="listitem"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2" role="list" aria-label="Key features of this project">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2 text-secondary-600 dark:text-secondary-400"
                    role="listitem"
                  >
                    <span 
                      className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" 
                      aria-hidden="true"
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Links Section */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex flex-col sm:flex-row gap-3" role="group" aria-label="Project links">
                {project.demoUrl && (
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<ExternalLink className="w-5 h-5" aria-hidden="true" />}
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className="flex-1"
                    aria-label={`View live demo of ${project.title} (opens in new tab)`}
                  >
                    View Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Github className="w-5 h-5" aria-hidden="true" />}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex-1"
                    aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                  >
                    View Source Code
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}