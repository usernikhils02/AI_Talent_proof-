import { escapeHtml } from './helpers.js';

export function renderCertificateHTML(candidateName, languageName, certId, certDate) {
  return `
    <div class="certificate-frame">
      <div class="cert-badge-gold">
        🏆
      </div>
      <div style="font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--violet-primary); font-weight: 700; margin-bottom: 0.5rem;">
        Talent Proof Verified Credential
      </div>
      <h2 class="cert-title">Certificate of Skill Mastery</h2>
      <p style="font-size: 1rem; color: var(--text-muted); max-width: 550px; margin: 0.5rem auto;">
        This certificate is proudly awarded to
      </p>

      <div class="cert-candidate">${escapeHtml(candidateName)}</div>

      <p style="font-size: 1.05rem; color: #334155; max-width: 580px; margin: 1.25rem auto; line-height: 1.6;">
        for demonstrating advanced competence, algorithmic problem solving, and architecture design in 
        <strong style="color: var(--violet-primary); font-size: 1.15rem;">${escapeHtml(languageName)}</strong> 
        by successfully clearing all three rigorous levels (Fundamentals, Logic, and Advanced Mastery) on the Talent Proof Verification Platform.
      </p>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px dashed var(--border-violet); text-align: left;">
        <div>
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Credential ID</div>
          <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: var(--violet-primary);">${escapeHtml(certId)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Issue Date: ${escapeHtml(certDate)}</div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading); border-bottom: 1px solid var(--border-violet); display: inline-block; padding-bottom: 4px; font-family: cursive;">
            Dr. Evelyn Vance
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; font-weight: 600;">
            Talent Proof Chief Evaluator
          </div>
          <div style="font-size: 0.7rem; color: #059669; font-weight: 700; margin-top: 2px;">
            ✓ Cryptographically Verified
          </div>
        </div>
      </div>
    </div>
  `;
}
