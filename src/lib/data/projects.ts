import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "personal-finance-app",
    title: "App de Finanzas Personales",
    description: "Aplicación móvil full-stack para gestión de tarjetas de crédito, transacciones, cuotas y presupuestos personales con autenticación biométrica.",
    longDescription: "Proyecto completo de finanzas personales compuesto por una app móvil en Flutter y una API REST en Node.js con Express. Permite al usuario administrar múltiples tarjetas de crédito, registrar transacciones, manejar compras en cuotas, planificar presupuestos mensuales y recibir notificaciones push. Incluye autenticación biométrica (Face ID / Touch ID), JWT, encriptación con Bcrypt y tareas programadas para recordatorios de pago.",
    technologies: [
      "Flutter",
      "Dart",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Firebase",
      "Bcrypt",
      "Provider",
      "Dio",
      "Node-cron"
    ],
    features: [
      "Autenticación biométrica (Face ID / Touch ID / Huella)",
      "Gestión de múltiples tarjetas de crédito",
      "Registro y seguimiento de transacciones",
      "Manejo de compras en cuotas con cálculo automático",
      "Presupuestos mensuales con seguimiento en tiempo real",
      "Notificaciones push para recordatorios de pago",
      "Historial completo de movimientos",
      "Tema oscuro con diseño Material moderno"
    ],
    demoUrl: "https://finanzas-dev-bdccc.web.app/",
    githubUrl: "https://github.com/JosDamQ/finanzas-front",
    images: [
      "/images/proyects/Finanzas/Dashboard.jpeg",
      "/images/proyects/Finanzas/Login.png",
    ],
    category: "mobile",
    featured: true
  },
  {
    id: "admin-qs-laravel",
    title: "Panel Admin para Empresa de Logística",
    description: "Sistema de administración web para una empresa de logística que permite gestionar clientes, paquetes, estados de envío y roles de usuarios.",
    longDescription: "Aplicación web desarrollada con Laravel para el panel administrativo de una empresa de logística. Permite gestionar el ciclo completo de los envíos: registro de clientes, creación y seguimiento de paquetes, control de estados, envío de correos y administración de roles y permisos. Incluye autenticación, control de acceso por roles y una arquitectura limpia con DTOs y servicios.",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Blade",
      "Eloquent ORM",
      "Bootstrap",
      "Nodemailer",
      "Laravel Mail"
    ],
    features: [
      "Gestión de clientes y paquetes",
      "Seguimiento de estados de envío",
      "Sistema de roles y permisos",
      "Envío de notificaciones por correo",
      "Panel administrativo completo",
      "Autenticación y control de acceso"
    ],
    githubUrl: "https://github.com/JosDamQ/Admin-QS-Laravel",
    images: [
      "/images/proyects/Admin/Admin.png"
    ],
    category: "fullstack",
    featured: true
  },
  {
    id: "almacenadora-mern",
    title: "Sistema de Control de Almacenadora",
    description: "Plataforma web MERN para gestionar el arrendamiento de bodegas, controlando contratos, clientes e inventario de espacios disponibles.",
    longDescription: "Sistema web desarrollado con el stack MERN (MongoDB, Express, React y Node.js) para una empresa que se dedica al arrendamiento de bodegas. Permite llevar el control de los espacios disponibles, gestionar contratos de arrendamiento, registrar clientes y dar seguimiento a los pagos y vencimientos de cada contrato.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JavaScript",
      "CSS"
    ],
    features: [
      "Gestión de bodegas y espacios disponibles",
      "Registro y administración de contratos de arrendamiento",
      "Control de clientes arrendatarios",
      "Seguimiento de pagos y vencimientos",
      "Panel de control con vista general del inventario",
      "CRUD completo de entidades del negocio"
    ],
    githubUrl: "https://github.com/JosDamQ/ProjectoAlmacenadora",
    images: [
      "/images/proyects/Bodega/Bodega.png"
    ],
    category: "fullstack",
    featured: false
  },
  {
    id: "hora-dental",
    title: "HoraDental - App para Clínica Dental",
    description: "Aplicación de escritorio desarrollada en Java SE para la gestión de citas, pacientes y reportes de una clínica dental.",
    longDescription: "Aplicación de escritorio desarrollada con Java SE para cubrir las necesidades de administración de una clínica dental. Permite gestionar pacientes, programar y controlar citas, y generar reportes detallados usando iReport. Diseñada para correr de forma local sin necesidad de conexión a internet.",
    technologies: [
      "Java SE",
      "iReport",
      "Swing",
      "NetBeans"
    ],
    features: [
      "Registro y gestión de pacientes",
      "Programación y control de citas",
      "Generación de reportes con iReport",
      "Interfaz de escritorio con Java Swing",
      "Gestión de historial clínico"
    ],
    githubUrl: "https://github.com/JosDamQ/HoraDental",
    images: [
      "/images/proyects/HoraDental/image.png"
    ],
    category: "tool",
    featured: false
  },
  {
    id: "url-shortener",
    title: "Acortador de URLs",
    description: "Servicio backend para acortar URLs largas y redirigir a los usuarios mediante códigos únicos.",
    longDescription: "API REST construida con Node.js y Express que permite acortar URLs largas generando un código único para cada una. El servicio maneja la redirección automática al acceder al enlace corto y ofrece una arquitectura modular con separación en servicios y controladores.",
    technologies: [
      "Node.js",
      "Express.js",
      "JavaScript"
    ],
    features: [
      "Acortamiento de URLs con códigos únicos",
      "Redirección automática al acceder al enlace",
      "Arquitectura modular con servicios separados",
      "API REST sencilla y rápida"
    ],
    githubUrl: "https://github.com/JosDamQ/URL-shorting-service",
    images: [],
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
