import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: "fullstack-developer-nexa",
    company: "Banco Nexa",
    position: "Analista Programador",
    duration: "Octubre 2025 - Presente",
    startDate: new Date('2025-10-14'),
    endDate: undefined,
    description: "Desarrollador Full Stack en el equipo de middleware, especializado en el desarrollo de microservicios desplegados en AWS y la plataforma de banca empresarial. Responsable del desarrollo completo desde aplicaciones frontend hasta la integración con sistemas core bancarios, aplicando las mejores prácticas de seguridad y escalabilidad en el sector financiero.",
    achievements: [
      "Desarrollo de microservicios escalables desplegados en AWS con arquitectura cloud-native",
      "Implementación de la plataforma de banca empresarial full stack, desde frontend hasta backend",
      "Integración con sistemas core bancarios garantizando alta disponibilidad y seguridad",
      "Aplicación de mejores prácticas de seguridad financiera y cumplimiento regulatorio",
      "Desarrollo de APIs robustas para servicios de middleware bancario",
      "Optimización de rendimiento y escalabilidad en aplicaciones críticas del negocio",
      "Colaboración en arquitectura de sistemas distribuidos para operaciones bancarias"
    ],
    technologies: [
      "Angular", "TypeScript", "Node.js", "Nest Js", 
      "Flutter", "Dart", "AWS", "Docker",
      "Microservices", "CI/CD", "PostgreSQL"
    ],
    current: true
  },
  {
    id: "junior-developer-qs",
    company: "QuickShipping",
    position: "Desarrollador Junior",
    duration: "Noviembre 2023 - Octubre 2025",
    startDate: new Date('2023-11-01'),
    endDate: new Date('2025-10-31'),
    description: "Primer rol profesional como desarrollador en una empresa de logística y courier. Enfocado en el desarrollo de APIs RESTful para integración con sistemas de pago y gestión de bases de datos transaccionales para operaciones críticas del negocio.",
    achievements: [
      "Implementé APIs RESTful para integración con múltiples pasarelas de pago utilizando Node.js y Laravel",
      "Gestioné y optimicé bases de datos PostgreSQL, asegurando la integridad y consistencia de datos transaccionales",
      "Desarrollé funcionalidades backend para el sistema de tracking y gestión de envíos",
      "Participé en la implementación de medidas de seguridad para uso de pasarelas de pago",
      "Colaboré en el mantenimiento y mejora continua de la plataforma de courier",
      "Aprendí y apliqué mejores prácticas en desarrollo de sistemas transaccionales críticos"
    ],
    technologies: [
      "Node.js", "Laravel", "PostgreSQL", "JavaScript", "PHP", "REST APIs", 
      "Git", "SQL", "Express.js", "Payment Gateways", "Database Optimization"
    ],
    current: false
  },
  {
    id: "intern-webdev-freelance",
    company: "Transforma Digital",
    position: "Practicante",
    duration: "Agosto 2023 - Octubre 2023",
    startDate: new Date('2023-08-16'),
    endDate: new Date('2023-10-30'),
    description: "Prácticas profesionales desarrollando sitios web para pequeñas empresas. Enfoque en desarrollo frontend con tecnologías modernas y mejores prácticas.",
    achievements: [
      "Completé proyectos web para pequeñas empresas",
      "Desarrollé habilidades en comunicación con clientes",
      "Implementé sitios web responsivos y optimizados para SEO",
      "Aprendí fundamentos de UX/UI design",
      "Establecí bases sólidas en desarrollo web moderno"
    ],
    technologies: [
      "HTML5", "CSS3", "JavaScript", "React", "Sass", 
      "Git", "Figma", "Java"
    ],
    current: false
  }
];

// Helper functions for experience data
export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.current);
};

export const getPreviousExperiences = (): Experience[] => {
  return experiences.filter(exp => !exp.current);
};

export const getTotalExperienceYears = (): number => {
  const startDate = new Date('2023-08-16'); // First professional experience
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(diffYears * 10) / 10; // Round to 1 decimal place
};

export const getExperienceByCompany = (company: string): Experience | undefined => {
  return experiences.find(exp => exp.company.toLowerCase().includes(company.toLowerCase()));
};

export const getAllTechnologies = (): string[] => {
  const allTechs = experiences.flatMap(exp => exp.technologies);
  return [...new Set(allTechs)].sort();
};

export const getExperiencesInChronologicalOrder = (): Experience[] => {
  return [...experiences].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
};