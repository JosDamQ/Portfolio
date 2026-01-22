'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Hero, About, Skills, Experience, Projects, Contact } from '@/components/sections';
import { ProjectModal } from '@/components/ui';
import { personalInfo, contactInfo, skills, skillCategories, experiences, projects } from '@/lib/data';
import { Project, ContactFormData } from '@/lib/types';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    const initEmailJS = async () => {
      const emailjs = (await import('@emailjs/browser')).default;
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
    };
    initEmailJS();
  }, []);

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const headerHeight = window.innerWidth >= 1024 ? 80 : 64;
      const scrollPosition = window.scrollY + headerHeight + 20; // Responsive offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Re-calculate on resize
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Handle smooth scrolling to sections
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 80 : 64; // Responsive header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle project selection
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  // Handle project modal close
  const handleProjectModalClose = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  // Handle contact form submission
  const handleContactFormSubmit = async (data: ContactFormData): Promise<void> => {
    // Use EmailJS for real email sending
    const emailjs = (await import('@emailjs/browser')).default;
    
    console.log('Enviando email con EmailJS desde page.tsx...');
    console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    console.log('Form data:', data);

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'damian.garcia.12.2004@gmail.com', // Prueba con tu otro email
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log('EmailJS result:', result);
    // No retornamos nada para cumplir con Promise<void>
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 touch-scroll">
      {/* Header */}
      <Header
        personalInfo={personalInfo}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main id="main-content" className="safe-area-bottom" role="main" aria-label="Portfolio content">
        {/* Hero Section */}
        <Hero
          personalInfo={personalInfo}
          contactInfo={contactInfo}
          onScrollToSection={handleSectionChange}
        />

        {/* About Section */}
        <About personalInfo={personalInfo} />

        {/* Skills Section */}
        <Skills skills={skills} categories={skillCategories} />

        {/* Experience Section */}
        <Experience experiences={experiences} />

        {/* Projects Section */}
        <Projects 
          projects={projects} 
          onProjectSelect={handleProjectSelect}
        />

        {/* Contact Section */}
        <Contact 
          contactInfo={contactInfo}
          onFormSubmit={handleContactFormSubmit}
        />
      </main>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        personalInfo={personalInfo}
      />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={handleProjectModalClose}
      />
    </div>
  );
}
