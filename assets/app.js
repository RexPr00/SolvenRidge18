(() => {
  const body = document.body;
  const drawer = document.querySelector('[data-drawer]');
  const backdrop = document.querySelector('[data-backdrop]');
  const openBtn = document.querySelector('[data-open-drawer]');
  const closeBtn = document.querySelector('[data-close-drawer]');
  const langBtns = document.querySelectorAll('[data-lang-toggle]');
  const faqItems = document.querySelectorAll('.faq-item');
  const modal = document.querySelector('[data-modal]');
  const openPrivacy = document.querySelectorAll('[data-open-privacy]');
  const closePrivacy = document.querySelectorAll('[data-close-privacy]');
  let trapNodes = [];
  let lastFocus = null;

  const setScrollLock = (lock) => {
    body.style.overflow = lock ? 'hidden' : '';
  };

  const refreshTrap = () => {
    trapNodes = drawer ? [...drawer.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')] : [];
  };

  const openDrawer = () => {
    if (!drawer || !backdrop) return;
    lastFocus = document.activeElement;
    drawer.classList.add('open');
    backdrop.classList.add('open');
    setScrollLock(true);
    refreshTrap();
    if (trapNodes[0]) trapNodes[0].focus();
  };

  const closeDrawer = () => {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    setScrollLock(false);
    if (lastFocus) lastFocus.focus();
  };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      modal?.classList.remove('open');
      setScrollLock(false);
    }
    if (e.key === 'Tab' && drawer?.classList.contains('open') && trapNodes.length) {
      const first = trapNodes[0];
      const last = trapNodes[trapNodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const menu = btn.nextElementSibling;
      menu?.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.lang-menu.open').forEach((menu) => {
      if (!menu.parentElement.contains(e.target)) menu.classList.remove('open');
    });
  });

  faqItems.forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      faqItems.forEach((x) => x !== item && x.classList.remove('open'));
      item.classList.toggle('open');
    });
  });

  openPrivacy.forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    modal?.classList.add('open');
    setScrollLock(true);
  }));
  closePrivacy.forEach((el) => el.addEventListener('click', () => {
    modal?.classList.remove('open');
    setScrollLock(false);
  }));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      setScrollLock(false);
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.16 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
