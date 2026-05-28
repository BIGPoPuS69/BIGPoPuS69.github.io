/* ================================================
   NovaNest — main.js
   ================================================ */

// 1. MOBILE MENU
const menuBtn = document.getElementById('menuBtn');
const nav     = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when a nav link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// 2. SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback: show everything immediately
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// 3. STICKY HEADER SHADOW
const header = document.getElementById('header');
if (header) {
  const updateHeader = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,.35)'
      : 'none';
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

// 4. ACTIVE NAV LINK (highlights current section)
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// 5. CONTACT FORM — friendly fake submit
const form       = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form && successMsg) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      btn.style.display = 'none';
      successMsg.hidden = false;
    }, 900);
  });
}
