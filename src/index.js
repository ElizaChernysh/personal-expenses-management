import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import './styles/main.scss';
import { App } from './App';
import { store } from './sore/store'
// import { setupStore } from './sore/store';

// const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { Provider } from 'react-redux';
// import App from './App';
// import { setupStore } from './sore/store';
// import reportWebVitals from './reportWebVitals';

// const store = setupStore(); 

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>

//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
