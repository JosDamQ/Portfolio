import { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
  // Frontend Skills
  {
    name: "React",
    category: "frontend",
    yearsOfExperience: 2.5,
    icon: "react"
  },
  {
    name: "Next.js",
    category: "frontend",
    yearsOfExperience: 1.5,
    icon: "nextjs"
  },
  {
    name: "TypeScript",
    category: "frontend",
    yearsOfExperience: 2,
    icon: "typescript"
  },
  {
    name: "JavaScript",
    category: "frontend",
    yearsOfExperience: 3,
    icon: "javascript"
  },
  {
    name: "Vue.js",
    category: "frontend",
    yearsOfExperience: 1,
    icon: "vue"
  },
  {
    name: "HTML5",
    category: "frontend",
    yearsOfExperience: 3,
    icon: "html5"
  },
  {
    name: "CSS3",
    category: "frontend",
    yearsOfExperience: 3,
    icon: "css3"
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    yearsOfExperience: 2,
    icon: "tailwind"
  },
  {
    name: "Sass/SCSS",
    category: "frontend",
    yearsOfExperience: 2.5,
    icon: "sass"
  },
  {
    name: "React Native",
    category: "frontend",
    yearsOfExperience: 1,
    icon: "react"
  },

  // Backend Skills
  {
    name: "Node.js",
    category: "backend",
    yearsOfExperience: 2,
    icon: "nodejs"
  },
  {
    name: "Express.js",
    category: "backend",
    yearsOfExperience: 2,
    icon: "express"
  },
  {
    name: "Python",
    category: "backend",
    yearsOfExperience: 1.5,
    icon: "python"
  },
  {
    name: "FastAPI",
    category: "backend",
    yearsOfExperience: 1,
    icon: "fastapi"
  },
  {
    name: "REST APIs",
    category: "backend",
    yearsOfExperience: 2.5,
    icon: "api"
  },
  {
    name: "GraphQL",
    category: "backend",
    yearsOfExperience: 1,
    icon: "graphql"
  },
  {
    name: "Socket.io",
    category: "backend",
    yearsOfExperience: 1,
    icon: "socketio"
  },

  // Database Skills
  {
    name: "MongoDB",
    category: "database",
    yearsOfExperience: 2,
    icon: "mongodb"
  },
  {
    name: "PostgreSQL",
    category: "database",
    yearsOfExperience: 1.5,
    icon: "postgresql"
  },
  {
    name: "MySQL",
    category: "database",
    yearsOfExperience: 1,
    icon: "mysql"
  },
  {
    name: "Redis",
    category: "database",
    yearsOfExperience: 0.5,
    icon: "redis"
  },
  {
    name: "Prisma",
    category: "database",
    yearsOfExperience: 1,
    icon: "prisma"
  },
  {
    name: "Mongoose",
    category: "database",
    yearsOfExperience: 2,
    icon: "mongoose"
  },

  // Tools and Technologies
  {
    name: "Git",
    category: "tools",
    yearsOfExperience: 3,
    icon: "git"
  },
  {
    name: "GitHub",
    category: "tools",
    yearsOfExperience: 3,
    icon: "github"
  },
  {
    name: "VS Code",
    category: "tools",
    yearsOfExperience: 3,
    icon: "vscode"
  },
  {
    name: "Docker",
    category: "tools",
    yearsOfExperience: 1,
    icon: "docker"
  },
  {
    name: "AWS",
    category: "tools",
    yearsOfExperience: 0.5,
    icon: "aws"
  },
  {
    name: "Vercel",
    category: "tools",
    yearsOfExperience: 1.5,
    icon: "vercel"
  },
  {
    name: "Netlify",
    category: "tools",
    yearsOfExperience: 1,
    icon: "netlify"
  },
  {
    name: "Figma",
    category: "tools",
    yearsOfExperience: 2,
    icon: "figma"
  },
  {
    name: "Postman",
    category: "tools",
    yearsOfExperience: 2,
    icon: "postman"
  },
  {
    name: "Jest",
    category: "tools",
    yearsOfExperience: 1.5,
    icon: "jest"
  },
  {
    name: "Cypress",
    category: "tools",
    yearsOfExperience: 0.5,
    icon: "cypress"
  },

  // Other Skills
  {
    name: "Agile/Scrum",
    category: "other",
    yearsOfExperience: 2,
    icon: "agile"
  },
  {
    name: "UI/UX Design",
    category: "other",
    yearsOfExperience: 2,
    icon: "design"
  },
  {
    name: "SEO",
    category: "other",
    yearsOfExperience: 1.5,
    icon: "seo"
  },
  {
    name: "Performance Optimization",
    category: "other",
    yearsOfExperience: 1.5,
    icon: "performance"
  },
  {
    name: "Responsive Design",
    category: "other",
    yearsOfExperience: 2.5,
    icon: "responsive"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: skills.filter(skill => skill.category === 'frontend'),
    icon: "monitor"
  },
  {
    name: "Backend",
    skills: skills.filter(skill => skill.category === 'backend'),
    icon: "server"
  },
  {
    name: "Database",
    skills: skills.filter(skill => skill.category === 'database'),
    icon: "database"
  },
  {
    name: "Tools & DevOps",
    skills: skills.filter(skill => skill.category === 'tools'),
    icon: "wrench"
  },
  {
    name: "Other",
    skills: skills.filter(skill => skill.category === 'other'),
    icon: "plus"
  }
];

// Helper functions for skills data
export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 10): Skill[] => {
  return skills
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .slice(0, limit);
};

export const getWebDevelopmentSkills = (): Skill[] => {
  const webTechnologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 
    'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'
  ];
  return skills.filter(skill => webTechnologies.includes(skill.name));
};

export const getSkillByName = (name: string): Skill | undefined => {
  return skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());
};