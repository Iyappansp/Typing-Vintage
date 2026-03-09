/* ============================================================
   KEYLEGACY — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Page Loader ─────────────────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }

  /* ── Scroll Progress Bar ─────────────────────────────────── */
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / total * 100) + '%';
    }, { passive: true });
  }

  /* ── Sticky Navbar ───────────────────────────────────────── */
  const navbar = document.querySelector('.navbar-main');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Theme Toggle ────────────────────────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('kl-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('kl-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  /* ── RTL Toggle ──────────────────────────────────────────── */
  const rtlBtn = document.getElementById('rtl-toggle');
  const rtlIcon = document.getElementById('rtl-icon');
  const body = document.body;

  const savedDir = localStorage.getItem('kl-dir') || 'ltr';
  applyDir(savedDir);

  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const current = body.getAttribute('dir') || 'ltr';
      applyDir(current === 'ltr' ? 'rtl' : 'ltr');
    });
  }

  function applyDir(dir) {
    body.setAttribute('dir', dir);
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('kl-dir', dir);
    if (rtlIcon) rtlIcon.textContent = dir === 'rtl' ? '⇄ LTR' : '⇄ RTL';
  }

  /* ── Typewriter Effect ───────────────────────────────────── */
  const twEl = document.getElementById('typewriter-text');
  if (twEl) {
    const phrases = twEl.dataset.phrases
      ? JSON.parse(twEl.dataset.phrases)
      : ['Restored by Hand.', 'Crafted with Precision.', 'History Reimagined.'];
    let pi = 0, ci = 0, deleting = false;

    function typeTick() {
      const phrase = phrases[pi];
      if (!deleting) {
        twEl.textContent = phrase.substring(0, ci + 1);
        ci++;
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(typeTick, 1800);
          return;
        }
      } else {
        twEl.textContent = phrase.substring(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(typeTick, deleting ? 50 : 80);
    }
    typeTick();
  }

  /* ── Scroll Reveal (manual, no library dependency) ──────── */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    // Initial hide
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
      const delay = el.dataset.delay || 0;
      el.style.transitionDelay = delay + 'ms';
    });

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Rating Bars Animation ───────────────────────────────── */
  const ratingObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.rating-fill').forEach(bar => {
          const target = bar.dataset.width || '80';
          bar.style.width = target + '%';
        });
        ratingObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.ratings-block').forEach(el => ratingObs.observe(el));

  /* ── Multi-Step Form ─────────────────────────────────────── */
  const stepNextBtns = document.querySelectorAll('[data-step-next]');
  const stepPrevBtns = document.querySelectorAll('[data-step-prev]');
  const stepCircles  = document.querySelectorAll('.step-circle');
  const stepPanels   = document.querySelectorAll('.step-panel');
  const stepConns    = document.querySelectorAll('.step-connector');
  let currentStep = 1;

  function gotoStep(n) {
    stepPanels.forEach((p, i) => p.classList.toggle('active', i + 1 === n));
    stepCircles.forEach((c, i) => {
      c.classList.remove('active', 'done');
      if (i + 1 < n) c.classList.add('done');
      if (i + 1 === n) c.classList.add('active');
    });
    stepConns.forEach((c, i) => c.classList.toggle('active', i + 1 < n));
    currentStep = n;
  }

  stepNextBtns.forEach(btn => btn.addEventListener('click', () => {
    if (currentStep < stepPanels.length) gotoStep(currentStep + 1);
  }));
  stepPrevBtns.forEach(btn => btn.addEventListener('click', () => {
    if (currentStep > 1) gotoStep(currentStep - 1);
  }));

  /* ── Smooth Hover Tilt on Product Cards ──────────────────── */
  document.querySelectorAll('.prod-card, .card-glass').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Counter Animation ───────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 50;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = Math.round(current) + suffix;
        }, 30);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));

  /* ── Mobile menu Bootstrap close on nav click ────────────── */
  document.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', () => {
      const toggler = document.querySelector('.navbar-toggler');
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show') && toggler) toggler.click();
    });
  });

  /* ── Lightbox / Gallery Modal ────────────────────────────── */
  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const modal = document.getElementById('lightbox-modal');
      const img   = document.getElementById('lightbox-img');
      if (modal && img) {
        img.src = src;
        new bootstrap.Modal(modal).show();
      }
    });
  });

});
