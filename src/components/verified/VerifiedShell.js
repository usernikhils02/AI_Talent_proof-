import { store } from '../../state/store.js';
import { renderVerifiedLanguageTracks } from './LanguageTrackGrid.js';
import { renderLevelDashboard } from './LevelDashboard.js';
import { startProctoredExam } from '../proctor/ProctoredExam.js';
import { CertificateModalController } from '../student/CertificateModal.js';
import { VERIFIED_LANGUAGES } from '../../data/verifiedBank.js';
import { escapeHtml } from '../../utils/helpers.js';

export function renderVerifiedShell(container) {
  const certModal = new CertificateModalController();

  // Navigation states: 'tracks' | 'levels' | 'badges' | 'certificates' | 'settings'
  let currentNav = 'tracks'; 
  let selectedLangId = 'python';

  function render() {
    const student = store.getCurrentStudent();
    const candidateName = student.name || 'Nikhil S';

    // Calculate badges count and certificates
    let totalBadgesCount = 0;
    let goldCount = 0;
    let silverCount = 0;
    let bronzeCount = 0;
    const earnedCertificates = [];

    Object.entries(student.assessmentProgress || {}).forEach(([langId, prog]) => {
      if (prog.badgeEarned) {
        totalBadgesCount++;
        if (prog.badgeEarned === 'Gold') goldCount++;
        else if (prog.badgeEarned === 'Silver') silverCount++;
        else if (prog.badgeEarned === 'Bronze') bronzeCount++;
      }
      if (prog.certified) {
        earnedCertificates.push({ langId, ...prog });
      }
    });

    container.innerHTML = `
      <div class="verified-app-layout">
        <!-- Left Sidebar matching screenshot exactly -->
        <aside class="verified-sidebar">
          <!-- Logo & Header -->
          <div class="verified-sidebar-brand">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div class="verified-shield-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <div style="font-size: 1.25rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1;">VERIFIED</div>
                <div style="font-size: 0.65rem; font-weight: 800; letter-spacing: 0.1em; color: #64748b; text-transform: uppercase; margin-top: 2px;">TALENT INTELLIGENCE</div>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: #94a3b8; font-style: italic; margin-top: 0.65rem; line-height: 1.3;">
              Don't trust the claim. Verify the skill.
            </div>
          </div>

          <!-- Section: STUDENT ASSESSMENT -->
          <div style="padding: 1.25rem 1rem 0;">
            <div class="sidebar-section-label">STUDENT ASSESSMENT</div>
            <nav style="display: flex; flex-direction: column; gap: 0.35rem;">
              <button id="side-nav-tracks" class="sidebar-link-btn ${currentNav === 'tracks' || currentNav === 'levels' ? 'active' : ''}">
                <span style="font-family: var(--font-mono); font-weight: 800; font-size: 0.95rem;">&lt;/&gt;</span>
                <span>Language Tracks</span>
              </button>
              <button id="side-nav-back-home" class="sidebar-link-btn" title="Back to Category Selection">
                <span>🔄</span>
                <span>All Roles &amp; Skills</span>
              </button>
              <button id="side-nav-badges" class="sidebar-link-btn ${currentNav === 'badges' ? 'active' : ''}">
                <span>🎖️</span>
                <span>My Skill Badges</span>
                <span style="margin-left: auto; font-size: 0.75rem; background: var(--bg-violet-tint); color: var(--violet-primary); padding: 0.15rem 0.55rem; border-radius: 9999px; font-weight: 800;">
                  ${totalBadgesCount}
                </span>
              </button>
              <button id="side-nav-certificates" class="sidebar-link-btn ${currentNav === 'certificates' ? 'active' : ''}">
                <span>📄</span>
                <span>Certificates</span>
                <span style="margin-left: auto; font-size: 0.75rem; background: #d1fae5; color: #059669; padding: 0.15rem 0.55rem; border-radius: 9999px; font-weight: 800;">
                  ${earnedCertificates.length}
                </span>
              </button>
            </nav>
          </div>

          <!-- Section: ACCOUNT -->
          <div style="padding: 1.5rem 1rem 0;">
            <div class="sidebar-section-label">ACCOUNT</div>
            <nav style="display: flex; flex-direction: column; gap: 0.35rem;">
              <button id="side-nav-settings" class="sidebar-link-btn ${currentNav === 'settings' ? 'active' : ''}">
                <span>⚙️</span>
                <span>Platform Settings</span>
              </button>
            </nav>
          </div>

          <!-- Student Portal Callout Box matching screenshot -->
          <div style="margin: auto 1rem 1rem;">
            <div class="sidebar-portal-card">
              <div style="display: flex; align-items: center; gap: 0.45rem; font-weight: 800; font-size: 0.85rem; color: #635bff; margin-bottom: 0.35rem;">
                <span>🎓</span>
                <span>Student Portal</span>
              </div>
              <p style="font-size: 0.775rem; color: #64748b; margin: 0; line-height: 1.4;">
                Clear 3 sequential levels in any track to earn accredited certificates.
              </p>
            </div>

            <!-- Profile & Logout matching NS in screenshot -->
            <div class="sidebar-user-pill">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <div class="user-avatar-circle">
                  ${candidateName.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style="font-size: 0.85rem; font-weight: 800; color: #0f172a; line-height: 1.1;">${candidateName}</div>
                  <div style="font-size: 0.7rem; color: #059669; font-weight: 700; margin-top: 2px;">● Active Student</div>
                </div>
              </div>
              <button id="side-btn-logout" title="Log Out" style="background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 1.1rem; padding: 4px;">
                ↪
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Workspace Area -->
        <div class="verified-main-workspace">
          <!-- Top Global Search Bar matching screenshot -->
          <header class="verified-top-header">
            <!-- Search bar & Comeback Button -->
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button id="top-btn-back-categories" class="btn btn-secondary btn-sm" style="font-weight: 700; color: #635bff; border-color: #ddd6fe; background: #ffffff; white-space: nowrap; gap: 0.4rem; padding: 0.5rem 0.9rem; border-radius: 10px;" title="Back to Category Selection">
                <span>←</span>
                <span>Change Category</span>
              </button>

              <div class="verified-top-search-bar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" id="top-universal-search" placeholder="Search programming languages, syllabi, topics, coding challenges..." />
              </div>
            </div>

            <!-- Right Actions: Notifications, Help, User Avatar -->
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <button class="top-icon-btn" title="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                <span class="notification-dot"></span>
              </button>

              <button class="top-icon-btn" title="Help &amp; Documentation">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </button>

              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <div class="user-avatar-circle">
                  ${candidateName.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span style="font-size: 0.9rem; font-weight: 800; color: #0f172a;">${candidateName}</span>
              </div>
            </div>
          </header>

          <!-- Central Dynamic Workbench -->
          <main id="verified-workbench-mount" style="padding: 2rem 2.5rem; overflow-y: auto; flex: 1;">
            <!-- Render view based on currentNav -->
          </main>
        </div>
      </div>
    `;

    // Return to main verification categories
    const topBackBtn = container.querySelector('#top-btn-back-categories');
    if (topBackBtn) {
      topBackBtn.addEventListener('click', () => {
        store.setView('student-home');
      });
    }

    // Sidebar navigation bindings
    container.querySelector('#side-btn-logout').addEventListener('click', () => {
      store.logout();
    });

    container.querySelector('#side-nav-tracks').addEventListener('click', () => {
      currentNav = 'tracks';
      render();
    });

    const sideBackHomeBtn = container.querySelector('#side-nav-back-home');
    if (sideBackHomeBtn) {
      sideBackHomeBtn.addEventListener('click', () => {
        store.setView('student-home');
      });
    }

    container.querySelector('#side-nav-badges').addEventListener('click', () => {
      currentNav = 'badges';
      render();
    });

    container.querySelector('#side-nav-certificates').addEventListener('click', () => {
      currentNav = 'certificates';
      render();
    });

    container.querySelector('#side-nav-settings').addEventListener('click', () => {
      currentNav = 'settings';
      render();
    });

    const mount = container.querySelector('#verified-workbench-mount');

    // 1. Language Tracks View (matching screenshot)
    if (currentNav === 'tracks') {
      renderVerifiedLanguageTracks(mount, (langId) => {
        selectedLangId = langId;
        currentNav = 'levels';
        render();
      });
    }

    // 2. Levels Roadmap & Launch Assessment
    else if (currentNav === 'levels') {
      const langObj = VERIFIED_LANGUAGES.find(l => l.id === selectedLangId) || VERIFIED_LANGUAGES[0];
      const prog = student.assessmentProgress?.[selectedLangId] || {};

      renderLevelDashboard(
        mount,
        langObj,
        { ...prog, name: candidateName },
        (levelNum) => {
          // Launch the full-screen proctored assessment suite with camera, mic, instructions & authenticity MCQs!
          startProctoredExam({
            languageId: selectedLangId,
            languageName: langObj.name,
            levelNum: levelNum,
            onExamFinished: () => {
              render();
            },
            onExit: () => {
              render();
            }
          });
        },
        () => {
          currentNav = 'tracks';
          render();
        }
      );
    }

    // 3. My Skill Badges View (displays how many badges earned & breakdown)
    else if (currentNav === 'badges') {
      renderBadgesDashboard(mount, student, totalBadgesCount, goldCount, silverCount, bronzeCount);
    }

    // 4. Certificates View (displays earned certificates with printable preview)
    else if (currentNav === 'certificates') {
      renderCertificatesDashboard(mount, earnedCertificates, certModal, candidateName);
    }

    // 5. Platform Settings View
    else if (currentNav === 'settings') {
      renderSettingsDashboard(mount, student);
    }
  }

  function renderBadgesDashboard(mount, student, total, gold, silver, bronze) {
    mount.innerHTML = `
      <div style="max-width: 980px; margin: 0 auto; padding-bottom: 4rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div>
            <h1 style="font-size: 2.15rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2;">
              My Skill Badges
            </h1>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.4rem;">
              Track verified milestone badges unlocked through anti-malpractice coding assessments.
            </p>
          </div>
          <div style="background: #eef2ff; border: 1.5px solid #c7d2fe; padding: 0.5rem 1.25rem; border-radius: 9999px; font-weight: 800; color: #635bff; font-size: 0.95rem;">
            Total Badges Earned: ${total}
          </div>
        </div>

        <!-- 3 Stat Highlight Cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;">
          <div class="white-panel" style="padding: 1.5rem; text-align: center; border-top: 4px solid #f59e0b;">
            <div style="font-size: 2rem; margin-bottom: 0.25rem;">🏆</div>
            <div style="font-size: 2rem; font-weight: 800; color: #0f172a;">${gold}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #d97706; text-transform: uppercase;">Gold Master Badges</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Level 3 Advanced Cleared</div>
          </div>

          <div class="white-panel" style="padding: 1.5rem; text-align: center; border-top: 4px solid #94a3b8;">
            <div style="font-size: 2rem; margin-bottom: 0.25rem;">🥈</div>
            <div style="font-size: 2rem; font-weight: 800; color: #0f172a;">${silver}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Silver Specialist Badges</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Level 2 Intermediate Cleared</div>
          </div>

          <div class="white-panel" style="padding: 1.5rem; text-align: center; border-top: 4px solid #d97706;">
            <div style="font-size: 2rem; margin-bottom: 0.25rem;">🥉</div>
            <div style="font-size: 2rem; font-weight: 800; color: #0f172a;">${bronze}</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #b45309; text-transform: uppercase;">Bronze Apprentice Badges</div>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">Level 1 Fundamentals Cleared</div>
          </div>
        </div>

        <!-- All Tracks Badges Matrix -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
          Badges by Assessment Track
        </h3>

        <div class="grid-2">
          ${VERIFIED_LANGUAGES.map(lang => {
            const prog = student.assessmentProgress?.[lang.id];
            const hasBadge = prog && prog.badgeEarned;
            return `
              <div class="white-panel" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div style="width: 48px; height: 48px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    ${lang.icon}
                  </div>
                  <div>
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0;">${escapeHtml(lang.name)}</h4>
                    <p style="font-size: 0.8rem; color: #64748b; margin: 2px 0 0;">
                      Level 1: ${prog?.level1?.passed ? '✓' : '✗'} | Level 2: ${prog?.level2?.passed ? '✓' : '✗'} | Level 3: ${prog?.level3?.passed ? '✓' : '✗'}
                    </p>
                  </div>
                </div>

                <div>
                  ${hasBadge ? `
                    <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: #eef2ff; color: #635bff; border: 1.5px solid #c7d2fe; padding: 0.35rem 0.85rem; border-radius: 9999px; font-weight: 800; font-size: 0.8rem;">
                      ${prog.badgeEarned === 'Gold' ? '🏆 Gold' : (prog.badgeEarned === 'Silver' ? '🥈 Silver' : '🥉 Bronze')}
                    </span>
                  ` : `
                    <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">Not Started</span>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderCertificatesDashboard(mount, certificates, modalCtrl, candidateName) {
    mount.innerHTML = `
      <div style="max-width: 980px; margin: 0 auto; padding-bottom: 4rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
          <div>
            <h1 style="font-size: 2.15rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2;">
              Accredited Certificates
            </h1>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.4rem;">
              Verified, cryptographically signed credentials issued upon passing Level 3 in any track.
            </p>
          </div>
          <div style="background: #d1fae5; border: 1.5px solid #a7f3d0; padding: 0.5rem 1.25rem; border-radius: 9999px; font-weight: 800; color: #059669; font-size: 0.95rem;">
            ${certificates.length} Verified Certificates
          </div>
        </div>

        ${certificates.length > 0 ? `
          <div class="grid-2">
            ${certificates.map(cert => {
              const langObj = VERIFIED_LANGUAGES.find(l => l.id === cert.langId);
              const langName = langObj ? langObj.name : cert.langId.toUpperCase();
              return `
                <div class="white-panel" style="padding: 2rem; border-top: 5px solid #635bff; box-shadow: 0 4px 15px rgba(99, 91, 255, 0.08);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
                    <div style="display: flex; align-items: center; gap: 0.65rem;">
                      <div style="width: 40px; height: 40px; border-radius: 10px; background: #eef2ff; color: #635bff; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">
                        🏆
                      </div>
                      <div>
                        <span style="font-size: 0.725rem; font-weight: 800; color: #635bff; text-transform: uppercase;">
                          Official Credential
                        </span>
                        <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 0;">
                          ${escapeHtml(langName)} Skill Mastery
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p style="font-size: 0.875rem; color: #475569; line-height: 1.5; margin-bottom: 1.25rem;">
                    Awarded to <strong>${escapeHtml(candidateName)}</strong> for clearing all 3 levels with genuine code ownership verification.
                  </p>

                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-family: var(--font-mono); font-size: 0.8rem; color: #64748b;">
                    <div>ID: <strong style="color: #635bff;">${escapeHtml(cert.certId)}</strong></div>
                    <div>Issued: ${escapeHtml(cert.certDate || 'Sep 2026')}</div>
                  </div>

                  <button class="btn btn-primary btn-inspect-cert" data-lang="${cert.langId}" style="width: 100%; background: #635bff; font-weight: 700; border-radius: 12px;">
                    📜 View &amp; Print Official Certificate
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="padding: 4rem 2rem; text-align: center; background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 20px;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📜</div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a;">No Certificates Unlocked Yet</h3>
            <p style="font-size: 0.95rem; color: #64748b; max-width: 500px; margin: 0.5rem auto 1.5rem; line-height: 1.6;">
              Clear Level 1, Level 2, and Level 3 in any programming language to earn your official cryptographically verified skill certificate.
            </p>
            <button id="btn-go-to-tracks" class="btn btn-primary" style="background: #635bff; padding: 0.8rem 2rem; font-weight: 800; border-radius: 12px;">
              Explore Language Tracks →
            </button>
          </div>
        `}
      </div>
    `;

    mount.querySelectorAll('.btn-inspect-cert').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lId = e.currentTarget.getAttribute('data-lang');
        const prog = student.assessmentProgress[lId];
        modalCtrl.show(student.name, lId, prog.certId, prog.certDate);
      });
    });

    const goTracks = mount.querySelector('#btn-go-to-tracks');
    if (goTracks) {
      goTracks.addEventListener('click', () => {
        currentNav = 'tracks';
        render();
      });
    }
  }

  function renderSettingsDashboard(mount, student) {
    mount.innerHTML = `
      <div style="max-width: 760px; margin: 0 auto; padding-bottom: 4rem;">
        <h1 style="font-size: 2.15rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2; margin-bottom: 0.4rem;">
          Platform Settings
        </h1>
        <p style="font-size: 0.95rem; color: #64748b; margin-bottom: 2rem;">
          Manage your candidate profile, device diagnostics, and proctoring preferences.
        </p>

        <!-- Profile Settings Card -->
        <div class="white-panel" style="padding: 2rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 1.25rem;">Candidate Identity</h3>

          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="setting-name" class="form-input" value="${escapeHtml(student.name)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="setting-email" class="form-input" value="${escapeHtml(student.email)}" />
          </div>

          <div class="form-group">
            <label class="form-label">College / University</label>
            <input type="text" id="setting-college" class="form-input" value="${escapeHtml(student.college || '')}" />
          </div>

          <button id="btn-save-settings" class="btn btn-primary" style="background: #635bff; font-weight: 700; margin-top: 0.5rem;">
            Save Profile Changes
          </button>
        </div>

        <!-- Diagnostics Card -->
        <div class="white-panel" style="padding: 2rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Proctoring Hardware Diagnostics</h3>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div>
                <strong style="color: #0f172a; font-size: 0.9rem;">Webcam Status</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Ready for single-face telemetry</div>
              </div>
              <span style="color: #059669; font-weight: 800; font-size: 0.85rem;">● Connected</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div>
                <strong style="color: #0f172a; font-size: 0.9rem;">Microphone Calibration</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Decibel sensor sensitivity 45dB</div>
              </div>
              <span style="color: #059669; font-weight: 800; font-size: 0.85rem;">● Calibrated</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div>
                <strong style="color: #0f172a; font-size: 0.9rem;">Fullscreen SEB Lockdown</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Blocks Alt+Tab, DevTools, Ctrl+C/V</div>
              </div>
              <span style="color: #059669; font-weight: 800; font-size: 0.85rem;">● Enforced</span>
            </div>
          </div>
        </div>
      </div>
    `;

    mount.querySelector('#btn-save-settings').addEventListener('click', () => {
      const newName = mount.querySelector('#setting-name').value.trim();
      const newEmail = mount.querySelector('#setting-email').value.trim();
      const newCollege = mount.querySelector('#setting-college').value.trim();
      student.name = newName;
      student.email = newEmail;
      student.college = newCollege;
      store.saveCurrentStudent(student);
      alert('Platform settings saved successfully.');
      render();
    });
  }

  render();
}
