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
  var hero = document.querySelector('.demo video');

  // Respect reduced motion: show the still frame instead of the looping screen recording.
  if (reduce && hero) { hero.removeAttribute('autoplay'); hero.pause(); }

  // Readout next to the phone follows what happens in the recording.
  var gps = document.querySelector('.demo .gps'), src = document.querySelector('.demo .src'), cap = document.querySelector('.demo .cap');
  function showState(t) {
    if (!L.demo || !gps) return;
    var st = L.demo[0];
    L.demo.forEach(function (s) { if (t >= s.t) st = s; });
    if (gps.textContent === st.gps) return;
    gps.textContent = st.gps; gps.className = 'v gps ' + st.c;
    src.textContent = st.src; cap.textContent = st.cap;
  }
  showState(0);
  if (hero) hero.addEventListener('timeupdate', function () { showState(hero.currentTime); });

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
