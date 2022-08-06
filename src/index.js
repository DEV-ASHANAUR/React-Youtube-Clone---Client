import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Provider loading={null} persistor={persistor}>
        <App />
      </Provider>
    </Provider>

  </React.StrictMode>
);
