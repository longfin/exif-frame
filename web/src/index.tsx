import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'konsta/react';
import Router from './router';

import './index.css';
import './locales';
import './google-analytics';
import './update-latest-version';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App theme="ios" safeAreas>
      <Router />
    </App>
  </React.StrictMode>
);
