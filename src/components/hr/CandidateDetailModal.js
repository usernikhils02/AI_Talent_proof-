import { store } from '../../state/store.js';
import { escapeHtml, getBadgeDetails } from '../../utils/helpers.js';
import { LANGUAGES_DATA } from '../../data/roles.js';

export class CandidateDetailModalController {
  constructor(onStatusUpdated) {
    this.overlay = document.getElementById('candidate-dossier-modal-overlay');
    this.nameEl = document.getElementById('dossier-candidate-name');
    this.roleEl = document.getElementById('dossier-candidate-role');
    this.bodyEl = document.getElementById('candidate-dossier-body');
    this.closeBtn = document.getElementById('dossier-close-btn');

    this.candidate = null;
    this.onStatusUpdated = onStatusUpdated;
    this.initEvents();
  }

  initEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  open(candidateId) {
    const candidates = store.getCandidates();
    this.candidate = candidates.find(c => c.id === candidateId);
    if (!this.candidate) return;

    this.render();
    this.overlay.classList.add('active');
  }

  render() {
    const c = this.candidate;
    this.nameEl.textContent = c.name;
    this.roleEl.textContent = c.submittedProject?.roleTitle || (c.appliedRole ? c.appliedRole.toUpperCase() : 'General Applicant');

    const assessmentsList = Object.entries(c.assessmentProgress || {}).map(([langId, prog]) => {
      const langDef = LANGUAGES_DATA.find(l => l.id === langId);
      const name = langDef ? langDef.name : langId.toUpperCase();
      const badge = getBadgeDetails(prog.badgeEarned);
      return { langId, name, prog, badge };
    });

    this.bodyEl.innerHTML = `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div>
          <!-- Profile Card -->
          <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; background: var(--bg-violet-subtle); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-violet);">
            <img src="${escapeHtml(c.avatar)}" alt="${escapeHtml(c.name)}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--violet-primary);" />
            <div>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">${escapeHtml(c.name)}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(c.email)} • ${escapeHtml(c.college)}</div>
              <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                <a href="${escapeHtml(c.github)}" target="_blank" rel="noopener" style="font-size: 0.825rem; color: var(--violet-primary); font-weight: 700; text-decoration: underline;">GitHub Profile ↗</a>
                <a href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener" style="font-size: 0.825rem; color: #0284c7; font-weight: 700; text-decoration: underline;">LinkedIn ↗</a>
              </div>
            </div>
          </div>

          <!-- Submitted Project Breakdown -->
          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>🚀 Submitted Capstone Project</span>
              ${c.submittedProject ? `
                <span style="font-size: 0.75rem; background: #d1fae5; color: #059669; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 700;">
                  ${escapeHtml(c.submittedProject.status)}
                </span>
              ` : ''}
            </h4>

            ${c.submittedProject ? `
              <div style="background: #ffffff; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                  ${escapeHtml(c.submittedProject.title)}
                </div>
                <div style="font-size: 0.85rem; color: var(--violet-primary); font-weight: 600; margin-bottom: 0.75rem;">
                  Applied Role Track: <strong>${escapeHtml(c.submittedProject.roleTitle)}</strong> (Submitted on ${escapeHtml(c.submittedProject.submittedAt)})
                </div>
                <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1rem;">
                  ${escapeHtml(c.submittedProject.description)}
                </p>

                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;">
                  ${(c.submittedProject.techStack || []).map(t => `
                    <span style="font-size: 0.75rem; background: var(--bg-violet-subtle); padding: 0.25rem 0.6rem; border-radius: 6px; color: var(--violet-dark); border: 1px solid var(--border-violet); font-weight: 600;">
                      ${escapeHtml(t)}
                    </span>
                  `).join('')}
                </div>

                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); margin-bottom: 1rem;">
                  <a href="${escapeHtml(c.submittedProject.githubUrl)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
                    Inspect Repository Code ↗
                  </a>
                  ${c.submittedProject.liveUrl ? `
                    <a href="${escapeHtml(c.submittedProject.liveUrl)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                      Open Live Deployment ↗
                    </a>
                  ` : ''}
                  ${c.submittedProject.demoVideoUrl ? `
                    <a href="${escapeHtml(c.submittedProject.demoVideoUrl)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="color: #635bff; border-color: #ddd6fe;">
                      🎬 Demo Video ↗
                    </a>
                  ` : ''}
                </div>

