export const profile = {
  name: 'Josh Raja',
  firstName: 'josh',
  email: 'Joshua.Raja.654@gmail.com',
  github: 'https://github.com/joshuaraja1',
  linkedin: 'https://www.linkedin.com/in/joshraja/',
  intro: 'Machine learning engineer and software builder in Dallas. I build production forecasting systems, scalable services, and practical products across AI, data, and the web.',
  about: 'I’m currently a Machine Learning Engineer at Weboni, building demand-forecasting systems for Lululemon with SageMaker, PyTorch, Snowflake, and NVIDIA Triton. My earlier work spans commerce microservices, data science, full-stack engineering, and delivery automation.',
  personal: 'I’m pursuing an M.S. in Business Analytics and AI at UT Dallas. Outside work, I like building practical tools that connect software, data, and real-world decisions.',
  technologies: ['Python', 'PyTorch', 'AWS SageMaker', 'Java', 'React.js', 'PostgreSQL'],
}

export const experience = [
  {
    label: 'Weboni · ML',
    role: 'Machine Learning Engineer',
    company: 'Weboni · Client: Lululemon',
    period: 'JAN 2026 - PRESENT',
    points: [
      'Built an apparel demand-forecasting service for the planning team, developing Python pipelines on Amazon SageMaker to train gradient-boosted and PyTorch sequence models using sales, inventory, and promotion data from Snowflake.',
      'Deployed models through NVIDIA Triton with shadow validation and canary rollouts, comparing new versions against the incumbent before expanding production traffic.',
      'Improved forecast error from approximately 32% to 27% sMAPE, helping planners make better-informed production and inventory allocation decisions.',
      'Implemented monitoring for data drift and forecast accuracy, with automated alerts and retraining triggers to identify deteriorating model performance.',
    ],
  },
  {
    label: 'Weboni · SWE',
    role: 'Software Engineer',
    company: 'Weboni · Client: Costco',
    period: 'JAN 2025 - DEC 2025',
    points: [
      'Extracted order-management and checkout functionality from a legacy Oracle Commerce/ATG platform into a Java Spring microservice, completing the production cutover without data loss.',
      'Reduced p95 checkout latency from 800 to 450 milliseconds through Redis caching and PostgreSQL read replicas, relieving database contention on customer-facing workflows.',
      'Introduced Kafka-based order events to decouple checkout from notification and billing services, reducing order-processing errors by approximately 30%.',
      'Containerized and deployed the service to Kubernetes through CI/CD, establishing release checks supported by Grafana dashboards for latency, error rates, and queue health.',
    ],
  },
  {
    label: 'Renuity',
    role: 'Data Science Intern',
    company: 'Renuity',
    period: 'SEP 2024 - DEC 2024',
    points: [
      'Developed a Python churn-prediction model with 83% precision, helping the team identify at-risk customers and prioritize retention outreach.',
      'Automated customer-data preparation using Airflow and AWS Lambda, reducing processing time from two hours to 15 minutes.',
      'Analyzed customer cohorts and model errors to identify churn patterns and improve the features supporting retention recommendations.',
      'Created Tableau and Streamlit dashboards that translated analytical findings into actionable insights and reduced manual reporting effort.',
    ],
  },
  {
    label: 'Weboni · Intern',
    role: 'Software Engineer Intern',
    company: 'Weboni · Client: Avis Budget Group',
    period: 'MAY 2024 - AUG 2024',
    points: [
      'Built a Playwright end-to-end testing suite for a migrated self-service application, covering booking, rental, and search workflows and adding automated checks to the deployment pipeline.',
      'Helped reduce the open defect backlog from approximately 60 to 10 by resolving issues across React components and Node.js APIs.',
      'Diagnosed and fixed a session-update race condition that intermittently logged customers out during booking, adding a regression test to prevent recurrence.',
      'Developed a Jira-to-CSV reporting script adopted by the engagement lead to track daily defect trends and prioritize fixes.',
    ],
  },
  {
    label: 'Nebula Labs',
    role: 'Software Engineer',
    company: 'Nebula Labs',
    period: 'AUG 2023 - MAY 2024',
    points: [
      'Built and maintained student-facing search and data applications serving more than 2,000 active users, contributing across backend services, frontend features, and database integrations.',
      'Reduced search latency from 500 to 80 milliseconds through database indexing, query optimization, and Redis caching.',
      'Developed ingestion and validation workflows that kept application data consistent and made processing failures easier to diagnose.',
      'Automated build and deployment workflows with Jenkins and Docker, enabling the team to move from twice-monthly releases to five deployments per week.',
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
