import { store } from '../../state/store.js';
import { renderRoleTracks } from './RoleTrack.js';
import { renderRoleProjectPage } from './RoleProjectPage.js';

export function renderOtherSkillsPage(container) {
  let selectedRoleId = null;

  function render() {
    // If a role was selected, render the dedicated Project Submission & Questions page!
    if (selectedRoleId) {
      renderRoleProjectPage(container, selectedRoleId, () => {
        selectedRoleId = null;
        render();
      });
      return;
    }

    const student = store.getCurrentStudent();

    container.innerHTML = `
      <div class="container" style="padding: 2rem 1.5rem 5rem;">
        <!-- Breadcrumb Navigation back to selection -->
        <div style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
          <button id="btn-back-to-home" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--violet-primary);">
            ← Back to Verification Selection
          </button>
          <div>
            ${student.submittedProject ? `
              <span style="font-size: 0.85rem; background: #d1fae5; color: #059669; padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-weight: 700;">
                ✓ 1 Capstone Project Submitted (${escapeHtml(student.submittedProject.roleTitle || 'Developer')})
              </span>
            ` : `
              <span style="font-size: 0.85rem; color: var(--text-muted);">0 Projects Submitted</span>
            `}
          </div>
        </div>

        <!-- Page Header -->
        <div style="margin-bottom: 2.25rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: #059669; background: #d1fae5; padding: 0.25rem 0.85rem; border-radius: var(--radius-full); margin-bottom: 0.5rem;">
            <span>✓</span> Developer Roles &amp; Project Verification
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-heading); letter-spacing: -0.02em;">
            Select Your Target Engineering Role
          </h1>
          <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 750px; margin-top: 0.5rem; line-height: 1.6;">
            Select an engineering role to submit your real project repository. Our backend pipeline will inspect your GitHub code, ping your deployment, and generate customized project-specific technical interview questions.
          </p>
        </div>

        <!-- Roles Grid Container -->
        <div id="roles-grid-mount"></div>
      </div>
    `;

    container.querySelector('#btn-back-to-home').addEventListener('click', () => {
      store.setView('student-home');
    });

    const rolesMount = container.querySelector('#roles-grid-mount');
    const roleTracks = renderRoleTracks(student, (roleId) => {
      selectedRoleId = roleId;
      render();
    });
    rolesMount.appendChild(roleTracks);
  }

  render();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
