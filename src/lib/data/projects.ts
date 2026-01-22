import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "Plataforma completa de comercio electrónico con carrito de compras, pagos seguros y panel de administración.",
    longDescription: "Desarrollo completo de una plataforma de comercio electrónico desde cero, incluyendo frontend responsive, API REST, integración de pagos con Stripe, sistema de gestión de inventario y panel de administración. La aplicación maneja más de 1000 productos y procesa transacciones de forma segura.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "Tailwind CSS"],
    features: [
      "Carrito de compras dinámico",
      "Procesamiento de pagos seguro",
      "Panel de administración completo",
      "Gestión de inventario en tiempo real",
      "Sistema de autenticación y autorización",
      "Búsqueda y filtrado avanzado"
    ],
    demoUrl: "https://ecommerce-demo.alexrodriguez.dev",
    githubUrl: "https://github.com/alex-rodriguez/ecommerce-platform",
    images: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg"
    ],
    category: "fullstack",
    featured: true
  },
  {
    id: "task-management-app",
    title: "Task Management App",
    description: "Aplicación web colaborativa para gestión de tareas y proyectos con funcionalidades en tiempo real.",
    longDescription: "Aplicación de gestión de tareas inspirada en Trello y Asana, con funcionalidades de colaboración en tiempo real usando WebSockets. Incluye tableros Kanban, asignación de tareas, comentarios, notificaciones push y sincronización automática entre dispositivos.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io", "NextAuth.js"],
    features: [
      "Tableros Kanban interactivos",
      "Colaboración en tiempo real",
      "Sistema de notificaciones",
      "Asignación y seguimiento de tareas",
      "Comentarios y menciones",
      "Sincronización automática"
    ],
    demoUrl: "https://taskapp-demo.alexrodriguez.dev",
    githubUrl: "https://github.com/alex-rodriguez/task-management",
    images: [
      "/images/projects/taskapp-1.jpg",
      "/images/projects/taskapp-2.jpg"
    ],
    category: "web",
    featured: true
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Dashboard interactivo del clima con visualización de datos, mapas y pronósticos extendidos.",
    longDescription: "Dashboard completo del clima que integra múltiples APIs meteorológicas para mostrar condiciones actuales, pronósticos de 7 días, mapas interactivos y alertas meteorológicas. Incluye geolocalización, búsqueda por ciudad y visualización de datos históricos.",
    technologies: ["React", "D3.js", "OpenWeather API", "Mapbox", "Chart.js", "PWA"],
    features: [
      "Pronósticos detallados de 7 días",
      "Mapas meteorológicos interactivos",
      "Alertas y notificaciones",
      "Geolocalización automática",
      "Gráficos de tendencias históricas",
      "Aplicación web progresiva (PWA)"
    ],
    demoUrl: "https://weather-dashboard.alexrodriguez.dev",
    githubUrl: "https://github.com/alex-rodriguez/weather-dashboard",
    images: [
      "/images/projects/weather-1.jpg",
      "/images/projects/weather-2.jpg"
    ],
    category: "web",
    featured: false
  },
  {
    id: "mobile-fitness-tracker",
    title: "Mobile Fitness Tracker",
    description: "Aplicación móvil para seguimiento de ejercicios y rutinas de entrenamiento personalizado.",
    longDescription: "Aplicación móvil desarrollada con React Native para el seguimiento de actividades físicas, creación de rutinas personalizadas, registro de progreso y análisis de rendimiento. Integra con dispositivos wearables y APIs de salud del dispositivo.",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "Health Kit", "Google Fit"],
    features: [
      "Seguimiento de ejercicios y rutinas",
      "Integración con dispositivos wearables",
      "Análisis de progreso y estadísticas",
      "Rutinas personalizadas",
      "Sincronización con apps de salud",
      "Recordatorios y notificaciones"
    ],
    githubUrl: "https://github.com/alex-rodriguez/fitness-tracker",
    images: [
      "/images/projects/fitness-1.jpg",
      "/images/projects/fitness-2.jpg"
    ],
    category: "mobile",
    featured: false
  },
  {
    id: "code-snippet-manager",
    title: "Code Snippet Manager",
    description: "Herramienta para desarrolladores para organizar, buscar y compartir fragmentos de código.",
    longDescription: "Aplicación web para desarrolladores que permite organizar fragmentos de código por lenguaje y categoría, con funcionalidades de búsqueda avanzada, sintaxis highlighting, etiquetado y compartición. Incluye extensión para VS Code y CLI tool.",
    technologies: ["Vue.js", "Nuxt.js", "Elasticsearch", "Prism.js", "Node.js", "Docker"],
    features: [
      "Organización por lenguajes y tags",
      "Búsqueda avanzada y filtros",
      "Syntax highlighting automático",
      "Compartición y colaboración",
      "Extensión para VS Code",
      "API REST y CLI tool"
    ],
    demoUrl: "https://snippets.alexrodriguez.dev",
    githubUrl: "https://github.com/alex-rodriguez/snippet-manager",
    images: [
      "/images/projects/snippets-1.jpg"
    ],
    category: "tool",
    featured: false
  }
];

// Helper functions for project data
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};