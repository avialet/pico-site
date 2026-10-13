/* Pico : demonstration animee de la saisie en langage naturel (ES5, sans dependance). */
(function () {
  var texte = document.getElementById('demo-texte');
  var pastilles = document.querySelectorAll('#demo-pastilles span');
  if (!texte || !pastilles.length) return;

  var phrase = 'Relancer le fournisseur demain 14h #Migration @urgent !! ~30m';
  var etapes = [[30, 0], [34, 1], [45, 2], [53, 3], [56, 4], [61, 5]];
  var reduit = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function tout() {
    texte.textContent = phrase;
    for (var k = 0; k < pastilles.length; k++) pastilles[k].className = 'on';
  }

  function tour() {
    var i = 0;
    for (var k = 0; k < pastilles.length; k++) pastilles[k].className = '';
    texte.textContent = '';
    (function frappe() {
      i++;
      texte.textContent = phrase.slice(0, i);
      for (var e = 0; e < etapes.length; e++) {
        if (i === etapes[e][0]) pastilles[etapes[e][1]].className = 'on';
      }
      if (i < phrase.length) setTimeout(frappe, 38 + Math.random() * 40);
      else setTimeout(tour, 4200);
    })();
  }

  if (reduit) tout(); else setTimeout(tour, 500);
})();
