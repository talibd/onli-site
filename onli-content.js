// Apply the same copy to content loaded from Framer's binary CMS files.
fetch('/onli-content.json').then(response => response.json()).then(mapping => {
  function updateText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement?.closest('script,style,svg')) continue;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (Object.hasOwn(mapping, trimmed)) node.nodeValue = raw.replace(trimmed, mapping[trimmed]);
      else if (raw.includes('Eduon')) node.nodeValue = raw.replaceAll('Eduon', 'Onli');
    }
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      if (link.getAttribute('href') !== 'mailto:support@onli.club') link.setAttribute('href', 'mailto:support@onli.club');
    });
    // These three existing metric boxes now describe learning, without invented statistics.
    const metrics = [
      ['.framer-1qna706-container .framer-o238ma-container', 'AI'],
      ['.framer-1oy20ku-container .framer-o238ma-container', '1:1'],
      ['.framer-7pkw5u-container .framer-o238ma-container', 'Live'],
      ['.framer-3lblbt-container .framer-o238ma-container', 'AI'],
      ['.framer-1jk7gar-container .framer-o238ma-container', 'Live'],
      ['.framer-np7gb3-container .framer-o238ma-container', '1:1']
    ];
    for (const [selector, label] of metrics) {
      for (const box of document.querySelectorAll(selector)) {
        const spans = box.querySelectorAll('span');
        if (spans[0] && spans[0].textContent !== label) spans[0].textContent = label;
        for (const span of [...spans].slice(1)) if (span.textContent !== '') span.textContent = '';
      }
    }
    for (const node of document.querySelectorAll('footer [data-framer-name="Text"]')) {
      const text = node.textContent.trim();
      if (text === 'Framer' || text === 'Powered By') {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        let leaf;
        while ((leaf = walker.nextNode())) {
          if (leaf.nodeValue.trim() === 'Framer') leaf.nodeValue = 'Onli';
          if (leaf.nodeValue.trim() === 'Powered By') leaf.nodeValue = 'Learn with ';
        }
      }
    }
  }
  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; updateText(document.body); });
  }
  // Wait for the published page to hydrate before observing CMS updates.
  setTimeout(() => {
    updateText(document.body);
    new MutationObserver(schedule).observe(document.body, {subtree: true, childList: true, characterData: true});
  }, 1000);
});
