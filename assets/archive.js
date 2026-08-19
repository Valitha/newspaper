(() => {
  const data = window.ROUNDIVYAN_ISSUES;
  const latestText = document.querySelector('[data-latest-text]');
  const latestWeek = document.querySelector('[data-latest-week]');
  const latestLink = document.querySelector('[data-latest-link]');
  const archive = document.querySelector('[data-archive]');
  const art = document.querySelector('[data-art-cycle]');
  const jumpForm = document.querySelector('[data-issue-jump]');
  const jumpInput = document.querySelector('[data-issue-jump-input]');
  const jumpError = document.querySelector('[data-jump-error]');
  const isLocalFile = location.protocol === 'file:';
  let errorTimer = null;

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const linkFor = issue => isLocalFile ? `${issue.url}index.html` : issue.url;

  document.querySelectorAll('[data-local-route]').forEach(link => {
    if (isLocalFile && link.getAttribute('href').endsWith('/')) link.href += 'index.html';
  });

  if (!data || !Array.isArray(data.issues)) {
    archive.innerHTML = '<p class="error">Archive data could not be loaded.</p>';
    return;
  }

  const issues = [...data.issues].sort((a, b) => b.week - a.week);
  const latest = issues[0];
  latestText.textContent = latest.headline;
  latestWeek.textContent = `Week ${latest.roman}`;
  latestLink.href = linkFor(latest);

  archive.innerHTML = issues.map(issue => `
    <a class="archive-row" id="week-${issue.week}" href="${esc(linkFor(issue))}">
      <span class="archive-week">Week ${esc(issue.roman)}</span>
      <span class="archive-title">${esc(issue.headline)}</span>
      <span class="archive-open">Read</span>
    </a>`).join('');

  if (jumpForm && jumpInput && jumpError) {
    const showMissing = () => {
      clearTimeout(errorTimer);
      jumpError.textContent = 'This article doesn’t exist.';
      errorTimer = setTimeout(() => { jumpError.textContent = ''; }, 2200);
    };

    jumpForm.addEventListener('submit', event => {
      event.preventDefault();
      const query = jumpInput.value.trim().toUpperCase();
      const issue = issues.find(item => String(item.week) === query || String(item.roman).toUpperCase() === query);
      if (!issue) {
        showMissing();
        return;
      }
      clearTimeout(errorTimer);
      jumpError.textContent = '';
      location.href = linkFor(issue);
    });
  }

  if (art) {
    let current = Math.max(1, Math.min(3, Number(latest.image) || 1));
    const artSrc = number => document.documentElement.classList.contains('tfr-joke-mode')
      ? `images/image${number}-tfr.png`
      : `images/image${number}.png`;
    const showCurrentArt = () => { art.src = artSrc(current); };

    showCurrentArt();
    document.addEventListener('roundivyan:tfr-mode', showCurrentArt);

    setInterval(() => {
      art.classList.add('switching');
      setTimeout(() => {
        current = current % 3 + 1;
        showCurrentArt();
        art.classList.remove('switching');
      }, 350);
    }, 4500);
  }
})();
