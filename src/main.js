import './style.css';
import { store } from './state/store.js';
import { renderAuthPage } from './components/auth/AuthPage.js';
import { renderInstructionsPage } from './components/student/InstructionsPage.js';
import { renderStudentHome } from './components/student/StudentHome.js';
import { renderOtherSkillsPage } from './components/student/OtherSkillsPage.js';
import { renderVerifiedShell } from './components/verified/VerifiedShell.js';
import { renderHRHome } from './components/hr/HRHome.js';

const appRoot = document.getElementById('app-root');
const navHeader = document.querySelector('.navbar');

function updateLayout() {
  const isAuth = store.isAuthenticated();
  const currentUser = store.getCurrentUser();
  const view = store.getView();

  // If in VERIFIED Talent Intelligence shell ('programming-languages'), the left sidebar handles top navigation natively!
  if (isAuth && currentUser?.userRole === 'student' && view === 'programming-languages') {
    if (navHeader) navHeader.style.display = 'none';
  } else {
    if (navHeader) navHeader.style.display = 'block';
  }
}

function renderView() {
  updateLayout();

  // If user is not authenticated in this session, always show Login/Register!
  if (!store.isAuthenticated()) {
    renderAuthPage(appRoot);
    return;
  }

  const view = store.getView();
  const currentUser = store.getCurrentUser();

  if (currentUser.userRole === 'hr') {
    renderHRHome(appRoot);
    return;
  }

  // Student Views routing:
  switch (view) {
    case 'instructions':
      renderInstructionsPage(appRoot);
      break;
    case 'programming-languages':
      // Renders the full VERIFIED Talent Intelligence Assessment & Proctoring Platform matching screenshot!
      renderVerifiedShell(appRoot);
      break;
    case 'other-skills':
      renderOtherSkillsPage(appRoot);
      break;
    case 'student-home':
    default:
      renderStudentHome(appRoot);
      break;
  }
}

// React to store changes
store.subscribe(() => {
  renderView();
});

// Initial boot
renderView();
