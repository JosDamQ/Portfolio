'use client';

import { NavigationProps } from '@/lib/types';

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  sections,
}) => {
  return (
    <nav className="flex items-center space-x-1" role="navigation" aria-label="Main navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`relative min-h-[44px] px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full focus-ring group ${
            activeSection === section.id
              ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25'
              : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
          }`}
          aria-current={activeSection === section.id ? 'page' : undefined}
          aria-label={`Navigate to ${section.label} section`}
        >
          <span className="relative z-10">{section.label}</span>
          
          {/* Hover effect background */}
          {activeSection !== section.id && (
            <span 
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
              aria-hidden="true"
            />
          )}
          
          {/* Active indicator glow */}
          {activeSection === section.id && (
            <span 
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full animate-pulse-glow"
              aria-hidden="true"
            />
          )}
          
          <span className="sr-only">
            {activeSection === section.id ? '(current section)' : ''}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;