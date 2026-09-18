// The template's forms post to the original author's Framer endpoints, which a self-hosted
// site must not use. Send submissions to Onli by email instead.
// ponytail: mailto depends on the visitor's email app; switch to a form backend if that loses leads.
(() => {
  const to = 'support@onli.club';
  window.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const fields = [...form.querySelectorAll('input, textarea, select')]
      .filter(field => field.name && field.value.trim() && field.getAttribute('aria-hidden') !== 'true' && field.tabIndex !== -1 && field.type !== 'submit');
    const isContact = fields.some(field => field.tagName === 'TEXTAREA');
    const subject = isContact ? 'Enquiry from onli.club' : 'Please add me to Onli updates';
    const label = field => field.closest('label')?.innerText.split('\n')[0].replace('*', '').trim() || field.name;
    const body = fields.map(field => `${label(field)}: ${field.value.trim()}`).join('\n');
    location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, true);
})();
