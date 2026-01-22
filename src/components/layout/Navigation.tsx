'use client';

import { NavigationProps } from '@/lib/types';

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  sections,
}) => {
  return (
    <nav className="flex space-x-8">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
            activeSection === section.id
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {section.label}
          
          {/* Active section indicator */}
          {activeSection === section.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform transition-all duration-200" />
          )}
          
          {/* Hover effect */}
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 rounded-full transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
        </button>
      ))}
    </nav>
  );
};

export default Navigation;