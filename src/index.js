import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import {positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

// provider connect redux store to react application it is component of react
// it makes available redux store to all component and for it we have to pass prop
const root = ReactDOM.createRoot(document.getElementById('root'));
const option={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}{...option}>
    <App />
    </AlertProvider>
  </Provider>
    

);


