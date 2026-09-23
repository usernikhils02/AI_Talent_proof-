import { QUESTIONS_DB } from '../../data/questions.js';
import { LANGUAGES_DATA } from '../../data/roles.js';
import { fireCelebrationConfetti, fireCertificateConfetti } from '../../utils/helpers.js';
import { store } from '../../state/store.js';

export class AssessmentModalController {
  constructor() {
    this.overlay = document.getElementById('assessment-modal-overlay');
    this.titleEl = document.getElementById('modal-assessment-title');
    this.subtitleEl = document.getElementById('modal-assessment-subtitle');
    this.bodyEl = document.getElementById('modal-assessment-body');
    this.footerEl = document.getElementById('modal-assessment-footer');
    this.closeBtn = document.getElementById('modal-close-btn');

    this.currentLanguage = null;
    this.currentLevel = 1;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];

    this.initEvents();
  }

  initEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
  }

  start(languageId, levelNum, onFinishCallback) {
    this.currentLanguage = LANGUAGES_DATA.find(l => l.id === languageId);
    this.currentLevel = levelNum;
    this.onFinishCallback = onFinishCallback;

    // Load questions
    const langKey = languageId;
    const levelKey = `level${levelNum}`;
    const qList = QUESTIONS_DB[langKey]?.[levelKey] || [];

    if (!qList.length) {
      alert(`Questions for ${this.currentLanguage?.name || languageId} Level ${levelNum} are being prepared.`);
      return;
    }

    this.questions = qList;
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);

    const levelBadgeName = levelNum === 1 ? 'Bronze Apprentice' : (levelNum === 2 ? 'Silver Specialist' : 'Gold Master');

    this.titleEl.textContent = `${this.currentLanguage.name} Assessment — Level ${levelNum}`;
    this.subtitleEl.textContent = `Target Reward: ${levelBadgeName} Badge ${levelNum === 3 ? '+ Official Skill Certificate' : ''}`;

    this.renderQuestion();
    this.overlay.classList.add('active');
  }

  renderQuestion() {
    const q = this.questions[this.currentQuestionIndex];
    const totalQ = this.questions.length;
    const progressPercent = Math.round(((this.currentQuestionIndex + 1) / totalQ) * 100);

    this.bodyEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">Question ${this.currentQuestionIndex + 1} of ${totalQ}</span>
        <span style="font-size: 0.8rem; color: var(--text-faint);">${progressPercent}% Completed</span>
      </div>

      <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-bottom: 1.5rem; overflow: hidden;">
        <div style="width: ${progressPercent}%; height: 100%; background: var(--accent-primary); transition: width 0.3s ease;"></div>
      </div>

      <div class="quiz-question-box">
        <h4 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">${q.title}</h4>
        <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.5;">${q.question}</p>
        
        ${q.codeSnippet ? `
          <pre class="code-box"><code>${this.escapeSnippet(q.codeSnippet)}</code></pre>
        ` : ''}
      </div>

      <div class="option-list">
        ${q.options.map((opt, idx) => `
          <button class="option-btn ${this.userAnswers[this.currentQuestionIndex] === idx ? 'selected' : ''}" data-opt-idx="${idx}">
            <strong style="margin-right: 0.5rem; color: var(--accent-cyan);">${String.fromCharCode(65 + idx)}.</strong>
            <span>${this.escapeSnippet(opt)}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Bind option selection
    this.bodyEl.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'), 10);
        this.userAnswers[this.currentQuestionIndex] = selectedIdx;
        this.renderQuestion();
      });
    });

    // Render footer controls
    const isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;
    const isLast = this.currentQuestionIndex === totalQ - 1;

    this.footerEl.innerHTML = `
      ${this.currentQuestionIndex > 0 ? `
        <button id="btn-prev-q" class="btn btn-secondary btn-sm">Previous</button>
      ` : '<div></div>'}
      
      <div>
        ${isLast ? `
          <button id="btn-submit-exam" class="btn btn-success" ${!isAnswered ? 'disabled style="opacity: 0.5;"' : ''}>
            Finish & Grade Assessment
          </button>
        ` : `
          <button id="btn-next-q" class="btn btn-primary" ${!isAnswered ? 'disabled style="opacity: 0.5;"' : ''}>
            Next Question →
          </button>
        `}
      </div>
    `;

    const prevBtn = this.footerEl.querySelector('#btn-prev-q');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentQuestionIndex--;
        this.renderQuestion();
      });
    }

    const nextBtn = this.footerEl.querySelector('#btn-next-q');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentQuestionIndex++;
        this.renderQuestion();
      });
    }

    const submitBtn = this.footerEl.querySelector('#btn-submit-exam');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.gradeExam();
      });
    }
  }

  gradeExam() {
    let score = 0;
    this.questions.forEach((q, idx) => {
      if (this.userAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    const total = this.questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 66; // 2 out of 3 or higher is a pass

    // Record result in state store
    const updatedProgress = store.recordAssessmentResult(this.currentLanguage.id, this.currentLevel, percentage, passed);

    if (passed) {
      if (this.currentLevel === 3) {
        fireCertificateConfetti();
      } else {
        fireCelebrationConfetti();
      }
    }

    const badgeName = this.currentLevel === 1 ? 'Bronze Apprentice' : (this.currentLevel === 2 ? 'Silver Specialist' : 'Gold Master');

    this.bodyEl.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">
          ${passed ? '🎉' : '📚'}
        </div>

        <h3 style="font-size: 1.6rem; font-weight: 800; color: ${passed ? '#34d399' : '#f87171'};">
          ${passed ? 'Assessment Successfully Cleared!' : 'Needs Review & Practice'}
        </h3>

        <p style="font-size: 1rem; color: #cbd5e1; max-width: 500px; margin: 0.5rem auto 1.5rem;">
          You scored <strong style="color: #fff; font-size: 1.25rem;">${score} / ${total}</strong> (${percentage}%).
          ${passed 
            ? `Congratulations! You have unlocked the <strong style="color: #facc15;">${badgeName} Badge</strong>.`
            : `A minimum passing score of 66% is required to unlock this badge. Review concepts and re-attempt.`
          }
        </p>

        ${passed && this.currentLevel === 3 ? `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: var(--radius-md); padding: 1.25rem; margin: 1.5rem 0; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">📜</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #facc15;">Official Certificate Generated!</div>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.25rem;">
              Credential ID: <strong style="font-family: var(--font-mono); color: #fff;">${updatedProgress.certId}</strong>.
              This credential is now verified and displayed in the HR recruiter dashboard.
            </p>
          </div>
        ` : ''}

        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; text-align: left; margin-top: 1.5rem;">
          <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.75rem;">Question Breakdown</h5>
          ${this.questions.map((q, idx) => {
            const isCorrect = this.userAnswers[idx] === q.correctIndex;
            return `
              <div style="font-size: 0.85rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #e2e8f0;">Q${idx+1}: ${q.title}</span>
                <span style="font-weight: 700; color: ${isCorrect ? '#34d399' : '#f87171'};">
                  ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.footerEl.innerHTML = `
      <button id="btn-modal-done" class="btn btn-primary">Done</button>
    `;

    this.footerEl.querySelector('#btn-modal-done').addEventListener('click', () => {
      this.close();
      if (this.onFinishCallback) this.onFinishCallback();
    });
  }

  escapeSnippet(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  close() {
    this.overlay.classList.remove('active');
  }
}
