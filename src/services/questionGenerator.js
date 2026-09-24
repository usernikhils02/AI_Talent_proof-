/**
 * Project-Specific Technical Interview Question Generator
 * Uses extracted repository context (tech stack, README, dependencies, role)
 * to generate 5-8 deeply project-grounded questions referencing the actual codebase,
 * architecture decisions, "why X over Y", and debugging/scaling challenges.
 */

import { generateDynamicInterviewQuestions } from './aiService.js';

export async function generateTechnicalQuestions({ roleTitle, roleId, repoMetadata, projectTitle, techStack }) {
  // First, attempt to generate real AI questions using Gemini via LangChain/Prompt Guardrails!
  try {
    const aiQuestions = await generateDynamicInterviewQuestions(repoMetadata, roleTitle);
    if (aiQuestions && Array.isArray(aiQuestions) && aiQuestions.length > 0) {
      return aiQuestions;
    }
  } catch (error) {
    console.error("AI Generation failed, falling back to heuristic engine", error);
  }

  // AI Fallback (Static Template Generator)
  const frameworks = repoMetadata.detectedFrameworks?.length 
    ? repoMetadata.detectedFrameworks 
    : (techStack?.length ? techStack : ['Modern Web Stack']);

  const primaryLang = repoMetadata.primaryLanguage || 'JavaScript/TypeScript';
  const deps = (repoMetadata.dependencies || []).slice(0, 8);
  const repoName = repoMetadata.repo || projectTitle || 'Project';

  // Role-specific architectural probing logic
  const questions = [];

  // Question 1: Architecture & Technology Selection ("Why X over Y")
  if (frameworks.length > 1) {
    questions.push({
      id: 'q-1',
      category: 'Architecture & Design Decisions',
      difficulty: 'Intermediate',
      question: `In your repository "${repoName}", you selected ${frameworks[0]} alongside ${frameworks[1]}. What trade-offs did you evaluate before choosing ${frameworks[0]} over alternative frameworks, and how does this pairing benefit the application's performance characteristics?`
    });
  } else {
    questions.push({
      id: 'q-1',
      category: 'Architecture & Design Decisions',
      difficulty: 'Intermediate',
      question: `In your repository "${repoName}", you utilized ${primaryLang} as the core implementation. What design patterns or modular folder conventions did you establish to prevent tight coupling across modules?`
    });
  }

  // Question 2: Data Flow, State Management & Concurrency
  if (roleId === 'frontend') {
    questions.push({
      id: 'q-2',
      category: 'State Management & Rendering',
      difficulty: 'Intermediate',
      question: `How did you manage application state and API caching in "${repoName}"? When handling rapid asynchronous user actions, how did you prevent unnecessary re-renders and layout shifts?`
    });
  } else if (roleId === 'backend') {
    questions.push({
      id: 'q-2',
      category: 'Data Modeling & API Design',
      difficulty: 'Advanced',
      question: `Looking at your backend dependencies (${deps.slice(0, 3).join(', ') || 'REST API'}), how did you structure database indexing and transaction safety to avoid N+1 query bottlenecks during concurrent read/write workloads?`
    });
  } else if (roleId === 'fullstack') {
    questions.push({
      id: 'q-2',
      category: 'End-to-End Data Pipeline',
      difficulty: 'Advanced',
      question: `In your full stack architecture, walk through the exact lifecycle of an authenticated request from client dispatch to database persistence and cache invalidation. How do you guarantee type safety between the frontend and backend contracts?`
    });
  } else if (roleId === 'mobile') {
    questions.push({
      id: 'q-2',
      category: 'Mobile State & Offline Persistence',
      difficulty: 'Intermediate',
      question: `How does "${repoName}" handle offline data persistence and state synchronization when mobile users transit through spotty network connections without blocking the main UI thread?`
    });
  } else if (roleId === 'devops') {
    questions.push({
      id: 'q-2',
      category: 'CI/CD & Pipeline Orchestration',
      difficulty: 'Advanced',
      question: `In your repository pipeline configurations, how did you optimize Docker layer caching and artifact build times? How do you prevent secret leakage across continuous integration stages?`
    });
  } else if (roleId === 'data-ml') {
    questions.push({
      id: 'q-2',
      category: 'Model Inference & Pipeline Latency',
      difficulty: 'Advanced',
      question: `How did you structure the data transformation pipeline in "${repoName}"? What was the p95 latency for your inference endpoint, and how did you mitigate GPU/memory bottlenecks under parallel batch inference?`
    });
  } else {
    // QA
    questions.push({
      id: 'q-2',
      category: 'Test Architecture & Flakiness Prevention',
      difficulty: 'Intermediate',
      question: `In your automated test suite for "${repoName}", how did you handle asynchronous DOM hydration and flaky test retries without relying on arbitrary hardcoded sleep timers?`
    });
  }

  // Question 3: Security & Authentication / Defensive Coding
  questions.push({
    id: 'q-3',
    category: 'Security & Defensive Engineering',
    difficulty: 'Intermediate',
    question: `What security attack vectors (such as CSRF, SQL/NoSQL injection, XSS, or CORS misconfigurations) did you explicitly guard against in "${repoName}", and where in your codebase are incoming request payloads sanitized or validated?`
  });

  // Question 4: Debugging & Production Incident Simulation
  questions.push({
    id: 'q-4',
    category: 'Debugging & Incident Resolution',
    difficulty: 'Advanced',
    question: `Suppose a production error log reports intermittent 504 Gateway Timeouts or client UI freezing on your deployed application. How would you isolate whether the root cause originated from unhandled database connection pools, memory leaks, or unoptimized bundle sizes?`
  });

  // Question 5: Scalability & 100x Traffic Growth
  questions.push({
    id: 'q-5',
    category: 'Scalability & System Evolution',
    difficulty: 'Advanced',
    question: `If traffic to "${projectTitle || repoName}" multiplied by 100x tomorrow, which component in your current architecture would reach capacity first, and what concrete steps (e.g. read replicas, horizontal autoscaling, Redis caching, or CDN edge compute) would you deploy to scale it?`
  });

  // Question 6: Dependency Maintenance & Version Upgrades
  if (deps.length > 0) {
    questions.push({
      id: 'q-6',
      category: 'Dependency Ecosystem & Maintenance',
      difficulty: 'Intermediate',
      question: `Your codebase leverages ${deps[0]} and ${deps[1] || 'core libraries'}. Have you audited these third-party dependencies for known CVE vulnerabilities or breaking major version updates, and how would you execute a zero-downtime migration?`
    });
  }

  // Question 7: Role-Specific Deep Dive
  if (roleId === 'backend' || roleId === 'fullstack') {
    questions.push({
      id: 'q-7',
      category: 'Concurrency & Error Handling',
      difficulty: 'Intermediate',
      question: `How does your API handle graceful degradation when external third-party microservices or database network calls fail? Did you implement retry backoff policies or circuit breaker patterns?`
    });
  } else if (roleId === 'frontend') {
    questions.push({
      id: 'q-7',
      category: 'Web Vitals & Performance',
      difficulty: 'Intermediate',
      question: `What strategies did you use in "${repoName}" to optimize Core Web Vitals (LCP, FID/INP, and CLS)? How did you handle code-splitting, lazy loading, and asset image compression?`
    });
  } else {
    questions.push({
      id: 'q-7',
      category: 'Code Quality & Continuous Testing',
      difficulty: 'Intermediate',
      question: `How are unit tests and integration tests structured in "${repoName}"? What is your strategy for mocking network boundaries and maintaining test reliability across environments?`
    });
  }

  return questions;
}