                <!-- Live Health & Metadata Pills -->
                ${c.submittedProject.liveCheck ? `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.65rem 0.85rem; font-size: 0.8rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;">
                    <span style="display: flex; align-items: center; gap: 0.4rem;">
                      <span style="width: 8px; height: 8px; border-radius: 50%; background: ${c.submittedProject.liveCheck.isLive ? '#10b981' : '#ef4444'};"></span>
                      <strong>Deployment Ping:</strong> ${escapeHtml(c.submittedProject.liveCheck.statusText || 'Tested')}
                    </span>
                    <span style="color: #64748b;">${c.submittedProject.repoMetadata?.stars || 0} ⭐ GitHub stars</span>
                  </div>
                ` : ''}

                <!-- Project-Specific Interview Questions for Recruiter -->
                ${c.submittedProject.interviewQuestions?.length ? `
                  <div style="background: #f5f3ff; border: 1.5px solid #ddd6fe; border-radius: 12px; padding: 1.25rem; margin-top: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                      <span style="font-size: 0.85rem; font-weight: 800; color: #635bff;">
                        🤖 Suggested Technical Interview Questions (${c.submittedProject.interviewQuestions.length})
                      </span>
                      <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">Grounded in actual codebase</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                      ${c.submittedProject.interviewQuestions.map((q, i) => `
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem;">
                          <div style="font-size: 0.7rem; font-weight: 800; color: #635bff; text-transform: uppercase; margin-bottom: 2px;">
                            ${escapeHtml(q.category)}
                          </div>
                          <div style="color: #0f172a; font-weight: 600; line-height: 1.4;">
                            Q${i+1}: ${escapeHtml(q.question)}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : `
              <div style="padding: 1.75rem; background: #f8fafc; border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); text-align: center; color: var(--text-muted);">
                No capstone project submitted yet for a role.
              </div>
            `}
          </div>

          <!-- Programming Assessment Scorecard -->
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem;">
              📊 Programming Assessment & Verification
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${assessmentsList.map(item => `
                <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
                  <div>
                    <div style="font-size: 1rem; font-weight: 800; color: var(--text-main);">
                      ${escapeHtml(item.name)}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                      Level 1: ${item.prog.level1?.passed ? '✓ Passed' : '✗ Incomplete'} |
                      Level 2: ${item.prog.level2?.passed ? '✓ Passed' : '✗ Incomplete'} |
                      Level 3: ${item.prog.level3?.passed ? '✓ Passed' : '✗ Incomplete'}
                    </div>
                    ${item.prog.certified ? `
                      <div style="font-size: 0.75rem; color: #b45309; font-family: var(--font-mono); font-weight: 700; margin-top: 0.35rem;">
                        Verified ID: ${escapeHtml(item.prog.certId)}
                      </div>
                    ` : ''}
                  </div>
                  <div>
                    ${item.badge ? `
                      <span class="lang-badge-pill" style="background: ${item.badge.bg}; color: ${item.badge.color}; border: 1px solid ${item.badge.border};">
                        ${item.badge.icon} ${item.badge.name}
                      </span>
                    ` : `
                      <span style="font-size: 0.75rem; color: var(--text-faint);">No Badges</span>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Recruiter Evaluation Box -->
        <div style="background: var(--bg-violet-subtle); border: 1px solid var(--border-violet); border-radius: var(--radius-xl); padding: 1.5rem; height: fit-content;">
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem;">
            Candidate Hiring Decision
          </h4>

          <div class="form-group">
            <label class="form-label" for="select-hiring-status">Recruitment Pipeline Stage</label>
            <select id="select-hiring-status" class="form-select">
              <option value="Applied" ${c.status === 'Applied' ? 'selected' : ''}>Applied</option>
              <option value="Under Review" ${c.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
              <option value="Shortlisted" ${c.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
              <option value="Interview Scheduled" ${c.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
              <option value="Hired" ${c.status === 'Hired' ? 'selected' : ''}>Hired</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-hr-notes">Internal Evaluator Notes</label>
            <textarea id="input-hr-notes" class="form-textarea" rows="5" placeholder="Add technical impressions, interview feedback, or compensation notes...">${escapeHtml(c.hrNotes || '')}</textarea>
          </div>

          <button id="btn-save-decision" class="btn btn-primary" style="width: 100%;">
            Save Evaluation Decision
          </button>
        </div>
      </div>
    `;

    const saveBtn = this.bodyEl.querySelector('#btn-save-decision');
    const statusSelect = this.bodyEl.querySelector('#select-hiring-status');
    const notesTextarea = this.bodyEl.querySelector('#input-hr-notes');

    saveBtn.addEventListener('click', () => {
      const newStatus = statusSelect.value;
      const newNotes = notesTextarea.value.trim();
      store.updateCandidateStatus(c.id, newStatus, newNotes);
      alert(`Candidate status successfully updated to "${newStatus}".`);
      this.close();
      if (this.onStatusUpdated) this.onStatusUpdated();
    });
  }

  close() {
    this.overlay.classList.remove('active');
  }
}
