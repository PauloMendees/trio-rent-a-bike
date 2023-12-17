import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'routes';
import './styles/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '@emotion/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Global
      styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          backgroundColor: 'transparent',
        },
      }}
    />
    <App />
    <ToastContainer />
  </React.StrictMode>,
);
