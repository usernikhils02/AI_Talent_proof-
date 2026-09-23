// Roles Database / Dynamic Configuration
// New roles can be dynamically added via store or configuration without redeploying!

export const DEFAULT_ROLES = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    category: 'Engineering',
    badge: 'UI / UX Focus',
    icon: 'Layout',
    summary: 'Craft pixel-perfect, accessible, and hyper-responsive user interfaces with rich animations.',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Web Performance (Lighthouse)', 'State Management'],
    requirements: [
      'Ultra responsive design supporting mobile, tablet, and desktop',
      'Interactive animations, transitions, and accessible UI (WCAG/a11y)',
      'Lighthouse score above 90 in performance & accessibility',
      'Client-side caching and API state orchestration'
    ],
    submissionGuide: 'Submit a visually polished web application with deployed live URL and responsive design.',
    fieldOverrides: {
      liveLabel: 'Deployed / Live Project URL *',
      livePlaceholder: 'https://my-app.vercel.app',
      liveHelp: 'Live production URL where recruiters can test your UI/UX.'
    }
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    category: 'Systems',
    badge: 'Core Infra',
    icon: 'Server',
    summary: 'Design robust APIs, microservices, caching layers, database schemas, and background workers.',
    skills: ['Node.js / Express', 'Python / FastAPI', 'PostgreSQL / MongoDB', 'Redis Caching', 'Docker'],
    requirements: [
      'High-throughput RESTful or GraphQL backend service',
      'Optimized database queries, indexes, and ACID transactions',
      'Rate-limiting, JWT authentication, and security headers',
      'Interactive Swagger / OpenAPI documentation'
    ],
    submissionGuide: 'Submit a backend system with clear schema architecture, API endpoints, and setup instructions.',
    fieldOverrides: {
      liveLabel: 'API Endpoint / Swagger Docs URL *',
      livePlaceholder: 'https://api.my-service.com/docs or Postman collection link',
      liveHelp: 'Live API server URL, Swagger documentation, or public Postman workspace.'
    }
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    category: 'Engineering',
    badge: 'High Demand',
    icon: 'Layers',
    summary: 'Build end-to-end modern web applications with seamless client-server integration and live DB.',
    skills: ['React / Next.js', 'Node.js / Go', 'PostgreSQL / Prisma', 'REST & WebSockets', 'Tailwind CSS'],
    requirements: [
      'Implement responsive UI with frontend state management',
      'Create performant backend APIs with authentication (JWT / OAuth)',
      'Relational or NoSQL database modeling and migrations',
      'Deployed application with CI/CD automation'
    ],
    submissionGuide: 'Submit a functional Full Stack project with frontend, backend, and database connectivity.',
    fieldOverrides: {
      liveLabel: 'Deployed / Live Project URL *',
      livePlaceholder: 'https://my-fullstack-app.vercel.app',
      liveHelp: 'Live web app link demonstrating full end-to-end functionality.'
    }
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    category: 'Mobile',
    badge: 'App Ecosystem',
    icon: 'Smartphone',
    summary: 'Develop cross-platform or native mobile applications with smooth gestures and offline syncing.',
    skills: ['React Native / Expo', 'Flutter', 'Swift / Kotlin', 'Mobile SQLite / Realm', 'Push Notifications'],
    requirements: [
      'Smooth 60fps gesture interactions and responsive screen layouts',
      'Local caching, background state persistence, and offline mode',
      'Native camera, location, or push notification integrations',
      'App build artifact or Expo snack / TestFlight demo link'
    ],
    submissionGuide: 'Submit a mobile application repository with Expo snack, APK release, or TestFlight link.',
    fieldOverrides: {
      liveLabel: 'App Demo / Expo Snack / APK Download Link *',
      livePlaceholder: 'https://snack.expo.dev/@user/my-app or APK release URL',
      liveHelp: 'Public Expo web link, TestFlight invite, or GitHub APK release.'
    }
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    category: 'Infrastructure',
    badge: 'Reliability',
    icon: 'CloudLightning',
    summary: 'Automate build pipelines, container orchestration, and cloud infrastructure monitoring.',
    skills: ['Docker & Podman', 'Kubernetes', 'GitHub Actions / CI/CD', 'Terraform / IaC', 'Prometheus & Grafana'],
    requirements: [
      'Multi-stage Dockerfile builds and compose configurations',
      'Automated testing and continuous delivery workflows',
      'Infrastructure as code or cloud deployment automation',
      'Health check, log aggregation, and observability telemetry'
    ],
    submissionGuide: 'Submit a repository demonstrating reproducible containerization, CI/CD pipelines, and cloud configs.',
    fieldOverrides: {
      liveLabel: 'Live Dashboard / Monitoring Status URL *',
      livePlaceholder: 'https://grafana.my-infra.dev or status page URL',
      liveHelp: 'Public Grafana dashboard, Uptime Kuma status page, or CI/CD test runner report.'
    }
  },
  {
    id: 'data-ml',
    title: 'Data / ML Engineer',
    category: 'AI & Data',
    badge: 'Intelligence',
    icon: 'BrainCircuit',
    summary: 'Develop predictive models, ETL data pipelines, vector databases, and intelligent agent integrations.',
    skills: ['Python', 'Pandas & NumPy', 'PyTorch / HuggingFace', 'LangChain / LlamaIndex', 'FastAPI & Vector DBs'],
    requirements: [
      'Data preprocessing, feature engineering, and EDA pipeline',
      'Model training/fine-tuning or LLM API agent integration',
      'Web interface or API for model inference and evaluation',
      'Model performance metrics & latency benchmarking'
    ],
    submissionGuide: 'Submit an interactive AI tool, machine learning notebook, or data-driven application.',
    fieldOverrides: {
      liveLabel: 'Model Inference Demo / HuggingFace Space URL *',
      livePlaceholder: 'https://huggingface.co/spaces/user/model-demo or Streamlit URL',
      liveHelp: 'Live HuggingFace Space, Streamlit app, or Gradio web inference demo.'
    }
  },
  {
    id: 'qa',
    title: 'QA Engineer',
    category: 'Testing & Quality',
    badge: 'Automation',
    icon: 'ShieldCheck',
    summary: 'Engineer automated end-to-end testing suites, performance benchmarks, and regression tests.',
    skills: ['Playwright / Cypress', 'Jest / Vitest', 'Postman / Newman', 'K6 Load Testing', 'CI Test Workflows'],
    requirements: [
      'Comprehensive E2E and component test suites with high coverage',
      'API contract testing and load testing scripts with k6',
      'Automated test execution on GitHub Actions pull requests',
      'Clear HTML test reporting and failure screenshot artifacts'
    ],
    submissionGuide: 'Submit an automated test suite repository with mock target application and CI runner reports.',
    fieldOverrides: {
      liveLabel: 'Live Allure / Playwright HTML Test Report URL *',
      livePlaceholder: 'https://user.github.io/test-reports or CI artifacts report',
      liveHelp: 'Hosted Playwright HTML report, GitHub Pages test dashboard, or Newman summary.'
    }
  }
];

// Preserved for legacy reference
export const ROLES_DATA = DEFAULT_ROLES;

export const LANGUAGES_DATA = [
  {
    id: 'python',
    name: 'Python',
    tagline: 'Clean syntax, AI/ML, and versatile backend development',
    color: '#3776AB',
    icon: 'Terminal'
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    tagline: 'The universal language of modern web & asynchronous runtimes',
    color: '#F7DF1E',
    icon: 'Code2'
  },
  {
    id: 'java',
    name: 'Java',
    tagline: 'Enterprise-grade OOP, concurrency, and scalable systems',
    color: '#ED8B00',
    icon: 'Coffee'
  },
  {
    id: 'cpp',
    name: 'C++',
    tagline: 'High-performance computing, low-level memory control & algorithms',
    color: '#00599C',
    icon: 'Cpu'
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    tagline: 'Blazing fast concurrency, microservices, and cloud infrastructure',
    color: '#00ADD8',
    icon: 'Zap'
  }
];
