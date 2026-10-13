/* Pico : démonstration animée et lien de téléchargement lu depuis la dernière version publiée. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // 1. Démo : une phrase se tape, les pastilles apparaissent à mesure.
  var sentence = 'Relancer le fournisseur demain 14h #Migration @urgent !! ~30m';
  var steps = [ // [nombre de caractères tapés à partir duquel la pastille apparaît, index]
    [30, 1], [34, 2], [45, 3], [53, 4], [56, 5], [61, 6]
  ];
  var typed = document.getElementById('typed');
  var chips = document.querySelectorAll('#chips .chip');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    if (typed) typed.textContent = sentence;
    chips.forEach(function (c) { c.classList.add('on'); });
  }

  function run() {
    var i = 0;
    chips.forEach(function (c) { c.classList.remove('on'); });
    if (typed) typed.textContent = '';
    (function tick() {
      i++;
      typed.textContent = sentence.slice(0, i);
      steps.forEach(function (s) { if (i === s[0]) chips[s[1] - 1].classList.add('on'); });
      if (i < sentence.length) {
        setTimeout(tick, 38 + Math.random() * 40);
      } else {
        setTimeout(run, 4200);
      }
    })();
  }

  if (typed) {
    if (reduce) showAll(); else setTimeout(run, 500);
  }

  // 2. Téléchargement : dernière version publiée sur GitHub (repli : page des versions).
  var RELEASES = 'https://github.com/avialet/pico/releases/latest';
  var links = document.querySelectorAll('[data-download]');
  var labels = document.querySelectorAll('[data-download-label]');
  var metas = document.querySelectorAll('[data-download-meta]');

  function apply(info) {
    links.forEach(function (a) { a.href = info.url; });
    labels.forEach(function (l) { l.textContent = 'Télécharger Pico ' + info.version; });
    metas.forEach(function (m) {
      m.textContent = 'Version ' + info.version + ' · ' + info.size + ' · Apple Silicon · macOS 26 Tahoe ou plus récent';
    });
  }

  function fromRelease(r) {
    var asset = (r.assets || []).filter(function (a) { return /^Pico-\d+\.\d+\.\d+\.dmg$/.test(a.name); })[0];
    if (!asset) return null;
    return {
      version: String(r.tag_name || '').replace(/^v/, ''),
      url: asset.browser_download_url,
      size: Math.max(1, Math.round(asset.size / 1048576)) + ' Mo'
    };
  }

  try {
    var cached = JSON.parse(sessionStorage.getItem('pico-release') || 'null');
    if (cached && Date.now() - cached.at < 3600e3) apply(cached.info);
  } catch (e) { /* stockage indisponible */ }

  fetch('https://api.github.com/repos/avialet/pico/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (r) {
      var info = fromRelease(r);
      if (!info) return;
      apply(info);
      try { sessionStorage.setItem('pico-release', JSON.stringify({ at: Date.now(), info: info })); } catch (e) { /* ignoré */ }
    })
    .catch(function () { /* on garde le lien vers la page des versions */ });
})();
