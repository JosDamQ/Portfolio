'use client';

import { NavigationProps } from '@/lib/types';

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  sections,
}) => {
  return (
    <nav className="flex space-x-2 lg:space-x-8" role="navigation" aria-label="Main navigation">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`relative min-h-[44px] px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg focus-ring ${
            activeSection === section.id
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-current={activeSection === section.id ? 'page' : undefined}
          aria-describedby={activeSection === section.id ? `${section.id}-indicator` : undefined}
          aria-label={`Navigate to ${section.label} section`}
        >
          {section.label}
          
          {/* Active section indicator */}
          {activeSection === section.id && (
            <>
              <span 
                id={`${section.id}-indicator`}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform transition-all duration-200"
                aria-hidden="true"
              />
              <span className="sr-only">(current section)</span>
            </>
          )}
          
          {/* Hover effect - only show on devices that support hover */}
          <span 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 rounded-full transform scale-x-0 transition-transform duration-200 hover:scale-x-100"
            aria-hidden="true"
          />
        </button>
      ))}
    </nav>
  );
};

export default Navigation;