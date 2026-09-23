# Talent Proof — Verified Talent Intelligence & Proctoring Platform

> **"Don't trust the claim. Verify the skill."**  
> *An end-to-end skill assessment, anti-malpractice AI proctoring, and authentic project verification platform for candidates and enterprise technical recruiters.*

---

## 🎯 Core Project Statement (Executive Overview)

1. Talent Proof is a high-integrity technical skill verification and anti-cheating recruitment platform.
2. Built in a modern White and Violet aesthetic, it eliminates resume exaggeration in software hiring.
3. The platform provides separate, specialized workflows for Student Candidates and Enterprise HR Recruiters.
4. Security begins at registration with strict username validation that bars all special characters.
5. High-entropy password rules mandate at least ten characters, numbers, capitals, and three symbols.
6. The platform establishes two primary verification pathways: Programming Languages and Role Capstones.
7. The language track covers eight languages: Python, JavaScript, TypeScript, Java, C++, C, Go, and Rust.
8. Each track features a progressive three-tier syllabus roadmap spanning Basic, Intermediate, and Advanced.
9. Assessments operate inside a locked full-screen IDE that blocks tabs, window blurs, and dev tools.
10. System lockdown actively suppresses copy and paste shortcuts while displaying violation alerts.
11. Hardware telemetry monitors webcam video for single-face presence and runs live microphone audio meters.
12. Scores above 85% trigger Code Authenticity verification MCQs to prove the candidate wrote the solution.
13. Completing all three levels unlocks Bronze, Silver, or Gold badges and verified PDF certificates.
14. The Role Track features dynamic developer paths: Frontend, Backend, Full Stack, Mobile, DevOps, AI, and QA.
15. New roles are addable dynamically via configuration without requiring code modifications or redeployment.
16. Candidates submit public GitHub repositories, deployed application links, and screen demo video tours.
17. The submission form automatically adapts its inputs per role, such as requesting Swagger URLs for backend.
18. An automated backend pipeline inspects the GitHub API, parses package manifests, and pings live uptime.
19. Extracted repo context feeds an AI engine that generates five to eight project-grounded interview questions.
20. The HR Recruiter Portal presents candidate dossiers, live health checks, and questions ready for interviews.

---

## 🌟 Key Features & Capabilities

### 1. Dual-Portal Authentication & Role Routing
- **Student / Intern Portal**: Take proctored coding assessments, earn Bronze/Silver/Gold badges, unlock accredited certificates, and submit capstone repos.
- **HR Recruiter Portal**: Pipeline dashboard showing applicants, certified talent, submitted repositories with GitHub insights, and live interview question cheat-sheets.
- **Strict Registration Security Guards**:
  - **Username Policy**: Strict alphanumeric validation (`/[^a-zA-Z0-9\s]/`); rejects all special characters with live UI validation cues.
  - **Password Policy**: Enforces high-entropy passwords (minimum 10 characters, at least 3 special characters, numbers, and uppercase letters) with a real-time 4-point visual checklist.

---

### 2. Verified Student Assessment Engine
- **8 Dedicated Language Tracks**: Python, JavaScript, TypeScript, Java, C++, C, Go (Golang), and Rust.
- **Sequential 3-Level Roadmap**:
  - **Level 1 (Basic)**: Algorithmic fundamentals, prime checkers, palindromes, and sorting.
  - **Level 2 (Intermediate)**: Hash map lookups, two-sum optimization, stack bracket validators, and anagram matching.
  - **Level 3 (Advanced)**: Sliding window algorithms, binary tree BFS/DFS queues, and heap optimizations.
- **Accredited Cryptographic Certificates & Badges**:
  - **Bronze**: Awarded for clearing Level 1.
  - **Silver**: Awarded for clearing Level 2.
  - **Gold & Official Certificate**: Unlocked upon mastering Level 3, featuring a unique Credential ID and print-ready verified certificate modal.

---

### 3. Anti-Malpractice & AI Proctoring Lockdown
- **Full-Screen Lockdown**: Uses Fullscreen API; detects focus loss, tab switching, and window blurring.
- **Hardware Telemetry Diagnostics**:
  - Live webcam monitoring with active face presence tracking.
  - Real-time microphone audio meter with decibel telemetry.
