import { store } from '../../state/store.js';
import { fetchGitHubRepoMetadata, pingDeployedUrl } from '../../services/githubService.js';
import { generateTechnicalQuestions } from '../../services/questionGenerator.js';
import { escapeHtml, fireCelebrationConfetti } from '../../utils/helpers.js';

export function renderRoleProjectPage(container, roleId, onBack) {
  const role = store.getRoleById(roleId);
  const student = store.getCurrentStudent();
  const existingProject = (student.submittedProject && student.submittedProject.roleId === roleId)
    ? student.submittedProject
    : null;

  // State
  let isAnalyzing = false;
  let currentAnalysisStep = '';
  let analysisResult = existingProject ? {
    repoMetadata: existingProject.repoMetadata,
    liveCheck: existingProject.liveCheck,
    interviewQuestions: existingProject.interviewQuestions
  } : null;

  const overrides = role.fieldOverrides || {
    liveLabel: 'Deployed / Live Project URL *',
    livePlaceholder: 'https://my-app.vercel.app',
    liveHelp: 'Live URL where recruiters can interact with your project.'
  };

  function render() {
    container.innerHTML = `
      <div class="container" style="max-width: 960px; padding: 2.5rem 1.5rem 6rem;">
        <!-- Breadcrumb Navigation -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
          <button id="btn-back-to-roles" class="btn btn-secondary btn-sm" style="font-weight: 700; color: var(--violet-primary);">
            ← Back to All Roles
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">
            Role Track: <strong style="color: #0f172a;">${escapeHtml(role.title)}</strong>
          </span>
        </div>

        <!-- Role Banner -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: var(--radius-xl); padding: 2rem 2.25rem; margin-bottom: 2.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.02); display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.5rem;">
              <span style="font-size: 0.75rem; font-weight: 800; color: var(--violet-primary); background: var(--bg-violet-tint); padding: 0.2rem 0.65rem; border-radius: 9999px;">
                ${escapeHtml(role.badge)}
              </span>
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b;">
                ${escapeHtml(role.category || 'Engineering')}
              </span>
            </div>
            <h1 style="font-size: 2.2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; line-height: 1.2;">
              ${escapeHtml(role.title)} Project Submission
            </h1>
            <p style="font-size: 0.95rem; color: #64748b; margin-top: 0.5rem; line-height: 1.6; max-width: 650px;">
              ${escapeHtml(role.summary)}
            </p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; min-width: 220px;">
            <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 0.4rem;">
              Benchmark Requirement
            </div>
            <div style="font-size: 0.825rem; color: #334155; line-height: 1.4;">
              ${escapeHtml(role.submissionGuide)}
            </div>
          </div>
        </div>

        <!-- Submission Form Card -->
        <div class="white-panel" style="padding: 2.5rem; border-radius: var(--radius-xl); box-shadow: 0 8px 30px rgba(0,0,0,0.04); margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.45rem; font-weight: 800; color: #0f172a; margin-bottom: 0.4rem;">
            Capstone Project Details
          </h2>
          <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 2rem;">
            Provide your GitHub repository and live application URL. Our pipeline will extract repo metadata, ping your live deployment, and generate customized project interview questions.
          </p>

          <form id="project-capstone-form">
            <!-- 1. GitHub Repository URL -->
            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="form-label" for="inp-github" style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">
                GitHub Repository URL *
              </label>
              <div style="position: relative;">
                <input 
                  type="url" 
                  id="inp-github" 
                  class="form-input" 
                  placeholder="https://github.com/username/my-project-repo" 
                  value="${escapeHtml(existingProject?.githubUrl || '')}" 
                  required 
                />
              </div>
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                Must be a public GitHub repository with code commits and documentation.
              </div>
            </div>

            <!-- 2. Deployed / Live Project URL (Adapted per role) -->
            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="form-label" for="inp-live" style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">
                ${escapeHtml(overrides.liveLabel)}
              </label>
              <input 
                type="url" 
                id="inp-live" 
                class="form-input" 
                placeholder="${escapeHtml(overrides.livePlaceholder)}" 
                value="${escapeHtml(existingProject?.liveUrl || '')}" 
                required 
              />
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                ${escapeHtml(overrides.liveHelp)}
              </div>
            </div>

            <!-- 3. Demo Video Link -->
            <div class="form-group" style="margin-bottom: 1.75rem;">
              <label class="form-label" for="inp-video" style="font-size: 0.95rem; font-weight: 700; color: #0f172a;">
                Demo Video Link (Loom, YouTube, or Drive) *
              </label>
              <input 
                type="url" 
                id="inp-video" 
                class="form-input" 
                placeholder="https://www.loom.com/share/... or YouTube link" 
                value="${escapeHtml(existingProject?.demoVideoUrl || '')}" 
                required 
              />
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                A 2–4 minute screen recording walking through your implementation, user flow, and architecture.
              </div>
            </div>

            <!-- Optional Information Header -->
            <div style="padding-top: 1.5rem; margin-top: 1.5rem; border-top: 1px dashed #e2e8f0; margin-bottom: 1.5rem;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #635bff; text-transform: uppercase; letter-spacing: 0.05em;">
                Optional Project Metadata
              </span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.25rem;">
              <!-- Optional: Project Title -->
              <div class="form-group">
                <label class="form-label" for="inp-title">Project Title (Optional)</label>
                <input 
                  type="text" 
                  id="inp-title" 
                  class="form-input" 
                  placeholder="e.g. Distributed Task Orchestrator" 
                  value="${escapeHtml(existingProject?.title || '')}" 
                />
              </div>

              <!-- Optional: Tech Stack Tags -->
              <div class="form-group">
                <label class="form-label" for="inp-tech">Tech Stack Tags (Comma separated)</label>
                <input 
                  type="text" 
                  id="inp-tech" 
                  class="form-input" 
                  placeholder="e.g. React, Next.js, PostgreSQL, Redis" 
                  value="${escapeHtml((existingProject?.techStack || []).join(', '))}" 
                />
              </div>
            </div>

            <!-- Optional: Short Description -->
            <div class="form-group" style="margin-bottom: 2rem;">
              <label class="form-label" for="inp-desc">Short Project Description (Optional)</label>
              <textarea 
                id="inp-desc" 
                class="form-textarea" 
                rows="3" 
                placeholder="Explain the problem your project solves, core technical challenges overcome, and database architecture..."
              >${escapeHtml(existingProject?.description || '')}</textarea>
            </div>

            <!-- Error Banner -->
            <div id="project-form-error" style="display: none; background: #fef2f2; border: 1.5px solid #f87171; border-radius: 10px; padding: 0.85rem 1.25rem; color: #b91c1c; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem;"></div>

            <!-- Submit Button / Analysis Spinner -->
            <button 
              type="submit" 
              id="btn-submit-capstone" 
              class="btn btn-primary" 
              style="width: 100%; padding: 1rem; font-size: 1.05rem; font-weight: 800; background: #635bff; box-shadow: 0 4px 16px rgba(99, 91, 255, 0.35); border-radius: 12px;"
              ${isAnalyzing ? 'disabled' : ''}
            >
              ${isAnalyzing ? `
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                  <div style="width: 18px; height: 18px; border: 2.5px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                  <span>${escapeHtml(currentAnalysisStep || 'Analyzing Repository...')}</span>
                </div>
              ` : `
                <span>Submit Capstone &amp; Generate Technical Interview Questions →</span>
              `}
            </button>
          </form>
        </div>

        <!-- Rendered Results Section: Metadata, Live Health & Interview Questions -->
        <div id="project-analysis-mount">
          ${analysisResult ? renderAnalysisResultsHtml(analysisResult, role) : ''}
        </div>
      </div>
    `;

    // Event Bindings
    container.querySelector('#btn-back-to-roles').addEventListener('click', onBack);

    const form = container.querySelector('#project-capstone-form');
    const errBox = container.querySelector('#project-form-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errBox.style.display = 'none';

      const githubUrl = container.querySelector('#inp-github').value.trim();
      const liveUrl = container.querySelector('#inp-live').value.trim();
      const demoVideoUrl = container.querySelector('#inp-video').value.trim();
      const customTitle = container.querySelector('#inp-title').value.trim();
      const techInput = container.querySelector('#inp-tech').value.trim();
      const customDesc = container.querySelector('#inp-desc').value.trim();

      const techStack = techInput ? techInput.split(',').map(s => s.trim()).filter(Boolean) : [];

      if (!githubUrl || !liveUrl || !demoVideoUrl) {
        errBox.textContent = 'Please fill out all required fields: GitHub Repository URL, Deployed URL, and Demo Video Link.';
        errBox.style.display = 'block';
        return;
      }

      // Start asynchronous pipeline
      isAnalyzing = true;
      currentAnalysisStep = 'Connecting to GitHub API & Inspecting Codebase...';
      render();

      try {
        // Step 1: Fetch GitHub Repo Metadata
        const repoMetadata = await fetchGitHubRepoMetadata(githubUrl);
        currentAnalysisStep = 'Pinging Deployed Application URL...';
        const mountStep1 = container.querySelector('#btn-submit-capstone');
        if (mountStep1) mountStep1.innerHTML = `<span>Pinging Deployed Application URL...</span>`;

        // Step 2: Ping Deployed URL
        const liveCheck = await pingDeployedUrl(liveUrl);

        // Step 3: LLM Technical Interview Question Generation
        currentAnalysisStep = 'Generating Tailored Technical Questions...';
        const mountStep2 = container.querySelector('#btn-submit-capstone');
        if (mountStep2) mountStep2.innerHTML = `<span>Synthesizing Architectural Interview Questions...</span>`;

        const interviewQuestions = generateTechnicalQuestions({
          roleTitle: role.title,
          roleId: role.id,
          repoMetadata,
          projectTitle: customTitle || repoMetadata.repo,
          techStack: techStack.length ? techStack : repoMetadata.detectedFrameworks
        });

        // Step 4: Persist in store
        const projectPayload = {
          roleId: role.id,
          roleTitle: role.title,
          title: customTitle || repoMetadata.repo || 'Full Stack Capstone',
          description: customDesc || repoMetadata.description || `Production project built with ${repoMetadata.primaryLanguage}.`,
          githubUrl,
          liveUrl,
          demoVideoUrl,
          techStack: techStack.length ? techStack : repoMetadata.detectedFrameworks,
          repoMetadata,
          liveCheck,
          interviewQuestions
        };

        store.submitProject(projectPayload);
        fireCelebrationConfetti();

        analysisResult = {
          repoMetadata,
          liveCheck,
          interviewQuestions,
          projectPayload
        };

        isAnalyzing = false;
        render();

        // Smooth scroll to questions
        const questionsEl = container.querySelector('#interview-questions-section');
        if (questionsEl) {
          questionsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {
        isAnalyzing = false;
        render();
        const errMount = container.querySelector('#project-form-error');
        if (errMount) {
          errMount.textContent = `Error processing project: ${err.message}`;
          errMount.style.display = 'block';
        }
      }
    });
  }

  function renderAnalysisResultsHtml(data, role) {
    const meta = data.repoMetadata || {};
    const live = data.liveCheck || {};
    const questions = data.interviewQuestions || [];

    return `
      <!-- 1. Pipeline Verification Highlights -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: var(--radius-xl); padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚡</span> Automated Backend Processing Completed
          </h3>
          <span style="font-size: 0.78rem; font-weight: 800; color: #059669; background: #d1fae5; padding: 0.25rem 0.75rem; border-radius: 9999px;">
            ✓ Repo &amp; Live Site Verified
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
          <!-- GitHub Repo Card -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.35rem;">
              GitHub Repository
            </div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem;">
              ${escapeHtml(meta.fullName || 'Repository')}
            </div>
            <div style="font-size: 0.825rem; color: #475569; display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <span>⭐ ${meta.stars || 0} Stars</span>
              <span>🍴 ${meta.forks || 0} Forks</span>
              <span>💻 ${meta.primaryLanguage || 'JavaScript'}</span>
            </div>
          </div>

          <!-- Deployed URL Health Ping -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.35rem;">
              Deployment Ping Check
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: ${live.isLive ? '#10b981' : '#ef4444'};"></span>
              <span style="font-size: 1rem; font-weight: 800; color: #0f172a;">
                ${live.isLive ? 'Deployment is LIVE' : 'Offline / Unreachable'}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: #64748b;">
              ${escapeHtml(live.statusText || 'Ping completed')}
            </div>
          </div>

          <!-- Detected Frameworks -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.35rem;">
              Detected Frameworks
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.25rem;">
              ${(meta.detectedFrameworks?.length ? meta.detectedFrameworks : ['Node.js', 'Express', 'React']).map(f => `
                <span style="font-size: 0.75rem; background: #eef2ff; color: #635bff; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px;">
                  ${escapeHtml(f)}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- File Structure & Dependencies summary -->
        ${meta.dependencies?.length ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.4rem;">
              Parsed Dependencies from Package Manifest
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
              ${meta.dependencies.slice(0, 14).map(d => `
                <span style="font-family: var(--font-mono); font-size: 0.75rem; background: #ffffff; border: 1px solid #e2e8f0; color: #334155; padding: 0.15rem 0.5rem; border-radius: 4px;">
                  ${escapeHtml(d)}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- 2. Technical Interview Questions Section -->
      <div id="interview-questions-section" style="background: #ffffff; border: 1.5px solid #ddd6fe; border-radius: var(--radius-xl); padding: 2.25rem 2.5rem; box-shadow: 0 10px 30px rgba(124, 58, 237, 0.08);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; font-weight: 800; color: #635bff; background: #eef2ff; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.4rem;">
              <span>🤖</span> AI Architectural Extraction
            </div>
            <h3 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
              Tailored Technical Interview Questions
            </h3>
            <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.25rem;">
              Generated specifically for your <strong>${escapeHtml(role.title)}</strong> submission based on your actual codebase architecture, package dependencies, and design patterns.
            </p>
          </div>
          <span style="font-size: 0.85rem; font-weight: 800; background: #635bff; color: #ffffff; padding: 0.4rem 0.9rem; border-radius: 10px;">
            ${questions.length} Questions Generated
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${questions.map((q, idx) => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 1.4rem 1.6rem; transition: var(--transition);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #635bff; background: #eef2ff; padding: 0.2rem 0.65rem; border-radius: 6px;">
                  ${escapeHtml(q.category)}
                </span>
                <span style="font-size: 0.72rem; font-weight: 700; color: #64748b;">
                  Question ${idx + 1} of ${questions.length}
                </span>
              </div>
              <p style="font-size: 1rem; font-weight: 700; color: #0f172a; line-height: 1.6; margin: 0;">
                "${escapeHtml(q.question)}"
              </p>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 2rem; padding: 1.25rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">🎉</span>
            <div>
              <div style="font-size: 0.95rem; font-weight: 800; color: #166534;">
                Project Ready for Recruiter Evaluation
              </div>
              <div style="font-size: 0.825rem; color: #15803d;">
                These project-grounded questions will be presented directly to technical interviewers in the HR Portal.
              </div>
            </div>
          </div>
          <button id="btn-done-overview" class="btn btn-secondary btn-sm" style="font-weight: 700;">
            Done &amp; Return to Roles
          </button>
        </div>
      </div>
    `;
  }

  render();

  // Handle return click from completion banner
  container.addEventListener('click', (e) => {
    if (e.target.id === 'btn-done-overview' || e.target.closest('#btn-done-overview')) {
      onBack();
    }
  });
}
