'use client';

import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';
import { FooterProps } from '@/lib/types';

const Footer: React.FC<FooterProps> = ({ contactInfo, personalInfo }) => {
  // Navigation sections for quick links
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  // Social media links with icons
  const socialLinks = [
    {
      name: 'Email',
      url: `mailto:${contactInfo.email}`,
      icon: Mail,
      label: `Send email to ${contactInfo.email}`,
    },
    {
      name: 'LinkedIn',
      url: contactInfo.linkedin,
      icon: Linkedin,
      label: 'Connect on LinkedIn (opens in new tab)',
    },
    {
      name: 'GitHub',
      url: contactInfo.github,
      icon: Github,
      label: 'View GitHub profile (opens in new tab)',
    },
  ];

  // Add optional social links if they exist
  if (contactInfo.twitter) {
    socialLinks.push({
      name: 'Twitter',
      url: contactInfo.twitter,
      icon: ExternalLink,
      label: 'Follow on Twitter (opens in new tab)',
    });
  }

  if (contactInfo.website) {
    socialLinks.push({
      name: 'Website',
      url: contactInfo.website,
      icon: ExternalLink,
      label: 'Visit personal website (opens in new tab)',
    });
  }

  // Handle smooth scrolling to sections
  const handleSectionClick = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer 
      className="bg-gray-900 text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div 
                className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center"
                role="img"
                aria-label={`${personalInfo.name} logo`}
              >
                <span className="text-white font-bold text-sm">
                  {personalInfo.name.charAt(0)}
                </span>
              </div>
              <span className="text-xl font-bold">{personalInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {personalInfo.title} with {personalInfo.summary.includes('2+') ? '2+' : 'multiple'} years of experience creating modern web applications and digital solutions.
            </p>
            <p className="text-gray-400 text-sm" aria-label={`Located in ${personalInfo.location}`}>
              <span aria-hidden="true">📍</span> {personalInfo.location}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleSectionClick(link.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm focus-ring rounded-sm min-h-[44px] flex items-center"
                      aria-label={`Navigate to ${link.label} section`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3" role="list" aria-label="Social media and contact links">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group focus-ring rounded-sm min-h-[44px]"
                    aria-label={social.label}
                    role="listitem"
                  >
                    <IconComponent 
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
                      aria-hidden="true"
                    />
                    <span className="text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            <p>
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group focus-ring rounded-sm min-h-[44px] px-2"
            aria-label="Scroll back to top of page"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp 
              className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" 
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
