import { store } from '../../state/store.js';
import { CertificateModalController } from './CertificateModal.js';
import { renderLanguageTracks } from './LanguageTrack.js';
import { startProctoredExam } from '../proctor/ProctoredExam.js';
import { LANGUAGES_DATA } from '../../data/roles.js';

export function renderProgrammingLanguagesPage(container) {
  const student = store.getCurrentStudent();
  const certModal = new CertificateModalController();

  let badgesCount = 0;
  let certsCount = 0;
  Object.values(student.assessmentProgress || {}).forEach(lang => {
    if (lang.badgeEarned) badgesCount++;
    if (lang.certified) certsCount++;
  });

  container.innerHTML = `
    <div class="container" style="padding: 2rem 1.5rem 5rem;">
      <!-- Breadcrumb Navigation back to What do you want to get verified on -->
      <div style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between;">
        <button id="btn-back-to-home" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--violet-primary);">
          ← Back to Verification Selection
        </button>
        <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
          Earned: <strong style="color: #d97706;">${badgesCount} Badges</strong> • <strong style="color: var(--violet-primary);">${certsCount} Certificates</strong>
        </span>
      </div>

      <!-- Page Header -->
      <div style="margin-bottom: 2.25rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: var(--violet-primary); background: var(--bg-violet-tint); padding: 0.25rem 0.85rem; border-radius: var(--radius-full); margin-bottom: 0.5rem;">
          <span>{ }</span> Timed Coding Exams & Anti-Malpractice Proctoring
        </div>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-heading); letter-spacing: -0.02em;">
          Programming Languages
        </h1>
        <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 750px; margin-top: 0.5rem; line-height: 1.6;">
          Take progressive 3-level assessments in your chosen language. Each level presents 3 coding challenges in a full-screen lockdown IDE with live camera & microphone proctoring. Scoring above 85% initiates Code Authenticity MCQs to verify your genuine understanding.
        </p>
      </div>

      <!-- Languages Grid Container -->
      <div id="prog-languages-grid"></div>
    </div>
  `;

  container.querySelector('#btn-back-to-home').addEventListener('click', () => {
    store.setView('student-home');
  });

  const langMount = container.querySelector('#prog-languages-grid');
  const langTracks = renderLanguageTracks(
    student,
    (langId, levelNum) => {
      const langObj = LANGUAGES_DATA.find(l => l.id === langId);
      const langName = langObj ? langObj.name : langId.toUpperCase();

      // Launch full-screen proctored assessment suite with camera, mic, shortcut blocking & authenticity MCQs!
      startProctoredExam({
        languageId: langId,
        languageName: langName,
        levelNum: levelNum,
        onExamFinished: () => {
          renderProgrammingLanguagesPage(container);
        },
        onExit: () => {
          renderProgrammingLanguagesPage(container);
        }
      });
    },
    (langId) => {
      const langProg = student.assessmentProgress[langId];
      if (langProg && langProg.certified) {
        certModal.show(student.name, langId, langProg.certId, langProg.certDate);
      }
    }
  );
  langMount.appendChild(langTracks);
}
