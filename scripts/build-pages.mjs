import {copyFile, mkdir, writeFile} from 'node:fs/promises';
import {offersSeed} from '../src/data.js';
const routes = ['student', 'student/offers', 'student/stats', 'student/payouts',
  'admin', 'admin/offers', 'admin/offers/new', 'login',
  ...offersSeed.flatMap(({id}) => [`student/offers/${id}`, `admin/offers/${id}/edit`, `admin/analytics/${id}`])];
for (const route of routes) {
  await mkdir(`dist/${route}`, {recursive: true});
  await copyFile('dist/cabinet/index.html', `dist/${route}/index.html`);
}
// Unknown dynamic IDs use GitHub Pages' custom 404 document.
await copyFile('dist/cabinet/index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
console.log(`GitHub Pages: generated ${routes.length} routes and 404 fallback.`);
