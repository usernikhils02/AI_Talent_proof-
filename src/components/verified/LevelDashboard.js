import { escapeHtml } from '../../utils/helpers.js';

export function renderLevelDashboard(container, lang, studentProgress, onStartLevel, onBack) {
  // Level progression status
  const p1Passed = studentProgress?.level1?.passed || false;
  const p2Passed = studentProgress?.level2?.passed || false;
  const p3Passed = studentProgress?.level3?.passed || false;

  container.innerHTML = `
    <div style="max-width: 980px; margin: 0 auto; padding-bottom: 4rem;">
      <!-- Breadcrumb -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
        <button id="btn-back-tracks" class="btn btn-secondary btn-sm" style="font-weight: 700; color: #635bff;">
          ← Back to All Language Tracks
        </button>
        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">
          Candidate: <strong>${escapeHtml(studentProgress.name || 'Nikhil S')}</strong>
        </span>
      </div>

      <!-- Header with Verified Purple Check -->
      <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 2rem;">
        <div style="width: 58px; height: 58px; border-radius: 16px; background: linear-gradient(135deg, #635bff, #7c3aed); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.85rem; box-shadow: 0 8px 20px rgba(99, 91, 255, 0.25);">
          ${lang.icon || '💻'}
        </div>
        <div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2;">
            ${escapeHtml(lang.name)} Certification Roadmap
          </h1>
          <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.25rem;">
            Clear 3 sequential levels. Scores above 85% trigger anti-malpractice Code Authenticity Verification.
          </p>
        </div>
      </div>

      <!-- Pre-Assessment System Lockdown Checkpoint -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 1.5rem 1.75rem; margin-bottom: 2.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: #635bff;">🛡️</span> Anti-Malpractice & System Lockdown Checkpoint
          </h3>
          <span style="font-size: 0.75rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.25rem 0.65rem; border-radius: 9999px;">
            ● Systems Ready
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.65rem;">
            <span style="color: #059669; font-weight: 800;">✓</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Webcam Stream</div>
              <div style="font-size: 0.75rem; color: #64748b;">AI Face Presence Active</div>
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.65rem;">
            <span style="color: #059669; font-weight: 800;">✓</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Microphone Audio</div>
              <div style="font-size: 0.75rem; color: #64748b;">Decibel Telemetry Calibrated</div>
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.65rem;">
            <span style="color: #059669; font-weight: 800;">✓</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Screen Lockdown</div>
              <div style="font-size: 0.75rem; color: #64748b;">Tab & Blur Interceptor On</div>
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.65rem;">
            <span style="color: #059669; font-weight: 800;">✓</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">Keystroke Guard</div>
              <div style="font-size: 0.75rem; color: #64748b;">Copy/Paste & DevTools blocked</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3 Sequential Levels -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Level 1: Basic -->
        <div class="level-card-step ${p1Passed ? 'passed' : 'unlocked'}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span class="chip-difficulty chip-basic" style="font-size: 0.75rem;">Level 1</span>
                <span style="font-size: 0.8rem; font-weight: 700; color: #059669;">● UNLOCKED</span>
                ${p1Passed ? '<span style="font-size: 0.8rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.15rem 0.55rem; border-radius: 9999px;">✓ Passed (Score: 100%)</span>' : ''}
              </div>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a;">
                Basic: Fundamentals, Prime Checkers & Sorting
              </h3>
              <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.35rem; max-width: 600px; line-height: 1.5;">
                Covers prime validation algorithms, selection/bubble sort iterations, string reversals, and palindrome checks.
              </p>
            </div>
            <div>
              <button class="btn btn-primary btn-launch-level" data-level="1" style="background: #635bff; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 12px; box-shadow: 0 4px 14px rgba(99, 91, 255, 0.28);">
                ${p1Passed ? 'Re-take Assessment' : 'Launch Assessment →'}
              </button>
            </div>
          </div>
        </div>

        <!-- Level 2: Intermediate -->
        <div class="level-card-step ${p2Passed ? 'passed' : (p1Passed ? 'unlocked' : 'locked')}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span class="chip-difficulty chip-intermediate" style="font-size: 0.75rem;">Level 2</span>
                ${p1Passed ? '<span style="font-size: 0.8rem; font-weight: 700; color: #d97706;">● UNLOCKED</span>' : '<span style="font-size: 0.8rem; font-weight: 700; color: #94a3b8;">🔒 LOCKED (Clear Level 1 first)</span>'}
                ${p2Passed ? '<span style="font-size: 0.8rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.15rem 0.55rem; border-radius: 9999px;">✓ Passed (Score: 100%)</span>' : ''}
              </div>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a;">
                Intermediate: Two Sum, Stack Validators & Hash Anagrams
              </h3>
              <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.35rem; max-width: 600px; line-height: 1.5;">
                Covers hash map two-sum O(n) lookups, stack bracket matching, and dictionary anagram bucketing.
              </p>
            </div>
            <div>
              <button class="btn btn-primary btn-launch-level" data-level="2" ${!p1Passed ? 'disabled style="opacity: 0.5; cursor: not-allowed; background: #94a3b8;"' : 'style="background: #635bff; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 12px;"'}>
                ${p2Passed ? 'Re-take Assessment' : (p1Passed ? 'Launch Assessment →' : 'Locked')}
              </button>
            </div>
          </div>
        </div>

        <!-- Level 3: Advanced -->
        <div class="level-card-step ${p3Passed ? 'passed' : (p2Passed ? 'unlocked' : 'locked')}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem;">
                <span class="chip-difficulty chip-advanced" style="font-size: 0.75rem;">Level 3</span>
                ${p2Passed ? '<span style="font-size: 0.8rem; font-weight: 700; color: #e11d48;">● UNLOCKED</span>' : '<span style="font-size: 0.8rem; font-weight: 700; color: #94a3b8;">🔒 LOCKED (Clear Level 2 first)</span>'}
                ${p3Passed ? '<span style="font-size: 0.8rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.15rem 0.55rem; border-radius: 9999px;">✓ Mastered (Certificate Issued)</span>' : ''}
              </div>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a;">
                Advanced: Sliding Windows, BFS Tree Traversal & Min-Heaps
              </h3>
              <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.35rem; max-width: 600px; line-height: 1.5;">
                Covers longest substring sliding windows, binary tree BFS queues, and merge k-sorted min-heaps in O(N log k).
              </p>
            </div>
            <div>
              <button class="btn btn-primary btn-launch-level" data-level="3" ${!p2Passed ? 'disabled style="opacity: 0.5; cursor: not-allowed; background: #94a3b8;"' : 'style="background: #635bff; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 12px;"'}>
                ${p3Passed ? 'Review Certificate' : (p2Passed ? 'Launch Assessment →' : 'Locked')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Back button
  container.querySelector('#btn-back-tracks').addEventListener('click', onBack);

  // Launch assessment buttons
  container.querySelectorAll('.btn-launch-level').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const levelNum = parseInt(e.currentTarget.getAttribute('data-level'), 10);
      onStartLevel(levelNum);
    });
  });
}
