(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-tfr-joke-toggle]');
  const masthead = document.querySelector('.masthead');
  const normalMasthead = masthead ? masthead.getAttribute('src') : '';
  const tfrMasthead = 'assets/tfr/roundivyan-logo-tfr.png';
  if (!toggle) return;

  const music = new Audio('assets/tfr/crossing-the-styx.mp3');
  music.loop = true;
  music.preload = 'auto';
  music.volume = 0.34;

  const soundSources = {
    open: 'assets/tfr/click_window_open.wav',
    close: 'assets/tfr/click_close.wav',
    province: 'assets/tfr/click_province_01.wav'
  };

  const soundBases = Object.fromEntries(Object.entries(soundSources).map(([name, src]) => {
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = name === 'province' ? 0.58 : 0.48;
    return [name, audio];
  }));

  const active = () => root.classList.contains('tfr-joke-mode');

  const playSound = name => {
    const base = soundBases[name];
    if (!base) return;
    try {
      const audio = base.cloneNode();
      audio.volume = base.volume;
      const promise = audio.play();
      if (promise && promise.catch) promise.catch(() => {});
    } catch (_) {}
  };

  const setMode = enabled => {
    root.classList.toggle('tfr-joke-mode', enabled);
    toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    toggle.title = enabled ? 'Return to the normal Roundivyan Times' : 'Definitely do not press this';
    if (masthead) masthead.src = enabled ? tfrMasthead : normalMasthead;
    document.dispatchEvent(new CustomEvent('roundivyan:tfr-mode', { detail: { enabled } }));

    if (enabled) {
      try {
        music.currentTime = 0;
        const promise = music.play();
        if (promise && promise.catch) promise.catch(() => {});
      } catch (_) {}
    } else {
      music.pause();
      try { music.currentTime = 0; } catch (_) {}
    }
  };

  toggle.addEventListener('click', () => {
    const enabling = !active();
    if (enabling) {
      setMode(true);
      // The enabling click counts too.
      playSound('province');
    } else {
      // This click happened while TFR mode was still active.
      playSound('province');
      setMode(false);
    }
  });

  // In TFR mode every ordinary click gets the province click. Typing remains silent.
  document.addEventListener('click', event => {
    if (!active()) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest('[data-tfr-joke-toggle]')) return;
    playSound('province');
  }, true);

  // Deliberately default to normal mode on every page load.
  setMode(false);

  // Exposed only to make local testing/debugging easy without changing normal site behaviour.
  window.ROUNDIVYAN_TFR_JOKE = { setMode, active };
})();
