import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: "fullstack-developer-techcorp",
    company: "TechCorp Solutions",
    position: "Full Stack Developer",
    duration: "Enero 2023 - Presente",
    startDate: new Date('2023-01-15'),
    endDate: undefined,
    description: "Desarrollo y mantenimiento de aplicaciones web escalables utilizando React, Node.js y tecnologías cloud. Liderazgo técnico en proyectos de migración y optimización de rendimiento.",
    achievements: [
      "Desarrollé una plataforma de e-commerce que incrementó las ventas en un 40%",
      "Lideré la migración de una aplicación legacy a arquitectura de microservicios",
      "Implementé un sistema de CI/CD que redujo el tiempo de deployment en 60%",
      "Mentoré a 2 desarrolladores junior en mejores prácticas de desarrollo",
      "Optimicé el rendimiento de la aplicación principal, reduciendo el tiempo de carga en 50%"
    ],
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js", "Express.js", 
      "MongoDB", "PostgreSQL", "AWS", "Docker", "Jest"
    ],
    current: true
  },
  {
    id: "frontend-developer-innovate",
    company: "Innovate Digital Agency",
    position: "Frontend Developer",
    duration: "Marzo 2022 - Diciembre 2022",
    startDate: new Date('2022-03-01'),
    endDate: new Date('2022-12-31'),
    description: "Desarrollo de interfaces de usuario modernas y responsivas para clientes corporativos. Colaboración estrecha con equipos de diseño UX/UI para implementar experiencias de usuario excepcionales.",
    achievements: [
      "Desarrollé 8+ sitios web corporativos con React y Vue.js",
      "Implementé un sistema de design system reutilizable para la agencia",
      "Mejoré la accesibilidad web logrando puntuaciones AA en WCAG 2.1",
      "Reduje el tiempo de desarrollo de proyectos en 30% mediante componentes reutilizables",
      "Colaboré con equipos multidisciplinarios en metodología Agile/Scrum"
    ],
    technologies: [
      "React", "Vue.js", "JavaScript", "TypeScript", "Sass", 
      "Tailwind CSS", "Figma", "Git", "Webpack"
    ],
    current: false
  },
  {
    id: "junior-developer-startup",
    company: "StartupLab",
    position: "Junior Web Developer",
    duration: "Junio 2021 - Febrero 2022",
    startDate: new Date('2021-06-01'),
    endDate: new Date('2022-02-28'),
    description: "Primer rol profesional como desarrollador web en un entorno startup dinámico. Desarrollo de funcionalidades frontend y backend para una plataforma SaaS de gestión empresarial.",
    achievements: [
      "Contribuí al desarrollo de una plataforma SaaS desde cero",
      "Implementé funcionalidades de autenticación y autorización",
      "Desarrollé dashboards interactivos con visualización de datos",
      "Participé en el proceso completo de desarrollo desde diseño hasta deployment",
      "Aprendí y apliqué metodologías ágiles de desarrollo"
    ],
    technologies: [
      "JavaScript", "React", "Node.js", "Express.js", "MongoDB", 
      "HTML5", "CSS3", "Bootstrap", "Git", "Heroku"
    ],
    current: false
  },
  {
    id: "intern-webdev-freelance",
    company: "Freelance Projects",
    position: "Web Development Intern",
    duration: "Enero 2021 - Mayo 2021",
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-05-31'),
    description: "Prácticas profesionales desarrollando sitios web para pequeñas empresas y emprendedores. Enfoque en desarrollo frontend con tecnologías modernas y mejores prácticas.",
    achievements: [
      "Completé 5+ proyectos web para pequeñas empresas",
      "Desarrollé habilidades en comunicación con clientes",
      "Implementé sitios web responsivos y optimizados para SEO",
      "Aprendí fundamentos de UX/UI design",
      "Establecí bases sólidas en desarrollo web moderno"
    ],
    technologies: [
      "HTML5", "CSS3", "JavaScript", "React", "Sass", 
      "WordPress", "Git", "Photoshop", "Figma"
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
  const startDate = new Date('2021-01-01'); // First professional experience
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