import { store } from '../../state/store.js';
import { ROLES_DATA } from '../../data/roles.js';
import { escapeHtml, getBadgeDetails } from '../../utils/helpers.js';
import { CandidateDetailModalController } from './CandidateDetailModal.js';

export function renderHRHome(container) {
  const candidates = store.getCandidates();
  let filterRole = 'all';
  let filterCertified = 'all';
  let searchQuery = '';

  const detailModal = new CandidateDetailModalController(() => {
    renderHRHome(container);
  });

  const totalApplicants = candidates.length;
  const certifiedCount = candidates.filter(c => 
    Object.values(c.assessmentProgress || {}).some(p => p.certified)
  ).length;
  const projectsSubmittedCount = candidates.filter(c => !!c.submittedProject).length;
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted' || c.status === 'Interview Scheduled' || c.status === 'Hired').length;

  function getFilteredCandidates() {
    return candidates.filter(c => {
      if (filterRole !== 'all') {
        const matchesRole = c.appliedRole === filterRole || (c.submittedProject && c.submittedProject.roleId === filterRole);
        if (!matchesRole) return false;
      }

      if (filterCertified === 'yes') {
        const hasCert = Object.values(c.assessmentProgress || {}).some(p => p.certified);
        if (!hasCert) return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesCollege = (c.college || '').toLowerCase().includes(q);
        const matchesTech = c.submittedProject && (c.submittedProject.techStack || []).some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCollege && !matchesTech) return false;
      }

      return true;
    });
  }

  container.innerHTML = `
    <div class="container" style="padding-bottom: 5rem;">
      <!-- HR Dashboard Hero -->
      <section class="hero-banner">
        <div class="hero-content">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--violet-primary); background: var(--bg-violet-tint); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--border-violet);">
                HR Recruiter Suite
              </span>
              <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">Talent Pipeline Dashboard</span>
            </div>
            <h1 class="hero-title">Intern Hiring & Evaluation Portal</h1>
            <p style="font-size: 1rem; color: var(--text-muted); max-width: 600px; margin-top: 0.5rem;">
              Evaluate verified candidate assessments, inspect capstone project codebases, and manage recruitment decisions across all internship tracks.
            </p>
          </div>

          <!-- HR Key Metrics -->
          <div class="hero-stats">
            <div class="hero-stat-card">
              <span class="stat-value" style="color: var(--text-main);">${totalApplicants}</span>
              <span class="stat-label">Total Applicants</span>
            </div>
            <div class="hero-stat-card">
              <span class="stat-value" style="color: #d97706;">${certifiedCount}</span>
              <span class="stat-label">Certified (L3)</span>
            </div>
            <div class="hero-stat-card">
              <span class="stat-value">${projectsSubmittedCount}</span>
              <span class="stat-label">Capstone Projects</span>
            </div>
            <div class="hero-stat-card">
              <span class="stat-value" style="color: #059669;">${shortlistedCount}</span>
              <span class="stat-label">Shortlisted</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Search and Filter Bar -->
      <div class="white-panel" style="padding: 1.25rem; margin-bottom: 2rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="flex: 1; min-width: 240px;">
            <input type="text" id="hr-search-input" class="form-input" placeholder="Search candidate by name, university, or tech stack..." value="${escapeHtml(searchQuery)}" />
          </div>

          <div style="min-width: 200px;">
            <select id="hr-filter-role" class="form-select">
              <option value="all">All Roles</option>
              ${ROLES_DATA.map(r => `<option value="${r.id}" ${filterRole === r.id ? 'selected' : ''}>${escapeHtml(r.title)}</option>`).join('')}
            </select>
          </div>

          <div style="min-width: 180px;">
            <select id="hr-filter-cert" class="form-select">
              <option value="all">All Certification Levels</option>
              <option value="yes" ${filterCertified === 'yes' ? 'selected' : ''}>Only Certified Masters</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Candidate Grid -->
      <div id="candidates-grid-container" class="grid-2"></div>
    </div>
  `;

  function renderGrid() {
    const list = getFilteredCandidates();
    const gridContainer = container.querySelector('#candidates-grid-container');

    if (!list.length) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; background: #ffffff; border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="font-size: 1.25rem; color: var(--text-main); font-weight: 700;">No Candidates Found</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Try adjusting your role or certification filters to broaden your search.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = '';
    list.forEach(c => {
      const card = document.createElement('div');
      card.className = 'white-panel';
      card.style.padding = '1.75rem';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.borderRadius = 'var(--radius-xl)';

      const earnedBadges = [];
      let hasCertificate = false;
      Object.entries(c.assessmentProgress || {}).forEach(([lang, p]) => {
        if (p.badgeEarned) {
          earnedBadges.push({ lang, ...getBadgeDetails(p.badgeEarned) });
        }
        if (p.certified) hasCertificate = true;
      });

      const roleDef = ROLES_DATA.find(r => r.id === c.appliedRole);
      const displayRoleTitle = c.submittedProject?.roleTitle || (roleDef ? roleDef.title : 'General Track');
      const statusClass = c.status.replace(/\s+/g, '');

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.85rem; align-items: center;">
              <img src="${escapeHtml(c.avatar)}" alt="${escapeHtml(c.name)}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid var(--violet-light);" />
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">${escapeHtml(c.name)}</h3>
                <div style="font-size: 0.825rem; color: var(--text-muted);">${escapeHtml(c.college)}</div>
              </div>
            </div>
            <div>
              <span class="status-chip ${statusClass}">
                ● ${escapeHtml(c.status)}
              </span>
            </div>
          </div>

          <div style="background: var(--bg-violet-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-violet); margin-bottom: 1rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Applied Role</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--violet-primary); margin-top: 2px;">
              ${escapeHtml(displayRoleTitle)}
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 0.4rem;">
              Verified Skill Badges
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${earnedBadges.length ? earnedBadges.map(b => `
                <span class="lang-badge-pill" style="background: ${b.bg}; color: ${b.color}; border: 1px solid ${b.border}; font-size: 0.75rem;">
                  ${b.icon} ${escapeHtml(b.lang.toUpperCase())}: ${b.name}
                </span>
              `).join('') : `
                <span style="font-size: 0.75rem; color: var(--text-muted);">No assessments taken yet</span>
              `}
              ${hasCertificate ? `
                <span style="font-size: 0.75rem; background: #fef3c7; color: #b45309; padding: 0.25rem 0.65rem; border-radius: var(--radius-full); border: 1px solid #fde68a; font-weight: 700;">
                  📜 Certified Master
                </span>
              ` : ''}
            </div>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 0.4rem;">
              Role Capstone Project
            </div>
            ${c.submittedProject ? `
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 0.85rem;">
                <div style="font-size: 0.9rem; font-weight: 700; color: #15803d;">${escapeHtml(c.submittedProject.title)}</div>
                <div style="font-size: 0.8rem; color: #475569; margin-top: 0.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${escapeHtml(c.submittedProject.description)}
                </div>
              </div>
            ` : `
              <div style="font-size: 0.825rem; color: var(--text-muted); font-style: italic;">
                No project submitted yet
              </div>
            `}
          </div>
        </div>

        <div style="padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <button class="btn btn-secondary btn-inspect-candidate" data-id="${c.id}" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Review Candidate Dossier
          </button>
        </div>
      `;

      card.querySelector('.btn-inspect-candidate').addEventListener('click', () => {
        detailModal.open(c.id);
      });

      gridContainer.appendChild(card);
    });
  }

  renderGrid();

  const searchInput = container.querySelector('#hr-search-input');
  const roleSelect = container.querySelector('#hr-filter-role');
  const certSelect = container.querySelector('#hr-filter-cert');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderGrid();
  });

  roleSelect.addEventListener('change', (e) => {
    filterRole = e.target.value;
    renderGrid();
  });

  certSelect.addEventListener('change', (e) => {
    filterCertified = e.target.value;
    renderGrid();
  });
}
