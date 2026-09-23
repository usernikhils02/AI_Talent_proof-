export const INITIAL_STUDENTS = [
  {
    id: 'stud-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@techuniv.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'Indian Institute of Information Technology',
    gradYear: 2026,
    bio: 'Passionate full-stack & systems developer enthusiastic about distributed architectures and microservices.',
    github: 'https://github.com/aarav-dev',
    linkedin: 'https://linkedin.com/in/aarav-sharma',
    appliedRole: 'fullstack',
    status: 'Shortlisted', // Applied, Under Review, Shortlisted, Interview Scheduled, Hired
    hrNotes: 'Strong performance on JavaScript level 3 assessment. Clean MERN architecture in project submission.',
    assessmentProgress: {
      javascript: {
        level1: { passed: true, score: 100, completedAt: '2026-09-18' },
        level2: { passed: true, score: 100, completedAt: '2026-09-19' },
        level3: { passed: true, score: 100, completedAt: '2026-09-20' },
        badgeEarned: 'Gold',
        certified: true,
        certId: 'CERT-JS-8921-AARAV',
        certDate: 'Sep 20, 2026'
      },
      python: {
        level1: { passed: true, score: 100, completedAt: '2026-09-21' },
        level2: { passed: true, score: 100, completedAt: '2026-09-22' },
        level3: { passed: false, score: 0 },
        badgeEarned: 'Silver',
        certified: false
      }
    },
    submittedProject: {
      roleId: 'fullstack',
      roleTitle: 'Full Stack Engineer Intern',
      title: 'CloudSync - Collaborative Real-Time Workspace',
      description: 'A production-grade document collaboration suite with live operational transform (OT), JWT RBAC authorization, and Redis session store.',
      githubUrl: 'https://github.com/aarav-dev/cloudsync-suite',
      liveUrl: 'https://cloudsync-live-preview.dev',
      techStack: ['React', 'Node.js', 'Redis', 'Socket.io', 'PostgreSQL'],
      submittedAt: 'Sep 21, 2026',
      status: 'Verified'
    }
  },
  {
    id: 'stud-2',
    name: 'Priya Patel',
    email: 'priya.patel@engg.ac.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'National Institute of Technology',
    gradYear: 2027,
    bio: 'Python specialist focusing on data pipelines, RESTful backend microservices, and AI integrations.',
    github: 'https://github.com/priyapatel-ai',
    linkedin: 'https://linkedin.com/in/priya-patel',
    appliedRole: 'data-ai',
    status: 'Interview Scheduled',
    hrNotes: 'Scored 100% on Python 3-level assessment. Verified certificate verified. Excellent project demo.',
    assessmentProgress: {
      python: {
        level1: { passed: true, score: 100, completedAt: '2026-09-15' },
        level2: { passed: true, score: 100, completedAt: '2026-09-16' },
        level3: { passed: true, score: 100, completedAt: '2026-09-17' },
        badgeEarned: 'Gold',
        certified: true,
        certId: 'CERT-PY-5421-PRIYA',
        certDate: 'Sep 17, 2026'
      }
    },
    submittedProject: {
      roleId: 'data-ai',
      roleTitle: 'AI & Data Science Intern',
      title: 'DocuSense - LLM Knowledge Retrieval Assistant',
      description: 'End-to-end RAG architecture parsing PDF whitepapers with vector similarity search (ChromaDB) and FastAPI backend.',
      githubUrl: 'https://github.com/priyapatel-ai/docusense-rag',
      liveUrl: 'https://docusense-ai.dev',
      techStack: ['Python', 'FastAPI', 'ChromaDB', 'LangChain', 'Docker'],
      submittedAt: 'Sep 18, 2026',
      status: 'Verified'
    }
  },
  {
    id: 'stud-3',
    name: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@polytech.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'Vellore Institute of Technology',
    gradYear: 2026,
    bio: 'Backend systems engineer with expertise in Go, Java microservices, and resilient database caching.',
    github: 'https://github.com/rohandesh',
    linkedin: 'https://linkedin.com/in/rohandesh',
    appliedRole: 'backend',
    status: 'Under Review',
    hrNotes: 'Completed Golang Level 2 and Java Level 1. Good backend project submission.',
    assessmentProgress: {
      golang: {
        level1: { passed: true, score: 100, completedAt: '2026-09-22' },
        level2: { passed: true, score: 100, completedAt: '2026-09-23' },
        level3: { passed: false, score: 0 },
        badgeEarned: 'Silver',
        certified: false
      },
      java: {
        level1: { passed: true, score: 100, completedAt: '2026-09-20' },
        level2: { passed: false, score: 0 },
        level3: { passed: false, score: 0 },
        badgeEarned: 'Bronze',
        certified: false
      }
    },
    submittedProject: {
      roleId: 'backend',
      roleTitle: 'Backend Specialist Intern',
      title: 'PulseStream - Distributed Event Ingestion Service',
      description: 'High-throughput event queue with worker pools, PostgreSQL partitioning, and Prometheus metrics endpoint.',
      githubUrl: 'https://github.com/rohandesh/pulsestream-go',
      liveUrl: 'https://pulsestream-api.dev',
      techStack: ['Go', 'PostgreSQL', 'Docker', 'Prometheus', 'Redis'],
      submittedAt: 'Sep 23, 2026',
      status: 'Pending HR Review'
    }
  }
];

export const CURRENT_STUDENT_DEFAULT = {
  id: 'current-user-1',
  name: 'Devin Vance',
  email: 'devin.vance@student.edu',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  college: 'Apex Institute of Technology',
  gradYear: 2026,
  bio: 'Ambitious software engineering student specializing in frontend ecosystems and MERN full-stack development.',
  github: 'https://github.com/devin-vance',
  linkedin: 'https://linkedin.com/in/devin-vance',
  appliedRole: null,
  status: 'Applied',
  hrNotes: '',
  assessmentProgress: {
    javascript: {
      level1: { passed: false, score: 0 },
      level2: { passed: false, score: 0 },
      level3: { passed: false, score: 0 },
      badgeEarned: null,
      certified: false
    },
    python: {
      level1: { passed: false, score: 0 },
      level2: { passed: false, score: 0 },
      level3: { passed: false, score: 0 },
      badgeEarned: null,
      certified: false
    },
    java: {
      level1: { passed: false, score: 0 },
      level2: { passed: false, score: 0 },
      level3: { passed: false, score: 0 },
      badgeEarned: null,
      certified: false
    },
    cpp: {
      level1: { passed: false, score: 0 },
      level2: { passed: false, score: 0 },
      level3: { passed: false, score: 0 },
      badgeEarned: null,
      certified: false
    },
    golang: {
      level1: { passed: false, score: 0 },
      level2: { passed: false, score: 0 },
      level3: { passed: false, score: 0 },
      badgeEarned: null,
      certified: false
    }
  },
  submittedProject: null
};
