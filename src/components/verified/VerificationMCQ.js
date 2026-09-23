import { escapeHtml } from '../../utils/helpers.js';

export function renderVerificationMCQ(container, examResult, onVerificationCleared, onFailed) {
  const { problem, submittedCode, score, authenticityQuestions } = examResult;
  let currentQIdx = 0;
  let answers = new Array(authenticityQuestions.length).fill(null);

  function render() {
    const q = authenticityQuestions[currentQIdx];
    const totalQ = authenticityQuestions.length;

    container.innerHTML = `
      <div style="max-width: 860px; margin: 2rem auto; padding-bottom: 5rem;">
        <!-- Authenticity Trigger Banner -->
        <div style="background: linear-gradient(135deg, #ede9fe, #f5f3ff); border: 2px solid #7c3aed; border-radius: 20px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.1);">
          <div style="display: flex; align-items: flex-start; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; font-weight: 800; color: #fff; background: #059669; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.5rem;">
                🎯 Coding Score: ${score}% (Threshold &gt; 85% Met)
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                🧠 Code Authenticity &amp; Logic Ownership Verification
              </h1>
              <p style="font-size: 0.95rem; color: #475569; margin-top: 0.35rem; line-height: 1.6;">
                Because you scored <strong>${score}%</strong>, the VERIFIED anti-malpractice engine generates dynamic follow-up questions directly evaluating the exact logic, algorithms, and complexity in your submitted code.
              </p>
            </div>
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #7c3aed; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);">
              🛡️
            </div>
          </div>
        </div>

        <!-- Submitted Code Snippet Reference -->
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: #0f172a;">Your Submitted Code (${escapeHtml(problem.title)}):</span>
            <span style="font-size: 0.75rem; color: #64748b;">Read-Only Reference</span>
          </div>
          <pre style="background: #1e1b4b; color: #38bdf8; font-family: var(--font-mono); font-size: 0.85rem; padding: 1rem; border-radius: 10px; max-height: 220px; overflow-y: auto; margin: 0; white-space: pre-wrap;"><code>${escapeHtml(submittedCode)}</code></pre>
        </div>

        <!-- Question Box -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.85rem; font-weight: 800; color: #7c3aed;">
              Ownership Verification Question ${currentQIdx + 1} of ${totalQ}
            </span>
            <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">
              Passing Requirement: &gt;= 80%
            </span>
          </div>

          <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; line-height: 1.5;">
            ${escapeHtml(q.question)}
          </h3>

          <!-- Options -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            ${q.options.map((opt, idx) => `
              <button class="auth-mcq-opt-btn ${answers[currentQIdx] === idx ? 'selected' : ''}" data-idx="${idx}">
                <span style="font-weight: 800; color: #7c3aed; margin-right: 0.65rem;">${String.fromCharCode(65 + idx)}.</span>
                <span>${escapeHtml(opt)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid #e2e8f0;">
            <div>
              ${currentQIdx > 0 ? `
                <button id="btn-auth-prev" class="btn btn-secondary btn-sm">Previous</button>
              ` : ''}
            </div>
            <div>
              ${currentQIdx < totalQ - 1 ? `
                <button id="btn-auth-next" class="btn btn-primary" ${answers[currentQIdx] === null ? 'disabled style="opacity: 0.5;"' : ''}>
                  Next Question →
                </button>
              ` : `
                <button id="btn-auth-finish" class="btn btn-primary" style="background: #059669;" ${answers[currentQIdx] === null ? 'disabled style="opacity: 0.5;"' : ''}>
                  ✓ Validate Code Ownership
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind option selection
    container.querySelectorAll('.auth-mcq-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        answers[currentQIdx] = idx;
        render();
      });
    });

    const prevBtn = container.querySelector('#btn-auth-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentQIdx--;
        render();
      });
    }

    const nextBtn = container.querySelector('#btn-auth-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentQIdx++;
        render();
      });
    }

    const finishBtn = container.querySelector('#btn-auth-finish');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        // Grade authenticity
        let correctCount = 0;
        authenticityQuestions.forEach((qItem, i) => {
          if (answers[i] === qItem.correctIndex) correctCount++;
        });

        const percent = Math.round((correctCount / totalQ) * 100);
        if (percent >= 80) {
          onVerificationCleared(percent);
        } else {
          onFailed(percent);
        }
      });
    }
  }

  render();
}
