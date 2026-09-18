(() => {
  const section = document.querySelector('[data-framer-name="Privacy Section"]');
  const page = section.parentElement;
  const shell = page.parentElement;
  const pageVariants = ['iikc56', '1rmn1xc', 'ipkvq4'];
  const shellVariants = ['qlp2m1', 'jomlg0', '18fhp40', '1udlf89'];
  function resize() {
    pageVariants.forEach(name => page.classList.remove('framer-' + name));
    shellVariants.forEach(name => shell.classList.remove('framer-' + name));
    page.classList.add('framer-' + (innerWidth >= 1200 ? 'iikc56' : innerWidth >= 810 ? '1rmn1xc' : 'ipkvq4'));
    shell.classList.add('framer-' + (innerWidth >= 1440 ? 'qlp2m1' : innerWidth >= 1200 ? 'jomlg0' : innerWidth >= 810 ? '18fhp40' : '1udlf89'));
  }
  resize();
  addEventListener('resize', resize);
  document.querySelectorAll('nav .framer-1uxsj5y').forEach(toggle => {
    toggle.setAttribute('role','button');
    toggle.setAttribute('tabindex','0');
    toggle.setAttribute('aria-label','Open navigation');
    toggle.setAttribute('aria-expanded','false');
    function activate() {
      const nav = toggle.closest('nav');
      const open = nav.dataset.menuOpen !== 'true';
      nav.dataset.menuOpen = String(open);
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    }
    toggle.addEventListener('click',activate);
    toggle.addEventListener('keydown',event => {
      if(event.key === 'Enter' || event.key === ' ') {event.preventDefault(); activate();}
    });
  });
})();
