document.addEventListener('DOMContentLoaded', function () {
  const BREAKPOINT = 900;

  const toggles = Array.from(document.querySelectorAll('.menu-toggle'));

  function closeMobileForHeader(header) {
    const mobile = header.querySelector('.mobile-nav');
    const btn = header.querySelector('.menu-toggle');
    if (mobile) mobile.setAttribute('hidden', '');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    header.classList.remove('mobile-open');
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const header = btn.closest('.site-header');
      if (!header) return;
      const mobile = header.querySelector('.mobile-nav');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (!mobile) return;
      if (expanded) {
        mobile.setAttribute('hidden', '');
        header.classList.remove('mobile-open');
      } else {
        mobile.removeAttribute('hidden');
        header.classList.add('mobile-open');
      }
    });
  });

  
  if (window.innerWidth > BREAKPOINT) {
    document.querySelectorAll('.site-header').forEach(h => closeMobileForHeader(h));
  }
  
  const mq = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);
  mq.addEventListener('change', (e) => {
    if (!e.matches) {
      document.querySelectorAll('.site-header').forEach(h => closeMobileForHeader(h));
    }
  });
});
