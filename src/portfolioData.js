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
      'Designed and deployed a multi-client credit-risk decisioning pipeline processing 250,000+ scoring events daily across application, prescreening, portfolio-monitoring, and cross-sell eligibility workflows.',
      'Built FastAPI inference services on AWS with schema validation, audit logging, PII controls, and automated deployment for real-time and batch scoring under a 99.95% service objective.',
      'Developed data-quality and model-monitoring checks for schema drift, anomalous inputs, and prediction distributions, reducing recurring production data-quality defects by 82%.',
      'Implemented and evaluated an XGBoost fraud-detection model with 97% recall at a 2% false-positive rate on the approved evaluation dataset.',
      'Partnered with product, risk, compliance, and engineering stakeholders on explainable outputs, reason codes, monitoring thresholds, and release criteria.',
    ],
  },
  {
    label: 'Weboni · SWE',
    role: 'Software Engineer',
    company: 'Weboni',
    period: 'JAN 2025 - DEC 2025',
    points: [
      'Developed services for a microservices-based loan-origination platform processing 200,000+ daily API and workflow events, reducing average processing time from 24 hours to 4 hours.',
      'Implemented serverless services with AWS Lambda and API Gateway, reducing infrastructure cost by 40% while supporting variable client traffic.',
      'Built Grafana and Prometheus dashboards covering 50+ service, data, and reliability metrics, reducing incident-detection time by 70%.',
      'Improved release pipelines through automated tests, quality gates, and deployment checks, increasing deployment throughput by 40% while enabling repeatable, lower-risk rollbacks.',
    ],
  },
  {
    label: 'Renuity',
    role: 'Data Science Intern',
    company: 'Renuity',
    period: 'SEP 2024 - DEC 2024',
    points: [
      'Built a customer-churn pipeline with Python, SQL, pandas, and scikit-learn, achieving 83% precision and supplying prioritized customer segments to retention stakeholders.',
      'Automated Airflow and AWS Lambda ETL workflows processing 50,000+ customer records daily, reducing pipeline runtime from two hours to 15 minutes.',
      'Developed Streamlit, Plotly, and Tableau dashboards for churn, customer segmentation, and anomaly analysis, cutting recurring manual reporting time by 50%.',
    ],
  },
  {
    label: 'Weboni · Intern',
    role: 'Software Engineer Intern',
    company: 'Weboni',
    period: 'MAY 2024 - AUG 2024',
    points: [
      'Developed REST APIs for a loan-application workflow handling 50,000+ daily requests and improved response time by 40% through query optimization and Redis caching.',
      'Added Jest and Cypress unit and integration tests, increasing coverage to 85% and reducing post-deployment defects by 40%.',
      'Implemented OAuth 2.0/JWT authentication and Prometheus/Grafana monitoring for secure access and faster incident diagnosis.',
    ],
  },
  {
    label: 'Nebula Labs',
    role: 'Software Engineer',
    company: 'Nebula Labs',
    period: 'AUG 2023 - MAY 2024',
    points: [
      'Built full-stack features for a university records platform serving 2,000+ active users using React, Go, Python, and PostgreSQL.',
      'Reduced average query latency from 500 ms to 80 ms through indexing, query-plan analysis, and schema changes.',
      'Created a Jenkins and Docker CI/CD pipeline that increased deployment frequency from twice monthly to five times weekly.',
    ],
  },
]

export const projects = [
  {
    title: 'FinanceIQ',
    description: 'A six-agent financial analysis platform coordinating market data, quantitative analysis, risk evaluation, and report generation. Placed fifth in the Goldman Sachs AI Challenge.',
    stack: 'PYTHON, FASTAPI, REACT, POSTGRESQL',
    github: 'https://github.com/joshuaraja1/financeiq',
    demo: 'https://financeiq-gilt.vercel.app/demo',
    demoLabel: 'Explore demo',
    visual: 'finance',
  },
  {
    title: 'RideIQ',
    description: 'A natural-language vehicle recommendation platform built for the Toyota Mobility Challenge at HackTAMU 2026, where it placed first.',
    stack: 'NEXT.JS, TYPESCRIPT, POSTGRESQL, PGVECTOR',
    github: 'https://github.com/joshuaraja1/HackTamu2026',
    devpost: 'https://devpost.com/software/rideiq',
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
    devpost: 'https://devpost.com/software/landiq',
    visual: 'land',
  },
]
