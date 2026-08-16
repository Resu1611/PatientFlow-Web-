import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * Interruptor del revelado por scroll (ver src/lib/reveal.ts).
 *
 * El estado oculto de las secciones cuelga de este atributo, así que sin JS
 * no existe y la página se lee entera — el fallo va hacia contenido visible,
 * nunca hacia una pantalla en blanco.
 *
 * Va antes de `render()` y no en un efecto: en el momento en que se ejecuta
 * esta línea todavía no hay un solo `.pf-reveal` en el DOM, así que ninguna
 * sección alcanza a pintarse visible para después saltar a oculta.
 */
document.documentElement.dataset.motion = 'on';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
