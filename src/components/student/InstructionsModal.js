export function renderStudentInstructions(onDismiss) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.id = 'instructions-modal';

  overlay.innerHTML = `
    <div class="modal-window" style="max-width: 760px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--bg-violet-tint); color: var(--violet-primary); display: flex; align-items: center; justify-content: center; font-weight: 800;">
            ℹ️
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading);">Talent Proof Student Guide</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">How your skill verification & hiring pipeline works</p>
          </div>
        </div>
        <button id="btn-close-instructions-x" class="close-btn">&times;</button>
      </div>

      <div class="modal-body" style="padding: 2rem;">
        <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">
          Welcome to <strong>Talent Proof</strong>! Our portal allows students and aspiring interns to demonstrate genuine, verified technical skills directly to HR recruiters through timed coding assessments and verified project capstones.
        </p>

        <div class="instructions-steps-grid">
          <div class="instruction-step-card">
            <div class="instruction-step-num">1</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">Select Skill Category</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Choose between <strong>Programming Languages</strong> (timed coding evaluations) or <strong>Other Skills</strong> (role-based capstone project reviews).
            </p>
          </div>

          <div class="instruction-step-card">
            <div class="instruction-step-num">2</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">Pass 3 Skill Levels</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              <strong>Level 1:</strong> Fundamentals & Syntax (Bronze Badge)<br/>
              <strong>Level 2:</strong> Logic & Concurrency (Silver Badge)<br/>
              <strong>Level 3:</strong> Architecture & Optimization (Gold Master Badge)
            </p>
          </div>

          <div class="instruction-step-card">
            <div class="instruction-step-num">3</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">Official Certificate</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Clearing Level 3 awards an official cryptographically verified skill certificate with unique Credential ID, verifiable by HR recruiters.
            </p>
          </div>

          <div class="instruction-step-card">
            <div class="instruction-step-num">4</div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">Submit Project Repo</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              Upload your GitHub repo and live demo matching your target role (Full Stack, MERN, Backend, etc.). Recruiters review it for interview scheduling.
            </p>
          </div>
        </div>

        <div style="background: var(--bg-violet-subtle); border: 1px solid var(--border-violet); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.5rem;">💡</span>
          <p style="font-size: 0.85rem; color: var(--violet-dark); margin: 0; line-height: 1.5;">
            <strong>Pro-tip:</strong> You can review or re-open these instructions anytime by clicking the <em>"How It Works"</em> button on your student dashboard.
          </p>
        </div>
      </div>

      <div class="modal-footer">
        <button id="btn-got-it" class="btn btn-primary" style="padding: 0.75rem 2rem;">
          Got it, Start Verification →
        </button>
      </div>
    </div>
  `;

  function close() {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
      if (onDismiss) onDismiss();
    }, 200);
  }

  overlay.querySelector('#btn-close-instructions-x').addEventListener('click', close);
  overlay.querySelector('#btn-got-it').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.body.appendChild(overlay);
}
