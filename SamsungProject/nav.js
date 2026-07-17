// Theme toggle (light/dark) — shared across all pages
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    rootEl.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    rootEl.removeAttribute('data-theme');
    themeToggle.textContent = '☀️';
  }
}

applyTheme(localStorage.getItem('theme') || 'dark');

themeToggle.addEventListener('click', () => {
  const next = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Mobile nav toggle — shared across all pages
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Home links scroll all the way to the top (so the announcement bar comes back into view)
document.querySelectorAll('a[href="#home"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#home');
  });
});

// Announcement bar — shared across all pages (reappears every page load/refresh)
const announcementBar = document.getElementById('announcementBar');
const announcementClose = document.getElementById('announcementClose');

announcementClose.addEventListener('click', () => {
  announcementBar.classList.add('hidden');
});
