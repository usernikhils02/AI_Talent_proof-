import { store } from '../../state/store.js';

export function renderStudentHome(container) {
  const student = store.getCurrentStudent();

  container.innerHTML = `
    <div class="container" style="padding-bottom: 5rem;">
      <!-- Search Bar matching reference screenshot -->
      <div class="talentproof-search-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="talentproof-search-input" placeholder="Search programming languages, syllabi, topics, coding challenges..." />
        <button id="btn-revisit-instructions" class="btn btn-secondary btn-sm" style="font-size: 0.825rem; white-space: nowrap; gap: 0.35rem; color: var(--violet-primary); font-weight: 700;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          How It Works
        </button>
      </div>

      <!-- Main "What do you want to get verified on?" Header matching screenshot -->
      <div class="verification-header">
        <h1 class="verification-heading">What do you want to get verified on?</h1>
        <p class="verification-subheading">
          Pick a skill category. Programming languages are proven with a timed coding exam. Every other skill is proven by submitting a real project repo for AI review.
        </p>
      </div>

      <!-- 2 Distinct Buttons/Cards from the screenshot that navigate to new dedicated pages -->
      <div class="verification-cards-grid">
        <!-- Card 1: Navigates to Programming languages page -->
        <div id="btn-nav-programming-languages" class="verification-card">
          <div class="verification-card-icon">
            <span>{ }</span>
          </div>
          <h2 class="verification-card-title">Programming languages</h2>
          <p class="verification-card-desc">
            C, C++, Java, Python, JavaScript, Go, Rust, SQL, and more — basic → intermediate → advanced coding exam.
          </p>
          <div style="margin-top: 1.25rem; font-size: 0.9rem; font-weight: 700; color: var(--violet-primary); display: flex; align-items: center; gap: 0.35rem;">
            Explore Languages & Tests →
          </div>
        </div>

        <!-- Card 2: Navigates to Other skills page -->
        <div id="btn-nav-other-skills" class="verification-card">
          <div class="verification-card-icon" style="color: var(--accent-emerald); background: #d1fae5;">
            <span>✓</span>
          </div>
          <h2 class="verification-card-title">Other skills</h2>
          <p class="verification-card-desc">
            Web development, AI/ML, cloud, data, cybersecurity, DevOps, design, and more — submit a project repo.
          </p>
          <div style="margin-top: 1.25rem; font-size: 0.9rem; font-weight: 700; color: #059669; display: flex; align-items: center; gap: 0.35rem;">
            Explore Roles & Submit Repos →
          </div>
        </div>
      </div>
    </div>
  `;

  // Navigate to Instructions page
  container.querySelector('#btn-revisit-instructions').addEventListener('click', () => {
    store.setView('instructions');
  });

  // Navigate to Programming Languages page
  container.querySelector('#btn-nav-programming-languages').addEventListener('click', () => {
    store.setView('programming-languages');
  });

  // Navigate to Other Skills page
  container.querySelector('#btn-nav-other-skills').addEventListener('click', () => {
    store.setView('other-skills');
  });

  // Search filter
  const searchInput = container.querySelector('#talentproof-search-input');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.toLowerCase().trim();
      if (q.includes('skill') || q.includes('role') || q.includes('project') || q.includes('full') || q.includes('mern')) {
        store.setView('other-skills');
      } else {
        store.setView('programming-languages');
      }
    }
  });
}