- **Keystroke & Shortcut Guard**:
  - Disables copy (`Ctrl+C`), paste (`Ctrl+V`), cut (`Ctrl+X`), developer tools (`F12`), and context menu right-clicks.
  - Displays instant violation toasts and center-screen red violation modals requiring candidate acknowledgment.
- **Code Authenticity Verification (>85% Score Check)**:
  - If a student scores over 85%, an instant secondary assessment triggers 3 conceptual MCQs based on the exact logic and time complexity of the code just written, proving the candidate wrote the solution independently rather than copying.

---

### 4. Dynamic Role Selection & Capstone Project Submission
- **Dynamic Roles Registry**: Roles are loaded dynamically and can be updated without redeploying:
  - Frontend Developer
  - Backend Developer
  - Full Stack Developer
  - Mobile Developer
  - DevOps Engineer
  - Data / ML Engineer
  - QA Engineer
- **Adaptive Input Fields Per Role**:
  - *Backend Developer*: Solicits Swagger / OpenAPI endpoints or Postman workspaces instead of a generic web URL.
  - *Mobile Developer*: Requests Expo Snacks, TestFlight invites, or APK release downloads.
  - *DevOps Engineer*: Asks for live Grafana / status page telemetry.
  - *Data / ML Engineer*: Requests live HuggingFace Spaces or Streamlit inference apps.
  - *QA Engineer*: Requests live Allure / Playwright HTML test reports.
- **Demo Video Integration**: Direct recording link submission (Loom, YouTube, Google Drive).

---

### 5. Automated Backend Processing & Question Synthesis
- **GitHub API Deep Inspection**:
  - Retrieves star counts, forks, default branch, primary language, and complete file trees.
  - Inspects `package.json` / `requirements.txt` to identify installed libraries and automatically detect applied frameworks (React, Next.js, Express, Prisma, Tailwind, PyTorch, FastApi, Playwright).
  - Samples and indexes `README.md` and detects Dockerfiles / CI/CD workflows.
- **Live Deployment Health Check**:
  - Pings the user-supplied live URL / Swagger endpoint to verify live responsiveness and protocol validity.
- **AI-Driven Architectural Question Generation**:
  - Generates 5–8 non-generic interview questions explicitly referencing the candidate's actual architecture:
    - *Architecture Decisions*: *"Why did you pair X with Y over alternatives?"*
    - *Data Flow & Concurrency*: Role-specific caching and state pipelines.
    - *Security Vulnerability Guard*: CSRF, XSS, and payload sanitization locations.
    - *Production Debugging*: Isolating 504 Gateway Timeouts or memory leaks.
    - *100x Traffic Scalability*: Identifying system bottlenecks under sudden load.
    - *Dependency Auditing*: CVE patching and major version migration plans.

---

### 6. HR Recruiter Pipeline Dashboard
- **Comprehensive Applicant Pool**: Filterable by internship role, certification status, and keyword search (name, college, tech stack).
- **Interactive Candidate Dossiers**:
  - Inspect GitHub metrics, package dependencies, and live deployment health.
  - One-click launch of the candidate's demo video and repository code.
  - Access the candidate's project-specific interview cheat-sheet with questions ready for technical interviews.
  - Recruitment status progression: `Applied` → `Under Review` → `Shortlisted` → `Interview Scheduled` → `Hired` with private evaluator notes.

---

## 🛠️ Technology Stack & Architecture

