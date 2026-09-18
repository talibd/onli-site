(() => {
  const policies = [
    ['/cancellation-refund', 'Cancellations & Refunds'],
    ['/shipping-delivery', 'Service Delivery Policy']
  ];
  // Policy pages live at /<slug>; Framer's router still renders its own links as /privacy/<slug>.
  const slugs = ['/privacy-policy', '/terms-conditions', '/cancellation-refund', '/shipping-delivery'];
  const policyPath = link => {
    const path = new URL(link.href, location.href).pathname.replace(/\/$/, '').replace(/^\/privacy(?=\/)/, '');
    return slugs.includes(path) ? path : null;
  };
  // Capture phase runs before Framer's router, so the browser loads the static page normally.
  addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    const path = link && policyPath(link);
    if (!path) return;
    link.href = path;
    event.stopPropagation();
  }, true);
  function fixLinks() {
    document.querySelectorAll('a[href*="/privacy/"]').forEach(link => {
      const path = policyPath(link);
      if (path && link.getAttribute('href') !== path) link.setAttribute('href', path);
    });
  }
  function addContact() {
    document.querySelectorAll('footer [data-framer-name="Text Block"]').forEach(block => {
      const text = block.querySelector(':scope > [data-framer-name="Text"]');
      if (!text || block.parentElement.querySelector('.onli-contact')) return;
      const preset = text.querySelector('.framer-text')?.className || '';
      const contact = document.createElement('div');
      contact.className = 'onli-contact';
      contact.style.cssText = 'display:flex;flex-direction:column;gap:6px;max-width:420px';
      contact.innerHTML =
        `<div class="${preset}" style="font-size:14px;line-height:1.5">801, Block B, Shubh Labh Hights, Indore Khajrana, Indore - 452016, Madhya Pradesh</div>` +
        `<a class="${preset}" href="tel:+917415739484" style="font-size:14px;color:inherit;text-decoration:none">Phone: +91 74157 39484</a>`;
      block.after(contact);
    });
  }
  function addLinks() {
    addContact();
    fixLinks();
    document.querySelectorAll('footer [data-framer-name="Footer Menu Block"]').forEach(block => {
      const isPrivacyLink = link => policyPath(link) === '/privacy-policy';
      if (![...block.querySelectorAll('a')].some(isPrivacyLink)) return;
      const menu = block.querySelector('[data-framer-name="Footer Menu"]');
      const example = [...menu.children].find(child => [...child.querySelectorAll('a')].some(isPrivacyLink));
      if (!example) return;
      policies.forEach(([url, label]) => {
        if (menu.querySelector(`a[href="${url}"]`)) return;
        const item = example.cloneNode(true);
        item.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
        const link = item.querySelector('a');
        link.href = url;
        link.removeAttribute('data-framer-page-link-current');
        const text = link.querySelector('p');
        if (text) text.textContent = label;
        menu.append(item);
      });
    });
  }
  setTimeout(() => {
    addLinks();
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; addLinks(); });
    }).observe(document.body, {childList:true, subtree:true});
  }, 1000);
})();
