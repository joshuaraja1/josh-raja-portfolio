export const profile = {
  name: 'Josh Raja',
  firstName: 'josh',
  email: 'Joshua.Raja.654@gmail.com',
  github: 'https://github.com/joshuaraja1',
  linkedin: 'https://www.linkedin.com/in/joshraja/',
  intro: 'Software engineer and AI/ML builder in Dallas. I build enterprise applications at Weboni and make projects across data, search, and intelligent systems.',
  about: 'I’m currently a Machine Learning Engineer at Weboni, where I build data pipelines and integrations for business applications. Before that I worked on full-stack software at Weboni and Nebula Labs, and data science at Renuity.',
  personal: 'I’m pursuing an M.S. in Business Analytics and AI at UT Dallas. Outside work, I like building practical tools that connect software, data, and real-world decisions.',
  technologies: ['Python', 'TypeScript', 'React.js', 'FastAPI', 'PostgreSQL', 'AWS'],
}

export const experience = [
  {
    label: 'Weboni · ML',
    role: 'Machine Learning Engineer',
    company: 'Weboni',
    period: 'JAN 2026 - PRESENT',
    points: [
      'Built batch and streaming pipelines processing more than 500K daily events for forecasting, segmentation, anomaly detection, and model inference.',
      'Reduced data-quality defects by 82% with validation, reconciliation, automated tests, and remediation workflows.',
      'Integrated Odoo ERP and internal applications with Python services, REST APIs, PostgreSQL, and SQL Server.',
    ],
  },
  {
    label: 'Weboni · SWE',
    role: 'Software Engineer',
    company: 'Weboni',
    period: 'JAN 2025 - DEC 2025',
    points: [
      'Developed full-stack enterprise applications with React, Angular, Node.js, Python, Java, and C#.',
      'Increased deployment throughput by 40% through Docker and automated AWS build, test, and release workflows.',
      'Connected ERP, CRM, reporting, and operations systems through authenticated REST APIs and reusable services.',
    ],
  },
  {
    label: 'Renuity',
    role: 'Data Science Intern',
    company: 'Renuity',
    period: 'SEP 2024 - DEC 2024',
    points: [
      'Built ETL infrastructure processing more than 50K daily customer records using Python, SQL, and validation controls.',
      'Developed a churn-ranking workflow with 83% precision and automated recurring reporting.',
    ],
  },
  {
    label: 'Nebula Labs',
    role: 'Software Engineer',
    company: 'Nebula Labs',
    period: 'AUG 2023 - MAY 2024',
    points: [
      'Built full-stack applications, APIs, and data-ingestion services for an academic platform serving more than 2,000 active users.',
      'Developed React interfaces and services with TypeScript, Go, Python, PostgreSQL, and MongoDB.',
    ],
  },
]

export const projects = [
  {
    title: 'FinanceIQ',
    description: 'A six-agent financial analysis platform coordinating market data, quantitative analysis, risk evaluation, and report generation. Placed fifth in the Goldman Sachs AI Challenge.',
    stack: 'PYTHON, FASTAPI, REACT, POSTGRESQL',
    github: 'https://github.com/joshuaraja1/financeiq',
    demo: 'https://financeiq-gilt.vercel.app/',
    visual: 'finance',
  },
  {
    title: 'RideIQ',
    description: 'A natural-language vehicle recommendation platform built for the Toyota Mobility Challenge at HackTAMU 2026, where it placed first.',
    stack: 'NEXT.JS, TYPESCRIPT, POSTGRESQL, PGVECTOR',
    github: 'https://github.com/joshuaraja1/HackTamu2026',
    visual: 'ride',
  },
  {
    title: 'Nebula Labs',
    description: 'A student-facing academic intelligence platform for courses, professors, schedules, and university data.',
    stack: 'REACT, TYPESCRIPT, GO, MONGODB',
    github: 'https://github.com/joshuaraja1/Nebula-Labs',
    visual: 'nebula',
  },
  {
    title: 'LandIQ',
    description: 'A land-investment analytics tool with data pipelines, property ranking, and interactive decision dashboards. Placed first in the Lennar Innovation Challenge.',
    stack: 'PYTHON, STREAMLIT, PLOTLY, SQL',
    github: 'https://github.com/joshuaraja1/LandIQ',
    visual: 'land',
  },
]
