import { store } from '../../state/store.js';
import { fireCelebrationConfetti } from '../../utils/helpers.js';

export class ProjectSubmitModalController {
  constructor(onProjectSubmitted) {
    this.overlay = document.getElementById('project-modal-overlay');
    this.form = document.getElementById('project-submission-form');
    this.closeBtn = document.getElementById('project-modal-close-btn');
    this.cancelBtn = document.getElementById('btn-cancel-project');
    
    this.roleIdInput = document.getElementById('proj-role-id');
    this.roleTitleInput = document.getElementById('proj-role-title');
    this.titleInput = document.getElementById('proj-title');
    this.descInput = document.getElementById('proj-desc');
    this.techInput = document.getElementById('proj-tech');
    this.githubInput = document.getElementById('proj-github');
    this.liveInput = document.getElementById('proj-live');

    this.onProjectSubmitted = onProjectSubmitted;
    this.initEvents();
  }

  initEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.cancelBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  open(roleId, roleTitle) {
    this.roleIdInput.value = roleId;
    this.roleTitleInput.value = roleTitle;

    // Check if student already submitted for this
    const student = store.getCurrentStudent();
    if (student.submittedProject && student.submittedProject.roleId === roleId) {
      this.titleInput.value = student.submittedProject.title || '';
      this.descInput.value = student.submittedProject.description || '';
      this.techInput.value = (student.submittedProject.techStack || []).join(', ');
      this.githubInput.value = student.submittedProject.githubUrl || '';
      this.liveInput.value = student.submittedProject.liveUrl || '';
    } else {
      this.form.reset();
      this.roleIdInput.value = roleId;
      this.roleTitleInput.value = roleTitle;
    }

    document.getElementById('project-modal-title').textContent = `Submit Project for ${roleTitle}`;
    this.overlay.classList.add('active');
  }

  handleSubmit() {
    const roleId = this.roleIdInput.value;
    const roleTitle = this.roleTitleInput.value;
    const title = this.titleInput.value.trim();
    const description = this.descInput.value.trim();
    const techStack = this.techInput.value.split(',').map(s => s.trim()).filter(Boolean);
    const githubUrl = this.githubInput.value.trim();
    const liveUrl = this.liveInput.value.trim();

    if (!title || !description || !githubUrl) {
      alert('Please fill out the project title, description, and GitHub URL.');
      return;
    }

    store.submitProject({
      roleId,
      roleTitle,
      title,
      description,
      techStack,
      githubUrl,
      liveUrl
    });

    fireCelebrationConfetti();
    this.close();

    if (this.onProjectSubmitted) {
      this.onProjectSubmitted();
    }
  }

  close() {
    this.overlay.classList.remove('active');
  }
}