- **Core Frontend**: Modern Vanilla JavaScript (ES6+ Modules), HTML5 Semantic Architecture.
- **Styling**: Vanilla CSS3 Design System with CSS Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism, and micro-animations.
- **State Management**: Reactive in-memory and `localStorage` observable pattern with subscriber events ([`src/state/store.js`](file:///d:/Project/src/state/store.js)).
- **Build Tooling & Bundler**: Vite (lightning-fast HMR and optimized production bundles).
- **Libraries**:
  - `canvas-confetti`: Interactive celebration animations upon assessment and project submission.
  - `lucide`: Clean, modern SVG icon set.

---

## 📁 Directory Structure

```plaintext
TalentProof/
├── index.html                   # HTML shell with modal overlays and app root
├── package.json                 # Project dependencies and Vite build scripts
├── style.css                    # Unified design system tokens, layout & components
├── src/
│   ├── main.js                  # Application entry point, global router & observers
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthPage.js      # Role cards & strict login/registration form
│   │   ├── hr/
│   │   │   ├── HRHome.js        # Recruiter talent pipeline dashboard & analytics
│   │   │   └── CandidateDetailModal.js # Recruiter candidate evaluation dossier
│   │   ├── proctor/
│   │   │   └── ProctoredExam.js # Fullscreen IDE, AI proctoring, shortcuts & MCQs
│   │   ├── student/
│   │   │   ├── InstructionsPage.js  # Platform onboarding & examination rules
│   │   │   ├── StudentHome.js       # Category selection (Languages vs Other Skills)
│   │   │   ├── OtherSkillsPage.js   # Dynamic roles directory
│   │   │   ├── RoleTrack.js         # Dynamic clickable role cards
│   │   │   ├── RoleProjectPage.js   # Adaptive capstone submission & questions
│   │   │   └── CertificateModal.js  # Printable verified certificate modal
│   │   └── verified/
│   │       ├── VerifiedShell.js     # Screenshot-matched navigation shell & sidebar
│   │       ├── LanguageTrackGrid.js # 4-column programming language tracks grid
│   │       └── LevelDashboard.js    # 3-level progression roadmap & lockdown check
│   ├── data/
│   │   ├── initialData.js       # Seed candidate pool & student mock profiles
│   │   ├── roles.js             # Dynamic engineering roles specification
│   │   ├── verifiedBank.js      # Language tracks & syllabi definitions
│   │   └── codingQuestions.js   # 3-level algorithmic problems & test cases
│   ├── services/
│   │   ├── githubService.js     # GitHub API analyzer & deployed URL health pinger
│   │   └── questionGenerator.js # Codebase-grounded interview question generator
│   ├── state/
│   │   └── store.js             # Reactive central store with candidate & role persistence
│   └── utils/
│       └── helpers.js           # XSS escaping, confetti, and formatting utilities
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/talent-proof.git

# 2. Navigate to project directory
cd talent-proof

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will be accessible at:  
👉 **`http://localhost:5173/`**

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 User Walkthrough & Testing Scenarios

1. **Role Selection & Registration**:
   - Choose **Student** or **HR Recruiter**.
   - Test password security by entering simple passwords to see live requirement feedback.
   - Enter a username containing special characters like `@` or `#` to test strict input blocking.
2. **Programming Languages Path**:
   - Navigate to **Programming languages**.
   - Select **Python** or **JavaScript** to view the syllabus and level roadmap.
   - Launch Level 1 to enter the proctored IDE:
     - Allow camera/mic permissions.
     - Try pressing `Ctrl+C` or `Ctrl+V` to see the keyboard shortcut blocker in action.
     - Pass test cases to trigger the post-exam Code Authenticity MCQs.
3. **Capstone Submission Path**:
   - Navigate to **Other skills**.
   - Click on **Backend Developer** or **Full Stack Developer**.
   - Submit a public GitHub repository and live deployment URL.
   - Observe automatic package analysis, live health check, and generated interview questions.
4. **Recruiter Evaluation**:
   - Sign in as an **HR Recruiter**.
   - Inspect applicants, review candidate codebases, and view the AI-generated questions directly in the candidate dossier.

---

## 🔒 Security & Anti-Cheating Standards
- **DOM & Sandbox Isolation**: Disables developer shortcuts and right-click inspection during active testing sessions.
- **Code Ownership Verification**: Guards against generative AI plagiarism by requiring candidates to defend the algorithmic properties of their solutions immediately post-submission.
- **Client-Side Sanitization**: All user-submitted strings are escaped against cross-site scripting (XSS) via safe HTML entity conversion.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
