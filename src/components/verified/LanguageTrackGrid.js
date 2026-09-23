import { store } from '../../state/store.js';
import { VERIFIED_LANGUAGES } from '../../data/verifiedBank.js';
import { escapeHtml } from '../../utils/helpers.js';

export function renderVerifiedLanguageTracks(container, onSelectLanguage) {
  let searchQuery = '';

  function render() {
    const filtered = VERIFIED_LANGUAGES.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    container.innerHTML = `
      <div>
        <!-- Page Title & Header -->
        <div style="margin-bottom: 1.5rem;">
          <button id="btn-back-to-categories" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #635bff; border-color: #ddd6fe; background: #ffffff; padding: 0.5rem 1rem; border-radius: 10px; margin-bottom: 1.25rem; cursor: pointer;">
            ← Back to Verification Selection (Roles / Skills)
          </button>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div>
            <h1 style="font-size: 2.15rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2;">
              Select Your Assessment Language
            </h1>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.4rem;">
              Choose a programming track to view syllabi, test your coding skills, and earn badges
            </p>
          </div>

          <!-- Language Search input matching screenshot -->
          <div style="position: relative; width: 280px;">
            <svg style="position: absolute; left: 12px; top: 11px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="lang-track-search" placeholder="Search language..." value="${escapeHtml(searchQuery)}" style="width: 100%; padding: 0.6rem 1rem 0.6rem 2.4rem; border: 1.5px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 0.9rem; outline: none; background: #fff;" />
          </div>
        </div>

        <!-- 4-Column Grid matching Screenshot -->
        <div class="verified-languages-grid">
          ${filtered.map(lang => `
            <div class="verified-track-card" data-lang-id="${lang.id}">
              <div>
                <!-- Top Row: Icon and '3 LEVELS' badge -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                  <div class="verified-track-icon">
                    <span>&lt;/&gt;</span>
                  </div>
                  <span class="verified-levels-pill">
                    3 LEVELS
                  </span>
                </div>

                <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; letter-spacing: -0.01em;">
                  ${escapeHtml(lang.name)}
                </h3>

                <p style="font-size: 0.85rem; color: #64748b; line-height: 1.5; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${escapeHtml(lang.summary)}
                </p>

                <!-- 3 Level Chips (Basic, Intermediate, Advanced) -->
                <div style="display: flex; gap: 0.4rem; margin-bottom: 1.5rem;">
                  <span class="chip-difficulty chip-basic">Basic</span>
                  <span class="chip-difficulty chip-intermediate">Intermediate</span>
                  <span class="chip-difficulty chip-advanced">Advanced</span>
                </div>
              </div>

              <!-- Button: View Syllabus & Start -->
              <button class="btn-verified-start btn-start-track" data-lang-id="${lang.id}">
                <span>View Syllabus & Start</span>
                <span style="font-size: 1.1rem; line-height: 1;">→</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind back to categories button
    const backBtn = container.querySelector('#btn-back-to-categories');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        store.setView('student-home');
      });
    }

    // Bind search
    const searchEl = container.querySelector('#lang-track-search');
    searchEl.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      const el = container.querySelector('#lang-track-search');
      el.focus();
      el.setSelectionRange(searchQuery.length, searchQuery.length);
    });

    // Bind Start buttons
    container.querySelectorAll('.btn-start-track').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const langId = e.currentTarget.getAttribute('data-lang-id');
        onSelectLanguage(langId);
      });
    });
  }

  render();
}
