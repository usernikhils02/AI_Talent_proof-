import { store } from '../../state/store.js';
import { escapeHtml } from '../../utils/helpers.js';

export function renderRoleTracks(student, onOpenSubmitModal) {
  const container = document.createElement('div');
  container.className = 'grid-3';

  // Fetch roles dynamically from store (not hardcoded, addable without redeployment!)
  const roles = store.getRoles();

  roles.forEach(role => {
    const isSubmittedForThisRole = student.submittedProject && student.submittedProject.roleId === role.id;

    const card = document.createElement('div');
    card.className = 'white-panel role-track-card';
    card.style.padding = '1.75rem';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.borderRadius = 'var(--radius-xl)';
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.25s ease';

    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--violet-primary); background: var(--bg-violet-tint); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); border: 1px solid var(--border-violet);">
            ${escapeHtml(role.badge)}
          </span>
          ${isSubmittedForThisRole ? `
            <span style="font-size: 0.75rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
              ✓ Project Submitted
            </span>
          ` : ''}
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          ${escapeHtml(role.title)}
        </h3>

        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
          ${escapeHtml(role.summary)}
        </p>

        <div style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
            Primary Skills Tested
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${role.skills.map(s => `
              <span style="font-size: 0.75rem; background: var(--bg-violet-subtle); padding: 0.25rem 0.6rem; border-radius: 6px; color: var(--violet-dark); font-weight: 600; border: 1px solid var(--border-violet);">
                ${escapeHtml(s)}
              </span>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem; background: #f8fafc; border: 1px dashed var(--border-subtle); border-radius: var(--radius-md); padding: 0.95rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">
            🎯 Project Benchmark
          </div>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
            ${escapeHtml(role.submissionGuide)}
          </p>
        </div>
      </div>

      <div>
        ${isSubmittedForThisRole ? `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 0.9rem; margin-bottom: 0.75rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #15803d;">
              ${escapeHtml(student.submittedProject.title)}
            </div>
            <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
              <a href="${escapeHtml(student.submittedProject.githubUrl)}" target="_blank" rel="noopener" style="font-size: 0.75rem; color: var(--violet-primary); font-weight: 700; text-decoration: underline;">
                GitHub Repo ↗
              </a>
              ${student.submittedProject.liveUrl ? `
                <a href="${escapeHtml(student.submittedProject.liveUrl)}" target="_blank" rel="noopener" style="font-size: 0.75rem; color: #0284c7; font-weight: 700; text-decoration: underline;">
                  Live Demo ↗
                </a>
              ` : ''}
            </div>
          </div>
          <button class="btn btn-secondary btn-sm btn-reupload-proj" data-role-id="${role.id}" data-role-title="${escapeHtml(role.title)}" style="width: 100%;">
            Update Capstone Project
          </button>
        ` : `
          <button class="btn btn-primary btn-upload-proj" data-role-id="${role.id}" data-role-title="${escapeHtml(role.title)}" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload Project for Role
          </button>
        `}
      </div>
    `;

    // Make whole card clickable while preventing duplicate trigger if child link/button clicked
    card.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') return;
      onOpenSubmitModal(role.id, role.title);
    });

    container.appendChild(card);
  });

  return container;
}
