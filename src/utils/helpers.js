import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

export function fireCertificateConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

export function getBadgeDetails(badgeName) {
  switch (badgeName) {
    case 'Gold':
      return {
        name: 'Gold Master Badge',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.4)',
        icon: '🏆',
        desc: 'Completed Level 3 Advanced Mastery'
      };
    case 'Silver':
      return {
        name: 'Silver Specialist Badge',
        color: '#94a3b8',
        bg: 'rgba(148, 163, 184, 0.15)',
        border: 'rgba(148, 163, 184, 0.4)',
        icon: '🥈',
        desc: 'Completed Level 2 Intermediate Logic'
      };
    case 'Bronze':
      return {
        name: 'Bronze Apprentice Badge',
        color: '#d97706',
        bg: 'rgba(217, 119, 6, 0.15)',
        border: 'rgba(217, 119, 6, 0.4)',
        icon: '🥉',
        desc: 'Completed Level 1 Fundamentals'
      };
    default:
      return null;
  }
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
