import React from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux';
import store  from './service/redux/store';

// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider
    store={store}> <App /></Provider>
   
  </React.StrictMode>,
)
