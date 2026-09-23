import { LANGUAGES_DATA } from '../../data/roles.js';
import { getBadgeDetails, escapeHtml } from '../../utils/helpers.js';

export function renderLanguageTracks(student, onStartAssessment, onViewCertificate) {
  const container = document.createElement('div');
  container.className = 'grid-2';

  LANGUAGES_DATA.forEach(lang => {
    const langProgress = student.assessmentProgress[lang.id] || {
      level1: { passed: false },
      level2: { passed: false },
      level3: { passed: false },
      badgeEarned: null,
      certified: false
    };

    const badgeInfo = getBadgeDetails(langProgress.badgeEarned);

    const card = document.createElement('div');
    card.className = 'white-panel lang-card';
    card.style.borderTop = `4px solid ${lang.color || 'var(--violet-primary)'}`;

    const l1Passed = langProgress.level1?.passed;
    const l2Passed = langProgress.level2?.passed;
    const l3Passed = langProgress.level3?.passed;

    card.innerHTML = `
      <div>
        <div class="lang-header">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main);">${escapeHtml(lang.name)}</h3>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Popularity ${lang.popularity}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(lang.tagline)}</p>
          </div>
          <div>
            ${badgeInfo ? `
              <span class="lang-badge-pill" style="background: ${badgeInfo.bg}; color: ${badgeInfo.color}; border: 1px solid ${badgeInfo.border};">
                ${badgeInfo.icon} ${badgeInfo.name}
              </span>
            ` : `
              <span class="lang-badge-pill" style="background: #f1f5f9; color: var(--text-muted); border: 1px solid var(--border-subtle);">
                Not Started
              </span>
            `}
          </div>
        </div>

        <p style="font-size: 0.9rem; color: #475569; margin-bottom: 1rem; line-height: 1.5;">${escapeHtml(lang.description)}</p>

        <!-- 3-Level Stepper -->
        <div class="level-track">
          <!-- Level 1 -->
          <div class="level-row ${l1Passed ? 'completed' : ''}">
            <div class="level-info">
              <div class="level-num-badge ${l1Passed ? 'passed' : ''}">${l1Passed ? '✓' : '1'}</div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">Level 1: Fundamentals & Syntax</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Reward: Bronze Apprentice Badge</div>
              </div>
            </div>
            <div>
              ${l1Passed 
                ? `<span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-emerald);">Passed ✓</span>`
                : `<button class="btn btn-primary btn-sm btn-start-test" data-lang="${lang.id}" data-level="1">Take Test</button>`
              }
            </div>
          </div>

          <!-- Level 2 -->
          <div class="level-row ${l2Passed ? 'completed' : (!l1Passed ? 'locked' : '')}">
            <div class="level-info">
              <div class="level-num-badge ${l2Passed ? 'passed' : ''}">${l2Passed ? '✓' : '2'}</div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">Level 2: Logic, Concurrency & Data Structures</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Reward: Silver Specialist Badge</div>
              </div>
            </div>
            <div>
              ${l2Passed 
                ? `<span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-emerald);">Passed ✓</span>`
                : (!l1Passed 
                    ? `<span style="font-size: 0.75rem; color: var(--text-faint); font-weight: 600;">Locked (Pass L1)</span>`
                    : `<button class="btn btn-primary btn-sm btn-start-test" data-lang="${lang.id}" data-level="2">Take Test</button>`
                  )
              }
            </div>
          </div>

          <!-- Level 3 -->
          <div class="level-row ${l3Passed ? 'completed' : (!l2Passed ? 'locked' : '')}">
            <div class="level-info">
              <div class="level-num-badge ${l3Passed ? 'passed' : ''}">${l3Passed ? '✓' : '3'}</div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">Level 3: Advanced Optimization & Architecture</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Reward: Gold Badge + Official Certificate</div>
              </div>
            </div>
            <div>
              ${l3Passed 
                ? `<span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-emerald);">Mastered 🏆</span>`
                : (!l2Passed 
                    ? `<span style="font-size: 0.75rem; color: var(--text-faint); font-weight: 600;">Locked (Pass L2)</span>`
                    : `<button class="btn btn-primary btn-sm btn-start-test" data-lang="${lang.id}" data-level="3">Take Test</button>`
                  )
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          Status: <strong style="color: var(--text-main);">${l3Passed ? 'Certificate Issued' : (l2Passed ? '2 of 3 Completed' : (l1Passed ? '1 of 3 Completed' : 'Ready to Start'))}</strong>
        </div>
        ${langProgress.certified ? `
          <button class="btn btn-secondary btn-sm btn-view-cert" data-lang="${lang.id}" style="color: var(--violet-primary); font-weight: 700;">
            📜 View Certificate
          </button>
        ` : `
          <span style="font-size: 0.8rem; color: var(--text-muted);">Complete Level 3 for Certificate</span>
        `}
      </div>
    `;

    card.querySelectorAll('.btn-start-test').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const langId = e.currentTarget.getAttribute('data-lang');
        const levelNum = parseInt(e.currentTarget.getAttribute('data-level'), 10);
        onStartAssessment(langId, levelNum);
      });
    });

    const certBtn = card.querySelector('.btn-view-cert');
    if (certBtn) {
      certBtn.addEventListener('click', (e) => {
        const langId = e.currentTarget.getAttribute('data-lang');
        onViewCertificate(langId);
      });
    }

    container.appendChild(card);
  });

  return container;
}
