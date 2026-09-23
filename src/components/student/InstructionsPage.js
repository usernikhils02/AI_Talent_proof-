import { store } from '../../state/store.js';
import { escapeHtml } from '../../utils/helpers.js';

export function renderInstructionsPage(container) {
  const student = store.getCurrentStudent();

  container.innerHTML = `
    <div class="container" style="padding: 2.5rem 1.5rem 5rem; max-width: 960px;">
      <!-- Top Breadcrumb & Header -->
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--violet-primary); background: var(--bg-violet-tint); padding: 0.35rem 1rem; border-radius: var(--radius-full); border: 1px solid var(--border-violet);">
          Student Onboarding & Guide
        </span>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--text-heading); margin-top: 1rem; letter-spacing: -0.02em;">
          Welcome to Talent Proof, ${escapeHtml(student.name)}
        </h1>
        <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 650px; margin: 0.65rem auto 0; line-height: 1.6;">
          Please read these instructions carefully before proceeding to your dashboard. This guide explains how your assessments, milestone badges, certificates, and project submissions work.
        </p>
      </div>

      <!-- Instructions Detail Cards -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem;">
        <!-- Instruction 1 -->
        <div class="white-panel" style="padding: 1.75rem 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--violet-primary); color: #fff; font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">
            1
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">
              Two Core Skill Pathways
            </h3>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.6;">
              Your student dashboard offers two distinct pathways:
              <br/>• <strong>Programming Languages:</strong> Verified via timed 3-level coding and algorithmic tests.
              <br/>• <strong>Other Skills / Role Capstones:</strong> Verified by submitting a production-grade GitHub repository and live deployment matching your target intern role.
            </p>
          </div>
        </div>

        <!-- Instruction 2 -->
        <div class="white-panel" style="padding: 1.75rem 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #d97706; color: #fff; font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
            2
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">
              3 Progressive Skill Tiers & Badges
            </h3>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.6;">
              In each programming language (Python, JavaScript, Java, C++, Go):
              <br/>• <strong>Level 1 (Fundamentals):</strong> Unlocks the <strong>Bronze Apprentice Badge</strong>.
              <br/>• <strong>Level 2 (Logic & Data Structures):</strong> Unlocks the <strong>Silver Specialist Badge</strong>.
              <br/>• <strong>Level 3 (Advanced Mastery):</strong> Unlocks the prestigious <strong>Gold Master Badge</strong>.
            </p>
          </div>
        </div>

        <!-- Instruction 3 -->
        <div class="white-panel" style="padding: 1.75rem 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #059669; color: #fff; font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
            3
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">
              Verified Skill Certificates
            </h3>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.6;">
              Upon clearing Level 3, Talent Proof automatically generates your official <strong>Verified Skill Certificate</strong> with a unique cryptographic Credential ID. This credential is immediately published to the HR recruiter dashboard.
            </p>
          </div>
        </div>

        <!-- Instruction 4 -->
        <div class="white-panel" style="padding: 1.75rem 2rem; display: flex; gap: 1.5rem; align-items: flex-start;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #0284c7; color: #fff; font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
            4
          </div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.4rem;">
              Direct HR Evaluation & Shortlisting
            </h3>
            <p style="font-size: 0.95rem; color: #475569; line-height: 1.6;">
              HR hiring partners review your dossier, test score breakdown, and inspect your GitHub repository code to fast-track interview scheduling and job offers.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Button to proceed to dashboard -->
      <div style="text-align: center;">
        <button id="btn-proceed-to-dashboard" class="btn btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem; border-radius: var(--radius-xl);">
          I Understand, Continue to Student Dashboard →
        </button>
      </div>
    </div>
  `;

  container.querySelector('#btn-proceed-to-dashboard').addEventListener('click', () => {
    store.setView('student-home');
  });
}
