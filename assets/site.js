// Shared page script for / and /en/. Expects a global L with localized strings.
(function () {
  var L = window.L || { ver: 'Version ', mb: ' MB', jam: 'Jammed', fake: 'Fake · ignored' };
  var apkVersion = '';

  // Version and size of the latest APK, from the GitHub release.
  fetch('https://api.github.com/repos/zheniaslius/deya-site/releases/latest')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rel) {
      if (!rel) return;
      var apk = (rel.assets || []).filter(function (a) { return a.name === 'deya.apk'; })[0];
      if (!apk) return;
      var mb = (apk.size / 1048576).toFixed(0);
      var v = (rel.tag_name || '').replace(/^v/, '');
      apkVersion = v;
      document.querySelectorAll('.apk-meta').forEach(function (el) {
        el.textContent = L.ver + v + ' · ' + mb + L.mb;
        el.hidden = false;
      });
    })
    .catch(function () {});

  function trackApk(a) {
    if (typeof gtag !== 'function') return;
    var params = {
      link_url: a.href,
      link_text: a.textContent.trim(),
      file_name: 'deya.apk',
      file_extension: 'apk',
      button_place: a.getAttribute('data-place') || '',
      app_version: apkVersion,
      transport_type: 'beacon'
    };
    gtag('event', 'download_apk', params);
    gtag('event', 'file_download', params);
  }
  document.querySelectorAll('a[href$="/deya.apk"]').forEach(function (a) {
    a.addEventListener('click', function () { trackApk(a); });
    a.addEventListener('auxclick', function (e) { if (e.button === 1) trackApk(a); });
  });
  document.querySelectorAll('a[href^="https://t.me/"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (typeof gtag === 'function') gtag('event', 'open_telegram', { link_url: a.href });
    });
  });

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.scope video');

  // Respect reduced motion: show the still frame instead of the looping hero clip.
  if (reduce && hero) { hero.removeAttribute('autoplay'); hero.pause(); }

  // HUD: GPS row follows the clip (the dot glitches red near the end), coordinates drift.
  var gps = document.querySelector('.scope .gps');
  if (hero && gps) {
    hero.addEventListener('timeupdate', function () {
      var fake = hero.currentTime > 3.7;
      gps.textContent = fake ? L.fake : L.jam;
      gps.style.color = fake ? 'var(--red)' : '';
    });
  }
  var coords = document.querySelector('.scope .coords');
  if (coords && !reduce) {
    var lat = 50.4501, lon = 30.5234;
    setInterval(function () {
      lat += 0.00004; lon += 0.00007;
      coords.textContent = lat.toFixed(4) + '° N · ' + lon.toFixed(4) + '° E';
    }, 400);
  }

  // Reveal sections as they scroll in.
  document.documentElement.classList.add('js');
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
