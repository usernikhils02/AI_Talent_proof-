import { store } from '../../state/store.js';

export function renderAuthPage(container) {
  // Step 1: 'select-role' (2 big cards: Student vs HR)
  // Step 2: 'auth-form' (animated in after picking role)
  let currentStep = 'select-role'; 
  let selectedRole = null; // 'student' | 'hr'
  let authMode = 'register'; // 'register' | 'login'

  function render() {
    if (currentStep === 'select-role') {
      container.innerHTML = `
        <div class="auth-page-container">
          <div style="max-width: 820px; width: 100%; text-align: center;">
            <!-- Brand Badge -->
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--bg-violet-tint); border: 1.5px solid var(--border-violet); padding: 0.4rem 1.25rem; border-radius: var(--radius-full); margin-bottom: 1.5rem; color: var(--violet-primary); font-weight: 700; font-size: 0.85rem;">
              Talent Proof Portal
            </div>

            <h1 style="font-size: 2.6rem; font-weight: 800; color: var(--text-heading); letter-spacing: -0.03em; line-height: 1.2;">
              Select Your Portal to Continue
            </h1>
            <p style="font-size: 1.1rem; color: var(--text-muted); max-width: 580px; margin: 0.75rem auto 3rem; line-height: 1.6;">
              Please select whether you are entering as a <strong>Student / Intern</strong> to take assessments, or as an <strong>HR Recruiter</strong> to hire verified talent.
            </p>

            <!-- 2 Big Animated Choice Cards -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <!-- Student Card -->
              <div id="btn-pick-student" class="auth-choice-card">
                <div class="auth-choice-icon-large" style="background: linear-gradient(135deg, #7c3aed, #9333ea);">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.6rem;">
                  Student / Intern
                </h2>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.75rem;">
                  Take timed programming challenges, unlock Level 1-3 badges, get verified certificates, and submit capstone project repos.
                </p>
                <div class="auth-card-btn-pill">
                  Continue as Student →
                </div>
              </div>

              <!-- HR Recruiter Card -->
              <div id="btn-pick-hr" class="auth-choice-card">
                <div class="auth-choice-icon-large" style="background: linear-gradient(135deg, #4f46e5, #0284c7);">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.6rem;">
                  HR Recruiter
                </h2>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.75rem;">
                  Access pre-verified candidates, inspect submitted GitHub capstones, review test scores, and schedule interviews.
                </p>
                <div class="auth-card-btn-pill" style="background: #f1f5f9; color: var(--text-heading);">
                  Continue as Recruiter →
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Card click events with smooth animation
      const cardStudent = container.querySelector('#btn-pick-student');
      const cardHr = container.querySelector('#btn-pick-hr');

      cardStudent.addEventListener('click', () => {
        selectedRole = 'student';
        currentStep = 'auth-form';
        render();
      });

      cardHr.addEventListener('click', () => {
        selectedRole = 'hr';
        currentStep = 'auth-form';
        render();
      });
    } else {
      // Step 2: Animated Login / Register Form
      const isStudent = selectedRole === 'student';
      const roleTitle = isStudent ? 'Student / Intern' : 'HR Recruiter';
      const roleColor = isStudent ? 'var(--violet-primary)' : '#0284c7';

      container.innerHTML = `
        <div class="auth-page-container">
          <div class="auth-card auth-form-slide-in">
            <!-- Back to Role Selection -->
            <button id="btn-back-to-roles" style="display: inline-flex; align-items: center; gap: 0.35rem; background: none; border: none; color: var(--violet-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer; margin-bottom: 1.5rem;">
              ← Change Portal (${roleTitle})
            </button>

            <!-- Header with Role Icon -->
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem;">
              <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: ${isStudent ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'linear-gradient(135deg, #0284c7, #38bdf8)'}; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);">
                ${isStudent ? `
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                ` : `
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                `}
              </div>
              <div>
                <h2 style="font-size: 1.65rem; font-weight: 800; color: var(--text-heading); letter-spacing: -0.02em;">
                  ${authMode === 'register' ? `Register as ${roleTitle}` : `Sign In as ${roleTitle}`}
                </h2>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 2px;">
                  ${authMode === 'register' ? 'New here? Create your account in seconds' : 'Welcome back! Enter your details to continue'}
                </p>
              </div>
            </div>

            <!-- Form -->
            <!-- Form -->
            <form id="role-auth-form" novalidate>
              <div id="auth-error-banner" style="display: none; background: #fef2f2; border: 1.5px solid #f87171; border-radius: 10px; padding: 0.75rem 1rem; color: #b91c1c; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.25rem; line-height: 1.4;">
              </div>

              ${authMode === 'register' ? `
                <div class="form-group">
                  <label class="form-label" for="reg-name">Full Name *</label>
                  <input type="text" id="reg-name" class="form-input" placeholder="${isStudent ? 'e.g. Devin Vance' : 'e.g. Sarah Jenkins'}" required />
                </div>

                <div class="form-group">
                  <label class="form-label" for="reg-username">Username * <span style="font-weight: 400; font-size: 0.78rem; color: #64748b;">(letters, numbers &amp; spaces only - NO special characters)</span></label>
                  <input type="text" id="reg-username" class="form-input" placeholder="e.g. devinvance2026" required autocomplete="username" />
                  <div id="username-validation-hint" style="font-size: 0.78rem; margin-top: 4px; display: none;"></div>
                </div>
              ` : `
                <div class="form-group">
                  <label class="form-label" for="login-identifier">Username or Email *</label>
                  <input type="text" id="login-identifier" class="form-input" placeholder="${isStudent ? 'student username or email' : 'recruiter username or email'}" required />
                </div>
              `}

              ${authMode === 'register' ? `
                <div class="form-group">
                  <label class="form-label" for="reg-email">Email Address *</label>
                  <input type="email" id="reg-email" class="form-input" placeholder="${isStudent ? 'student@university.edu' : 'recruiter@company.com'}" required />
                </div>
              ` : ''}

              <div class="form-group">
                <label class="form-label" for="reg-password">Password *</label>
                <div style="position: relative;">
                  <input type="password" id="reg-password" class="form-input" placeholder="••••••••••••" required style="padding-right: 2.75rem;" />
                  <button type="button" id="btn-toggle-pwd" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #64748b; font-size: 1rem; padding: 4px;" title="Show/Hide Password">
                    👁️
                  </button>
                </div>

                <!-- Password Requirements Checklist (Live visual feedback for strict security) -->
                ${authMode === 'register' ? `
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.85rem 1rem; margin-top: 0.65rem;">
                    <div style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
                      Password Security Requirements:
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem;">
                      <div id="rule-len" style="display: flex; align-items: center; gap: 0.45rem; color: #64748b;">
                        <span class="rule-icon">○</span>
                        <span>At least <strong>10 characters</strong></span>
                      </div>
                      <div id="rule-special" style="display: flex; align-items: center; gap: 0.45rem; color: #64748b;">
                        <span class="rule-icon">○</span>
                        <span>At least <strong>3 special characters</strong> (e.g. !@#$%^&amp;*()_+)</span>
                      </div>
                      <div id="rule-num" style="display: flex; align-items: center; gap: 0.45rem; color: #64748b;">
                        <span class="rule-icon">○</span>
                        <span>At least <strong>1 number</strong> (0-9)</span>
                      </div>
                      <div id="rule-cap" style="display: flex; align-items: center; gap: 0.45rem; color: #64748b;">
                        <span class="rule-icon">○</span>
                        <span>At least <strong>1 capital letter</strong> (A-Z)</span>
                      </div>
                    </div>
                  </div>
                ` : ''}
              </div>

              ${authMode === 'register' && isStudent ? `
                <div class="form-group">
                  <label class="form-label" for="reg-college">College / University</label>
                  <input type="text" id="reg-college" class="form-input" placeholder="e.g. Apex Institute of Technology" />
                </div>
              ` : ''}

              ${authMode === 'register' && !isStudent ? `
                <div class="form-group">
                  <label class="form-label" for="reg-company">Company / Organization</label>
                  <input type="text" id="reg-company" class="form-input" placeholder="e.g. NexHire Corp / Acme Inc" />
                </div>
              ` : ''}

              <button type="submit" id="btn-auth-submit" class="btn btn-primary" style="width: 100%; padding: 0.9rem; font-size: 1rem; margin-top: 1rem;">
                ${authMode === 'register' ? `Complete Registration →` : `Sign In to Portal →`}
              </button>
            </form>

            <!-- Toggle between Register and Login -->
            <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); font-size: 0.9rem; color: var(--text-muted);">
              ${authMode === 'register' ? `
                Already registered as ${roleTitle}? 
                <button id="btn-toggle-mode" style="background: none; border: none; color: var(--violet-primary); font-weight: 700; cursor: pointer; text-decoration: underline;">Sign In here</button>
              ` : `
                New ${roleTitle}? 
                <button id="btn-toggle-mode" style="background: none; border: none; color: var(--violet-primary); font-weight: 700; cursor: pointer; text-decoration: underline;">Create an account</button>
              `}
            </div>
          </div>
        </div>
      `;

      // Back to role selection
      container.querySelector('#btn-back-to-roles').addEventListener('click', () => {
        currentStep = 'select-role';
        render();
      });

      // Toggle register/login
      container.querySelector('#btn-toggle-mode').addEventListener('click', () => {
        authMode = authMode === 'register' ? 'login' : 'register';
        render();
      });

      // Toggle password visibility
      const pwdInput = container.querySelector('#reg-password');
      const togglePwdBtn = container.querySelector('#btn-toggle-pwd');
      if (togglePwdBtn && pwdInput) {
        togglePwdBtn.addEventListener('click', () => {
          pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
        });
      }

      // Password Validation Helper:
      // Requirements:
      // 1. Not less than 10 characters (>= 10)
      // 2. At least 3 special characters
      // 3. Numbers included (>= 1)
      // 4. Capital letters included (>= 1)
      function evaluatePassword(pwd) {
        const hasMinLen = pwd.length >= 10;
        // Count special characters (any char that is not a letter or digit or space)
        const specialMatches = pwd.match(/[^a-zA-Z0-9\s]/g) || [];
        const hasSpecial3 = specialMatches.length >= 3;
        const hasNumber = /\d/.test(pwd);
        const hasCapital = /[A-Z]/.test(pwd);

        return {
          hasMinLen,
          hasSpecial3,
          hasNumber,
          hasCapital,
          specialCount: specialMatches.length,
          isValid: hasMinLen && hasSpecial3 && hasNumber && hasCapital
        };
      }

      // Live validation UI updates if registering
      if (authMode === 'register') {
        const usernameInput = container.querySelector('#reg-username');
        const userHint = container.querySelector('#username-validation-hint');
        const ruleLen = container.querySelector('#rule-len');
        const ruleSpecial = container.querySelector('#rule-special');
        const ruleNum = container.querySelector('#rule-num');
        const ruleCap = container.querySelector('#rule-cap');

        // Username live check: NO special characters allowed (only alphanumeric & spaces)
        usernameInput.addEventListener('input', () => {
          const val = usernameInput.value;
          const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(val);

          if (hasSpecialChars) {
            usernameInput.style.borderColor = '#ef4444';
            userHint.style.display = 'block';
            userHint.style.color = '#dc2626';
            userHint.innerHTML = '❌ <strong>Special characters are NOT allowed</strong> in username. Please use only letters and numbers.';
          } else if (val.trim().length > 0) {
            usernameInput.style.borderColor = '#10b981';
            userHint.style.display = 'block';
            userHint.style.color = '#059669';
            userHint.innerHTML = '✓ Username is valid (no special characters)';
          } else {
            usernameInput.style.borderColor = '#e2e8f0';
            userHint.style.display = 'none';
          }
        });

        // Live Password checklist update
        pwdInput.addEventListener('input', () => {
          const res = evaluatePassword(pwdInput.value);

          function updateRule(el, valid, text) {
            if (valid) {
              el.style.color = '#059669';
              el.querySelector('.rule-icon').innerHTML = '✓';
              el.querySelector('.rule-icon').style.color = '#059669';
            } else {
              el.style.color = '#64748b';
              el.querySelector('.rule-icon').innerHTML = '○';
              el.querySelector('.rule-icon').style.color = '#94a3b8';
            }
          }

          updateRule(ruleLen, res.hasMinLen);
          updateRule(ruleSpecial, res.hasSpecial3);
          if (res.hasSpecial3) {
            ruleSpecial.innerHTML = `<span class="rule-icon" style="color: #059669;">✓</span> <span>At least <strong>3 special characters</strong> (${res.specialCount} found)</span>`;
          } else {
            ruleSpecial.innerHTML = `<span class="rule-icon" style="color: #94a3b8;">○</span> <span>At least <strong>3 special characters</strong> (${res.specialCount}/3 added)</span>`;
          }
          updateRule(ruleNum, res.hasNumber);
          updateRule(ruleCap, res.hasCapital);

          if (res.isValid) {
            pwdInput.style.borderColor = '#10b981';
          } else if (pwdInput.value.length > 0) {
            pwdInput.style.borderColor = '#f59e0b';
          } else {
            pwdInput.style.borderColor = '#e2e8f0';
          }
        });
      }

      // Form submission with strict validation enforcement
      const authForm = container.querySelector('#role-auth-form');
      const errorBanner = container.querySelector('#auth-error-banner');

      function showError(msg) {
        errorBanner.innerHTML = `⚠️ ${msg}`;
        errorBanner.style.display = 'block';
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      function hideError() {
        errorBanner.style.display = 'none';
        errorBanner.innerHTML = '';
      }

      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hideError();

        const pwd = pwdInput.value;

        if (authMode === 'register') {
          const name = container.querySelector('#reg-name').value.trim();
          const username = container.querySelector('#reg-username').value.trim();
          const email = container.querySelector('#reg-email').value.trim();
          const college = container.querySelector('#reg-college')?.value.trim();
          const company = container.querySelector('#reg-company')?.value.trim();

          // 1. Validate Username: Must not be empty and NO special characters allowed
          if (!username) {
            showError('Please enter a username.');
            return;
          }

          if (/[^a-zA-Z0-9\s]/.test(username)) {
            showError('Username is invalid! <strong>No special characters</strong> are allowed in the username. Please use only letters and numbers.');
            container.querySelector('#reg-username').focus();
            return;
          }

          // 2. Validate Password:
          // Strict rules:
          // - Not less than 10 characters
          // - At least 3 special characters
          // - Numbers included
          // - Capital letters included
          const pwdCheck = evaluatePassword(pwd);

          if (!pwdCheck.hasMinLen) {
            showError('Password is too short! It must be <strong>at least 10 characters</strong> long.');
            pwdInput.focus();
            return;
          }

          if (!pwdCheck.hasCapital) {
            showError('Password must contain at least <strong>1 capital letter (A-Z)</strong>.');
            pwdInput.focus();
            return;
          }

          if (!pwdCheck.hasNumber) {
            showError('Password must contain at least <strong>1 number (0-9)</strong>.');
            pwdInput.focus();
            return;
          }

          if (!pwdCheck.hasSpecial3) {
            showError(`Password must contain at least <strong>3 special characters</strong> (currently has ${pwdCheck.specialCount}). Examples: !@#$%^&*()_+-=[]{}:;`);
            pwdInput.focus();
            return;
          }

          // All strict criteria passed! Register user in store
          store.register({
            name,
            username,
            email,
            password: pwd,
            role: selectedRole,
            college,
            company
          });
        } else {
          // Login Mode: Check identifier and password
          const identifier = container.querySelector('#login-identifier').value.trim();

          if (!identifier) {
            showError('Please enter your username or email address.');
            return;
          }

          if (!pwd) {
            showError('Please enter your password.');
            return;
          }

          store.login(identifier, selectedRole, pwd);
        }
      });
    }
  }

  render();
}
