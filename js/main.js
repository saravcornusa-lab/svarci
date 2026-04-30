/* ══════════════════════════════════════════
   SAVRCI HANDICRAFTS — Shared JavaScript
   ══════════════════════════════════════════ */

/* ── Nav scroll effect & hamburger ── */
(function initNav() {
  const nav = document.querySelector('.site-nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Scroll shadow
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll-in fade animations ── */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ── Stagger index helper ── */
(function initStagger() {
  document.querySelectorAll('.stagger').forEach(parent => {
    [...parent.children].forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });
})();

/* ── Gallery filter ── */
(function initGalleryFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.gallery-card');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('gallery-hidden', !match);
      });
    });
  });
})();

/* ── Contact form ── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.disabled = true;
    btn.style.background = '#4a7c59';
    btn.style.borderColor = '#4a7c59';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 4000);
  });
})();
