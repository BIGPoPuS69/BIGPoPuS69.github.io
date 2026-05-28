(function () {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  window.addEventListener(
    'scroll',
    () => header.classList.toggle('is-scrolled', window.scrollY > 20),
    { passive: true }
  );

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.hidden = false;
    form.reset();
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
