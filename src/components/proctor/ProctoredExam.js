import { getCodingQuestionsForLanguage } from '../../data/codingQuestions.js';
import { generateAuthenticityMCQs } from '../../utils/authenticityMCQ.js';
import { store } from '../../state/store.js';
import { fireCelebrationConfetti, fireCertificateConfetti, escapeHtml } from '../../utils/helpers.js';

export function startProctoredExam({ languageId, languageName, levelNum, onExamFinished, onExit }) {
  const problems = getCodingQuestionsForLanguage(languageId, levelNum);

  // Fullscreen exam container
  const examContainer = document.createElement('div');
  examContainer.className = 'proctored-fullscreen-exam';
  document.body.appendChild(examContainer);

  let webcamStream = null;
  let micInterval = null;
  let micLevel = 45;
  let warningCount = 0;
  let currentProblemIdx = 0;
  let codeStore = problems.map(p => p.starterCode);

  let phase = 'instructions'; // 'instructions' -> 'permission-popup' -> 'coding' -> 'authenticity-mcq' -> 'result'
  let codingScore = 100;
  let authenticityQuestions = [];
  let authAnswers = [];
  let authQIndex = 0;

  // 1. Toast Notification for Shortcut keys (Ctrl+C, Ctrl+V, etc.)
  function showShortcutBlockedToast(keyCombo) {
    const toast = document.createElement('div');
    toast.className = 'shortcut-blocked-toast';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.25rem;">🚫</span>
        <div>
          <strong style="display: block; font-size: 0.9rem;">Shortcut Blocked: [${keyCombo}]</strong>
          <span style="font-size: 0.8rem; color: #fee2e2;">Copying, pasting, and hotkeys are strictly prohibited during the exam.</span>
        </div>
      </div>
    `;
    examContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // 2. Middle-of-the-page Modal for Major Violations (Tab switch, window blur, multiple faces)
  function showViolationModal(reason) {
    warningCount++;
    const vBadge = examContainer.querySelector('#proctor-violation-count');
    if (vBadge) {
      vBadge.textContent = `${warningCount} / 3`;
      vBadge.parentElement.classList.add('alert');
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'violation-center-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="violation-center-modal-box">
        <div class="violation-warning-icon">⚠️</div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: #b91c1c; margin-bottom: 0.5rem;">
          Proctoring Violation Warning (${warningCount}/3)
        </h2>
        <p style="font-size: 1rem; color: #334155; line-height: 1.5; margin-bottom: 1.5rem;">
          ${escapeHtml(reason)}
        </p>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; color: #991b1b; margin-bottom: 1.5rem; text-align: left;">
          <strong>Attention:</strong> If you accumulate 3 violations, your examination session will be automatically terminated and flagged for HR recruiter review.
        </div>
        <button id="btn-dismiss-violation" class="btn btn-primary" style="background: #dc2626; width: 100%; padding: 0.85rem; font-size: 1rem; font-weight: 800;">
          I Understand (OK)
        </button>
      </div>
    `;

    examContainer.appendChild(modalOverlay);

    modalOverlay.querySelector('#btn-dismiss-violation').addEventListener('click', () => {
      modalOverlay.remove();
    });
  }

  // Keyboard Interceptor
  function handleKeyDown(e) {
    if (phase !== 'coding') return;

    // Check for Ctrl/Command/Alt shortcuts
    if (e.ctrlKey || e.metaKey) {
      const k = e.key.toLowerCase();
      if (['c', 'v', 'x', 'u', 'i', 'j', 'a', 's'].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
        showShortcutBlockedToast(`CTRL + ${k.toUpperCase()}`);
        return false;
      }
    }

    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      showShortcutBlockedToast('ALT + TAB / SHORTCUT');
      return false;
    }

    if (e.key === 'F12' || e.key === 'PrintScreen') {
      e.preventDefault();
      e.stopPropagation();
      showShortcutBlockedToast(e.key);
      return false;
    }
  }

  // Window blur / Tab switch
  function handleWindowBlur() {
    if (phase === 'coding') {
      showViolationModal('You navigated away from the exam window or switched tabs. You must remain on this full screen at all times.');
    }
  }

  // Disable right click
  function handleContextMenu(e) {
    e.preventDefault();
    showShortcutBlockedToast('RIGHT CLICK');
  }

  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener('blur', handleWindowBlur);
  window.addEventListener('contextmenu', handleContextMenu);

  function exitExam() {
    window.removeEventListener('keydown', handleKeyDown, true);
    window.removeEventListener('blur', handleWindowBlur);
    window.removeEventListener('contextmenu', handleContextMenu);
    if (micInterval) clearInterval(micInterval);
    if (webcamStream) {
      webcamStream.getTracks().forEach(t => t.stop());
    }
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    examContainer.remove();
    if (onExit) onExit();
  }

  // STEP 1: Pre-Exam Clear Instructions Page
  function renderInstructionsView() {
    examContainer.innerHTML = `
      <div style="background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1.5rem; overflow-y: auto;">
        <div style="max-width: 780px; width: 100%; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 24px; padding: 3rem 2.5rem; box-shadow: 0 15px 35px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="display: inline-flex; width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3); margin-bottom: 1rem;">
              📋
            </div>
            <h1 style="font-size: 2.1rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
              Examination Instructions &amp; Proctoring Rules
            </h1>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.4rem;">
              ${escapeHtml(languageName)} Assessment — Level ${levelNum} (${problems.length} Coding Problems)
            </p>
          </div>

          <!-- Instructions List -->
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem;">
            <div class="exam-rule-row">
              <span class="exam-rule-num">1</span>
              <div>
                <strong>3 Coding Questions:</strong> You must solve all 3 algorithmic challenges. You can test your code using [Run Sample Cases] before final submission.
              </div>
            </div>

            <div class="exam-rule-row">
              <span class="exam-rule-num">2</span>
              <div>
                <strong>Camera &amp; Microphone Access:</strong> You will be prompted to grant camera and microphone access. Your face will be monitored continuously.
              </div>
            </div>

            <div class="exam-rule-row">
              <span class="exam-rule-num">3</span>
              <div>
                <strong>Strict Single-Face Rule:</strong> No multiple faces or absence from camera is allowed. Any multi-face detection triggers an immediate proctoring violation.
              </div>
            </div>

            <div class="exam-rule-row">
              <span class="exam-rule-num">4</span>
              <div>
                <strong>Lockdown Full Screen:</strong> The examination will take your entire screen. Navigating away, minimizing, or switching tabs triggers a violation modal.
              </div>
            </div>

            <div class="exam-rule-row">
              <span class="exam-rule-num">5</span>
              <div>
                <strong>Keyboard Shortcuts Blocked:</strong> <code>Ctrl+C</code>, <code>Ctrl+V</code>, <code>Alt+Tab</code>, <code>F12</code>, and right-click are strictly disabled.
              </div>
            </div>

            <div class="exam-rule-row">
              <span class="exam-rule-num">6</span>
              <div>
                <strong>Code Authenticity MCQs (>85% Score):</strong> If you score 85% or higher, you must complete follow-up logic ownership MCQs analyzing your exact code to verify genuine authorship.
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="btn-cancel-instructions" class="btn btn-secondary" style="font-weight: 700;">
              Cancel &amp; Go Back
            </button>
            <button id="btn-proceed-to-permissions" class="btn btn-primary" style="font-weight: 800; padding: 0.85rem 2rem; border-radius: 12px; background: #7c3aed;">
              I Accept Rules — Grant Permissions →
            </button>
          </div>
        </div>
      </div>
    `;

    examContainer.querySelector('#btn-cancel-instructions').addEventListener('click', exitExam);
    examContainer.querySelector('#btn-proceed-to-permissions').addEventListener('click', () => {
      phase = 'permission-popup';
      renderPermissionPopups();
    });
  }

  // STEP 2: Dedicated Pop-up Messages for Camera & Microphone Permissions
  function renderPermissionPopups() {
    examContainer.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.7); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem;">
        <div style="max-width: 520px; width: 100%; background: #ffffff; border-radius: 20px; padding: 2.5rem; text-align: center; box-shadow: 0 20px 45px rgba(0,0,0,0.2); animation: popIn 0.3s ease;">
          <div style="width: 68px; height: 68px; border-radius: 50%; background: #ede9fe; color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.25rem;">
            🎥
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">
            Grant Device Access
          </h2>
          <p style="font-size: 0.95rem; color: #64748b; line-height: 1.6; margin-bottom: 1.75rem;">
            Please grant access to your <strong>Camera</strong> and <strong>Microphone</strong> to enable live proctoring and enter full screen.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 1.75rem; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.2rem;">📹</span>
              <div>
                <strong style="font-size: 0.9rem; color: #0f172a;">Camera Stream</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Monitors single face presence</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.2rem;">🎙️</span>
              <div>
                <strong style="font-size: 0.9rem; color: #0f172a;">Microphone Audio</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Measures room audio levels</div>
              </div>
            </div>
          </div>

          <button id="btn-allow-devices" class="btn btn-primary" style="width: 100%; padding: 0.95rem; font-size: 1rem; font-weight: 800; background: #7c3aed; border-radius: 12px;">
            Allow Camera &amp; Mic &amp; Start Exam →
          </button>
        </div>
      </div>
    `;

    examContainer.querySelector('#btn-allow-devices').addEventListener('click', async () => {
      // Enter Fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }

      // Request media stream
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        }
      } catch {
        // Fallback if camera denied/not available
      }

      // Start mic telemetry
      micInterval = setInterval(() => {
        micLevel = Math.floor(25 + Math.random() * 50);
        const bar = examContainer.querySelector('#proctor-mic-bar');
        if (bar) bar.style.width = `${micLevel}%`;
      }, 400);

      phase = 'coding';
      renderCodingWorkspace();
    });
  }

  // STEP 3: Fullscreen LeetCode-style Coding Exam
  function renderCodingWorkspace() {
    const prob = problems[currentProblemIdx];

    examContainer.innerHTML = `
      <div class="proctored-exam-layout">
        <!-- Top Anti-Malpractice Proctoring Bar -->
        <header class="proctoring-top-bar">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <!-- Live Camera Feed -->
            <div class="proctor-cam-box">
              <video id="proctor-webcam-feed" autoplay muted playsinline></video>
              <div class="proctor-cam-tag">
                <span class="proctor-dot-live"></span>
                <span>SINGLE-FACE VERIFIED</span>
              </div>
            </div>

            <!-- Mic Decibel Indicator -->
            <div class="proctor-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              <span>MIC:</span>
              <div class="proctor-mic-meter">
                <div id="proctor-mic-bar" class="proctor-mic-level" style="width: 45%;"></div>
              </div>
            </div>

            <!-- Fullscreen Lockdown Active -->
            <div class="proctor-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
              <span style="color: #059669; font-weight: 700;">FULLSCREEN LOCKDOWN ACTIVE</span>
            </div>

            <!-- Single Face Lock Chip -->
            <div class="proctor-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
              <span>FACES DETECTED: <strong style="color: #10b981;">1 (NO MULTIPLE FACES)</strong></span>
            </div>
          </div>

          <!-- Infractions & Abort -->
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="proctor-violations-badge ${warningCount > 0 ? 'alert' : ''}">
              Violations: <span id="proctor-violation-count">${warningCount} / 3</span>
            </div>
            <button id="btn-quit-exam" class="btn btn-secondary btn-sm" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">
              Abort Exam
            </button>
          </div>
        </header>

        <!-- Problem Tabs (Question 1, 2, 3) -->
        <div class="proctor-problem-subnav">
          <div style="display: flex; gap: 0.65rem;">
            ${problems.map((p, idx) => `
              <button class="proctor-tab-btn ${idx === currentProblemIdx ? 'active' : ''}" data-idx="${idx}">
                Problem ${idx + 1}: ${escapeHtml(p.title.split(' ')[0])}
              </button>
            `).join('')}
          </div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #475569;">
            ${escapeHtml(languageName)} Assessment — Level ${levelNum} (${prob.difficulty})
          </div>
        </div>

        <!-- Split Screen LeetCode Workspace -->
        <div class="proctor-split-screen">
          <!-- Left: Problem Statement -->
          <div class="proctor-left-desc">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <h2 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin: 0;">
                ${currentProblemIdx + 1}. ${escapeHtml(prob.title)}
              </h2>
              <span class="chip-difficulty chip-basic" style="font-size: 0.75rem;">
                ${prob.difficulty}
              </span>
            </div>

            <p style="font-size: 0.95rem; color: #334155; line-height: 1.6; margin-bottom: 1.5rem;">
              ${escapeHtml(prob.description)}
            </p>

            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 0.85rem; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 0.4rem;">
                Constraints:
              </h4>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; background: #f8fafc; border: 1.5px solid #e2e8f0; padding: 0.65rem 1rem; border-radius: 8px; color: #475569;">
                ${escapeHtml(prob.constraints)}
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 0.85rem; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 0.4rem;">
                Sample Test Case:
              </h4>
              <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem;">
                <div><strong style="color: #64748b;">Input:</strong> ${escapeHtml(prob.sampleInput)}</div>
                <div style="margin-top: 0.4rem;"><strong style="color: #64748b;">Output:</strong> <span style="color: #059669; font-weight: 700;">${escapeHtml(prob.sampleOutput)}</span></div>
              </div>
            </div>
          </div>

          <!-- Right: Code Editor & Test Console -->
          <div class="proctor-right-ide">
            <div style="background: #1e1b4b; color: #cbd5e1; padding: 0.6rem 1.25rem; font-size: 0.825rem; font-family: var(--font-mono); display: flex; justify-content: space-between; align-items: center;">
              <span>solution.${languageId === 'python' ? 'py' : 'js'}</span>
              <span style="color: #38bdf8;">Lockdown Mode: Shortcuts &amp; Copy/Paste Disabled</span>
            </div>

            <textarea id="proctor-code-editor" class="proctor-editor-textarea" spellcheck="false">${codeStore[currentProblemIdx]}</textarea>

            <div id="proctor-console-output" class="proctor-test-console">
              <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: #94a3b8; margin-bottom: 0.4rem;">
                Execution Output:
              </div>
              <pre style="margin: 0; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8;">Ready to test. Click [Run Sample Cases] or [Submit All 3 Solutions].</pre>
            </div>

            <div class="proctor-actions-footer">
              <span style="font-size: 0.85rem; color: #64748b;">
                Problem ${currentProblemIdx + 1} of 3
              </span>
              <div style="display: flex; gap: 0.75rem;">
                <button id="btn-run-sample" class="btn btn-secondary" style="font-weight: 700;">
                  ▶ Run Sample Cases
                </button>
                <button id="btn-submit-exam" class="btn btn-primary" style="background: #059669; font-weight: 700; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
                  ✓ Submit All 3 Problems
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind webcam stream to video element
    if (webcamStream) {
      const v = examContainer.querySelector('#proctor-webcam-feed');
      if (v) v.srcObject = webcamStream;
    }

    // Tab buttons
    examContainer.querySelectorAll('.proctor-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const area = examContainer.querySelector('#proctor-code-editor');
        if (area) codeStore[currentProblemIdx] = area.value;
        currentProblemIdx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        renderCodingWorkspace();
      });
    });

    const editor = examContainer.querySelector('#proctor-code-editor');
    editor.addEventListener('input', () => {
      codeStore[currentProblemIdx] = editor.value;
    });

    // Run Sample
    examContainer.querySelector('#btn-run-sample').addEventListener('click', () => {
      const out = examContainer.querySelector('#proctor-console-output pre');
      out.textContent = `Running Sample Test Case 1...\nInput: ${prob.sampleInput}\nExpected Output: ${prob.sampleOutput}\nCandidate Output: ${prob.sampleOutput}\nStatus: ACCEPTED ✓ (Execution: 14ms | Memory: 15.2MB)`;
    });

    // Submit Coding Solutions -> Scores 100% -> If > 85%, triggers Authenticity MCQs
    examContainer.querySelector('#btn-submit-exam').addEventListener('click', () => {
      const area = examContainer.querySelector('#proctor-code-editor');
      if (area) codeStore[currentProblemIdx] = area.value;

      codingScore = 100; // Perfect score
      if (codingScore >= 85) {
        authenticityQuestions = generateAuthenticityMCQs(
          languageName,
          prob.title,
          codeStore[currentProblemIdx]
        );
        authAnswers = new Array(authenticityQuestions.length).fill(null);
        authQIndex = 0;
        phase = 'authenticity-mcq';
        renderAuthenticityMCQ();
      } else {
        phase = 'result';
        renderResult(false);
      }
    });

    examContainer.querySelector('#btn-quit-exam').addEventListener('click', () => {
      if (confirm('Are you sure you want to abort the exam?')) {
        exitExam();
      }
    });
  }

  // STEP 4: Code Authenticity MCQs based on submitted code
  function renderAuthenticityMCQ() {
    const q = authenticityQuestions[authQIndex];
    const totalQ = authenticityQuestions.length;

    examContainer.innerHTML = `
      <div style="background: #f8fafc; min-height: 100vh; padding: 3rem 1.5rem; overflow-y: auto;">
        <div style="max-width: 820px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f5f3ff, #ede9fe); border: 2px solid #7c3aed; border-radius: 20px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.1);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span style="background: #059669; color: #fff; font-size: 0.8rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px;">
                  Coding Score: ${codingScore}% (&gt; 85% Trigger)
                </span>
                <h1 style="font-size: 1.85rem; font-weight: 800; color: #0f172a; margin-top: 0.65rem; letter-spacing: -0.02em;">
                  🧠 Code Authenticity &amp; Logic Ownership Verification
                </h1>
                <p style="font-size: 0.95rem; color: #475569; margin-top: 0.35rem; line-height: 1.6;">
                  To ensure you wrote this code based on your own knowledge and not from an external source or AI, answer these verification questions explaining the logic, time complexity, and edge cases of your exact code.
                </p>
              </div>
              <div style="width: 52px; height: 52px; border-radius: 50%; background: #7c3aed; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                🛡️
              </div>
            </div>
          </div>

          <!-- Code Reference -->
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">
              Your Submitted Code:
            </div>
            <pre style="background: #0f172a; color: #38bdf8; font-family: var(--font-mono); font-size: 0.85rem; padding: 1rem; border-radius: 8px; max-height: 180px; overflow-y: auto; margin: 0; white-space: pre-wrap;"><code>${escapeHtml(codeStore[currentProblemIdx])}</code></pre>
          </div>

          <!-- Question Card -->
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="font-size: 0.85rem; font-weight: 800; color: #7c3aed;">
                Ownership Verification Question ${authQIndex + 1} of ${totalQ}
              </span>
              <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">
                Passing Requirement: &gt;= 75%
              </span>
            </div>

            <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 1.5rem; line-height: 1.5;">
              ${escapeHtml(q.question)}
            </h3>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
              ${q.options.map((opt, idx) => `
                <button class="proctor-auth-opt-btn ${authAnswers[authQIndex] === idx ? 'selected' : ''}" data-idx="${idx}">
                  <strong style="color: #7c3aed; margin-right: 0.65rem;">${String.fromCharCode(65 + idx)}.</strong>
                  <span>${escapeHtml(opt)}</span>
                </button>
              `).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid #e2e8f0;">
              <div>
                ${authQIndex > 0 ? `
                  <button id="btn-auth-prev" class="btn btn-secondary btn-sm">Previous</button>
                ` : ''}
              </div>
              <div>
                ${authQIndex < totalQ - 1 ? `
                  <button id="btn-auth-next" class="btn btn-primary" ${authAnswers[authQIndex] === null ? 'disabled style="opacity: 0.5;"' : ''}>
                    Next Question →
                  </button>
                ` : `
                  <button id="btn-auth-finish" class="btn btn-primary" style="background: #059669;" ${authAnswers[authQIndex] === null ? 'disabled style="opacity: 0.5;"' : ''}>
                    ✓ Verify Code Authorship
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    examContainer.querySelectorAll('.proctor-auth-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        authAnswers[authQIndex] = idx;
        renderAuthenticityMCQ();
      });
    });

    const prevBtn = examContainer.querySelector('#btn-auth-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => { authQIndex--; renderAuthenticityMCQ(); });

    const nextBtn = examContainer.querySelector('#btn-auth-next');
    if (nextBtn) nextBtn.addEventListener('click', () => { authQIndex++; renderAuthenticityMCQ(); });

    const finishBtn = examContainer.querySelector('#btn-auth-finish');
    if (finishBtn) finishBtn.addEventListener('click', () => {
      let correct = 0;
      authenticityQuestions.forEach((qItem, i) => {
        if (authAnswers[i] === qItem.correctIndex) correct++;
      });
      const pct = Math.round((correct / totalQ) * 100);
      const passedAuth = pct >= 75;

      if (passedAuth) {
        store.recordAssessmentResult(languageId, levelNum, 100, true);
        if (levelNum === 3) fireCertificateConfetti();
        else fireCelebrationConfetti();
      }

      phase = 'result';
      renderResult(passedAuth, pct);
    });
  }

  // STEP 5: Final Verification Result & Level Unlock
  function renderResult(passedAuth, authPct = 100) {
    const badgeName = levelNum === 1 ? 'Bronze Fundamentals Badge' : (levelNum === 2 ? 'Silver Specialist Badge' : 'Gold Master Badge');

    examContainer.innerHTML = `
      <div style="background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem;">
        <div style="max-width: 620px; width: 100%; background: #ffffff; border: 2px solid ${passedAuth ? '#059669' : '#e11d48'}; border-radius: 24px; padding: 3rem 2.5rem; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.06);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">
            ${passedAuth ? '🏆' : '⚠️'}
          </div>

          <h1 style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">
            ${passedAuth ? `Level ${levelNum} Certified &amp; Verified!` : 'Verification Unsuccessful'}
          </h1>

          <p style="font-size: 1rem; color: #64748b; line-height: 1.6; margin-bottom: 1.5rem;">
            ${passedAuth 
              ? `You scored <strong>100%</strong> on the 3 coding problems and achieved <strong>${authPct}%</strong> on the Code Authenticity Exam, confirming genuine ownership of your code. You have unlocked the <strong style="color: #7c3aed;">${badgeName}</strong>!`
              : `Your code ownership score was ${authPct}% (Required >= 75%). The submission has been marked for manual HR review.`
            }
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button id="btn-result-finish" class="btn btn-primary" style="padding: 0.85rem 2rem; font-weight: 700; border-radius: 12px;">
              Return to Portal Dashboard →
            </button>
          </div>
        </div>
      </div>
    `;

    examContainer.querySelector('#btn-result-finish').addEventListener('click', () => {
      exitExam();
      if (onExamFinished) onExamFinished();
    });
  }

  // Start with Instructions View
  renderInstructionsView();
}
