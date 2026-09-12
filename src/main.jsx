import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './styles.css';
import './responsive.css';
import './fund-banner.css';
async function start() {
  // GitHub Pages has no backend; all cabinet data is a demo.
  const {worker} = await import('./mocks/browser');
  await worker.start({onUnhandledRequest: 'bypass', quiet: true,
    serviceWorker: {url: `${import.meta.env.BASE_URL}mockServiceWorker.js`}});
  createRoot(document.getElementById('root')).render(
    <React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><App/></BrowserRouter></React.StrictMode>);
}
start().catch(error => {
  console.error(error);
  document.getElementById('root').textContent = 'Не удалось загрузить демо-кабинет. Обновите страницу и проверьте, разрешены ли Service Workers в браузере.';
});
