import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from "react-hot-toast"
import axios from 'axios'
import {Provider} from "react-redux";
import store from './redux/store.js'
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
  <App />
  <Toaster/>
  </Provider>
  </>
)
