export const profile = {
  name: 'Josh Raja',
  firstName: 'josh',
  email: 'Joshua.Raja.654@gmail.com',
  github: 'https://github.com/joshuaraja1',
  linkedin: 'https://www.linkedin.com/in/joshraja/',
  intro: 'Software engineer in Dallas building Python data services, event-driven backends, and dependable data platforms.',
  about: 'I build repeatable data processing, booking-event consistency, and validation across connected systems for financial services, energy, and airline programs. I care about the failure modes that decide whether a system can be trusted: retries, incomplete data, schema changes, and reproducible recovery.',
  personal: 'I earned a B.S. in Computer Information Systems and Technology from UT Dallas in May 2026. Outside work, I build practical systems across autonomous flight, financial analysis, and recommendation software.',
  technologies: ['Python', 'Java', 'Kafka', 'Snowflake', 'PostgreSQL', 'Docker'],
}

export const experience = [
  {
    label: 'Weboni · Citi',
    role: 'Machine Learning Engineer',
    company: 'Weboni · Client: Citigroup',
    period: 'JUN 2026 - PRESENT',
    points: [
      'Implemented governed reference-data delivery from ingestion through curated models to downstream consumers within a TCS-led modernization program.',
      'Replaced nightly full reloads with idempotent, partition-level incremental processing and date-range replay, preventing duplicates during backfills and upstream restatements.',
      'Added key-field checksum, referential-integrity, and schema-contract checks after row-count validation failed to detect NULL values in restated data.',
      'Configured versioned model delivery through NVIDIA Triton with shadow validation and canary checks, catching a feature-scaling regression before traffic expansion.',
    ],
  },
  {
    label: 'Weboni · Shell',
    role: 'Software Engineer · Part-Time Co-op',
    company: 'Weboni · Client: Shell',
    period: 'OCT 2025 - MAY 2026',
    points: [
      'Built ingestion, curated transformations, and downstream delivery for an asset sensor-data domain in an Accenture-led Cortex program.',
      'Reduced nightly processing from approximately 90 minutes to 20 minutes with idempotent incremental loads and replay jobs for missing windows.',
      'Implemented per-tag completeness checks against expected cadence to distinguish missing sensor observations from genuine zero production.',
      'Turned unmapped tags and unit-normalization defects into explicit failures, with runbooks and rollback plans for client-controlled releases.',
    ],
  },
  {
    label: 'Weboni · Southwest',
    role: 'Software Engineer · Part-Time Co-op',
    company: 'Weboni · Client: Southwest Airlines',
    period: 'JAN 2025 - SEP 2025',
    points: [
      'Implemented an append-only booking event store, replay projections, and parity verification for a staged legacy cutover completed without data loss.',
      'Prevented duplicate bookings after gateway retries by enforcing idempotency keys and replaying the original result for repeated requests.',
      'Used a transactional outbox, retry handling, and consumer deduplication to keep booking writes and downstream events consistent.',
      'Added contract tests for two downstream consumers, catching a split-passenger-record parity mismatch before customer rollout.',
    ],
  },
  {
    label: 'Renuity',
    role: 'Data Science Intern',
    company: 'Renuity',
    period: 'SEP 2024 - DEC 2024',
    points: [
      'Reduced recurring customer-data preparation from approximately two hours to 15 minutes using Airflow, AWS Lambda, Python, and SQL validation.',
      'Achieved approximately 83% precision versus a 57% baseline with a scikit-learn churn model tuned for a precise retention list.',
      'Resolved dashboard and model discrepancies by pinning both consumers to a shared, versioned dataset and delivered cohort and model-error reporting.',
    ],
  },
  {
    label: 'Weboni · Avis',
    role: 'Software Engineering Intern',
    company: 'Weboni · Client: Avis Budget Group',
    period: 'MAY 2024 - AUG 2024',
    points: [
      'Built Playwright tests for booking, rental, and search workflows and integrated them into GitHub Actions as deployment gates.',
      'Diagnosed a session-update race condition caused by concurrent writes, serialized the write path, and added a reproducing regression test.',
      'Helped reduce the post-migration defect backlog from approximately 60 open items to 10 and built a Python Jira-to-CSV trend digest.',
    ],
  },
  {
    label: 'Nebula Labs',
    role: 'Software Engineer · Part-Time',
    company: 'Nebula Labs',
    period: 'AUG 2023 - MAY 2024',
    points: [
      'Built course-search and material-browsing features serving more than 2,000 active users with React, FastAPI, PostgreSQL, and Redis.',
      'Reduced search latency from approximately 500 to 80 milliseconds and kept retrieval under three seconds across more than 10,000 documents.',
      'Cut batch indexing from approximately four hours to 15 minutes with parallel workers and checkpointed progress that resumed interrupted runs.',
      'Increased deployment frequency from twice-monthly releases to approximately five per week through Jenkins and Docker automation.',
    ],
  },
]

export const projects = [
  {
    title: 'Polaris',
    description: 'An autonomous fixed-wing aircraft platform with Python and C++ telemetry ingestion, MAVLink and ROS 2 integration, ordered event processing, link-staleness detection, and fault injection.',
    stack: 'PYTHON, C++, KAFKA, FASTAPI, ROS 2, MAVLINK',
    github: 'https://github.com/joshuaraja1/Polaris',
    visual: 'polaris',
  },
  {
    title: 'FinanceIQ',
    description: 'A multi-stage financial analysis workflow with deterministic calculations, source-aware validation, and parallel agent branches. Placed fifth in the Goldman Sachs AI Challenge.',
    stack: 'PYTHON, LANGGRAPH, FASTAPI, POSTGRESQL, NEXT.JS',
    github: 'https://github.com/joshuaraja1/financeiq',
    demo: 'https://financeiq-gilt.vercel.app/demo',
    demoLabel: 'Explore demo',
    visual: 'finance',
  },
  {
    title: 'RideIQ',
    description: 'A vehicle discovery platform with structured filters, model-generated recommendations, explainable constraint relaxation, Vitest coverage, and prompt-output evaluation. Won the Toyota Mobility Challenge at HackTAMU 2026.',
    stack: 'TYPESCRIPT, NEXT.JS, SUPABASE, SQL, VITEST',
    github: 'https://github.com/joshuaraja1/HackTamu2026',
    devpost: 'https://devpost.com/software/rideiq',
    visual: 'ride',
  },
  {
    title: 'LandIQ',
    description: 'A land-investment screening platform that reconciles parcel data, validates model inputs, scores risk with XGBoost, and exposes contributing features in interactive dashboards. Won the Lennar Innovation Challenge.',
    stack: 'PYTHON, SPARK, XGBOOST, DBT, STREAMLIT',
    github: 'https://github.com/joshuaraja1/LandIQ',
    devpost: 'https://devpost.com/software/landiq',
    visual: 'land',
  },
]
