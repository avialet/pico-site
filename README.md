# pico.vialet.app

Site de présentation de [Pico](https://github.com/avialet/pico), le gestionnaire de
tâches natif pour Mac. Une page statique, sans framework, sans cookie, sans traceur.

- `site/public/` : le site (HTML, CSS, JavaScript, images WebP)
- `docs/deploiement.md` : déploiement par `rsync` et configuration du serveur
- `.github/workflows/deploy.yml` : synchronisation à chaque push sur `main`

Le bouton de téléchargement lit la dernière version publiée sur GitHub ; l'apparence
suit le mode clair ou sombre du système.

Aperçu local : `cd site/public && python3 -m http.server 8765`, puis http://localhost:8765.

Licence [MIT](LICENSE).
