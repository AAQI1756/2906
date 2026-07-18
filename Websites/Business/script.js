// ============================================================
// A&M SOLARS — interactions
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shrink/blur on scroll ---------- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const scrim = document.getElementById('navScrim');

  const closeMenu = () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    toggle.classList.add('open');
    links.classList.add('open');
    scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    toggle.classList.contains('open') ? closeMenu() : openMenu();
  });
  scrim.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });

  /* ---------- Scroll reveal (fade/slide up + staggered grids) ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Count-up stats ---------- */
  const stats = document.querySelectorAll('.stat .num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (stats.length && 'IntersectionObserver' in window) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(el => statIO.observe(el));
  }

  /* ---------- Testimonial carousel ---------- */
  const testimonials = [
    { text: "A&M Solars turned our vision into a stunning, energy-independent home. Their team is knowledgeable, professional, and truly cares about the outcome.", name: "Jessica M.", role: "Meadowline Residence", initial: "J" },
    { text: "From the first site visit to the final switch-flip, the process was seamless. Our office building now runs on daylight and sunshine.", name: "David R.", role: "EcoCore Office Park", initial: "D" },
    { text: "They designed a system around our land, not against it. Energy bills dropped by more than a third in the first season alone.", name: "Amara K.", role: "Harmony Solar Retreat", initial: "A" }
  ];
  let testiIndex = 0;
  const testiText = document.getElementById('testiText');
  const testiName = document.getElementById('testiName');
  const testiRole = document.getElementById('testiRole');
  const testiAvatar = document.getElementById('testiAvatar');
  const testiDots = document.getElementById('testiDots') ? document.getElementById('testiDots').children : [];

  const renderTesti = (i) => {
    const t = testimonials[i];
    testiText.style.opacity = 0;
    setTimeout(() => {
      testiText.textContent = t.text;
      testiName.textContent = t.name;
      testiRole.textContent = t.role;
      testiAvatar.textContent = t.initial;
      testiText.style.opacity = 1;
    }, 180);
    Array.from(testiDots).forEach((d, idx) => d.classList.toggle('active', idx === i));
  };
  if (testiText) testiText.style.transition = 'opacity .25s ease';

  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      testiIndex = (testiIndex - 1 + testimonials.length) % testimonials.length;
      renderTesti(testiIndex);
    });
    nextBtn.addEventListener('click', () => {
      testiIndex = (testiIndex + 1) % testimonials.length;
      renderTesti(testiIndex);
    });
  }

  /* ---------- Newsletter (demo) ---------- */
  const newsForm = document.querySelector('.footer-news');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsForm.querySelector('input');
      if (input.value) {
        input.value = '';
        input.placeholder = 'Thanks — you\'re subscribed!';
      }
    });
  }

});
