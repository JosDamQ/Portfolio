'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderProps } from '@/lib/types';
import Navigation from './Navigation';

const Header: React.FC<HeaderProps> = ({
  personalInfo,
  activeSection,
  onSectionChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation sections
  const sections = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Handle scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : 64; // Responsive header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
      
      onSectionChange(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        }`}
        role="banner"
        aria-label="Site header"
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand - Touch-friendly */}
            {/* Brand - Personal & Eye-catching */}
            <button
              className="flex-shrink-0 min-h-[48px] focus-ring rounded-lg px-3 py-2"
              onClick={() => handleSectionClick('hero')}
              aria-label="Go to home section"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💻</span>
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Dev
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block" role="navigation" aria-label="Main navigation">
              <Navigation
                activeSection={activeSection}
                onSectionChange={handleSectionClick}
                sections={sections}
              />
            </nav>

            {/* Mobile Menu Button - Enhanced touch target */}
            <div className="lg:hidden mobile-menu-container">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="min-h-[48px] min-w-[48px] focus-ring rounded-lg p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-controls="mobile-navigation"
                aria-haspopup="true"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay lg:hidden" 
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel */}
      <div
        id="mobile-navigation"
        className={`mobile-menu-panel lg:hidden ${
          isMobileMenuOpen ? 'open' : 'closed'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full safe-area-top safe-area-bottom">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💻</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Navigation
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-h-[48px] min-w-[48px] focus-ring rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav 
            className="flex-1 px-4 py-6 space-y-2 touch-scroll overflow-y-auto"
            role="navigation"
            aria-label="Mobile navigation links"
          >
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full text-left min-h-[48px] px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus-ring ${
                  activeSection === section.id
                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                aria-current={activeSection === section.id ? 'page' : undefined}
                aria-describedby={activeSection === section.id ? `${section.id}-current` : undefined}
              >
                {section.label}
                {activeSection === section.id && (
                  <span id={`${section.id}-current`} className="sr-only">
                    (current section)
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Developer Portfolio
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
