import { INITIAL_STUDENTS, CURRENT_STUDENT_DEFAULT } from '../data/initialData.js';
import { DEFAULT_ROLES } from '../data/roles.js';

const STORAGE_KEYS = {
  CURRENT_USER: 'talentproof_current_user_v3',
  CANDIDATE_POOL: 'talentproof_candidates_pool_v3',
  ROLES_REGISTRY: 'talentproof_roles_registry_v1'
};

class Store {
  constructor() {
    this.listeners = new Set();
    this.sessionUser = null; // Stored only in memory for this session; reloading returns to login!
    this.currentView = 'login'; // 'login' | 'instructions' | 'student-home' | 'programming-languages' | 'other-skills' | 'hr-home'
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.CANDIDATE_POOL)) {
      const defaultUser = { ...CURRENT_STUDENT_DEFAULT, userRole: 'student' };
      localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify([defaultUser, ...INITIAL_STUDENTS]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROLES_REGISTRY)) {
      localStorage.setItem(STORAGE_KEYS.ROLES_REGISTRY, JSON.stringify(DEFAULT_ROLES));
    }
  }

  // Dynamic Roles Registry Methods
  getRoles() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ROLES_REGISTRY);
      return raw ? JSON.parse(raw) : DEFAULT_ROLES;
    } catch {
      return DEFAULT_ROLES;
    }
  }

  getRoleById(roleId) {
    const roles = this.getRoles();
    return roles.find(r => r.id === roleId) || roles[0];
  }

  addRole(roleData) {
    const roles = this.getRoles();
    const existingIndex = roles.findIndex(r => r.id === roleData.id);
    if (existingIndex !== -1) {
      roles[existingIndex] = { ...roles[existingIndex], ...roleData };
    } else {
      roles.push(roleData);
    }
    localStorage.setItem(STORAGE_KEYS.ROLES_REGISTRY, JSON.stringify(roles));
    this.notify();
    return roles;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(cb => cb());
  }

  getView() {
    return this.currentView;
  }

  setView(view) {
    this.currentView = view;
    this.notify();
  }

  isAuthenticated() {
    return !!this.sessionUser;
  }

  getCurrentUser() {
    return this.sessionUser;
  }

  login(identifier, role = 'student', password = '') {
    const pool = this.getCandidates();
    const cleanId = (identifier || '').trim().toLowerCase();
    let user = pool.find(u => 
      (u.email && u.email.toLowerCase() === cleanId) ||
      (u.username && u.username.toLowerCase() === cleanId)
    );

    if (!user) {
      if (role === 'student') {
        user = {
          ...CURRENT_STUDENT_DEFAULT,
          id: `stud-${Date.now()}`,
          name: cleanId.includes('@') ? cleanId.split('@')[0].replace('.', ' ') : cleanId,
          username: cleanId.replace(/[^a-zA-Z0-9\s]/g, ''),
          email: cleanId.includes('@') ? cleanId : `${cleanId}@student.edu`,
          password: password,
          userRole: 'student'
        };
        pool.unshift(user);
        localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify(pool));
      } else {
        user = {
          id: `hr-${Date.now()}`,
          name: cleanId.includes('@') ? cleanId.split('@')[0].replace('.', ' ') : cleanId,
          username: cleanId.replace(/[^a-zA-Z0-9\s]/g, ''),
          email: cleanId.includes('@') ? cleanId : `${cleanId}@company.com`,
          password: password,
          userRole: 'hr',
          title: 'Senior Technical Recruiter'
        };
      }
    } else {
      user.userRole = role;
    }

    this.sessionUser = user;
    // If student, go to instructions page first!
    if (role === 'student') {
      this.currentView = 'instructions';
    } else {
      this.currentView = 'hr-home';
    }
    this.notify();
  }

  register({ name, username, email, password, role, college, gradYear, company }) {
    let newUser;
    if (role === 'student') {
      newUser = {
        ...CURRENT_STUDENT_DEFAULT,
        id: `stud-${Date.now()}`,
        name: name || username || 'Student Intern',
        username: username || (email ? email.split('@')[0] : 'student'),
        email: email,
        password: password,
        college: college || 'National Institute of Technology',
        gradYear: gradYear || 2026,
        userRole: 'student'
      };
      const pool = this.getCandidates();
      pool.unshift(newUser);
      localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify(pool));
    } else {
      newUser = {
        id: `hr-${Date.now()}`,
        name: name || username || 'HR Recruiter',
        username: username || (email ? email.split('@')[0] : 'recruiter'),
        email: email,
        password: password,
        company: company || 'Enterprise Corp',
        title: 'Talent Acquisition Partner',
        userRole: 'hr'
      };
    }

    this.sessionUser = newUser;
    if (role === 'student') {
      this.currentView = 'instructions';
    } else {
      this.currentView = 'hr-home';
    }
    this.notify();
  }

  logout() {
    this.sessionUser = null;
    this.currentView = 'login';
    this.notify();
  }

  getCurrentStudent() {
    if (this.sessionUser && this.sessionUser.userRole === 'student') {
      return this.sessionUser;
    }
    return CURRENT_STUDENT_DEFAULT;
  }

  saveCurrentStudent(studentData) {
    this.sessionUser = studentData;
    const pool = this.getCandidates();
    const index = pool.findIndex(c => c.id === studentData.id);
    if (index !== -1) {
      pool[index] = { ...pool[index], ...studentData };
    } else {
      pool.unshift(studentData);
    }
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify(pool));
    this.notify();
  }

  getCandidates() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CANDIDATE_POOL);
      return raw ? JSON.parse(raw) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  }

  updateCandidateStatus(candidateId, status, hrNotes) {
    const pool = this.getCandidates();
    const candidate = pool.find(c => c.id === candidateId);
    if (candidate) {
      candidate.status = status;
      if (hrNotes !== undefined) candidate.hrNotes = hrNotes;
      localStorage.setItem(STORAGE_KEYS.CANDIDATE_POOL, JSON.stringify(pool));

      if (this.sessionUser && this.sessionUser.id === candidateId) {
        this.sessionUser.status = status;
        if (hrNotes !== undefined) this.sessionUser.hrNotes = hrNotes;
      }
      this.notify();
    }
  }

  recordAssessmentResult(languageId, levelNum, score, passed) {
    const student = this.getCurrentStudent();
    if (!student.assessmentProgress[languageId]) {
      student.assessmentProgress[languageId] = {
        level1: { passed: false, score: 0 },
        level2: { passed: false, score: 0 },
        level3: { passed: false, score: 0 },
        badgeEarned: null,
        certified: false
      };
    }

    const langData = student.assessmentProgress[languageId];
    const key = `level${levelNum}`;
    langData[key] = {
      passed,
      score,
      completedAt: new Date().toISOString().split('T')[0]
    };

    if (langData.level1.passed && langData.level2.passed && langData.level3.passed) {
      langData.badgeEarned = 'Gold';
      langData.certified = true;
      if (!langData.certId) {
        const randId = Math.floor(1000 + Math.random() * 9000);
        langData.certId = `CERT-${languageId.toUpperCase()}-${randId}-${student.name.split(' ')[0].toUpperCase()}`;
        langData.certDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } else if (langData.level1.passed && langData.level2.passed) {
      langData.badgeEarned = 'Silver';
    } else if (langData.level1.passed) {
      langData.badgeEarned = 'Bronze';
    }

    this.saveCurrentStudent(student);
    return langData;
  }

  submitProject(projectPayload) {
    const student = this.getCurrentStudent();
    student.submittedProject = {
      ...projectPayload,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Verified & Questions Ready'
    };
    student.appliedRole = projectPayload.roleId;
    this.saveCurrentStudent(student);
  }
}

export const store = new Store();
